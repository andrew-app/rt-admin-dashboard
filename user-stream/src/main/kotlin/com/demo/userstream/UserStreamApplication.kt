package com.demo.userstream

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class UserStreamApplication

fun main(args: Array<String>) {
	runApplication<UserStreamApplication>(*args)
}
