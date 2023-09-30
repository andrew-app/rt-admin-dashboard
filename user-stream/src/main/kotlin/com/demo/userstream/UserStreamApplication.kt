package com.demo.userstream

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer

@SpringBootApplication
class UserStreamApplication

fun main(args: Array<String>) {
	runApplication<UserStreamApplication>(*args)
}

@Configuration
@EnableWebFlux
class WebfluxConfig : WebFluxConfigurer {
	override fun addCorsMappings(registry: CorsRegistry) {
		registry.addMapping("/**")
	}
}
