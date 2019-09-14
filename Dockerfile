FROM python:3.6-alpine

LABEL maintainer="shrey.dabhi23@gmail.com"

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

CMD gunicorn server:app --log-file=-