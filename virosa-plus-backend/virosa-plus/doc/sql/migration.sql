-- Migration script to move data from specialized tables to the Article table

-- Migrate book data
INSERT INTO `virosa-plus-article` (title, cover, type, author, extra_info, content, is_published, update_time, create_time)
SELECT name, cover, '书评' AS type, author, type AS extra_info, content, is_published, update_time, create_time
FROM `virosa-plus-book`
WHERE is_deleted = 0;

-- Migrate music data
INSERT INTO `virosa-plus-article` (title, cover, type, author, extra_info, external_link, content, is_published, update_time, create_time)
SELECT name, cover, '乐评' AS type, artist AS author, album AS extra_info, url AS external_link, content, is_published, update_time, create_time
FROM `virosa-plus-music`
WHERE is_deleted = 0;

-- Migrate video data
INSERT INTO `virosa-plus-article` (title, cover, type, extra_info, content, is_published, update_time, create_time)
SELECT name, cover, '影评' AS type, type AS extra_info, content, is_published, update_time, create_time
FROM `virosa-plus-video`
WHERE is_deleted = 0;

-- Migrate famous people data
INSERT INTO `virosa-plus-article` (title, cover, type, content, is_published, update_time, create_time)
SELECT name, cover, '名人评传' AS type, content, is_published, update_time, create_time
FROM `virosa-plus-famous`
WHERE is_deleted = 0;

-- After verifying the migration is successful, drop the old tables if needed
-- DROP TABLE `virosa-plus-book`;
-- DROP TABLE `virosa-plus-music`;
-- DROP TABLE `virosa-plus-video`;
-- DROP TABLE `virosa-plus-famous`; 