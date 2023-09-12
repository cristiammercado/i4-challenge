package com.cm.challenge.infrastructure.exceptions;

import com.cm.challenge.model.enums.ErrorCodeEnum;

public class DatabaseException extends BusinessException {

    public DatabaseException() {
        super("Database error. Check logs for more information", ErrorCodeEnum.DATABASE_ERROR);
    }

}
