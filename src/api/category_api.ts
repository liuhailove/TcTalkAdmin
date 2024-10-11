import http from "../utils/http.ts";
import {CtChannel} from "../model/ct_channel.ts";


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