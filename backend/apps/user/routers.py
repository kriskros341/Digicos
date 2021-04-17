from fastapi import APIRouter, Request, Header
from pydantic import BaseModel, Field, validator
from typing import Optional, Any, Dict
from . import myCrypt
from hashlib import pbkdf2_hmac
from string import ascii_lowercase, digits
import random
from uuid import UUID, uuid4
from datetime import datetime
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
async def authorize(request: Request, username: str, body: UserAuthModel):
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
