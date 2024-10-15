export interface CtCategory {

    id?: string;

    /**
     * 频道ID
     */
    channelId: string;

    /**
     * 频道名称
     */
    channelName?: string;

    /**
     * 分类名称
     */
    name: string;

    /**
     * 父分类的编号
     */
    parentCategoryId: string;

    /**
     * 是否在导航栏显示
     */
    navStatus: number;

    /**
     * 是否进行显示
     */
    showStatus: number;

    /**
     * 排序号
     */
    sort: number;

    /**
     * 图标
     */
    icon: string;

    /**
     * 年龄分区类型
     */
    ageRegionType: number;

    /**
     * 是否推荐
     */
    recommend: boolean;

    /**
     * 是否启用
     */
    enabled: boolean;

    /**
     * 性别偏向
     */
    sexPrefer: number;

    /**
     * 关键字
     */
    keywords: string;

    /**
     * 费用类型
     */
    feeType: number;

    /**
     * 审核状态
     */
    auditStatus: number;

    /**
     * 备注
     */
    remark: string;

    /**
     * 筛选标签集合
     */
    tagIdList: Array<string>;

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

export interface CategoryWithChildrenItem {
    children: Array<CategoryWithChildrenItem>;
}

export interface CtCategoryTagRelation {
    id?: string;
    /**
     * 分类ID
     */
    categoryId: string;
    /**
     * 标签ID
     */
    tagId: string;
    /**
     * 标签名称
     */
    tagName: string;
}