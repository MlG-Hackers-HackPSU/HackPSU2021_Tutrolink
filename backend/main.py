from fastapi import FastAPI
from datetime import datetime
import requests
import json
import os
from pymongo import MongoClient
from pydantic import BaseModel

app = FastAPI()
client = MongoClient(
    host="database", 
    username=os.environ["MONGO_USERNAME"], 
    password=os.environ["MONGO_PASSWORD"])

counters = client.demo.counters

@app.get("/")
async def index():
    counter = counters.find_one()
    if counter is None:
        counters.insert_one({'num_visited': 1})
    counter = counters.find_one_and_update({}, {'$inc': {'num_visited': 1}})
    return f"This page has been visited {counter['num_visited']} times."