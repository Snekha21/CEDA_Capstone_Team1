import streamlit as st
import pandas as pd
import sqlite3
from textblob import TextBlob

from app import app
from extensions import db
with app.app_context():
   db.create_all()

# Connect to SQLite database
conn = sqlite3.connect('instance/feedback.db')
df = pd.read_sql_query("SELECT * FROM feedback", conn)
# Title
st.title("Beauty Feedback Dashboard")
# Sidebar filters
st.sidebar.header("Filter Feedback")
skin_type_filter = st.sidebar.selectbox("Choose Skin Type", df["skin_type"].dropna().unique())
filtered_df = df[df["skin_type"]== skin_type_filter]
# Summary Stats
st.subheader("Summary Stats")
st.metric("Total Feedbacks", len(filtered_df))
st.metric("Average Rating", round(filtered_df["rating"].mean(), 2))
# Ratings Chart
st.subheader("Rating Distribution")
st.bar_chart(filtered_df["rating"].value_counts().sort_index())
# Sentiment Analysis
def get_sentiment(text):
   return TextBlob(text).sentiment.polarity
filtered_df["sentiment"] = filtered_df["review_text"].apply(get_sentiment)
st.subheader("Sentiment Polarity")
st.line_chart(filtered_df["sentiment"])
# Table
st.subheader("All Reviews")
st.dataframe(filtered_df[["user_id", "product_id", "rating", "review_text"]])
conn.close()