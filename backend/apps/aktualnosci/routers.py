from fastapi import APIRouter, Request

router = APIRouter()


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