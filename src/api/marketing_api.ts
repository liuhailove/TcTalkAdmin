import http from "../utils/http.ts";
import {MmsHomeAdvertise} from "../model/mms_home_advertise.ts";
import {MmsFlashPromotion, MmsFlashPromotionSession} from "../model/mms_flash_promotion.ts";

export async function useFetchChannelHomeAdvertiseList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<MmsHomeAdvertise>,
            total: number,
        },
    }>("marketing_api/mms/home/advertise/list", params)
}

export async function useCreateChannelHomeAdvertise(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/home/advertise/create", data);
}

export async function useUpdateChannelHomeAdvertiseStatus(id: string, status: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/home/advertise/update/status/" + id + "?status=" + status);
}

export async function useDeleteChannelHomeAdvertise(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/home/advertise/delete?ids=" + ids);
}

export async function useGetChannelHomeAdvertise(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: MmsHomeAdvertise,
    }>("marketing_api/mms/home/advertise/" + id);
}

export async function useUpdateChannelHomeAdvertise(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/home/advertise/update/" + id, data);
}

/**************************秒杀活动****************************/

export async function useFetchFlashPromotionList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<MmsFlashPromotion>,
            total: number,
        },
    }>("marketing_api/mms/flash/list", params)
}

export async function useCreateFlashPromotion(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flash/create", data);
}

export async function useUpdateFlashPromotionStatus(id: string, status: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flash/update/status/" + id + "?status=" + status);
}

export async function useDeleteFlashPromotion(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flash/delete?ids=" + ids);
}

export async function useGetFlashPromotion(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: MmsFlashPromotion,
    }>("marketing_api/mms/flash/" + id);
}

export async function useUpdateFlashPromotion(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flash/update/" + id, data);
}

/**************************秒杀活动时间段****************************/

export async function useFetchFlashPromotionSessionList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<MmsFlashPromotionSession>,
            total: number,
        },
    }>("marketing_api/mms/flashSession/list", params)
}

export async function useCreateFlashPromotionSession(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flashSession/create", data);
}

export async function useUpdateFlashPromotionSessionStatus(id: string, status: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flashSession/update/status/" + id + "?status=" + status);
}

export async function useDeleteFlashPromotionSession(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flashSession/delete?ids=" + ids);
}

export async function useGetFlashPromotionSession(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: MmsFlashPromotionSession,
    }>("marketing_api/mms/flashSession/session/" + id);
}

export async function useUpdateFlashPromotionSession(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/mms/flashSession/update/" + id, data);
}