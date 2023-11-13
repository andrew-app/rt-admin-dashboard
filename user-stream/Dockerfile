FROM amazoncorretto:17.0.8-al2023-headless
COPY . /app
WORKDIR /app
ARG KAFKA_URL
RUN dnf install findutils -y
RUN ./gradlew assemble
CMD ["./gradlew", ":bootRun"]
EXPOSE 8082
