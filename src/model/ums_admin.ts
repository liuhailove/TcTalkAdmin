export interface UsmAdmin {
    id: string;

    username: string;

    password: string,

    icon: string;

    email: string;

    nickName: string;

    /**
     * 备注信息
     */
    note: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 帐号启用状态：0->禁用；1->启用
     */
    status: number;
}