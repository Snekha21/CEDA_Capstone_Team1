from textblob import TextBlob

def analyze_sentiment(text):
    # Analyze the sentiment of the provided text (review)
    blob = TextBlob(text)
    return "positive" if blob.sentiment.polarity > 0 else "negative"

    # Classify as positive, neutral, or negative based on polarity
    if polarity > 0:
        return "positive"
    elif polarity < 0:
        return "negative"
    else:
        return "neutral"  # For neutral sentiment

def extract_keywords(feedback_list):
    keywords = ['hydrating', 'non-comedogenic', 'long-lasting', 'paraben-free', 'lightweight']
    return [kw for kw in keywords if any(kw in review.lower() for review in feedback_list)]

def get_top_rated_products_by_skin_type(feedbacks, skin_type_keywords):
    product_scores = {}
    for feedback in feedbacks:
        review = feedback.review.lower()
        for skin_type in skin_type_keywords:
            if skin_type in review:
                product_scores.setdefault(feedback.product_id, []).append(feedback.rating)

    avg_scores = {
        pid: sum(scores) / len(scores)
        for pid, scores in product_scores.items() if scores
    }

    return sorted(avg_scores.items(), key=lambda x: x[1], reverse=True)


