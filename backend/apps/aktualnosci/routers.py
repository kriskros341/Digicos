from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, validator
from typing import List, Any, Dict, Optional, Union, Literal
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime
from ..user.routers import authorize
router = APIRouter()


class ContentType(str, Enum):
    file = "file"
    link = "link"
    text = "text"
    mixed = "mixed"


class Language(str, Enum):
    Polish = "Polish"
    English = "English"


class ContentModel(BaseModel):
    typee: ContentType
    cont: Any

    class Config:
        use_enum_values = True


class BaseFormData(BaseModel):
    title: str
    content: List[Dict[ContentType, Any]]


class BasePostData(BaseModel):
    title: str
    date: datetime
    content: List[ContentModel]
    language: Optional[Language]

    @validator('title')
    def passwords_match(cls, v, **kwargs):
        if 3 < len(v) < 200:
            return v
        raise ValueError("Title doesn't match schema")


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
async def get_all(request: Request, language: Optional[Union[Language, Literal['any']]]):
    if not language or language == 'any':
        return await request.app.mongodb['Aktualnosci'].find({}, {'_id': False}).to_list(length=100)
    return await request.app.mongodb['Aktualnosci'].find({'language': language}, {'_id': False}).to_list(length=100)


@router.get("./get_one/{internal_id}")
async def get_one(request: Request, internal_id: UUID):

    db = request.app.mongodb['Aktualnosci']
    if result := await db.find_one({"internal_id": internal_id}):
        return result
    return {"response": f"Artykuł o takim id nie istnieje"}


@router.put("/update_one/{internal_id}")
async def update_one(request: Request, internal_id: UUID, body: BasePostData, t = Depends(authorize)):

    db = request.app.mongodb['Aktualnosci']
    await db.replace_one({"internal_id": internal_id}, {**body.dict(), "internal_id": internal_id})


@router.delete("/delete_one/{internal_id}")
async def update_one(request: Request, internal_id: UUID, t = Depends(authorize)):

    db = request.app.mongodb['Aktualnosci']
    await db.delete_one({"internal_id": internal_id})




"""
Aktualnosci:
    Data
    Tytuł
    Typ
    Kontent
    
    
"""