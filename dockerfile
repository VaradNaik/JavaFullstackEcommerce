# Use the official Maven image to build the project
# Start with a JDK 21 image for building the project
FROM openjdk:21-jdk AS build

# Install Maven manually since the official Maven image doesn't have JDK 21 support yet
ENV MAVEN_VERSION 3.8.6
ENV MAVEN_HOME /usr/share/maven

# Install Maven
RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
  && curl -fsSL https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz \
  | tar -xzC /usr/share/maven --strip-components=1 \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

# Set working directory for the build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package

# Use a JDK 21 image to run the application
FROM openjdk:21-jdk

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Define the entry point for the application
ENTRYPOINT ["java", "-jar", "app.jar"]

