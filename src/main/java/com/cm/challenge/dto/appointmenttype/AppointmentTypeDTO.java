package com.cm.challenge.dto.appointmenttype;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentTypeDTO {
    private Long id;
    private String name;
    private String description;
    private Long durationMinutes;
    private String colorHexCode;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
