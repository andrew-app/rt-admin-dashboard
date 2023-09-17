package com.demo.userservice.domain.users

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface IUsersRepository : JpaRepository<Users, UUID> {
    override fun findAll(): List<Users>
}

@Component
class UsersRepository(
    private val usersRepository: IUsersRepository
) {
    fun findAllUsers():List<Users> {
        return usersRepository.findAll()
    }

    fun saveUser(user: Users) {
        usersRepository.save(Users(user.id, user.email, user.status, user.firstName, user.lastName))
    }

    fun userSize(): Int {
        return usersRepository.findAll().size
    }

    fun deleteAllUsers() {
        usersRepository.deleteAll()
    }

    fun findUserById(id: UUID): Users {
        return usersRepository.findById(id).get()
    }

    fun updateUserStatus(id: UUID, status: String) {
        val user = findUserById(id)

        usersRepository.save(Users(user.id, user.email, status, user.firstName, user.lastName))
    }


}