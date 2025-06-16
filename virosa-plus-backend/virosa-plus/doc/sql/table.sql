CREATE DATABASE IF NOT EXISTS `virosa-plus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `virosa-plus`;

-- 用户表
CREATE TABLE IF NOT EXISTS `sys_user`
(
    `id`          BIGINT AUTO_INCREMENT COMMENT '用户ID' PRIMARY KEY,
    `username`    VARCHAR(30)  NOT NULL                 COMMENT '用户名',
    `password`    VARCHAR(100) DEFAULT ''               COMMENT '密码',
    `status`      TINYINT      DEFAULT 0                COMMENT '状态（0正常 1停用）',
    `update_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`     TINYINT      DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`  TINYINT      DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '用户信息表' COLLATE = utf8mb4_unicode_ci;

-- 初始化管理员用户（密码为: admin123）
INSERT INTO sys_user(id, username, password, status, create_time, update_time)
VALUES (1, 'admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', 0, NOW(), NOW());

-- 初始化测试用户（密码为: demo123）
INSERT INTO sys_user(id, username, password, status, create_time, update_time) 
VALUES (2, 'demo', '$2a$10$aqqH1ngMbyAwkrQ8.1T24u/zxXsN1sNsjsRZiR2zdsQcneBIiEULu', 0, NOW(), NOW());

-- 留言表
CREATE TABLE IF NOT EXISTS `virosa-plus-message`
(
    `id`          BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `content`     TEXT                               NOT NULL COMMENT '内容',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`     TINYINT  DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`  TINYINT  DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '留言' COLLATE = utf8mb4_unicode_ci;

-- 问题表
CREATE TABLE IF NOT EXISTS `virosa-plus-issue`
(
    `id`          BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `title`       VARCHAR(100) DEFAULT ''                NOT NULL COMMENT '标题',
    `type`        VARCHAR(100) DEFAULT ''                NOT NULL COMMENT '类型: BUG/FEATURE/OTHER',
    `description` TEXT                                   NOT NULL COMMENT '问题描述',
    `status`      TINYINT      DEFAULT 0                 NOT NULL COMMENT '状态: OPEN/CLOSE/RESOLVED/IN_PROGRESS',
    `nickname`    VARCHAR(100) DEFAULT ''                NOT NULL COMMENT '昵称',
    `email`       VARCHAR(100) DEFAULT ''                NOT NULL COMMENT '联系邮箱',
    `update_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`     TINYINT      DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`  TINYINT      DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '问题' COLLATE = utf8mb4_unicode_ci;

-- 文章表
CREATE TABLE IF NOT EXISTS `virosa-plus-article`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `title`        VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '标题' UNIQUE,
    `cover`        VARCHAR(1024) DEFAULT ''                NOT NULL COMMENT '封面',
    `type`         VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '类型: 随笔/技术/生活/书评/影评/乐评/名人评传',
    `author`       VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '作者/艺术家 (适用于书评/乐评等)',
    `extra_info`   VARCHAR(255)  DEFAULT ''                NOT NULL COMMENT '额外信息 (如音乐的专辑名、书的出版社等)',
    `external_link`VARCHAR(1024) DEFAULT ''                NOT NULL COMMENT '外部链接 (如音乐链接、视频链接等)',
    `content`      TEXT                                    NOT NULL COMMENT '内容',
    `is_published` TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time`  DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`      TINYINT       DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`   TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '文章' COLLATE = utf8mb4_unicode_ci;

-- 节点表
CREATE TABLE IF NOT EXISTS `virosa-plus-node`
(
    `id`          BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `name`        VARCHAR(100)                             DEFAULT ''                NOT NULL COMMENT '名称（文章或者目录的名字）' UNIQUE,
    `type`        ENUM ('directory', 'file')               DEFAULT 'directory'       NOT NULL COMMENT '是文章还是目录（directory: 目录, file: 文章）',
    `parent_id`   BIGINT                                   DEFAULT 0                 NOT NULL COMMENT '父目录',
    `article_id`  BIGINT                                   DEFAULT NULL              COMMENT '文章ID（当type=file时，关联到对应的文章）',
    `status`      TINYINT                                  DEFAULT 0                 NOT NULL COMMENT '是否已发布（0: 关闭, 1: 开启）',
    `update_time` DATETIME                                 DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time` DATETIME                                 DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`     TINYINT                                  DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`  TINYINT                                  DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '节点' COLLATE = utf8mb4_unicode_ci;

-- 初始化根节点
INSERT INTO `virosa-plus-node` (id, name, type, parent_id, status, create_time, update_time)
VALUES (1, 'root', 'directory', 0, 1, NOW(), NOW());
