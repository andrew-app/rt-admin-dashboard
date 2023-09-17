package com.demo.userservice.domain.users

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID


@Entity
@Table(name = "users")
class Users (
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue
    val id: UUID = UUID.randomUUID(),
    @Column(name = "email", nullable = false)
    val email: String,
    @Column(name = "status", nullable = false)
    var status: String = "Pending",
    @Column(name = "first_name", nullable = true)
    val firstName: String?,
    @Column(name = "last_name", nullable = true)
    val lastName: String?
)