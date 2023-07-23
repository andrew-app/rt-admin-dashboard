package com.demo.userservice

import com.demo.userservice.domain.users.Users
import com.demo.userservice.domain.users.UsersRepository
import com.github.javafaker.Faker
import org.springframework.scheduling.annotation.Scheduled
import java.util.*


class UserGenerator(
    private val usersRepository: UsersRepository,
    private val mockUserGenerator: Faker,
) {
    @Scheduled(fixedRate = 10000)
    fun addUser() {
        val firstName = mockUserGenerator.name().firstName()
        val lastName = mockUserGenerator.name().lastName()
        usersRepository.saveUser(
            Users(
                UUID.randomUUID(),
            "${firstName.lowercase(Locale.getDefault())}.${lastName.lowercase(Locale.getDefault())}@email.com",
                firstName,
                lastName
            )
        )
    }
}
