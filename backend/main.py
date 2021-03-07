from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from apps.aktualnosci.routers import router as aktualnosci_router
import certs


app = FastAPI()
app.mongodb_client = None


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(certs.database.uri)
    app.mongodb = app.mongodb_client["Digicos_website"]
    app.mongofs = AsyncIOMotorGridFSBucket(app.mongodb)


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(aktualnosci_router, tags=["Punkty Dostępu"], prefix="/aktualnosci")

@app.get('/')
async def index():
    return {'data': {'name': 'krzyś'}}


