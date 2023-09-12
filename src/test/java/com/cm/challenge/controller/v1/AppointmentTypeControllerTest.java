package com.cm.challenge.controller.v1;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AppointmentTypeControllerTest {

    private static WebTestClient client;

    @LocalServerPort
    int port;

    @Autowired
    public void setApplicationContext(ApplicationContext context) {
        client = WebTestClient
            .bindToApplicationContext(context)
            .configureClient()
            .baseUrl("http://localhost:%d".formatted(port))
            .build();
    }

    @Test
    @Order(1)
    void createSuccess() {
        ObjectNode item = JsonNodeFactory.instance.objectNode();
        item.put("name", "Cita de revisión odontológica primera vez");
        item.put("description", "");
        item.put("duration_minutes", 30);
        item.put("color_hex_code", "#000000");

        client.post()
            .uri("/v1/appointment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .body(Mono.just(item), ObjectNode.class)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id").isEqualTo(1)
            .jsonPath("$.name").isEqualTo("Cita de revisión odontológica primera vez")
            .jsonPath("$.description").isEmpty()
            .jsonPath("$.duration_minutes").isEqualTo(30)
            .jsonPath("$.color_hex_code").isEqualTo("#000000")
            .jsonPath("$.created_at").isNotEmpty()
            .jsonPath("$.last_modified_at").isNotEmpty();
    }

    @Test
    @Order(2)
    void createError() {
        ObjectNode item = JsonNodeFactory.instance.objectNode();
        item.put("duration_minutes", 30);
        item.put("color_hex_code", "#000000");

        client.post()
            .uri("/v1/appointment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .body(Mono.just(item), ObjectNode.class)
            .exchange()
            .expectStatus().isBadRequest()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.success").isEqualTo(false)
            .jsonPath("$.errors[0]").isEqualTo("Field name is mandatory");
    }

    @Test
    @Order(3)
    void listByPage() {
        client.get()
            .uri("/v1/appointment-types?page=0&size=10")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.content").isNotEmpty();
    }

    @Test
    @Order(4)
    void listAll() {
        client.get()
            .uri("/v1/appointment-types/all")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$").isNotEmpty();
    }

    @Test
    @Order(5)
    void getById() {
        client.get()
            .uri("/v1/appointment-types/1")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id").isEqualTo(1)
            .jsonPath("$.name").isEqualTo("Cita de revisión odontológica primera vez")
            .jsonPath("$.description").isEmpty()
            .jsonPath("$.duration_minutes").isEqualTo(30)
            .jsonPath("$.color_hex_code").isEqualTo("#000000")
            .jsonPath("$.created_at").isNotEmpty()
            .jsonPath("$.last_modified_at").isNotEmpty();
    }

    @Test
    @Order(6)
    void getByIdError() {
        client.get()
            .uri("/v1/appointment-types/99")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().isNotFound();
    }

    @Test
    @Order(7)
    void update() {
        ObjectNode item = JsonNodeFactory.instance.objectNode();
        item.put("name", "Cita de revisión odontológica (editada)");
        item.put("description", "Una descripción actualizada");
        item.put("duration_minutes", 60);
        item.put("color_hex_code", "#FF0000");

        client.put()
            .uri("/v1/appointment-types/1")
            .contentType(MediaType.APPLICATION_JSON)
            .body(Mono.just(item), ObjectNode.class)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id").isEqualTo(1)
            .jsonPath("$.name").isEqualTo("Cita de revisión odontológica (editada)")
            .jsonPath("$.description").isEqualTo("Una descripción actualizada")
            .jsonPath("$.duration_minutes").isEqualTo(60)
            .jsonPath("$.color_hex_code").isEqualTo("#FF0000")
            .jsonPath("$.created_at").isNotEmpty()
            .jsonPath("$.last_modified_at").isNotEmpty();
    }

    @Test
    @Order(8)
    void delete() {
        client.delete()
            .uri("/v1/appointment-types/1")
            .exchange()
            .expectStatus().isOk();
    }


}
