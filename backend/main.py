from fastapi import FastAPI
from datetime import datetime
import requests
import json

app = FastAPI()

@app.get("/")
async def index():
    return "Hello, World!"