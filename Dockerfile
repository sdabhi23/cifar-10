FROM node:10-alpine as builder
COPY ./ui /ui
WORKDIR /ui
RUN npm ci
RUN npm run build

FROM python:3.6-slim-stretch
LABEL maintainer="shrey.dabhi23@gmail.com"
COPY . /app
WORKDIR /app
COPY --from=builder /ui/build ./build
RUN pip install -r requirements.txt
RUN bash ./ui_cd.sh
CMD gunicorn server:app --log-file=-