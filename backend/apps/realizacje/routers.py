from fastapi import APIRouter, Request, Query, Body
from pydantic import BaseModel, validator, Field
from typing import List, Any, Dict, Optional, Union, Literal
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime
router = APIRouter()


"""
uuid
date from
date to
text
"""
class RealizacjeModel(BaseModel):
    internal_id: UUID
    yearFrom: int
    yearTo: Union[int, Literal["Nadal"]]
    text: str

@router.get('/get_all')
async def get_all(request: Request):
    collection = request.app.mongodb['Realizacje']
    if item_list := await collection.find({}, {'_id': False}).to_list(length=1000):
        return item_list
    return {"response": "problem"}


@router.post('/add_new')
async def add(request: Request, data: RealizacjeModel = Body(..., embed=True)):
    collection = request.app.mongodb['Realizacje']
    collection.insert_one({**data.dict(), 'internal_id': uuid4()})
    return {"resp": f"you sent content"}


@router.delete('/delete/{internal_id}')
async def delete(request: Request, internal_id: UUID):
    print("jsa")


@router.put('/update_one/{internal_id}')
async def delete(request: Request, internal_id: UUID, body: RealizacjeModel):
    collection = request.app.mongodb['Realizacje']
    print(body)
    await collection.replace_one({'internal_id': internal_id}, {**body.dict()})
    return {'response': 'Done!'}

@router.delete('/delete_one/{internal_id}')
async def delete(request: Request, internal_id: UUID):
    collection = request.app.mongodb['Realizacje']
    await collection.delete_one({'internal_id': internal_id})
    return {'response': 'Done!'}
