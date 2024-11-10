from pymongo import MongoClient
from bson.objectid import ObjectId
from credentials import password, username

un = username()
pw = password()

cluster = MongoClient(f"mongodb+srv://{un}:{pw}@cluster0.drj76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = cluster["coverletter"]
collection = db["coverletters"]

def insert_data(company, position, cover_letter):
    post = {
        "company": company, 
        "position": position, 
        "cover_letter": cover_letter
    }
    collection.insert_one(post)

def get_all_cl():
    return list(collection.find({}, {'company': 1, 'position': 1}))

def get_cl_by_id(cl_id):
    objectId = ObjectId(cl_id)
    return collection.find_one({"_id": objectId})

def delete_cl_by_id(cl_id):
    objectId = ObjectId(cl_id)
    result = collection.delete_one({"_id": objectId})
    return result.deleted_count > 0
   


   




