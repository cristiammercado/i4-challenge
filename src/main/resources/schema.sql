CREATE TABLE IF NOT EXISTS `appointment_types`
(
    `id`               int                                     NOT NULL AUTO_INCREMENT,
    `name`             varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
    `description`      text COLLATE utf8mb4_spanish_ci         NOT NULL,
    `duration_minutes` int                                     NOT NULL,
    `color_hex_code`   varchar(7) COLLATE utf8mb4_spanish_ci   NOT NULL,
    `created_at`       datetime                                NOT NULL,
    `last_modified_at` datetime                                NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_spanish_ci;
