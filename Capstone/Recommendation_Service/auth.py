from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# Dummy user data for login
DUMMY_USERS = {
    "admin": "password123",
    "test": "test123"
}

# Login Route only
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in DUMMY_USERS and DUMMY_USERS[username] == password:
        return jsonify(access_token=token), 200
    return jsonify({"msg": "Invalid credentials"}), 401
