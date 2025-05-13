@echo off
echo  Starting all services...

REM === Start Zookeeper ===
start cmd /k "cd /d C:\kafka_2.12-3.9.0 && bin\windows\zookeeper-server-start.bat config\zookeeper.properties"

REM === Start Kafka Broker ===
start cmd /k "cd /d C:\kafka_2.12-3.9.0 && bin\windows\kafka-server-start.bat config\server.properties"

REM === Start Spring Boot Product Service ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\product-service && mvn spring-boot:run"

REM === Start Eureka Server ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\eureka-server && mvn spring-boot:run"

REM === Mongo DB Connection ===
start cmd /k "cd /d C:\Softwares\mongodb-win32-x86_64-windows-5.0.28\bin && mongod --dbpath C:\mongodbdata"

REM === Start Node Customer Service ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\Customer_Service && node server.js"

REM === Start Node Service Registry ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\service-registry && node server.js"

REM === Start Python Feedback Service ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\Feedback-service && py app.py"

REM === Start Python Login Server ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\Login-server && py app.py"

REM === Start Python Recommendation Service ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\Recommendation_Service && py app.py"

REM === Start React Frontend ===
start cmd /k "cd /d C:\Users\ssnekha001\Desktop\Capstone\cosmetics && npm start"

echo  All services launched!
pause