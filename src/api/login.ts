import http from "@/utils/http.ts";

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

export async function getInfo() {
    return await http.get<{
        code: number,
        cookie: string,
        token: string,
    }>("admin_api/admin_info");
}

export async function logout() {
    return await http.post<{}>("admin_api/admin/logout", {});
}

export async function fetchList(params: any) {
    return await http.get<{}>("admin_api/admin/list", {params: params});
}

export async function createAdmin(data: any) {
    return await http.post<{}>("admin_api/admin/register", data);
}

export async function updateAdmin(id, data: any) {
    return await http.post<{}>("admin_api/admin/update" + id, data);
}

export async function updateStatus(id, params: any) {
    return await http.post<{}>("admin_api/admin/updateStatus" + id, params);
}

export async function deleteAdmin(id: string) {
    return await http.post<{}>("admin_api/admin/delete" + id);
}

export async function getRoleByAdminId(id: string) {
    return await http.get<{}>("admin_api/admin/role/" + id);
}

export async function allocRole(data: any) {
    return await http.post<{}>("admin_api/admin/role/update", data);
}