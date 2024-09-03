import http from "@/utils/http.ts";
import {Menu} from "../model/menu.ts";
import {UsmAdmin} from "../model/ums_admin.ts";

export async function useLogin(username: string, password: string) {
    return await http.post<{
        code: number,
        message: string,
        data: {
            token: string,
            tokenHead: string,
        },
    }>("admin_api/admin/login", {username: username, password: password})
}

export async function useGetInfo() {
    return await http.get<{
        code: number,
        message: string,
        data: {
            username: string,
            icon: string,
            menus: Array<Menu>,
            roles: Array<string>
        },
    }>("admin_api/admin/info");
}

export async function useLogout() {
    return await http.post<{}>("admin_api/admin/logout", {});
}

export async function useFetchList(params: any) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<UsmAdmin>,
            total: number,
        },
    }>("admin_api/admin/list", params);
}

export async function useCreateAdmin(data: UsmAdmin) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/admin/register", data);
}

export async function useUpdateAdmin(id, data: UsmAdmin) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/admin/update/" + id, data);
}

export async function useUpdateStatus(id, params: any) {
    return await http.post<{}>("admin_api/admin/updateStatus" + id, params);
}

export async function useDeleteAdmin(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("admin_api/admin/delete/" + id);
}

export async function useGetRoleByAdminId(id: string) {
    return await http.get<{}>("admin_api/admin/role/" + id);
}

export async function useAllocRole(adminId: string, roleIds: Array<string>) {
    return await http.post<{}>("admin_api/admin/role/update?adminId=" + adminId + "&roleIds=" + roleIds,);
}