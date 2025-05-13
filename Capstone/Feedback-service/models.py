# OLD:
# from app import db
# NEW:
from extensions import db
from datetime import datetime
#from flask_sqlalchemy import SQLAlchemy
#db = SQLAlchemy()

class User(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(50), unique=True, nullable=False)
   password = db.Column(db.String(200), nullable=False)

class Feedback(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   product_id = db.Column(db.String(50), nullable=False)
   user_id = db.Column(db.String(50), nullable=False)
   rating = db.Column(db.Integer, nullable=False)
   review_text = db.Column(db.Text, nullable=False)
   timestamp = db.Column(db.DateTime, default=datetime.utcnow)
   skin_type = db.Column(db.String(20))  # optional but recommended
   
