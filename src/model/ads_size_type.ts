export interface AdsSizeType {

    id: string;

    /**
     * 名称
     */
    name: string;

    /**
     * 宽 px
     */
    width: number;

    /**
     * 高 px
     */
    height: number;

    /**
     * 文件类型
     */
    fileTypes: string;

    /**
     * 文件最大KB
     */
    fileMax: number;

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