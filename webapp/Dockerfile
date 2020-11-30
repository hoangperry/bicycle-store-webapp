FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
WORKDIR /app

# Install Requirement
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

# Init example database
COPY . /app
RUN export PYTHONPATH=$PWD
RUN python3 init_db_script.py
