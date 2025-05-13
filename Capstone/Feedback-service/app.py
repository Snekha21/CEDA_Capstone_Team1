from flask import Flask, request
from flask_cors import CORS
from extensions import db, jwt
from auth import auth_bp
from flask_restx import Api
from routes import api as feedback_ns
from logging_config import setup_logging  # <-- added
import logging
import threading
import py_eureka_client.eureka_client as eureka_client
from kafka_consumer import kafkaconsumer 
import json

eureka_client.init(eureka_server="http://localhost:7070/eureka",
                   app_name="Feedback-service",
                   instance_port=5000)




def create_app():
   setup_logging()  # <-- set up logging
   app = Flask(__name__)
   CORS(app)
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
   app.config['JWT_SECRET_KEY'] = 'your-secret-key'
   db.init_app(app)
   jwt.init_app(app)
   app.register_blueprint(auth_bp)
   api = Api(app, title='Cosmetics Feedback API', version='1.0', description='APIs for Feedback Microservice')
   api.add_namespace(feedback_ns, path='/feedback')

   @app.before_request
   def log_request_info():
       logging.info(f"{request.method} {request.path} - {request.remote_addr}")
   return app
app = create_app()

if __name__ == '__main__':
   threading.Thread(target=kafkaconsumer,daemon=True).start()
   app.run(debug=True)