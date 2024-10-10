export interface CtChannel {

    id?: string;

    /**
     * 名称
     */
    name: string;

    /**
     * 跳转路径
     */
    urlPath: string;

    /**
     * 是否隐藏
     */
    hidden: boolean;

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
    desc: string;

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