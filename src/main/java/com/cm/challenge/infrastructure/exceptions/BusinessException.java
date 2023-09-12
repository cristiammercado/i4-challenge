package com.cm.challenge.infrastructure.exceptions;

import com.cm.challenge.model.enums.ErrorCodeEnum;
import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException {

    private final ErrorCodeEnum errorCode;

    public BusinessException() {
        super("General error in API. Check logs for more information");
        this.errorCode = ErrorCodeEnum.GENERIC_ERROR;
    }

    public BusinessException(String message) {
        super(message);
        this.errorCode = ErrorCodeEnum.GENERIC_ERROR;
    }

    public BusinessException(String message, ErrorCodeEnum errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public BusinessException(String message, ErrorCodeEnum errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public HttpStatus getStatusCode() {
        return this.errorCode.getStatus();
    }

}
