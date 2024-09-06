export class SmsHomeAdvertise {
    id: string;
    name: string;
    /**
     * 轮播位置：0->PC首页轮播；1->app首页轮播
     */
    type: number;

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
    url: string;

    /**
     * 备注
     */
    note: string;

    /**
     * 排序
     */
    sort: number;

}