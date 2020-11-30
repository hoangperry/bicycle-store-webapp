import bcrypt
import uvicorn
import databases
import sqlalchemy
from typing import List
from common.config import AppConf
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from common.models import User, Bicycle, Basket, UserBicycle, user, bicycle, basket
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


app = FastAPI()

origins = [
    "http://localhost:3131",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://34.70.32.4:3131",
    "http://apollo.hoang.tech"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

database = databases.Database(AppConf.database_url)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(AppConf.database_url, connect_args={"check_same_thread": False})
metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


# TEST
@app.get("/user/add_basket")
async def add_to_basket(user_id: int, bicycle_id: int):
    # noinspection PyBroadException
    try:
        query = basket.insert().values(user_id=user_id, bicycle_id=bicycle_id, quantity=1)
        await database.execute(query)
    except:
        old_val = basket.select().where(
            sqlalchemy.and_(basket.columns.user_id == user_id, basket.columns.bicycle_id == bicycle_id)
        )
        old_val = engine.execute(old_val).fetchone()[basket.c.quantity]
        query = basket.update().where(
            sqlalchemy.and_(basket.columns.user_id == user_id, basket.columns.bicycle_id == bicycle_id)
        ).values(
            quantity=old_val + 1
        )
        await database.execute(query)
        return {"response": True}
    return {"response": True}


@app.get("/user/del_basket")
async def add_to_basket(user_id: int, bicycle_id: int):
    # noinspection PyBroadException
    try:
        old_val = basket.select().where(
            basket.columns.user_id == user_id and basket.columns.bicycle_id == bicycle_id
        )
        old_val = engine.execute(old_val).fetchone()[basket.c.quantity]
        if old_val == 1:
            query = basket.delete().where(
                sqlalchemy.and_(basket.columns.user_id == user_id, basket.columns.bicycle_id == bicycle_id)
            )
        else:
            query = basket.update().where(
                sqlalchemy.and_(basket.columns.user_id == user_id, basket.columns.bicycle_id == bicycle_id)
            ).values(
                quantity=old_val - 1
            )
        await database.execute(query)
    except:
        return {"response": False}
    return {"response": True}


@app.post("/user/add_basket")
async def add_to_basket(body: UserBicycle):
    # noinspection PyBroadException
    try:
        query = basket.insert().values(user_id=body.user_id, bicycle_id=body.bicycle_id, quantity=1)
        await database.execute(query)
    except:
        old_val = basket.select().where(
            sqlalchemy.and_(basket.columns.user_id == body.user_id, basket.columns.bicycle_id == body.bicycle_id)
        )
        old_val = engine.execute(old_val).fetchone()[basket.c.quantity]
        query = basket.update().where(
            sqlalchemy.and_(basket.columns.user_id == body.user_id, basket.columns.bicycle_id == body.bicycle_id)
        ).values(
            quantity=old_val + 1
        )
        await database.execute(query)
        return {"response": True}
    return {"response": True}


@app.post("/user/del_basket")
async def add_to_basket(body: UserBicycle):
    # noinspection PyBroadException
    try:
        old_val = basket.select().where(
            basket.columns.user_id == body.user_id and basket.columns.bicycle_id == body.bicycle_id
        )
        old_val = engine.execute(old_val).fetchone()[basket.c.quantity]
        if old_val == 1:
            query = basket.delete().where(
                sqlalchemy.and_(basket.columns.user_id == body.user_id, basket.columns.bicycle_id == body.bicycle_id)
            )
        else:
            query = basket.update().where(
                sqlalchemy.and_(basket.columns.user_id == body.user_id, basket.columns.bicycle_id == body.bicycle_id)
            ).values(
                quantity=old_val - 1
            )
        await database.execute(query)
    except:
        return {"response": False}
    return {"response": True}


@app.get("/user/basket", response_model=List[Basket])
async def get_basket(user_id: int):
    query = basket.select().where(basket.columns.user_id == user_id)
    return await database.fetch_all(query)


# Needed to define merged return model here
@app.get("/user/basket_bicycle")
async def get_basket(user_id: int):
    query = basket.join(
        bicycle, basket.columns.bicycle_id == bicycle.columns.id
    ).select().where(
        basket.columns.user_id == user_id
    )
    return await database.fetch_all(query)


@app.get("/bicycle")
async def get_basket(bicycle_id: int):
    query = bicycle.select().where(bicycle.columns.id == bicycle_id)
    return await database.fetch_one(query)


@app.get("/bicycles/", response_model=List[Bicycle])
async def read_notes():
    query = bicycle.select()
    return await database.fetch_all(query)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
