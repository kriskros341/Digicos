from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from apps.aktualnosci.routers import router as aktualnosci_router
from apps.pliki.routers import router as pliki_router
from apps.user.routers import router as user_router
from apps.realizacje.routers import router as realizacje_router

import certs

from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mongodb_client = None
app.mount("/static", StaticFiles(directory="static"), name="static")
app.templates = Jinja2Templates(directory="templates")

allowed_origins = [
    "http://localhost:8000",
    "https://localhost:8003",
    "http://digicos.ddns.net:8000",
    "https://digicos.ddns.net:8003",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
app.include_router(user_router, tags=["Użytkownicy"], prefix="/user")
app.include_router(realizacje_router, tags=["realizacje"], prefix="/realizacje")

@app.get('/')
async def index():
    return {'data': {'name': 'krzyś'}}