package com.cm.challenge.dto.appointmenttype;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentTypeRequest {

    @NotBlank(message = "Field name is mandatory")
    @Size(min = 1, max = 255, message = "Field name must be between 1 and 255 characters long")
    private String name;

    private String description;

    @NotNull(message = "Field duration_minutes is mandatory")
    @Min(value = 1, message = "Field duration_minutes must be greater than 0")
    @Max(value = 2147483647, message = "Field duration_minutes must be less than 2147483647")
    private Integer durationMinutes;

    @NotNull(message = "Field color_hex_code is mandatory")
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Field color_hex_code must be a valid hex color code (e.g. #FFFFFF)")
    private String colorHexCode;

}
