package com.cm.challenge.infrastructure.exceptions;

import com.cm.challenge.model.enums.ErrorCodeEnum;

public class NotFoundException extends BusinessException {

    public NotFoundException(String message) {
        super(message, ErrorCodeEnum.NOT_FOUND_ERROR);
    }

}
