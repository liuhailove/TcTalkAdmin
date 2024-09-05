import http from "../utils/http.ts";
import {UmsResource} from "../model/ums_resource.ts";

export async function useFetchList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UmsResource>,
            total: number,
        },
    }>("admin_api/resource/list", params)
}

export async function useCreateResource(data: UmsResource) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/resource/create", data);
}

export async function useUpdateResource(id: string, data: UmsResource) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/resource/update/" + id, data);
}

export async function useDeleteResource(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/resource/delete/" + id);
}

export async function useFetchAllResourceList() {
    return await http.get<{
        code: number,
        message: string,
        data: UmsResource,
    }>("admin_api/resource/listAll");
}