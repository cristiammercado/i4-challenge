package com.cm.challenge.infrastructure.exceptions;

import com.cm.challenge.model.enums.ErrorCodeEnum;
import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException {

    private final ErrorCodeEnum errorCode;

    public BusinessException(String message, ErrorCodeEnum errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public HttpStatus getStatusCode() {
        return this.errorCode.getStatus();
    }

}
