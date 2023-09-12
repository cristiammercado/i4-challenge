package com.cm.challenge.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table("appointment_types")
public class AppointmentType {

    @Id
    private Long id;

    private String name;

    @Builder.Default
    private String description = "";

    @Column("duration_minutes")
    private Long durationMinutes;

    @Column("color_hex_code")
    private String colorHexCode;

    @Column("created_at")
    @CreatedDate
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("last_modified_at")
    @LastModifiedDate
    @Builder.Default
    private LocalDateTime lastModifiedAt = LocalDateTime.now();

}
