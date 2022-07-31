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