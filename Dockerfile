FROM node:10-alpine as builder
COPY ./ui /ui
WORKDIR /ui
RUN yarn
RUN yarn build

FROM python:3.6-alpine
LABEL maintainer="shrey.dabhi23@gmail.com"
COPY . /app
WORKDIR /app
COPY --from=builder /ui/build ./build
RUN pip install -r requirements.txt
RUN ui_cd.sh
CMD gunicorn server:app --log-file=-