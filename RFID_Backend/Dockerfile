FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ./target/RFID_PROJECT-0.0.1-SNAPSHOT.jar tag.jar
ENTRYPOINT ["java","-jar","/tag.jar"]