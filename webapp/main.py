import bcrypt
import uvicorn
import databases
import sqlalchemy
from typing import List
from common.config import AppConf
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from common.models import User, Bicycle, Basket, user, bicycle, basket
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


def check_password(password, hashed):
    return bcrypt.checkpw(password, hashed)


app = FastAPI()

origins = [
    "http://localhost:8000",
    "localhost:8000",
    "http://localhost:3131"
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


engine = sqlalchemy.create_engine(
    AppConf.database_url, connect_args={"check_same_thread": False}
)
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
    try:
        query = basket.select().where(
            basket.columns.user_id == user_id and basket.columns.bicycle_id == bicycle_id
        ).exists()
        print(engine.execute(query).fetchall())

        query = basket.insert().values(user_id=user_id, bicycle_id=bicycle_id, quantity=1)
        await database.execute(query)
    except Exception as _:
        query = basket.update().where(
            basket.columns.user_id == user_id and basket.columns.bicycle_id == bicycle_id
        ).values(quantity=basket.columns.quantity+1)
        await database.execute(query)
        return {"response": True}
    return {"response": True}


@app.get("/user/basket", response_model=List[Basket])
async def get_basket(user_id: int):
    query = basket.select().where(basket.columns.user_id == user_id)
    # query = bicycle.select().where(bicycle.columns.name == "Bicycle BMW" and bicycle.columns.price == 4000)
    return await database.fetch_all(query)


@app.get("/bicycle/", response_model=List[Basket])
async def get_basket(bicycle_id: int):
    query = bicycle.select().where(bicycle.columns.bicycle_id == bicycle_id)
    # query = bicycle.select().where(bicycle.columns.name == "Bicycle BMW" and bicycle.columns.price == 4000)
    return await database.fetch_all(query)


@app.get("/bicycles/", response_model=List[Bicycle])
async def read_notes():
    query = bicycle.select()
    return await database.fetch_all(query)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
