package com.rosy.common.constants;

/**
 * 公共常量类
 */
public class CommonConstants {

    /**
     * 逻辑删除常量
     */
    public static final class DeletedConstants {
        /**
         * 未删除
         */
        public static final Integer NOT_DELETED = 0;

        /**
         * 已删除
         */
        public static final Integer DELETED = 1;
    }

    /**
     * ID常量
     */
    public static final class IdConstants {
        /**
         * 根节点ID
         */
        public static final Long ROOT_NODE_ID = 1L;
    }

    /**
     * 分页常量
     */
    public static final class PageConstants {
        /**
         * 默认页码
         */
        public static final Long DEFAULT_PAGE_NUM = 1L;

        /**
         * 默认每页记录数
         */
        public static final Long DEFAULT_PAGE_SIZE = 10L;

        /**
         * 最大每页记录数
         */
        public static final Long MAX_PAGE_SIZE = 100L;
    }

    private CommonConstants() {
        throw new IllegalStateException("Utility class");
    }
}