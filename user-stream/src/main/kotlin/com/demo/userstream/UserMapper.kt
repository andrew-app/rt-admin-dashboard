package com.demo.userstream

import java.util.UUID

data class UserMapper(
    val data: UserDetails,
)

data class UserDetails(
    val id: UUID,
    val email: String,
    val firstName: String,
    val lastName: String,
)