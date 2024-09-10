import http from "../utils/http.ts";
import {AdsChannel} from "../model/ads_channel.ts";
import {AdsSlot} from "../model/ads_slot.ts";

export async function useFetchChannelList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsChannel>,
            total: string,
        },
    }>("admin_api/ads/listChannel?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateChannel(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/createChannel", data);
}

export async function useUpdateChannel(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/updateChannel/" + id, data);
}


export async function useDeleteChannel(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/deleteChannel/" + id)
}

// --------------------------------------slot-------------------------------------------------

export async function useFetchSlotList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsSlot>,
            total: string,
        },
    }>("admin_api/ads/listSlot?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateSlot(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/createSlot", data);
}

export async function useUpdateSlot(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/updateSlot/" + id, data);
}


export async function useDeleteSlot(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/deleteSlot/" + id)
}


