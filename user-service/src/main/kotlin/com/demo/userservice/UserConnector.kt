package com.demo.userservice

import io.debezium.config.Configuration
import io.debezium.embedded.EmbeddedEngine
import org.springframework.context.annotation.Bean


@org.springframework.context.annotation.Configuration
class UserConnector {
    @Bean
    fun connectUsers(): Configuration {
        return Configuration.create()
            .with("name", "user-connector")
            .with("connector.class", "io.debezium.connector.postgresql.PostgresConnector")
            .with("offset.storage", "org.apache.kafka.connect.storage.FileOffsetBackingStore")
            .with("offset.storage.file.filename", "/tmp/offsets.dat")
            .with("offset.flush.interval.ms", "60000")
            .with("database.hostname", "localhost")
            .with("database.port", "5432")
            .with("database.user", "postgres")
            .with("database.password", "password")
            .with("database.dbname", "postgres")
            .with("topic.prefix", "user-connector")
            .with("database.server.name", "localhost-postgres")
            .with("plugin.name", "pgoutput")
            .build()
    }
}