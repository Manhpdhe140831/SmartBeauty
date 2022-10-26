-- MySQL Script generated by MySQL Workbench
-- Tue Oct 25 15:09:06 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sbeauty
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sbeauty
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sbeauty` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sbeauty` ;

-- -----------------------------------------------------
-- Table `sbeauty`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`user` (
                                                `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                `address` VARCHAR(255) NULL DEFAULT NULL,
    `date_of_birth` DATETIME(6) NULL DEFAULT NULL,
    `email` VARCHAR(255) NULL DEFAULT NULL,
    `gender` VARCHAR(255) NULL DEFAULT NULL,
    `mobile` VARCHAR(255) NULL DEFAULT NULL,
    `name` VARCHAR(255) NULL DEFAULT NULL,
    `password` VARCHAR(255) NULL DEFAULT NULL,
    `username` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`branch` (
                                                  `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                  `address` VARCHAR(255) NULL DEFAULT NULL,
    `image` VARCHAR(255) NULL DEFAULT NULL,
    `name` VARCHAR(255) NULL DEFAULT NULL,
    `phone` VARCHAR(255) NULL DEFAULT NULL,
    `user_id` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `FKdmeh971135n1jqm9jtut7supw` (`user_id` ASC) VISIBLE,
    CONSTRAINT `FKdmeh971135n1jqm9jtut7supw`
    FOREIGN KEY (`user_id`)
    REFERENCES `sbeauty`.`user` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`category` (
                                                    `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                    `name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`course` (
                                                  `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                  `course_begin_discount` DATE NULL DEFAULT NULL,
                                                  `course_code` VARCHAR(255) NULL DEFAULT NULL,
    `course_end_discount` DATE NULL DEFAULT NULL,
    `course_image` VARCHAR(255) NULL DEFAULT NULL,
    `course_name` VARCHAR(255) NULL DEFAULT NULL,
    `course_price` DOUBLE NOT NULL,
    `description` VARCHAR(255) NULL DEFAULT NULL,
    `discount_percent` DOUBLE NOT NULL,
    `end_of_course` DATE NULL DEFAULT NULL,
    `time_of_use` INT NOT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`course_branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`course_branch` (
                                                         `course_id` BIGINT NOT NULL,
                                                         `branch_id` BIGINT NOT NULL,
                                                         PRIMARY KEY (`course_id`, `branch_id`),
    INDEX `FKls92xtx9vp48wormo6a93wsbr` (`branch_id` ASC) VISIBLE,
    CONSTRAINT `FK7ocp5ld9iqoceh8it0tjlkdy0`
    FOREIGN KEY (`course_id`)
    REFERENCES `sbeauty`.`course` (`id`),
    CONSTRAINT `FKls92xtx9vp48wormo6a93wsbr`
    FOREIGN KEY (`branch_id`)
    REFERENCES `sbeauty`.`branch` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`service` (
                                                   `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                   `code_service` VARCHAR(255) NULL DEFAULT NULL,
    `description` VARCHAR(255) NULL DEFAULT NULL,
    `discount_percent` DOUBLE NULL DEFAULT NULL,
    `end_discount` DATE NULL DEFAULT NULL,
    `image_service` VARCHAR(255) NULL DEFAULT NULL,
    `minutes_number` BIGINT NOT NULL,
    `name_service` VARCHAR(255) NULL DEFAULT NULL,
    `price` DOUBLE NOT NULL,
    `price_service` DOUBLE NOT NULL,
    `start_discount` DATE NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`course_service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`course_service` (
                                                          `course_id` BIGINT NOT NULL,
                                                          `service_id` BIGINT NOT NULL,
                                                          PRIMARY KEY (`course_id`, `service_id`),
    INDEX `FK9oxnobjul5ipxkjqtxdar6f47` (`service_id` ASC) VISIBLE,
    CONSTRAINT `FK9oxnobjul5ipxkjqtxdar6f47`
    FOREIGN KEY (`service_id`)
    REFERENCES `sbeauty`.`service` (`id`),
    CONSTRAINT `FKssw29tf84qsml8dfyhoghf0s`
    FOREIGN KEY (`course_id`)
    REFERENCES `sbeauty`.`course` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`staff` (
                                                 `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                 `city` VARCHAR(255) NULL DEFAULT NULL,
    `district` VARCHAR(255) NULL DEFAULT NULL,
    `email` VARCHAR(255) NULL DEFAULT NULL,
    `birth_date` DATE NULL DEFAULT NULL,
    `country` VARCHAR(255) NULL DEFAULT NULL,
    `first_name` VARCHAR(255) NULL DEFAULT NULL,
    `gender` INT NOT NULL,
    `last_name` VARCHAR(255) NULL DEFAULT NULL,
    `phone` VARCHAR(255) NULL DEFAULT NULL,
    `street` VARCHAR(255) NULL DEFAULT NULL,
    `branch_id` BIGINT NULL DEFAULT NULL,
    `user_id` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `FKc9xh37lh8sjk8m5hhp5bnq1ca` (`branch_id` ASC) VISIBLE,
    INDEX `FKbhogfndgswrqk696i1s2stk2g` (`user_id` ASC) VISIBLE,
    CONSTRAINT `FKbhogfndgswrqk696i1s2stk2g`
    FOREIGN KEY (`user_id`)
    REFERENCES `sbeauty`.`user` (`id`),
    CONSTRAINT `FKc9xh37lh8sjk8m5hhp5bnq1ca`
    FOREIGN KEY (`branch_id`)
    REFERENCES `sbeauty`.`branch` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`customer` (
                                                    `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                    `city` VARCHAR(255) NULL DEFAULT NULL,
    `district` VARCHAR(255) NULL DEFAULT NULL,
    `email` VARCHAR(255) NULL DEFAULT NULL,
    `country` VARCHAR(255) NULL DEFAULT NULL,
    `first_name` VARCHAR(255) NULL DEFAULT NULL,
    `gender` INT NOT NULL,
    `last_name` VARCHAR(255) NULL DEFAULT NULL,
    `phone` VARCHAR(255) NULL DEFAULT NULL,
    `street` VARCHAR(255) NULL DEFAULT NULL,
    `sale_staff_id` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `FK1earsoaxupt8l5xpw3erpcltm` (`sale_staff_id` ASC) VISIBLE,
    CONSTRAINT `FK1earsoaxupt8l5xpw3erpcltm`
    FOREIGN KEY (`sale_staff_id`)
    REFERENCES `sbeauty`.`staff` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`supplier` (
                                                    `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                    `address` VARCHAR(255) NULL DEFAULT NULL,
    `description` VARCHAR(255) NULL DEFAULT NULL,
    `email` VARCHAR(255) NULL DEFAULT NULL,
    `phone` VARCHAR(255) NULL DEFAULT NULL,
    `supplier_code` VARCHAR(255) NULL DEFAULT NULL,
    `supplier_image` VARCHAR(255) NULL DEFAULT NULL,
    `tax_code` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`product` (
                                                   `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                   `description` VARCHAR(255) NULL DEFAULT NULL,
    `discount_percent` DOUBLE NOT NULL,
    `product_begin_discount` DATE NULL DEFAULT NULL,
    `product_code` VARCHAR(255) NULL DEFAULT NULL,
    `product_end_discount` DATE NULL DEFAULT NULL,
    `product_image` VARCHAR(255) NULL DEFAULT NULL,
    `product_name` VARCHAR(255) NULL DEFAULT NULL,
    `product_price` DOUBLE NOT NULL,
    `quantity` INT NOT NULL,
    `unit` VARCHAR(255) NULL DEFAULT NULL,
    `supplier_id` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `FK2kxvbr72tmtscjvyp9yqb12by` (`supplier_id` ASC) VISIBLE,
    CONSTRAINT `FK2kxvbr72tmtscjvyp9yqb12by`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `sbeauty`.`supplier` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`product_branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`product_branch` (
                                                          `product_id` BIGINT NOT NULL,
                                                          `branch_id` BIGINT NOT NULL,
                                                          PRIMARY KEY (`product_id`, `branch_id`),
    INDEX `FKexcwsjgcmm5e23mfok7qak1he` (`branch_id` ASC) VISIBLE,
    CONSTRAINT `FKexcwsjgcmm5e23mfok7qak1he`
    FOREIGN KEY (`branch_id`)
    REFERENCES `sbeauty`.`branch` (`id`),
    CONSTRAINT `FKq3ltxgqyxw7x6tba12427115f`
    FOREIGN KEY (`product_id`)
    REFERENCES `sbeauty`.`product` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`role` (
                                                `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                `name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`service_branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`service_branch` (
                                                          `service_id` BIGINT NOT NULL,
                                                          `branch_id` BIGINT NOT NULL,
                                                          PRIMARY KEY (`service_id`, `branch_id`),
    INDEX `FKiprhj1mcy8kl7nkerjp4wxorh` (`branch_id` ASC) VISIBLE,
    CONSTRAINT `FK2cflmlm0go7p3nj1f5h7pdwan`
    FOREIGN KEY (`service_id`)
    REFERENCES `sbeauty`.`service` (`id`),
    CONSTRAINT `FKiprhj1mcy8kl7nkerjp4wxorh`
    FOREIGN KEY (`branch_id`)
    REFERENCES `sbeauty`.`branch` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`service_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`service_product` (
                                                           `service_id` BIGINT NOT NULL,
                                                           `product_id` BIGINT NOT NULL,
                                                           PRIMARY KEY (`service_id`, `product_id`),
    INDEX `FKkeofto8jbatwl7ve4ts8jcg4y` (`product_id` ASC) VISIBLE,
    CONSTRAINT `FKkeofto8jbatwl7ve4ts8jcg4y`
    FOREIGN KEY (`product_id`)
    REFERENCES `sbeauty`.`product` (`id`),
    CONSTRAINT `FKrcxj3j8pv3h9utn3edepacdg9`
    FOREIGN KEY (`service_id`)
    REFERENCES `sbeauty`.`service` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`spa_bed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`spa_bed` (
                                                   `id` BIGINT NOT NULL AUTO_INCREMENT,
                                                   `status` VARCHAR(255) NULL DEFAULT NULL,
    `branch_id` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `FK6n8r8nvmrgv5fkmente6yjqub` (`branch_id` ASC) VISIBLE,
    CONSTRAINT `FK6n8r8nvmrgv5fkmente6yjqub`
    FOREIGN KEY (`branch_id`)
    REFERENCES `sbeauty`.`branch` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sbeauty`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sbeauty`.`user_role` (
                                                     `user_id` BIGINT NOT NULL,
                                                     `role_id` BIGINT NOT NULL,
                                                     PRIMARY KEY (`user_id`, `role_id`),
    INDEX `FKa68196081fvovjhkek5m97n3y` (`role_id` ASC) VISIBLE,
    CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o`
    FOREIGN KEY (`user_id`)
    REFERENCES `sbeauty`.`user` (`id`),
    CONSTRAINT `FKa68196081fvovjhkek5m97n3y`
    FOREIGN KEY (`role_id`)
    REFERENCES `sbeauty`.`role` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
