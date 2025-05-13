# Cosmetics Microservices Platform

This is a microservices-based cosmetics e-commerce platform developed using **Spring Boot**, **Node.js**, **Python Flask**, and **React**. It includes features like product management, customer handling, user authentication, feedback system, and product recommendations, all connected through Eureka service registry.

---

## Services Overview

| Service                  | Technology     | Description                                       |
|--------------------------|----------------|---------------------------------------------------|
| **Product Service**      | Spring Boot    | Manages product data (WAR deployed)              |
| **Customer Service**     | Node.js        | Handles customer details                         |
| **Login Service**        | Python Flask   | User login & authentication                      |
| **Feedback Service**     | Python Flask   | Manages product reviews and ratings              |
| **Recommendation Engine**| Python Flask   | Suggests related products                        |
| **Frontend**             | React.js       | UI for the application                           |
| **Eureka Server**        | Spring Boot    | Service discovery (port `7070`)                  |

---


###  Requirements

- Java 17+
- Maven
- Node.js + npm
- Python 3.10+
- `pip install -r requirements.txt` for each Python service
- Eureka Server (Spring Boot)
- MongoDB (for feedback if used)
- Kafka 
- Docker (optional for containerization)

---

## How to Run the Project

To start **all services together**, simply run:

```bash
run-all.bat
