package com.demo.userservice.api.users


import com.demo.userservice.common.model.UserDto

import com.demo.userservice.domain.users.UsersRepository
import org.springframework.stereotype.Service

@Service
class UsersService(
    private val usersRepository: UsersRepository,
) {
    fun findUsers(): List<UserDto> {
        return usersRepository.findAllUsers().map {
            user ->
            val status = when (user.status) {
                "Pending" -> UserDto.Status.PENDING
                "Active" -> UserDto.Status.ACTIVE
                "Suspended" -> UserDto.Status.SUSPENDED
                else -> UserDto.Status.PENDING
            }
            UserDto(
                user.id.toString(),
                user.email,
                status,
                user.firstName,
                user.lastName,
            )
        }
    }
}