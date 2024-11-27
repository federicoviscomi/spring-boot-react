# Stage 1: Build the application
FROM maven:3.9.5-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime image
# Start with the Alpine base image
FROM alpine:latest

# Set environment variables
ENV LANG=C.UTF-8 \
    JAVA_HOME=/usr/lib/jvm/default-jvm

# Install Java and cURL
RUN apk add --no-cache \
    openjdk17 \
    curl \
    && java -version \
    && curl --version

WORKDIR /app
COPY --from=builder /app/target/notes-0.0.2-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
