from typing import List, Any, Union
from pydantic import BaseModel, Field
from fastapi import UploadFile, File
from uuid import UUID, uuid4

permited_file_formats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg"
]


class ArticleModel(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    content: List[dict[str, str]]
