import org.jetbrains.kotlin.gradle.tasks.KotlinCompile


plugins {
    id("org.springframework.boot") version "3.0.4"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
    kotlin("plugin.jpa") version "1.8.22"
    id("org.openapi.generator") version "6.6.0"
}

group = "com.demo"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

openApiGenerate {
    generatorName.set("kotlin-spring")
    inputSpec.set("$rootDir/src/main/resources/static/users.spec.yaml")
    outputDir.set("$buildDir/generated/")
    apiPackage.set("com.demo.userservice.common.controller")
    modelPackage.set("com.demo.userservice.common.model")
    groupId.set("com.demo")
    configOptions.set(mapOf("useSpringBoot3" to "true",
        "delegatePattern" to "true",
        "apiSuffix" to "",
        "useTags" to "true",
        "exceptionHandler" to "false",
        "enumPropertyNaming" to "UPPERCASE",
        "swaggerAnnotations" to "false",
        "documentationProvider" to "source",
        "serializationLibrary" to "jackson"
    )
    )
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.15.2")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.postgresql:postgresql:42.5.1")
    implementation("com.github.javafaker:javafaker:1.0.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0")
    implementation("org.hibernate.validator:hibernate-validator:7.0.1.Final")
    implementation("io.debezium:debezium-api:2.3.0.Final")
    implementation("io.debezium:debezium-embedded:2.3.0.Final")
    implementation("io.debezium:debezium-connector-postgres:2.3.0.Final")
    implementation("org.springframework.kafka:spring-kafka:3.0.9")
}

configure<SourceSetContainer> {
    named("main") {
        java.srcDir("$buildDir/generated/src/main/")
        java.exclude("**/Application.kt")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

springBoot {
    mainClass.set("com.demo.userservice.UserServiceApplicationKt")
}