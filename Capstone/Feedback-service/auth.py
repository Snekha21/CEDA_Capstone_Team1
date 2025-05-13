from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models import User
auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/register', methods=['POST'])
def register():
   data = request.get_json()
   username = data['username']
   password = data['password']
   if User.query.filter_by(username=username).first():
       return jsonify({"msg": "User already exists"}), 400
   hashed_pw = generate_password_hash(password)
   new_user = User(username=username, password=hashed_pw)
   db.session.add(new_user)
   db.session.commit()
   return jsonify({"msg": "User registered successfully!"})
@auth_bp.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   username = data['username']
   password = data['password']
   user = User.query.filter_by(username=username).first()
   if user and check_password_hash(user.password, password):
       access_token = create_access_token(identity=username)
       return jsonify(access_token=access_token)
   return jsonify({"msg": "Invalid credentials"}), 401