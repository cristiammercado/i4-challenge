package com.cm.challenge.infrastructure.exceptions;

import com.cm.challenge.model.enums.ErrorCodeEnum;

public class CreateConflictException extends BusinessException {

    public CreateConflictException(String message) {
        super(message, ErrorCodeEnum.CREATE_RESOURCE_CONFLICT);
    }

}
