package com.demo.userservice.api.users


import com.demo.userservice.common.controller.DefaultDelegate
import com.demo.userservice.common.model.UsersGet200Response
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class UsersDelegateImpl(
    val usersService: UsersService
): DefaultDelegate {
    override fun usersGet(): ResponseEntity<UsersGet200Response> {
        return ResponseEntity(UsersGet200Response(usersService.findUsers()), HttpStatus.OK)
    }
}