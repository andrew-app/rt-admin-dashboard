FROM amazoncorretto:17.0.8-al2023-headless
COPY . /app
WORKDIR /app
RUN dnf install findutils -y
ARG API_URL
ARG KAFKA_URL
RUN ./gradlew openApiGenerate
RUN ./gradlew assemble
CMD ["./gradlew", ":bootRun"]
EXPOSE 8080
