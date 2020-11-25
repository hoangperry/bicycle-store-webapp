import sqlalchemy
from fastapi import FastAPI
from sqlalchemy import create_engine


app = FastAPI()
engine = create_engine('sqlite:///foo.db')


@app.get("/")
def read_root():
    return {"Hello": "World"}
