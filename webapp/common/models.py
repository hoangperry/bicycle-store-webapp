import sqlalchemy
from pydantic import BaseModel
from common.config import AppConf


class User(BaseModel):
    id: int
    name: str
    age: int
    email: str
    username: str
    hashed_password: str


class Bicycle(BaseModel):
    id: int
    name: str
    price: float
    description: str
    b64image: str


class Basket(BaseModel):
    user_id: int
    bicycle_id: int
    quantity: int


metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(
    AppConf.database_url, connect_args={"check_same_thread": False}
)

user = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("age", sqlalchemy.Integer),
    sqlalchemy.Column("email", sqlalchemy.String),
    sqlalchemy.Column("username", sqlalchemy.String),
    sqlalchemy.Column("hashed_password", sqlalchemy.String),
)


bicycle = sqlalchemy.Table(
    "bicycle",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("price", sqlalchemy.Float),
    sqlalchemy.Column("description", sqlalchemy.String),
    sqlalchemy.Column("b64image", sqlalchemy.String),
)


basket = sqlalchemy.Table(
    "basket",
    metadata,
    sqlalchemy.Column("user_id", sqlalchemy.Integer, sqlalchemy.ForeignKey(user.columns.id), primary_key=True),
    sqlalchemy.Column("bicycle_id", sqlalchemy.Integer, sqlalchemy.ForeignKey(bicycle.columns.id), primary_key=True),
    sqlalchemy.Column("quantity", sqlalchemy.Integer),
)

metadata.create_all(engine)
