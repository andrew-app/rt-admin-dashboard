package com.demo.userservice

import com.demo.userservice.domain.users.Users
import com.demo.userservice.domain.users.UsersRepository
import com.github.javafaker.Faker
import org.slf4j.LoggerFactory
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
        if (usersRepository.userSize() >= 40 ) {
            usersRepository.deleteAllUsers()
        }
        usersRepository.saveUser(
            Users(
                UUID.randomUUID(),
                "${firstName.lowercase(Locale.getDefault())}.${lastName.lowercase(Locale.getDefault())}@email.com",
                "Pending",
                firstName,
                lastName
            )
        )
    }

    @Scheduled(fixedRate = 12000)
    fun updateUserStatus() {
        if(usersRepository.userSize() > 0) {
            val currentUsers = usersRepository.findAllUsers()
            val randomUser = currentUsers.random()

            val newStatus = when (randomUser.status) {
                "Pending" -> "Active"

                "Active" -> "Suspended"

                "Suspended" -> "Active"

                else -> "Pending"
            }
            usersRepository.updateUserStatus(randomUser.id, newStatus)
            logger.info("User ${randomUser.id} status updated to $newStatus")
        }
    }
    companion object {
        private val logger = LoggerFactory.getLogger(UserGenerator::class.java)
    }
}
