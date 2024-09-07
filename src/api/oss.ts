import http from "../utils/http.ts";

export async function usePolicy() {
    return await http.get<{
        data: any
    }>('/aliyun/oss/policy');
}