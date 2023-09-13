package com.cm.challenge.controller.v1;

import com.cm.challenge.dto.appointmenttype.AppointmentTypeDTO;
import com.cm.challenge.dto.appointmenttype.AppointmentTypeMapper;
import com.cm.challenge.dto.appointmenttype.AppointmentTypeRequest;
import com.cm.challenge.service.AppointmentTypeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin
@RequestMapping("/v1/appointment-types")
public class AppointmentTypeController {

    private final AppointmentTypeMapper mapper;
    private final AppointmentTypeService service;

    public AppointmentTypeController(AppointmentTypeMapper mapper, AppointmentTypeService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @GetMapping
    public Mono<Page<AppointmentTypeDTO>> index(@RequestParam("page") int page, @RequestParam("size") int size) {
        return this.service.listByPage(PageRequest.of(page, size))
            .map(at -> at.map(this.mapper::toDto));
    }

    @GetMapping("/all")
    public Flux<AppointmentTypeDTO> all() {
        return this.service.listAll()
            .map(this.mapper::toDto);
    }

    @GetMapping("{id}")
    public Mono<AppointmentTypeDTO> getById(@PathVariable int id) {
        return this.service.read(id)
            .map(this.mapper::toDto);
    }

    @PostMapping
    public Mono<AppointmentTypeDTO> post(@Valid @RequestBody AppointmentTypeRequest appointmentTypeRequest) {
        return this.service.create(this.mapper.toModel(appointmentTypeRequest))
            .map(this.mapper::toDto);
    }

    @PutMapping("{id}")
    public Mono<AppointmentTypeDTO> put(@PathVariable int id, @Valid @RequestBody AppointmentTypeRequest appointmentTypeRequest) {
        return this.service.update(id, this.mapper.toModel(appointmentTypeRequest))
            .map(this.mapper::toDto);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable int id) {
        return this.service.delete(id);
    }
}
