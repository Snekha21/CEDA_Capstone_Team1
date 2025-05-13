import csv
from io import StringIO
import pandas as pd
from textblob import TextBlob
from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from models import Feedback
from extensions import db
import logging
# Initialize namespace
api = Namespace('Feedback', description='Feedback operations')
# Swagger model for feedback
feedback_model = api.model('Feedback', {
   'product_id': fields.String(required=True),
   'user_id': fields.String(required=True),
   'rating': fields.Integer(required=True),
   'review_text': fields.String(required=True),
   'skin_type': fields.String(required=False)
})
# --------- ROUTES ---------
@api.route('/submit')
class SubmitFeedback(Resource):
   @api.expect(feedback_model)
   def post(self):
       try:
           data = request.get_json()
           new_fb = Feedback(
               product_id=data['product_id'],
               user_id=data['user_id'],
               rating=data['rating'],
               review_text=data['review_text'],
               skin_type=data.get('skin_type')
           )
           db.session.add(new_fb)
           db.session.commit()
           logging.info(f"Feedback submitted by user {data['user_id']} for product {data['product_id']}")
           return {"message": "Feedback submitted"}, 201
       except Exception as e:
           logging.error("Error in SubmitFeedback", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/all')
class GetAllFeedback(Resource):
   def get(self):
       try:
           feedbacks = Feedback.query.all()
           result = [{
               "id": fb.id,
               "product_id": fb.product_id,
               "user_id": fb.user_id,
               "rating": fb.rating,
               "review_text": fb.review_text,
               "skin_type": fb.skin_type,
               "timestamp": fb.timestamp.isoformat()
           } for fb in feedbacks]
           return {"reviews": result}
       except Exception as e:
           logging.error("Error in GetAllFeedback", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/product/<string:product_id>')
class FeedbackByProduct(Resource):
   def get(self, product_id):
       try:
           feedback = Feedback.query.filter_by(product_id=product_id).all()
           result = [{
               "user_id": fb.user_id,
               "rating": fb.rating,
               "review": fb.review_text
           } for fb in feedback]
           return result
       except Exception as e:
           logging.error("Error in FeedbackByProduct", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/upload-csv')
class UploadCSV(Resource):
   def post(self):
       try:
           if 'file' not in request.files:
               return {"msg": "No file part in the request"}, 400
           file = request.files['file']
           if file.filename == '':
               return {"msg": "No selected file"}, 400
           stream = StringIO(file.stream.read().decode("UTF8"), newline=None)
           csv_input = csv.DictReader(stream)
           for row in csv_input:
               feedback = Feedback(
                   product_id=row['product_id'],
                   user_id=row['user_id'],
                   rating=int(row['rating']),
                   review_text=row['review_text'],
                   skin_type=row.get('skin_type')
               )
               db.session.add(feedback)
           db.session.commit()
           logging.info("CSV feedback uploaded successfully")
           return {"msg": "CSV data uploaded successfully"}, 201
       except Exception as e:
           logging.error("Error in UploadCSV", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/download')
class DownloadFeedback(Resource):
   def get(self):
       try:
           feedbacks = Feedback.query.all()
           si = StringIO()
           cw = csv.writer(si)
           cw.writerow(['product_id', 'user_id', 'rating', 'review_text', 'skin_type'])
           for f in feedbacks:
               cw.writerow([f.product_id, f.user_id, f.rating, f.review_text, f.skin_type])
           return {"csv": si.getvalue()}
       except Exception as e:
           logging.error("Error in DownloadFeedback", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/analytics')
class FeedbackAnalytics(Resource):
   def get(self):
       try:
           feedbacks = Feedback.query.all()
           data = [{
               "product_id": f.product_id,
               "user_id": f.user_id,
               "rating": f.rating,
               "review_text": f.review_text
           } for f in feedbacks]
           df = pd.DataFrame(data)
           df["sentiment"] = df["review_text"].apply(lambda x: TextBlob(x).sentiment.polarity)
           keywords = ["hydrating", "non-comedogenic", "long-lasting", "paraben-free", "lightweight", "suits oily skin"]
           for word in keywords:
               df[word] = df["review_text"].str.lower().str.contains(word).astype(int)
           avg_sentiment = round(df["sentiment"].mean(), 2)
           keyword_counts = {word: int(df[word].sum()) for word in keywords}
           avg_rating = round(df["rating"].mean(), 2)
           return {
               "average_rating": avg_rating,
               "average_sentiment": avg_sentiment,
               "keyword_mentions": keyword_counts
           }
       except Exception as e:
           logging.error("Error in FeedbackAnalytics", exc_info=True)
           return {"error": "Internal server error"}, 500

@api.route('/eda')
class FeedbackEDA(Resource):
   def get(self):
       try:
           feedbacks = Feedback.query.all()
           df = pd.DataFrame([{
               "product_id": f.product_id,
               "user_id": f.user_id,
               "rating": f.rating,
               "review_text": f.review_text,
               "skin_type": f.skin_type
           } for f in feedbacks])
           rows, cols = df.shape
           avg_rating = round(df["rating"].mean(), 2)
           skin_type_avg = df.groupby("skin_type")["rating"].mean().to_dict()
           top_customers = df["user_id"].value_counts().head(5).to_dict()
           keywords = ["hydrating", "non-comedogenic", "long-lasting", "paraben-free", "lightweight", "suits oily skin"]
           for word in keywords:
               df[word] = df["review_text"].str.lower().str.contains(word).astype(int)
           keyword_counts = {word: int(df[word].sum()) for word in keywords}
           return {
               "rows": rows,
               "columns": cols,
               "average_rating": avg_rating,
               "average_by_skin_type": skin_type_avg,
               "top_customers": top_customers,
               "keyword_counts": keyword_counts
           }
       except Exception as e:
           logging.error("Error in FeedbackEDA", exc_info=True)
           return {"error": "Internal server error"}, 500