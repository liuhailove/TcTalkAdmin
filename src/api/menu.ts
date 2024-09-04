import http from "@/utils/http.ts";
import {UmsMenu, UmsMenuNode} from "../model/ums_menu.ts";

export async function useFetchList(parentId: string, params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UmsMenu>,
            total: string,
        },
    }>("admin_api/menu/list/" + parentId, params)
}

export async function useDeleteMenu(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/menu/delete/" + id)
}

export async function useCreateMenu(data: UmsMenu) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/menu/create", data);
}

export async function useUpdateMenu(id: string, data: UmsMenu) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/menu/update/" + id, data);
}

export async function useGetMenu(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: UmsMenu,
    }>("admin_api/menu/" + id);
}

export async function useUpdateHidden(id: string, hidden: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/menu/updateHidden/" + id, hidden);
}

export async function useFetchTreeList() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<UmsMenuNode>,
    }>("admin_api/menu/treeList");
}