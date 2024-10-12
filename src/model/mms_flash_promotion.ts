export class MmsFlashPromotion {
    id: string;
    name: string;

    startTime: string;

    endTime: string;

    /**
     * 上下线状态：0->下线；1->上线
     */
    status: number;
    /**
     * 备注
     */
    note: string;
}

export class MmsFlashPromotionSession {
    id: string;
    name: string;

    startTime: string;

    endTime: string;

    /**
     * 上下线状态：0->下线；1->上线
     */
    status: number;
    /**
     * 备注
     */
    note: string;
}