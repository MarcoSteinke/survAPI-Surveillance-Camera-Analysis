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