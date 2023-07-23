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
            UserDto(
                user.id.toString(),
                user.email,
                user.firstName,
                user.lastName
            )
        }
    }
}