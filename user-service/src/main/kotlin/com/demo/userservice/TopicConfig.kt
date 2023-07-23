package com.demo.userservice

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.config.TopicBuilder

@Configuration
@EnableKafka
class TopicConfig {

    @Bean
    fun cdcTopic(): NewTopic {
        return TopicBuilder.name("user-connector.users")
            .partitions(1)
            .compact()
            .build()
    }
}