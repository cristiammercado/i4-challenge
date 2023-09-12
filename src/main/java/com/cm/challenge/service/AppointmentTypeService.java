package com.cm.challenge.service;

import com.cm.challenge.infrastructure.exceptions.CreateConflictException;
import com.cm.challenge.infrastructure.exceptions.DatabaseException;
import com.cm.challenge.infrastructure.exceptions.NotFoundException;
import com.cm.challenge.model.AppointmentType;
import com.cm.challenge.repository.AppointmentTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AppointmentTypeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppointmentTypeService.class);

    private final AppointmentTypeRepository repository;

    public AppointmentTypeService(AppointmentTypeRepository repository) {
        this.repository = repository;
    }

    public Mono<Page<AppointmentType>> listByPage(PageRequest pageRequest) {
        return this.repository.findBy(pageRequest.withSort(Sort.by("last_modified_at").descending()))
            .collectList()
            .zipWith(this.repository.count())
            .map(t -> new PageImpl<>(t.getT1(), pageRequest, t.getT2()));
    }

    public Flux<AppointmentType> listAll() {
        return this.repository.findAll();
    }

    public Mono<AppointmentType> read(int id) {
        return this.repository.findById(id)
            .switchIfEmpty(Mono.error(new NotFoundException("Not found appointment type with id %d".formatted(id))));
    }

    public Mono<AppointmentType> create(AppointmentType appointmentType) {
        return this.repository.save(appointmentType)
            .onErrorResume(e -> {
                LOGGER.error("Error creating appointment type", e);

                if (e instanceof DuplicateKeyException) {
                    return Mono.error(new CreateConflictException("Name has already been used"));
                }

                return Mono.error(new DatabaseException());
            });
    }

    public Mono<AppointmentType> update(int id, AppointmentType appointmentType) {
        return this.repository.findById(id)
            .map(at -> AppointmentType.builder()
                .id(at.getId())
                .name(appointmentType.getName())
                .description(appointmentType.getDescription())
                .durationMinutes(appointmentType.getDurationMinutes())
                .colorHexCode(appointmentType.getColorHexCode())
                .createdAt(at.getCreatedAt())
                .build())
            .flatMap(this.repository::save)
            .onErrorResume(e -> {
                LOGGER.error("Error updating appointment type", e);

                if (e instanceof DuplicateKeyException) {
                    return Mono.error(new CreateConflictException("Name has already been used"));
                }

                return Mono.error(new DatabaseException());
            });
    }

    public Mono<Void> delete(int id) {
        return this.repository.deleteById(id)
            .onErrorResume(e -> {
                LOGGER.error("Error deleting appointment type", e);
                return Mono.error(new DatabaseException());
            });
    }
}
