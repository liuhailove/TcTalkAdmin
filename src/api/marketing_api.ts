import http from "../utils/http.ts";
import {MmsHomeAdvertise} from "../model/mms_home_advertise.ts";

export async function useFetchChannelHomeAdvertiseList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<MmsHomeAdvertise>,
            total: number,
        },
    }>("marketing_api/marketing/home/advertise/list", params)
}

export async function useCreateChannelHomeAdvertise(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/marketing/home/advertise/create", data);
}

export async function useUpdateChannelHomeAdvertiseStatus(id: string, status: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/marketing/home/advertise/update/status/" + id + "?status=" + status);
}

export async function useDeleteChannelHomeAdvertise(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/marketing/home/advertise/delete?ids=" + ids);
}

export async function useGetChannelHomeAdvertise(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: MmsHomeAdvertise,
    }>("marketing_api/marketing/home/advertise/" + id);
}

export async function useUpdateChannelHomeAdvertise(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("marketing_api/marketing/home/advertise/update/" + id, data);
}