import React, { useEffect, useState } from "react";

import axios from "axios";

import { Bar, Pie } from "react-chartjs-2";

import 'chart.js/auto';

import '../styles/FeedbackForm.css'
import { useNavigate } from "react-router-dom";



const Dashboard = () => {

  const [eda, setEda] = useState({});

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 
  useEffect(() => {

    axios.get("http://localhost:5000/feedback/eda", {}).then(res => {

      setEda(res.data);

      setLoading(false);

    }).catch(error =>{console.log('API Error '+error );
     navigate('/maintain');
    });
    ;}
   

  , []);

  if (loading) return <p>Loading dashboard...</p>;

  const barData = {

    labels: Object.keys(eda.average_by_skin_type || {}),

    datasets: [{

      label: 'Average Rating',

      data: Object.values(eda.average_by_skin_type || {}),

      backgroundColor: 'rgba(255, 99, 132, 0.6)'

    }]

  };

  const pieData = {

    labels: Object.keys(eda.top_customers || {}),

    datasets: [{

      label: 'Top Customers',

      data: Object.values(eda.top_customers || {}),

      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#a4de02', '#fcba03']

    }]

  };

  const keywordBarData = {

    labels: Object.keys(eda.keyword_counts || {}).slice(0, 5),

    datasets: [{

      label: 'Keyword Frequency',

      data: Object.values(eda.keyword_counts || {}).slice(0, 5),

      backgroundColor: 'rgba(153, 102, 255, 0.6)'

    }]

  };

  const downloadCSV = async () => {

    const res ={};
    
    try{  
      const res = await fetch("http://localhost:5000/feedback/download", ).catch(error =>{console.log('API Error '+error );
        navigate('/maintain');
       });
   
      
    
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "feedback_data.csv";

    link.click();
  }
  catch(error){
    console.log(error);
    navigate('/maintain'); 
    }

  };

  return (
    
<div className="container mt-4">
<header className="app-header">
<h1>Cosmetics E-Commerce Feedback</h1>
</header>
<nav className="navbar navbar-expand-lg shadow-sm app-navbar">
<div className="container">
{/* <a className="navbar-brand text-pink fw-bold" href="/">Cosmetics Feedback</a>
<div className="ml-auto">
<a className="btn btn-pink me-2" href="/feedback">Submit Feedback</a> */}
{/* <a className="btn btn-outline-pink" href="/dashboard">Dashboard</a> */}
{/* </div> */}
</div>
</nav>
<h2>Feedback Analytics</h2>
<p><strong>Total Feedbacks:</strong> {eda.rows}</p>
<p><strong>Columns:</strong> {eda.columns}</p>
<p><strong>Average Rating:</strong> {eda.average_rating}</p>
<div className="row">
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm">
<h4>Average Rating by Skin Type</h4>
<Bar data={barData} />
</div>
</div>
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm">
<h4>Top Customers</h4>
<Pie data={pieData} />
</div>
</div>
</div>
<div className="col-md-12  mb-4">
<div className="card p-3 shadow-sm">
<h4>Top Keywords in Feedback</h4>
<Bar data={keywordBarData} />
</div>
</div>
<div className="card p-3 mt-4">
<button className="btn btn-primary" onClick={downloadCSV}>
   Download Feedback CSV
</button>
</div>
</div>

  );

};

export default Dashboard;
 