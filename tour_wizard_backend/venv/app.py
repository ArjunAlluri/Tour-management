from flask import Flask, jsonify, request, json 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId 
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'tour_wizard'
app.config['MONGO_URI'] = 'mongodb+srv://SETeam28:SETeam28Cluster0@cluster0.x7oob0c.mongodb.net/tour_wizard?retryWrites=true&w=majority'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/users/register', methods=["POST"])
def register():
    users = mongo.db.users 
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    response = users.find_one({'email': email})

    if response:
        result = jsonify({"error":"User Exists, please login"})
    else:
        user_id = str(users.insert_one({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
            'created': created 
        }).inserted_id)

        result = jsonify({'email': email + ' registered', '_id': user_id})

    return result

@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({'token':access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result 

if __name__ == '__main__':
    app.run(debug=True)