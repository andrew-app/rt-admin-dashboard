package com.demo.userservice

import com.demo.userservice.domain.users.UsersRepository
import com.github.javafaker.Faker
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling

@Configuration
@EnableScheduling
class UserGeneratorConfig(
    private val userRepo: UsersRepository,
) {
    private val mockUserGenerator =  Faker()
    @Bean
    fun scheduledTasks(): UserGenerator {
        return UserGenerator(userRepo, mockUserGenerator)
    }
}