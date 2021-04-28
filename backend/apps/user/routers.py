from fastapi import APIRouter, Request, Header, Depends, HTTPException, status
from pydantic import BaseModel, Field, validator
from typing import Optional, Any, Dict
from . import myCrypt
from hashlib import pbkdf2_hmac
from string import ascii_lowercase, digits
import random
from uuid import UUID, uuid4
from datetime import datetime, timedelta

from pydantic import BaseModel
from typing import Optional
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt

router = APIRouter()



class UserFormInputModel(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    @validator('username')
    def longer_than_3_letters(cls, v):
        if v.isalnum() and len(v) > 3:
            return v
        raise ValueError('username must be longer that 3 characters')

    @validator('password')
    def validate_password(cls, v):
        if v.isalnum() and len(v) > 3 and ' ' not in v:
            return v
        raise ValueError('username must be longer that 3 characters')




class ValidateUserModel(BaseModel):
    internal_id: UUID
    username: str
    active: bool


class UserAuthModel(BaseModel):
    token: str


ignored_data = {'password': False, '_id': False}


def encode(data):
    return pbkdf2_hmac('sha256', data['password'].encode('utf-8'), myCrypt.Crypt.salt, myCrypt.Crypt.num)


def create_token():
    return "".join([random.choice(ascii_lowercase + digits) for x in range(20)])


async def find_user(collection, username: str, fetch_everything: bool = False):
    print("finding user")
    if fetch_everything:
        return await collection.find_one({'username': username})
    return await collection.find_one({'username': username}, ignored_data)


async def create_user(collection, data: dict):
    collection.insert_one({**data, 'internal_id': uuid4(), 'password': encode(data)})
    print("user created successfully")


async def update_user(collection, select, query: Dict[str, Any]):
    collection.update_one(select, query)
    print("user updated successfully")


@router.post("/login")
async def login(request: Request, data: UserFormInputModel):
    collection = request.app.mongodb['User']
    data = data.dict()
    if user := await collection.find_one({'username': data['username']}):
        if user['password'] == encode(data):
            token = f'token {create_token()}'
            query = {'$set': {'active': True, 'token': token, 'last_auth': datetime.now().timestamp()}}
            collection.update_one({'username': data['username']}, query)
            print("Logged In")
            return {'response': 'Logged in', 'Authentication': token, 'username': user['username']}
        print('Password Wrong')
        return {'response': "Password Doesn't Match"}
    print('Login Failed')
    return {'response': 'No Such User In Database'}


@router.post("/logout/{username}")
async def logout(request: Request, username: str, body: UserAuthModel):
    data = body.dict()
    collection = request.app.mongodb['User']
    if user := await collection.find_one({'token': data['token']}):
        if user['active']:
            query = {'$set': {'active': False, 'token': None}}
            await collection.update_one({'token': user['token']}, query)
            print('Logout Successful')
            return {'response': 'User Logged Out'}
        print('logout attempted on inactive user')
        return {'response': 'No Such User Active'}
    print('logout failed')
    return {'response': 'No Such User In Database'}


@router.post("/authorize/{username}")
async def authorize_me(request: Request, username: str, body: UserAuthModel):
    data = body.dict()
    collection = request.app.mongodb['User']
    if user := await collection.find_one({'token': data['token']}):
        current_timestamp = datetime.now().timestamp()
        expiration_time = 600  # Seconds
        if user['active'] and user['last_auth'] + expiration_time > current_timestamp:
            await collection.update_one({'token': data['token']}, {'$set': {'last_auth': current_timestamp}})
            print(f'{username} Authorized')
            return {'result': True, 'response': 'User Authorized'}
        print(f'{username} Re-Authentication Required')
        return {'result': False, 'response': 'Re-authentication Required'}
    print(f'{username} Credentials For User Authentication.')
    return {'result': False, 'response': 'Invalid Credentials'}





class TestUser(BaseModel):
    username: str
    pw: Optional[str]


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/token")


class UserModel(BaseModel):
    username: str
    password: Any


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


def encode_password(password):
    return pbkdf2_hmac('sha256', password.encode('utf-8'), myCrypt.Crypt.salt, myCrypt.Crypt.num)


def create_tokend(data: dict, expire_after: Optional[timedelta] = None):
    to_encode = data.copy()
    if expire_after:
        expiration_date = datetime.utcnow() + expire_after
    else:
        expiration_date = datetime.utcnow() + timedelta(minutes=1)
    to_encode.update({'exp': expiration_date})
    encoded = jwt.encode(to_encode, myCrypt.Crypt.JWT_KEY, algorithm=myCrypt.Crypt.ALG)
    return encoded


@router.post('/token', response_model=Token)
async def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    collection = request.app.mongodb['User']
    user_from_db = await collection.find_one({'username': form_data.username}, {'_id': False})
    if not user_from_db:
        raise HTTPException(status_code=400, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    user = UserModel(**user_from_db)
    if not user.password == encode_password(form_data.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    token_expiration = timedelta(minutes=myCrypt.Crypt.ACCESS_TOKEN_EXPIRATION_DEFAULT)
    access_token = create_tokend(data={"sub": user.username}, expire_after=token_expiration)
    return {"access_token": access_token, "token_type": "bearer"}


async def authorize(request: Request, token: str = Depends(oauth2_scheme)):
    print("t")
    try:
        decoded = jwt.decode(token, myCrypt.Crypt.JWT_KEY)
        collection = request.app.mongodb['User']
        if this_user := await collection.find_one({'username': decoded.get('sub')}, {'_id': False}):
            return this_user
        return False
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)



class NewUserModel(BaseModel):
    username: str
    password: Any
    active: bool
    internal_id: Any


@router.get("/")
async def test_token(current_user: NewUserModel = Depends(authorize)):
    print(current_user)
    return {'response': 'access granted', 'status': True}


@router.post("/register")
async def register(request: Request, data: UserFormInputModel):
    collection = request.app.mongodb['User']
    data = data.dict()
    if await find_user(collection, data['username']):
        print(f"{data['username']} attempted registering")
        return {"response": "Username already taken"}
    await create_user(collection, data)
    print(f"{data['username']} registered successfully")
    return {"response": f"User {data['username']} registered successfully!"}