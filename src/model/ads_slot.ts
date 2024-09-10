export interface AdsSlot {

    id: string;

    /**
     * 名称
     */
    slotName: string;

    /**
     * 频道Id
     */
    channelId: string;

    /**
     * 频道
     */
    channelName: string;

    /**
     * 终端类型
     */
    mediaType: string;

    /**
     * 类型
     */
    sizeType: string;

    /**
     * 尺寸类型
     */
    sizeTypeName: string;

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
     * 位置说明
     */
    positionDesc: string;

    /**
     * 水平对齐
     */
    alignH: string;

    /**
     * 水平边距 px
     */
    marginH: number;

    /**
     * 垂直对齐
     */
    alignV: string;

    /**
     * 垂直边距 px
     */
    marginV: number;

    /**
     * 停留时间（秒）
     */
    stayTime: number;

    /**
     * 是否跟随滚动条
     */
    scrolled: number;

    /**
     * 是否有关闭按钮
     */
    closable: number;

    /**
     * 调度方式
     */
    scheduleMode: number;

    /**
     * 一次展示广告数
     */
    adCount: number;

    /**
     * 轮换间隔（秒）
     */
    rotateInterval: number;

    /**
     * 每天显示次数
     */
    dayTimes: number;

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