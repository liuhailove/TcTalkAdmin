import http from "../utils/http.ts";
import {SmsHomeAdvertise} from "../model/sms_home_advertise.ts";

export async function useFetchList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<SmsHomeAdvertise>,
            total: number,
        },
    }>("admin_api/home/advertise/list", params)
}

export async function useCreateHomeAdvertise(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/home/advertise/create", data);
}

export async function useUpdateStatus(id: string, status: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/home/advertise/update/status/" + id + "?status=" + status);
}

export async function useDeleteHomeAdvertise(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/home/advertise/delete?ids=" + ids);
}

export async function useGetHomeAdvertise(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: SmsHomeAdvertise,
    }>("admin_api/home/advertise/" + id);
}

export async function useUpdateHomeAdvertise(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api//home/advertise/update/" + id, data);
}