# Use the official Maven image to build the project
FROM maven:3.8.1-jdk-11 as build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Use the official OpenJDK image to run the application
FROM openjdk:11-jre-slim
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
