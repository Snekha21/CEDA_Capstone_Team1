// src/api.js
const API_BASE = 'http://localhost:8080';
// Fetch sentiment stats (already implemented)
export async function getSentimentStats(productId) {
  const res = await fetch(`${API_BASE}/api/reviews/${productId}`);
  const data = await res.json();
  
  const sentiment = data.sentiment;
  const reviews = data.reviews;

  let posi = data.positive;
  let nega = data.negative;
  let total = 1;

  console.log(data);
 
  return {
    positive: posi,
    negative: nega, 
  };
}

// Add the missing getRecommendations function
export async function getRecommendations(skinType) {
  const res = await fetch(`${API_BASE}/api/recommendations/skin_type?skin_type=${skinType}`).catch(error =>{console.log('API Error '+error );
    window.location.href = '/maintain';
   });
  const data = await res.json();
  return data;
}

// Add submitReview function (POST a review)
export async function submitReview(token, data) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).catch(error =>{console.log('API Error '+error );
   window.location.href = '/maintain';
   });
  return res.json();
}
