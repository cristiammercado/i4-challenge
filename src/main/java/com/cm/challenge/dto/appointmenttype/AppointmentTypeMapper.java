package com.cm.challenge.dto.appointmenttype;

import com.cm.challenge.model.AppointmentType;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public abstract class AppointmentTypeMapper {
    public abstract AppointmentType toModel(AppointmentTypeRequest appointmentTypeRequest);
    public abstract AppointmentTypeDTO toDto(AppointmentType appointmentType);
}
