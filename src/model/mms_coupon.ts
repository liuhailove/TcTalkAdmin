export class MmsCoupon {
    id: string;
    name: string;
    /**
     * 优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券
     */
    type: number;

    /**
     * 使用平台：0->全部；1->移动；2->PC
     */
    platform: number;

    /**
     * 数量
     */
    count: number;

    /**
     * 金额
     */
    amount: string;

    /**
     * 每人限领张数
     */
    perLimit: number;

    /**
     * 使用门槛；0表示无门槛
     */
    minPoint: string;

    startTime: string;

    endTime: string;

    /**
     * 使用类型：0->全场通用；1->指定分类；2->指定商品
     */
    useType: number;
    /**
     * 备注
     */
    note: string;

    /**
     * 发行数量
     */
    publishCount: number;

    /**
     * 已使用数量
     */
    useCount: number;

    /**
     * 领取数量
     */
    receiveCount: number;

    /**
     * 可以领取的日期
     */
    enableTime: string;

    /**
     * 优惠码
     */
    code: string;

    /**
     * 可领取的会员类型：0->无限治
     */
    memberLevel: number;
}

export class MmsCouponProductRelation {
    id: string;
    couponId: string;

    productId: string;

    productName: string;

    productSn: string;
}

export class MmsCouponProductCategoryRelation {
    id: string;
    couponId: string;

    productCategoryId: string;

    /**
     * 产品分类名称
     */
    productCategoryName: string;

    /**
     * 父分类名称
     */
    parentCategoryName: string;
}


export class MmsCouponParam extends MmsCoupon {
    /**
     * 优惠券绑定的商品
     */
    productRelationList: MmsCouponProductRelation[];
    /**
     * 优惠券绑定的商品分类
     */
    productCategoryRelationList: MmsCouponProductRelation[];
}