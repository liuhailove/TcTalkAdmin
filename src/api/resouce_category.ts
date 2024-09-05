import http from "../utils/http.ts";
import {UmsResourceCategory} from "../model/ums_resource_category.ts";

export async function useListAllCate() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<UmsResourceCategory>,
    }>("admin_api/resourceCategory/listAll")
}

export async function useCreateResourceCategory(data: UmsResourceCategory) {
    return await http.post<{
        code: number,
        message: string,
        data: number
    }>("admin_api/resourceCategory/create", data)
}

export async function useUpdateResourceCategory(id: string, data: UmsResourceCategory) {
    return await http.post<{
        code: number,
        message: string,
        data: number
    }>("admin_api/resourceCategory/update/" + id, data)
}

export async function useDeleteResourceCategory(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number
    }>("admin_api/resourceCategory/delete/" + id)
}