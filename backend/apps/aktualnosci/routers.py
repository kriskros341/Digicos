from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, validator, conlist
from typing import List, Any, Dict, Optional, Union, Literal
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime
from ..user.routers import authorize
router = APIRouter()


class ContentType(str, Enum):
    file = "file"
    link = "link"
    text = 'text'
    mixed = "mixed"


class TextContent(BaseModel):
    cont: Optional[str]


class LinkContent(BaseModel):
    text: Optional[str]
    href: Optional[str]


class FileContent(BaseModel):
    cont: Any
    alt: str


class Language(str, Enum):
    Polish = "Polish"
    English = "English"


class ContentModel(BaseModel):
    typee: ContentType
    cont: Union[FileContent, LinkContent, TextContent, Any]

    class Config:
        use_enum_values = True


class BaseFormData(BaseModel):
    title: str
    content: List[ContentModel]


class BasePostData(BaseModel):
    title: str
    date: datetime
    language: str
    content: conlist(ContentModel, min_items=1)

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
async def get_all(request: Request):
    r = await request.app.mongodb['Aktualnosci'].find({}, {'_id': False}).to_list(length=100)
    print(r)
    return r


@router.get("./get_one/{internal_id}")
async def get_one(request: Request, internal_id: UUID):
    db = request.app.mongodb['Aktualnosci']
    if result := await db.find_one({"internal_id": internal_id}):
        return result
    return {"response": f"Artykuł o takim id nie istnieje"}


@router.put("/update_one/{internal_id}")
async def update_one(request: Request, internal_id: UUID, body: BasePostData, t=Depends(authorize)):
    db = request.app.mongodb['Aktualnosci']
    await db.replace_one({"internal_id": internal_id}, {**body.dict(), "internal_id": internal_id})

@router.get("/create_one/{language}")
async def create_one(request: Request, language: str, t=Depends(authorize)):
    title = {
        "Enlish": "New Article",
        "Polish": "Nowy Artykuł"
    }.get(language, "New Article")

    data = {"title": title, "date": datetime.now(), "content": [], "internal_id": uuid4(), "language": language}
    print(data)
    request.app.mongodb['Aktualnosci'].insert_one(data)
    return {"response": "Done!"}

@router.delete("/delete_one/{internal_id}")
async def update_one(request: Request, internal_id: UUID, t=Depends(authorize)):
    db = request.app.mongodb['Aktualnosci']
    await db.delete_one({"internal_id": internal_id})




"""
Aktualnosci:
    Data
    Tytuł
    Typ
    Kontent
    
    
"""