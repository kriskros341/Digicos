from fastapi import APIRouter, Request, Query
from pydantic import BaseModel, Field
from typing import List, Any, Dict, Optional
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime
router = APIRouter()


class ContentType(str, Enum):
    file = "file"
    link = "link"
    text = "text"
    mixed = "mixed"


class BaseFormData(BaseModel):
    title: str
    content: List[Dict[ContentType, Any]]


class BasePostData(BaseModel):
    id: UUID
    title: str
    date: datetime
    content: List[Dict[ContentType, Any]]


@router.get("/")
async def get_all_items(request: Request):
    response = await request.app.mongodb['Aktualnosci'].find({}, {"_id": False}).to_list(length=100)
    return response


@router.get("/get_models")
async def get_models(content_type: ContentType):
    print(content_type)
    return {"selected_types": content_type}


@router.post("/upload")
async def upload_data(request: Request, data: BaseFormData, date: Optional[datetime]):
    the_post = {"internal_id": uuid4(), "date": datetime.now().timestamp(), **data.dict()}
    request.app.mongodb['Aktualnosci'].insert_one(the_post)
    return {"resp": f"you sent content: {the_post}"}


@router.get("/get_all")
async def get_all(request: Request):
    d = await request.app.mongodb['Aktualnosci'].find({}, {"_id": False}).to_list(length=100)
    print(dir(d[0]['date']))
    print(d[0]['date'].timestamp())
    return d

"""
Aktualnosci:
    Data
    Tytuł
    Typ
    Kontent
    
    
"""