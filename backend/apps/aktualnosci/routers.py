from fastapi import APIRouter, Request, Body
from .models import ArticleModel
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.post("/new")
async def new_article(request: Request, article: ArticleModel = Body(...)):
    article = jsonable_encoder(article)
    request.app.mongodb['Aktualnosci'].insert_one(article)
    return "f"



@router.get("/")
async def get_all_items(request: Request):
    l = await request.app.mongodb['Aktualnosci'].find({}, {"_id": False}).to_list(length=100)
    return l


@router.get('/{resource_id}')
@router.get('/{resource_id}/{page}')
async def show(resource_id: int = None, page: int = 1) -> dict:
    if resource_id:
        return {'data': {'name': 'post', "id": resource_id, "page": page}}
    return {'data': {'name': 'wszystkie posty'}}