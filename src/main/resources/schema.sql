CREATE TABLE IF NOT EXISTS appointment_types
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    description      TEXT         NOT NULL,
    duration_minutes INT          NOT NULL,
    color_hex_code   VARCHAR(7)   NOT NULL,
    created_at       TIMESTAMP    NOT NULL,
    last_modified_at TIMESTAMP    NOT NULL,
    UNIQUE (name)
);
