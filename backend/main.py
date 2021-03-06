from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def index():
    return {'data': {'name': 'krzyś'}}


@app.get('/aktualnosci')
@app.get('/aktualnosci/{resource_id}')
@app.get('/aktualnosci/{resource_id}/{page}')
def show(resource_id: int = None, page: int = 1) -> dict:
    if resource_id:
        return {'data': {'name': 'post', "id": resource_id, "page": page}}
    return {'data': {'name': 'wszystkie posty'}}
