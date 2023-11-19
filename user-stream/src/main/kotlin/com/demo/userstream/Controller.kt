package com.demo.userstream

import org.springframework.http.MediaType
import org.springframework.http.codec.ServerSentEvent
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux


@RestController
class Controller (val userEventService: UserEventService) {
    @GetMapping(path = ["/userstatus"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun getUserStatus(): Flux<ServerSentEvent<String>> {
        return Flux.create { sink ->
            userEventService.subscribe { event ->
                sink.next(ServerSentEvent.builder(event).build())
            }
        }
    }
}