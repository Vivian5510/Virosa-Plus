CREATE DATABASE IF NOT EXISTS `virosa-plus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `virosa-plus`;

-- 留言表
create table if not exists `virosa-plus-message`
(
    `id`          bigint auto_increment comment 'id' primary key,
    `content`     text                               not null comment '内容',
    `create_time` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`     tinyint  default 0                 not null comment '版本',
    `is_deleted`  tinyint  default 0                 not null comment '是否删除'
) comment '留言' collate = utf8mb4_unicode_ci;

-- 问题表
create table if not exists `virosa-plus-issue`
(
    `id`          bigint auto_increment comment 'id' primary key,
    `title`       varchar(100)                       not null comment '标题',
    `type`        varchar(100)                       not null comment '类型: BUG/FEATURE/OTHER',
    `description` text                               not null comment '问题描述',
    `status`      tinyint                            not null comment '状态: OPEN/CLOSE/RESOLVED/IN_PROGRESS',
    `nickname`    varchar(100)                       not null comment '昵称',
    `email`       varchar(100)                       not null comment '联系邮箱',
    `update_time` datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`     tinyint  default 0                 not null comment '版本',
    `is_deleted`  tinyint  default 0                 not null comment '是否删除'
) comment '问题' collate = utf8mb4_unicode_ci;

-- 文章表
create table if not exists `virosa-plus-article`
(
    `id`           bigint auto_increment comment 'id' primary key,
    `title`        text                               not null comment '标题' unique,
    `cover`        varchar(100)                       not null comment '封面',
    `type`         varchar(100)                       not null comment '类型: 随笔/技术/生活',
    `content`      text                               not null comment '内容',
    `is_published` tinyint                            not null comment '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time`  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`      tinyint  default 0                 not null comment '版本',
    `is_deleted`   tinyint  default 0                 not null comment '是否删除'
) comment '文章' collate = utf8mb4_unicode_ci;

-- 节点表
create table if not exists `virosa-plus-node`
(
    `id`          bigint auto_increment comment 'id' primary key,
    `name`        varchar(100)                       not null comment '名称（文章或者目录的名字）' unique,
    `type`        tinyint                            not null comment '是文章还是目录（0: 目录, 1: 文章）',
    `parent_id`   bigint                             not null comment '父目录',
    `status`      tinyint                            not null comment '是否已发布（0: 关闭, 1: 开启）',
    `update_time` datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`     tinyint  default 0                 not null comment '版本',
    `is_deleted`  tinyint  default 0                 not null comment '是否删除'
) comment '节点' collate = utf8mb4_unicode_ci;

-- 影视表
create table if not exists `virosa-plus-video`
(
    `id`           bigint auto_increment comment 'id' primary key,
    `name`         varchar(100)                       not null comment '名称',
    `cover`        varchar(100)                       not null comment '封面',
    `type`         varchar(100)                       not null comment '类型: 电影/纪录片/动漫/其他',
    `content`      text                               not null comment '内容',
    `is_published` tinyint                            not null comment '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time`  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`      tinyint  default 0                 not null comment '版本',
    `is_deleted`   tinyint  default 0                 not null comment '是否删除'
) comment '影视' collate = utf8mb4_unicode_ci;

-- 书籍表
create table if not exists `virosa-plus-book`
(
    `id`           bigint auto_increment comment 'id' primary key,
    `name`         varchar(100)                       not null comment '名称',
    `author`       varchar(100)                       not null comment '作者',
    `cover`        varchar(100)                       not null comment '封面',
    `type`         varchar(100)                       not null comment '类型: 小说/技术/哲学/其他',
    `content`      text                               not null comment '内容',
    `is_published` tinyint                            not null comment '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time`  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`      tinyint  default 0                 not null comment '版本',
    `is_deleted`   tinyint  default 0                 not null comment '是否删除'
) comment '书籍' collate = utf8mb4_unicode_ci;

-- 名人表
create table if not exists `virosa-plus-famous`
(
    `id`           bigint auto_increment comment 'id' primary key,
    `name`         varchar(100)                       not null comment '名称',
    `cover`        varchar(100)                       not null comment '封面',
    `content`      text                               not null comment '内容',
    `is_published` tinyint                            not null comment '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time`  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`      tinyint  default 0                 not null comment '版本',
    `is_deleted`   tinyint  default 0                 not null comment '是否删除'
) comment '名人' collate = utf8mb4_unicode_ci;

-- 音乐表
create table if not exists `virosa-plus-music`
(
    `id`           bigint auto_increment comment 'id' primary key,
    `name`         varchar(100)                       not null comment '名称',
    `artist`       varchar(100)                       not null comment '作者',
    `album`        varchar(100)                       not null comment '专辑',
    `cover`        varchar(1024)                      not null comment '封面',
    `url`          varchar(1024)                      not null comment '链接',
    `duration`     tinyint                            not null comment '时长',
    `is_published` tinyint                            not null comment '是否已发布（0: 草稿, 1: 已发布）',
    `update_time`  datetime default CURRENT_TIMESTAMP not null comment '更新时间',
    `create_time`  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `version`      tinyint  default 0                 not null comment '版本',
    `is_deleted`   tinyint  default 0                 not null comment '是否删除'
) comment '音乐' collate = utf8mb4_unicode_ci;







