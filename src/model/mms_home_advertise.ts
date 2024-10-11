export class MmsHomeAdvertise {
    id: string;
    name: string;
    /**
     * 轮播位置：0->PC首页轮播；1->app首页轮播
     */
    type: number;
    /**
     * 频道ID
     */
    channelId: string;
    /**
     * 频道名称
     */
    channelName: string;
    /**
     * 图片
     */
    pic: string;

    startTime: string;

    endTime: string;

    /**
     * 上下线状态：0->下线；1->上线
     */
    status: number;

    /**
     * 点击数
     */
    clickCount: number;

    /**
     * 下单数
     */
    orderCount: number;

    /**
     * 链接地址
     */
    clickUrl: string;

    /**
     * 最大展示次数
     */
    showMax: number;
    /**
     * 每日最大展示次数
     */
    dayTimes: number;
    /**
     * 广告投放人ID
     */
    advertiserId: string;
    /**
     * 广告投放人名称
     */
    advertiserName: string;
    /**
     * 备注
     */
    note: string;

    /**
     * 排序
     */
    sort: number;

}