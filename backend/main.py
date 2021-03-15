from fastapi import FastAPI, Request
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from apps.aktualnosci.routers import router as aktualnosci_router
from apps.pliki.routers import router as pliki_router
import certs

from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mongodb_client = None
app.mount("/static", StaticFiles(directory="static"), name="static")
app.templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(certs.database.uri)
    app.mongodb = app.mongodb_client["Digicos_website"]
    app.mongofs = AsyncIOMotorGridFSBucket(app.mongodb)


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(aktualnosci_router, tags=["Aktualności"], prefix="/aktualnosci")
app.include_router(pliki_router, tags=["Pliki"], prefix="/pliki")

@app.get('/')
async def index():
    return {'data': {'name': 'krzyś'}}