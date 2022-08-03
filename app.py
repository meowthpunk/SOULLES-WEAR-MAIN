# import requests
from cfg import API_TOKEN

from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def home():
    return {"ok": True}


@app.route("/webhook", methods=['POST', 'GET'])
def wbhooks():
    if request.method == "POST":
        data = request.json
        print(data)
    if request.method == "GET":
        data = request.json
        print(data)
    return {"ok": True}


if __name__ == "__main__":
    app.run()
