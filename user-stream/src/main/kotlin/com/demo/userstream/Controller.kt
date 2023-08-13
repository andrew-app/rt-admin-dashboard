package com.demo.userstream

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.config.EnableWebFlux
import reactor.core.publisher.Flux
import java.time.Duration

@EnableWebFlux
@RestController
class Controller {
    @GetMapping(path = ["/newUsers"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamFlux(): Flux<String?>? {
        return Flux.interval(Duration.ofSeconds(10))
            .map<String> {
                "event"
            }
    }
}