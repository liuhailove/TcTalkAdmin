import http from "@/utils/http.ts";
import {UmsRole} from "../model/ums_role.ts";
import {UsmAdmin} from "../model/ums_admin.ts";

export async function useFetchList(keyword: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UsmAdmin>,
            total: string,
        },
    }>("admin_api/role/list?keyword=" + keyword + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateRole(role: UmsRole) {
    return await http.post<{
        code: number,
        message: string,
    }>("admin_api/role/create", role);
}

export async function useUpdateRole(id: string, role: UmsRole) {
    return await http.post<{
        code: number,
        message: string,
    }>("admin_api/role/update/" + id, role);
}


export async function useUpdateStatus(id: string, status: number) {
    return await http.post<{}>("admin_api/role/updateStatus/" + id + "?status=" + status);
}

export async function useDeleteRole(ids: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
    }>("admin_api/role/delete?ids=" + ids);
}

export async function useFetchAllRoleList() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<UmsRole>,

    }>("admin_api/role/listAll")
}

export async function listMenuByRole(roleId: string) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UmsRole>,
        },
    }>("admin_api/role/listMenu/" + roleId)
}

export async function listResourceByRole(roleId: string) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UmsRole>,
        },
    }>("admin_api/role/listResource/" + roleId)
}

export async function useAllocMenu(id: string, menuIds: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
    }>("admin_api/role/allocMenu?roleId=" + id + "&menuIds=" + menuIds)
}


export async function allocResource(id: string, resourceIds: Array<string>) {
    return await http.post<{
        code: number,
        message: string,
    }>("admin_api/role/allocResource?id=" + id + "&resourceIds" + resourceIds)
}