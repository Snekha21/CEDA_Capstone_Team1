
# Cosmetics Ecommerce Platform

An end-to-end microservices-based ecommerce platform for cosmetics, featuring a React frontend and multiple backend services using Spring Boot, Node.js, and Python. It supports product browsing, ordering, feedback, user authentication, and intelligent product recommendations.

---

## 🧾 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Microservices](#microservices)
- [Service Communication](#service-communication)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Dockerization](#dockerization)
- [Error Handling](#error-handling)
- [Running the Project](#running-the-project)

---

## Overview

This project is built with a microservices architecture where:
- Each service runs independently.
- Services communicate via REST and Kafka.
- Eureka and a custom Service Registry manage discovery.
- React frontend handles UI for customers and admins.

---

## Architecture

<img width="986" alt="architecture" src="https://github.com/user-attachments/assets/99027f5a-6d20-41c1-a9cb-1ef2a2a5a230" />

---

## 📁 File Structure
Capstone/

├── cosmetics/                      # React Frontend

│   ├── src/

│   └── public/

│

├── product-service/              # Spring Boot + H2 DB

│

├── Customer_Service/             # Node.js + MongoDB

│

├── Feedback-service/             # Python Flask + SQL

│

├── Recommendation_service/       # Python Flask + SQL

│

├── Login-server/                # Python Flask + SQL

│

├── eureka-server/                # Spring Boot Eureka Registry

│

├── service-registry/             # Node.js Custom Registry

├── docker-compose.yml

├──run-all.bat                    # Batch file to run everything

├── README.md


---

## 🛠️ Technologies Used

| Component        | Tech Stack            |
|------------------|------------------------|
| Frontend         | React.js               |
| Product Service  | Spring Boot, H2 DB     |
| Customer Service | Node.js, MongoDB       |
| Feedback Service | Python Flask, SQL      |
| Login Service    | Python Flask, SQL      |
| Recommendation   | Python Flask, SQL      |
| Eureka Server    | Spring Boot            |
| Service Registry | Node.js                |
| Messaging        | Apache Kafka           |
| Documentation    | Swagger UI             |
| Containerization | Docker, Docker Compose |

---

## 🧩 Microservices

### 1. **Product Service (Spring Boot)**
- DB: H2
- Manages product catalog.
- Kafka **producer** on product add/update.

### 2. **Customer Service (Node.js)**
- DB: MongoDB
- Handles customer data, orders, and profile.
- Kafka **consumer** to update with new product info.

### 3. **Feedback Service (Python Flask)**
- DB: SQL (SQLite/PostgreSQL)
- Stores and displays product reviews.
- Kafka **consumer** to sync product info.

### 4. **Login Service (Python Flask)**
- DB: SQL
- Auth for customers and admins.
- Exposes `/api/customer_login`, `/api/admin_login`, etc.

### 5. **Recommendation Service (Python Flask)**
- DB: SQL
- Recommends products based on skin type or feedback.

### 6. **Eureka Server (Spring Boot on port 7070)**
- Auto-discovers and registers services.

### 7. **Service Registry (Node.js on port 3001)**
- Manual registration and discovery of services.
  - `/register`, `/deregister`, `/discover`, `/services`

---

## 🔁 Service InterCommunication

### 1. **Feedback Mapping**
- Product details page fetches reviews from Feedback Service using product ID from Product Service.

### 2. **Order Placement**
- Orders sent to Customer Service with product info from Product Service.

### 3. **Kafka Messaging**
- **Producer:** Product Service
- **Consumers:** Feedback Service, Customer Service
- New product JSON broadcasted on add/update.

---

## 📄 API Documentation (Swagger)

All services include Swagger documentation. Access via:
- `/swagger-ui.html` or `/docs` (based on setup)

---

## 🐳 Dockerization

- Each service includes a `Dockerfile` in the respective folder.
- `docker-compose.yml` orchestrates the setup.

### Running via Docker
```bash
docker-compose up --build
❌ Error Handling
Frontend:

Axios try-catch blocks.

Error boundaries for routing.

/maintain for downtime.

/error for unregistered routes.

Backend:

Centralized exception handling.

Logging to files in all services.

▶️ Running the Project


Using batch file (Windows)
Make sure Docker, Kafka and necessary DBs are installed. Modify the path of folders in the run-all.bat file before running.

Run the .bat file:

run_project.bat


Manually
Navigate into each service folder and run it individually as per language.
