-- SQL：server\mysql\init.sql
-- 创建数据库minigame
CREATE SCHEMA `minigame` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 创建数据表history
USE minigame;
CREATE TABLE `history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `openid` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `system_score` tinyint DEFAULT NULL,
  `user_score` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `openid_index` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 创建数据表account
use minigame;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `passwd` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'assistant' COMMENT 'assistant、administrator',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `minigame`.`account` (`name`, `passwd`, `role`) VALUES ('user1@qq.com', '123456', 'assistant');
INSERT INTO `minigame`.`account` (`name`, `passwd`, `role`) VALUES ('user2@qq.com', '123456', 'administrator');