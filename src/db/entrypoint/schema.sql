DROP DATABASE IF EXISTS `SurvAPI`;
CREATE DATABASE `SurvAPI`;
USE `SurvAPI` ;
DROP TABLE IF EXISTS `detections`;
CREATE TABLE `detections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `objects` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `SurvAPI`.`cameras`;
CREATE TABLE `SurvAPI`.`cameras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `ip` VARCHAR(45) NULL,
  `port` INT NULL,
  `resolution` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

DROP TABLE IF EXISTS `SurvAPI`.`users`;
CREATE TABLE `SurvAPI`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `role` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

ALTER TABLE `SurvAPI`.`users` 
ADD COLUMN `password` VARCHAR(200) NOT NULL AFTER `username`;