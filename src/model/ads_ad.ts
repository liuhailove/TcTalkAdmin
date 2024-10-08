export interface AdsAd {

    id?: string;

    /**
     * 名称
     */
    name: string;

    /**
     * 广告主
     */
    advertiserId?: string;

    advertiser?: string;

    /**
     * 尺寸类型
     */
    sizeType: number;

    sizeTypeName: string;

    width: number;

    height: number;

    /**
     * 点击链接
     */
    clickUrl: string;

    /**
     * 目标窗口
     */
    targetWindow: string;

    /**
     * 文件来源
     */
    fileSourceType: number;

    /**
     * 广告模板ID
     */
    templateId: string;
    /**
     * 内容
     */
    content: string;

    /**
     * 内容扩展
     */
    contentExt: string;

    /**
     * 模板版本
     */
    version: number;
    /**
     * 展示样式
     */
    style: string;

    /**
     * 启用
     */
    enabled: number;

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


export interface AdsAdParam {
    /**
     * 名称
     */
    name: string;

    /**
     * 广告主
     */
    advertiserId?: string;

    advertiser?: string;

    /**
     * 尺寸类型
     */
    sizeType?: number;

    sizeTypeName?: string;

    width?: number;

    height?: number;

    /**
     * 点击链接
     */
    clickUrl: string;

    /**
     * 目标窗口
     */
    targetWindow: string;

    /**
     * 文件来源
     */
    fileSourceType?: number;

    /**
     * 广告模板ID
     */
    templateId: string;
    /**
     * 内容
     */
    content: string;

    /**
     * 内容扩展
     */
    contentExt: string;

    /**
     * 模板版本
     */
    version?: number;
    /**
     * 展示样式
     */
    style?: string;

    /**
     * 启用
     */
    enabled: number;

    /**
     * 备注
     */
    remark: string;

}