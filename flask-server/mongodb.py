import pymongo 
from pymongo import MongoClient
from credentials import password, username

un = username()
pw = password()

cluster = MongoClient(f"mongodb+srv://{un}:{pw}@cluster0.drj76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = cluster["coverletter"]
collection = db["coverletters"]



def insert_data(company, position, cover_letter):
    post = {"company": company, "position": position, "cover_letter": cover_letter}
    collection.insert_one(post)




   




