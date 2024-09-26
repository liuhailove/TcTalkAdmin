import http from "../utils/http.ts";
import {AdsChannel} from "../model/ads_channel.ts";
import {AdsSlot} from "../model/ads_slot.ts";
import {AdsSizeType} from "../model/ads_size_type.ts";
import {AdsTemplate} from "../model/ads_template.ts";
import {AdsAd} from "../model/ads_ad.ts";

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

export async function useFetchSlotList(slotName: string, channelName: string, mediaType: number, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsSlot>,
            total: string,
        },
    }>("admin_api/ads/listSlot?slotName=" + slotName + "&channelName=" + channelName + "&mediaType=" + mediaType + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
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

export async function useGetSlot(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: AdsSlot
    }>("admin_api/ads/getSlot/" + id);
}

// --------------------------------------sizeType-------------------------------------------------

export async function useFetchSizeTypeList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsSizeType>,
            total: string,
        },
    }>("admin_api/ads/listSizeType?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateSizeType(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/createSizeType", data);
}

export async function useUpdateSizeType(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/updateSizeType/" + id, data);
}


export async function useDeleteSizeType(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/deleteSizeType/" + id)
}

export async function useGetSizeType(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: AdsSizeType
    }>("admin_api/ads/getSizeType/" + id);
}

// --------------------------------------template-------------------------------------------------

export async function useFetchTemplateList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsTemplate>,
            total: string,
        },
    }>("admin_api/ads/listTemplate?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateTemplate(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/createTemplate", data);
}

export async function useUpdateTemplate(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/updateTemplate/" + id, data);
}


export async function useDeleteTemplate(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/deleteTemplate/" + id)
}

export async function useGetTemplate(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: AdsTemplate
    }>("admin_api/ads/getTemplate/" + id);
}

// --------------------------------------ad-------------------------------------------------

export async function useFetchAdList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<AdsAd>,
            total: string,
        },
    }>("admin_api/ads/listAds?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateAd(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/createAd", data);
}

export async function useUpdateAd(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/updateAd/" + id, data);
}


export async function useDeleteAd(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/ads/deleteAd/" + id)
}

export async function useGetAd(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: AdsAd
    }>("admin_api/ads/getAd/" + id);
}