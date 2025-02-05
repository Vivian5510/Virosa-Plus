CREATE DATABASE IF NOT EXISTS `virosa-plus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `virosa-plus`;

-- 留言表
CREATE TABLE IF NOT EXISTS `virosa-plus-message`
(
    `id`          BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `content`     TEXT                               NOT NULL COMMENT '内容',
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
    `type`         VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '类型: 随笔/技术/生活',
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
    `name`        VARCHAR(100) DEFAULT ''                NOT NULL COMMENT '名称（文章或者目录的名字）' UNIQUE,
    `type`        TINYINT      DEFAULT 0                 NOT NULL COMMENT '是文章还是目录（0: 目录, 1: 文章）',
    `parent_id`   BIGINT       DEFAULT 0                 NOT NULL COMMENT '父目录',
    `status`      TINYINT      DEFAULT 0                 NOT NULL COMMENT '是否已发布（0: 关闭, 1: 开启）',
    `update_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`     TINYINT      DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`  TINYINT      DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '节点' COLLATE = utf8mb4_unicode_ci;

-- 影视表
CREATE TABLE IF NOT EXISTS `virosa-plus-video`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `name`         VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '名称',
    `cover`        VARCHAR(1024) DEFAULT ''                NOT NULL COMMENT '封面',
    `type`         VARCHAR(100)  DEFAULT ''                NOT NULL COMMENT '类型: 电影/纪录片/动漫/其他',
    `content`      TEXT                                    NOT NULL COMMENT '内容',
    `is_published` TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time`  DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`      TINYINT       DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`   TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '影视' COLLATE = utf8mb4_unicode_ci;

-- 书籍表
CREATE TABLE IF NOT EXISTS `virosa-plus-book`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `name`         VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '名称',
    `author`       VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '作者',
    `cover`        VARCHAR(1024) NOT NULL DEFAULT '' COMMENT '封面',
    `type`         VARCHAR(100)  NOT NULL DEFAULT '其他' COMMENT '类型: 小说/技术/哲学/其他',
    `content`      TEXT          NOT NULL COMMENT '内容',
    `is_published` TINYINT       NOT NULL DEFAULT 0 COMMENT '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  DATETIME               DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time`  DATETIME               DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`      TINYINT                DEFAULT 0 NOT NULL COMMENT '版本',
    `is_deleted`   TINYINT                DEFAULT 0 NOT NULL COMMENT '是否删除'
) COMMENT '书籍' COLLATE = utf8mb4_unicode_ci;

-- 名人表
CREATE TABLE IF NOT EXISTS `virosa-plus-famous`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `name`         VARCHAR(100)                       NOT NULL DEFAULT '' COMMENT '名称',
    `cover`        VARCHAR(1024)                      NOT NULL DEFAULT '' COMMENT '封面',
    `content`      TEXT                               NOT NULL COMMENT '内容',
    `is_published` TINYINT                            NOT NULL DEFAULT 0 COMMENT '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time`  DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`      TINYINT  DEFAULT 0                 NOT NULL COMMENT '版本',
    `is_deleted`   TINYINT  DEFAULT 0                 NOT NULL COMMENT '是否删除'
) COMMENT '名人' COLLATE = utf8mb4_unicode_ci;

-- 音乐表
CREATE TABLE IF NOT EXISTS `virosa-plus-music`
(
    `id`           BIGINT AUTO_INCREMENT COMMENT 'id' PRIMARY KEY,
    `name`         VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '名称',
    `artist`       VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '作者',
    `album`        VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '专辑',
    `cover`        VARCHAR(1024) NOT NULL DEFAULT '' COMMENT '封面',
    `url`          VARCHAR(1024) NOT NULL DEFAULT '' COMMENT '链接',
    `duration`     TINYINT       NOT NULL DEFAULT 0 COMMENT '时长',
    `is_published` TINYINT       NOT NULL DEFAULT 0 COMMENT '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  DATETIME               DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
    `create_time`  DATETIME               DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    `version`      TINYINT                DEFAULT 0 NOT NULL COMMENT '版本',
    `is_deleted`   TINYINT                DEFAULT 0 NOT NULL COMMENT '是否删除'
) COMMENT '音乐' COLLATE = utf8mb4_unicode_ci;
