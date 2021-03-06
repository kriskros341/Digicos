from typing import List, Any, Union
from pydantic import BaseModel


class ArticleModel(BaseModel):
    title: str
    content: List[dict[str, str]]
