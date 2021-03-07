from fastapi import APIRouter, Request, Body, UploadFile, File, Response
from typing import Union
from fastapi.responses import StreamingResponse
import io
from .models import ArticleModel
from fastapi.encoders import jsonable_encoder
from uuid import uuid4

router = APIRouter()

@router.post("/new")
async def new_article(request: Request, article: ArticleModel = Body(...)):
    article = jsonable_encoder(article)
    request.app.mongodb['Aktualnosci'].insert_one(article)
    return "f"


@router.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(...)):
    file_content = await file.read()
    grid_in = await request.app.mongofs.upload_from_stream(
        file.filename, file_content, metadata={
            "contentType": file.content_type,
            "id": uuid4()
        })
    return {"status": "success", "text": f"{file.filename}, {file.content_type}"}


@router.get("/")
async def get_all_items(request: Request):
    l = await request.app.mongodb['Aktualnosci'].find({}, {"_id": False}).to_list(length=100)
    return l


@router.get("/get_file")
async def get_gridfile_by_id(request: Request, filename: str):
    file = await request.app.mongofs.find({"filename": filename}).next()
    return StreamingResponse(io.BytesIO(file.read()), media_type=file.content_type)


@router.get("/get_filed")
async def get_gridfile_by_idf(request: Request, filename: str):
    file = await request.app.mongofs.find({"filename": filename}).next()
    return Response(content=file.read(), media_type=file.content_type)


@router.get('/{resource_id}')
@router.get('/{resource_id}/{page}')
async def show(resource_id: int = None, page: int = 1) -> dict:
    if resource_id:
        return {'data': {'name': 'post', "id": resource_id, "page": page}}
    return {'data': {'name': 'wszystkie posty'}}