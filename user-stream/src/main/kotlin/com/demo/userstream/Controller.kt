package com.demo.userstream

import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.config.EnableWebFlux
import reactor.core.publisher.Flux
import reactor.core.publisher.Sinks


@EnableWebFlux
@RestController
class Controller {
    val sink = Sinks.many().multicast().onBackpressureBuffer<String>()
    val mapper = jacksonObjectMapper()
    val userStatusService = Service()
    @KafkaListener(topics = ["user-connector.users"], groupId = "group_id")
    fun consumeNewUserEvent(@Payload message: String) {
        val userNode = mapper.readTree(message)
        val userEventMessage = userNode as ObjectNode
        logger.info(userEventMessage)
        userEventMessage.remove("operation")
        val deserializedMessage = mapper.readValue(userEventMessage.toString(), UserStatusEvent::class.java)
        val constructedMessage = userStatusService.buildStatusMessage(deserializedMessage)
        this.sink.tryEmitNext(constructedMessage)
    }

    @GetMapping(path = ["/userstatus"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamFlux(): Flux<String> {
        return this.sink.asFlux()
    }

    companion object {
        private val logger = LoggerFactory.getLogger(EventConsumerConfig::class.java)
    }
}