export interface CtTag {

    id?: string;

    /**
     * 名称
     */
    name: string;

    /**
     * slug
     */
    slug: string;

    /**
     * 排序号
     */
    sort: number;

    /**
     * 是否启用
     */
    enabled: boolean;

    /**
     * 备注
     */
    remark: string;

    /**
     * 创建者
     */
    createBy?: string;

    /**
     * 创建时间
     */
    createTime?: string;

    /**
     * 修改者
     */
    updateBy?: string;

    /**
     * 修改时间
     */
    updateTime?: string;
}