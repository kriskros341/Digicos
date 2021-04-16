from fastapi import APIRouter, Request, Query, Depends
from pydantic import BaseModel, Field
from typing import List, Any, Dict, Optional
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


class UserBase(BaseModel):
    internal_id: UUID
    password: str
    login: str


@router.post("/token")
async def token(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    return {'access_token': form_data.username + 'token'}


@router.get("/")
async def user(oauth2_token: str = Depends(oauth2_scheme)):
    return {'token': oauth2_token}
