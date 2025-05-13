from flask import Blueprint, request, jsonify
import pandas as pd
from models import db, Feedback

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload_csv', methods=['POST'])
def upload_csv():
    file = request.files['file']
    df = pd.read_csv(file)
    for _, row in df.iterrows():
        feedback = Feedback(
            product_id=row['product_id'],
            rating=int(row['rating']),
            review=row['review'],
            user_id=row['user_id']
        )
        db.session.add(feedback)
    db.session.commit()
    return jsonify({"msg": "CSV uploaded successfully"}), 200
