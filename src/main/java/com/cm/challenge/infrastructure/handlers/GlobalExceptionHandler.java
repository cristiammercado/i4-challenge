package com.cm.challenge.infrastructure.handlers;

import com.cm.challenge.dto.ErrorResponseDTO;
import com.cm.challenge.infrastructure.exceptions.BusinessException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;

import java.util.List;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<Object> handleWebExchangeBindException(WebExchangeBindException ex) {
        List<String> errors = ex.getBindingResult()
            .getAllErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .toList();

        return ResponseEntity.badRequest().body(ErrorResponseDTO.builder().success(false).errors(errors).build());
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Object> handleBusinessException(BusinessException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ErrorResponseDTO.builder().success(false).errors(List.of(ex.getMessage())).build());
    }
}
