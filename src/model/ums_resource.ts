export interface UmsResource {
    id: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 资源名称
     */
    name: string;

    /**
     * 资源URL
     */
    url: string;

    /**
     * 描述
     */
    description: string;

    /**
     * 资源分类ID
     */
    categoryId: string;
}