FROM python:3.10

# Prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt

RUN python3 -m pip install -r requirements.txt

RUN python3 -m pip install torch==2.1.2
RUN python3 -m pip install deepforest==1.3.2

RUN apt-get update
RUN apt install -y libgl1-mesa-glx

WORKDIR /backend

COPY . .

# RUN python3 manage.py makemigrations

# RUN python3 manage.py collectstatic -v 3 --no-input

# RUN python3 manage.py migrate

# RUN python3 manage.py migrate_schemas --shared


EXPOSE 8000