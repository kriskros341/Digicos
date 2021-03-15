from fastapi import APIRouter, Request, UploadFile, File, Response
from fastapi.responses import StreamingResponse
import io
from uuid import uuid4
from fastapi.responses import HTMLResponse
router = APIRouter()


@router.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(...)):
    file_content = await file.read()
    grid_in = await request.app.mongofs.upload_from_stream(
        file.filename, file_content, metadata={
            "contentType": file.content_type,
            "id": uuid4()
        })
    return {"status": "success", "text": f"{file.filename}, {file.content_type}"}


@router.get("/get_file")
async def get_gridfilef(request: Request, filename: str):
    try:
        file = await request.app.mongofs.find({"filename": filename}).next()
        return Response(content=file.read(), media_type=file.content_type)
    except:
        return {"status": "file not found"}


@router.get("/get_file_chunk")
async def get_gridfilef(request: Request, filename: str):
    try:
        file = await request.app.mongofs.find({"filename": filename}).next()
        return Response(content=file.read(), media_type=file.content_type)
    except:
        return {"status": "file not found"}


@router.get("/all_files")
async def get_file_names(request: Request):
    file = request.app.mongofs.find()
    result = []
    async for x in file:
        result.append({x.filename: {
            "size": str(x.length) + " b",
            "uploaded": x.upload_date,
            "link": f"http://digicos.ddns.net:8001/pliki/get_file?filename={x.filename}"
        }})
        print(x.filename)
    return {"files": result}


@router.get("/all_files_page", response_class=HTMLResponse)
async def read_item(request: Request):
    file = request.app.mongofs.find()
    result = []
    async for x in file:
        result.append({
            "filename": x.filename,
            "size": str(x.length) + " b",
            "uploaded": x.upload_date,
            "link": f"http://digicos.ddns.net:8001/pliki/get_file?filename={x.filename}"
        })
    return request.app.templates.TemplateResponse("files.html", {"request": request, "files": result})
