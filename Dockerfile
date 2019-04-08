FROM alpine:3.9.2
RUN mkdir -p /repo
COPY . /repo
WORKDIR /repo
RUN apk add npm && npm install -g hskafreeroom
CMD freeRoom