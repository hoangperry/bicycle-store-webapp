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


@app.get("/bicycle/", response_model=List[Bicycle])
async def read_notes():
    query = bicycle.select()
    return await database.fetch_all(query)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
