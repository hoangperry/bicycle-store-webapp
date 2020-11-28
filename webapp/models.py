from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str
    basket_id: int


class Bicycle(BaseModel):
    id: int
    name: str
    price: float
    description: str


class Basket(BaseModel):
    id: int
    name: str
    price: float
    description: str


class BicycleInBasket(BaseModel):
    basket_id: int
    bicycle_id: int
