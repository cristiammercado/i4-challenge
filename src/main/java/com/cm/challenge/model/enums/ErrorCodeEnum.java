package com.cm.challenge.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCodeEnum {

    GENERIC_ERROR(HttpStatus.INTERNAL_SERVER_ERROR),

    DATABASE_ERROR(HttpStatus.FAILED_DEPENDENCY),

    CREATE_RESOURCE_CONFLICT(HttpStatus.CONFLICT),

    NOT_FOUND_ERROR(HttpStatus.NOT_FOUND);

    private final HttpStatus status;

}
