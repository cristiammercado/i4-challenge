package com.cm.challenge.repository;

import com.cm.challenge.model.AppointmentType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AppointmentTypeRepository extends R2dbcRepository<AppointmentType, Integer> {

    Flux<AppointmentType> findBy(Pageable pageable);

}
