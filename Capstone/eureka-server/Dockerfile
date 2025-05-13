# ---------- Stage 1 ----------
    FROM maven:3-eclipse-temurin AS builder
    WORKDIR /app
    COPY . .
    RUN mvn clean package -DskipTests
    
    # ---------- Stage 2 ----------
    FROM eclipse-temurin:17-jdk
    WORKDIR /app
    COPY --from=builder /app/target/eureka-server-0.0.1-SNAPSHOT.jar app.jar
    EXPOSE 8080
    ENTRYPOINT ["java", "-jar", "app.jar"]
    