package com.demo.userstream

import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import java.util.function.Consumer


@Service
class UserEventService {
    private lateinit var sink: FluxSink<String>
    val mapper = jacksonObjectMapper()
    @KafkaListener(topics = ["user-connector.users"], groupId = "user_stream")
    fun consumeNewUserEvent(@Payload message: String) {
        val userNode = mapper.readTree(message)
        val userEventMessage = userNode as ObjectNode
        logger.info(userEventMessage.toString())
        userEventMessage.remove("operation")
        val deserializedMessage = mapper.readValue(userEventMessage.toString(), UserStatusEvent::class.java)
        val constructedMessage = buildStatusMessage(deserializedMessage)
        sink.next(constructedMessage)
    }

    fun subscribe(callback: Consumer<String>) {
        Flux.create { sink = it }.subscribe(callback)
    }
    private fun buildStatusMessage(userStatusEvent: UserStatusEvent): String {
        val status = when(userStatusEvent.data.status) {
            "Pending" -> "has been set to Pending."
            "Active" -> "has been activated."
            "Suspended" -> "has been suspended."
            else -> ""
        }
        return "User ${userStatusEvent.data.first_name} ${userStatusEvent.data.last_name} $status"
    }

    companion object {
        private val logger = LoggerFactory.getLogger(UserEventService::class.java)
    }
}