FROM python:3.10

# Prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt

RUN python3 -m pip install -r requirements.txt

WORKDIR /backend

COPY . .

RUN python3 manage.py makemigrations

# RUN python3 manage.py migrate

# RUN python3 manage.py migrate_schemas --shared


EXPOSE 8000