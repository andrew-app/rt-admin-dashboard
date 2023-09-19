package com.demo.userservice

import io.debezium.data.Envelope.FieldName.*
import io.debezium.embedded.EmbeddedEngine
import jakarta.annotation.PostConstruct
import jakarta.annotation.PreDestroy
import org.apache.kafka.connect.data.Struct
import org.apache.kafka.connect.source.SourceRecord
import org.slf4j.LoggerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.Executors

@Component
final class CDCListener(
    userConnector: UserConnector,
    private val template: KafkaTemplate<String, String>
) {

    private val executor = Executors.newSingleThreadExecutor()

    private val embeddedEngine: EmbeddedEngine? = EmbeddedEngine.create()
        .using(userConnector.connectUsers())
        .notifying(this::handleStatusUpdateEvent)
        .build()


    @PostConstruct
    fun init() {
        embeddedEngine?.let {
            this.executor.execute(it)
        }
    }

    @PreDestroy
    fun destroy() {
        this.embeddedEngine?.stop()
    }

    private fun handleStatusUpdateEvent(sourceRecord: SourceRecord) {
        val sourceRecordValue = sourceRecord.value() as Struct?

        sourceRecordValue?.let { value ->
            val operation = value.get(OPERATION) as String

            if (operation == "u") {

                val record = AFTER

                val struct = sourceRecordValue.get(record) as Struct

                val dataMap = struct.schema().fields()
                    .map { it.name() }
                    .filter { struct.get(it) != null }
                    .associateWith { struct.get(it) }

                val cdcMessage = objectMapper.writeValueAsString(CDCMessage(operation, dataMap))
                template.send("user-connector.users", UUID.randomUUID().toString(), cdcMessage)


                logger.info("CDC captured, $operation operation with data: $dataMap was published to user-connect.users topic.")
            }
        }
    }
    companion object {
        private val logger = LoggerFactory.getLogger(CDCListener::class.java)
    }
}

data class CDCMessage(val operation: String, val data:  Map<String, Any>)