from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from analysis import analyze_sentiment
import py_eureka_client.eureka_client as eureka_client

eureka_client.init(eureka_server="http://localhost:7070/eureka",
                   app_name="Recommendation-service",
                   instance_port=8080)

app = Flask(__name__)
CORS(app)

DATABASE = 'cosmetics.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Route to submit a review
@app.route('/api/reviews', methods=['POST'])
def submit_review():
    data = request.get_json()
    product_id = data.get('product_id')
    review = data.get('review')
    rating = data.get('rating')

    if not product_id or not review or rating is None:
        return jsonify({'error': 'Missing fields'}), 400

    # Insert the review into the database
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO reviews (product_id, review, rating) VALUES (?, ?, ?)',
        (product_id, review, rating)
    )
    conn.commit()
    conn.close()

    # Automatically update the sentiment analysis for this product
    return jsonify({'message': 'Review submitted successfully'}), 201

# Route to get sentiment analysis for a product
@app.route('/api/reviews/<product_id>', methods=['GET'])
def analyze_product_sentiment(product_id):
    conn = get_db_connection()

    # Fetch all reviews for the given product_id
    reviews = conn.execute(
        'SELECT review, rating FROM reviews WHERE product_id = ?',
        (product_id,)
    ).fetchall()
    conn.close()

    # Debugging: Check if the reviews exist for the given product ID
    if not reviews:
        return jsonify({'error': f'No reviews found for product ID {product_id}'}), 404

    stats = {'positive': 0, 'negative': 0}
    for row in reviews:
        # Analyze sentiment for each review
        sentiment = analyze_sentiment(row['review'])  # Sentiment analysis
        stats[sentiment] += 1  # Increase respective sentiment count

    total = len(reviews)
    result = {
        'positive': round((stats['positive'] / total) * 100, 1),
        'negative': round((stats['negative'] / total) * 100, 1),
    }

    return jsonify(result)

# Route to get product recommendations by skin type
@app.route('/api/recommendations/skin_type', methods=['GET'])
def get_recommendations():
    skin_type = request.args.get('skin_type')

    if not skin_type:
        return jsonify({'error': 'Skin type parameter is required'}), 400

    conn = get_db_connection()
    recommendations = conn.execute(
        'SELECT product_id, product_name FROM products WHERE skin_type = ?',
        (skin_type,)
    ).fetchall()
    conn.close()

    if not recommendations:
        return jsonify({'error': 'No recommendations found for this skin type'}), 404

    return jsonify([dict(row) for row in recommendations])

if __name__ == '__main__':
    app.run(debug=True, port=8080)
