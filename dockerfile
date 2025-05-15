FROM  python:3.8-alpine

RUN apk -U upgrade
RUN apk update && apk add --upgrade libcrypto3
RUN python -m pip install --upgrade pip
RUN pip install --upgrade setuptools