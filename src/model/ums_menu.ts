export interface UmsMenu {

    id: string;

    /**
     * 父级ID
     */
    parentId: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 菜单名称
     */
    title: string;

    /**
     * 菜单排序
     */
    sort: number;

    /**
     * 前端名称
     */
    name: string;

    /**
     * 前端图标
     */
    icon: string;

    /**
     * 前端隐藏
     */
    hidden: number;
}

/**
 * 后台菜单节点封装
 */
export interface UmsMenuNode {
    children: Array<UmsMenu>;
}