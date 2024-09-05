export interface UmsRole {
    id: string;

    /**
     * 创建时间
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
     * 菜单级数
     */
    level: number;

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

    hidden: number;
    description: string,
    adminCount: number,
    status: number,
}