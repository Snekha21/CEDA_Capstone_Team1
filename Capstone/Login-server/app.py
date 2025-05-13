from flask import Flask, request, jsonify
from flask_cors import CORS
from db import init_db
from model import create_customer, login_customer, create_admin, login_admin
import py_eureka_client.eureka_client as eureka_client

eureka_client.init(eureka_server="http://localhost:7070/eureka",
                   app_name="Login-service",
                   instance_port=5050)
app = Flask(__name__)
CORS(app)
init_db()

@app.route('/api/customer_signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    customer_id = create_customer(name, email, password)
    if customer_id:
        return jsonify({"message": "Signup successful", "customer_id": customer_id}), 201
    else:
        return jsonify({"error": "Email already exists"}), 400

@app.route('/api/customer_login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    customer_id = login_customer(email, password)
    if customer_id:
        return jsonify({"message": "Login successful", "customer_id": customer_id}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/api/admin_signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    customer_id = create_admin(name, email, password)
    if customer_id:
        return jsonify({"message": "Signup successful", "customer_id": customer_id}), 201
    else:
        return jsonify({"error": "Email already exists"}), 400

@app.route('/api/admin_login', methods=['POST'])
def admin_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    customer_id = login_admin(email, password)
    if customer_id:
        return jsonify({"message": "Login successful", "customer_id": customer_id}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401



if __name__ == '__main__':
    app.run(debug=True, port=5050)