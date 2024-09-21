export interface AdsTemplate {

    id: string;

    /**
     * 名称
     */
    name: string;

    code: string;

    element: string;

    /**
     * 占位符描述
     */
    placeholders: string;

    /**
     * 备注
     */
    remark: string;

    /**
     * 创建者
     */
    createBy: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 修改者
     */
    updateBy: string;

    /**
     * 修改时间
     */
    updateTime: string;
}