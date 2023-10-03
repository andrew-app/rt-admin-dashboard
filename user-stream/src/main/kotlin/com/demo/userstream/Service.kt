package com.demo.userstream

class Service {
    fun buildStatusMessage(userStatusEvent: UserStatusEvent): String {
        val status = when(userStatusEvent.data.status) {
            "Pending" -> "has been set to Pending."
            "Active" -> "has been activated."
            "Suspended" -> "has been suspended."
            else -> ""
        }
        return "User ${userStatusEvent.data.first_name} ${userStatusEvent.data.last_name} $status"
    }
}