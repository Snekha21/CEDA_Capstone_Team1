# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from models import feedback_data, Feedback  # Using the in-memory feedback_data list
# from analysis import analyze_sentiment, get_top_rated_products_by_skin_type

# feedback_bp = Blueprint('feedback', __name__)

# @feedback_bp.route('/feedback', methods=['POST'])
# @jwt_required()
# def submit_feedback():
#     data = request.json
#     feedback = Feedback(
#         product_id=data['product_id'],
#         rating=data['rating'],
#         review=data['review'],
#         user_id=get_jwt_identity()
#     )
#     feedback_data.append(feedback)  # Add to in-memory list
#     sentiment = analyze_sentiment(data['review'])
#     return jsonify({"msg": "Feedback saved", "sentiment": sentiment}), 201

# @feedback_bp.route('/feedback/<product_id>', methods=['GET'])
# def get_feedback(product_id):
#     # Filter feedback_data list by product_id
#     feedbacks = [f for f in feedback_data if f.product_id == int(product_id)]
#     return jsonify([{
#         "user_id": f.user_id,
#         "review": f.review,
#         "rating": f.rating
#     } for f in feedbacks])

# @feedback_bp.route('/feedback/filter', methods=['GET'])
# def filter_feedback():
#     min_rating = int(request.args.get('min_rating', 1))
#     keyword = request.args.get('keyword', '').lower()

#     # Filter feedback_data based on rating and keyword
#     filtered_feedbacks = [
#         f for f in feedback_data if f.rating >= min_rating and keyword in f.review.lower()
#     ]
    
#     results = [{
#         "product_id": f.product_id,
#         "rating": f.rating,
#         "review": f.review,
#         "user_id": f.user_id
#     } for f in filtered_feedbacks]

#     return jsonify(results)

# @feedback_bp.route('/recommendations/skin_type', methods=['GET'])
# def recommend_by_skin_type():
#     skin_type = request.args.get('skin_type', 'oily').lower()
    
#     # Use the in-memory data to get recommendations
#     recommendations = get_top_rated_products_by_skin_type(feedback_data, [skin_type])
    
#     return jsonify([{
#         "product_id": pid,
#         "avg_rating": round(score, 2)
#     } for pid, score in recommendations])
