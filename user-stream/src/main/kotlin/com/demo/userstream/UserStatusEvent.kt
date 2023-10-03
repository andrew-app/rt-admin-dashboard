package com.demo.userstream

data class UserStatusEvent(val data: UserStatusData)

data class UserStatusData (
    val id: String,
    val email: String,
    val first_name: String,
    val last_name: String,
    val status: String
)