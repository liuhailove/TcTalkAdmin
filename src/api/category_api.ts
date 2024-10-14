import http from "../utils/http.ts";
import {CtChannel} from "../model/ct_channel.ts";
import {CtTag} from "../model/ct_tag.ts";


export async function useFetchChannelList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<CtChannel>,
            total: string,
        },
    }>("category_api/ct/channel/list?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useFetchChannelAll() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<CtChannel>
    }>("category_api/ct/channel/listAll");
}

export async function useCreateChannel(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/channel/create", data);
}

export async function useUpdateChannel(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/channel/update/" + id, data);
}


export async function useDeleteChannel(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/channel/delete/" + id)
}

/******************tag*****************/
export async function useFetchTagList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<CtTag>,
            total: string,
        },
    }>("category_api/ct/tag/list?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useFetchTagAll() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<CtTag>
    }>("category_api/ct/tag/listAll");
}

export async function useCreateTag(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/tag/create", data);
}

export async function useUpdateTag(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/update/" + id, data);
}


export async function useDeleteTag(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/tag/delete/" + id)
}