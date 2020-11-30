FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
WORKDIR /app
COPY requirements.txt ./

RUN pip install -r requirements.txt
RUN python init_db_script.py

COPY . /app

