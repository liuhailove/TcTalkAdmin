import http from "../utils/http.ts";
import {CtChannel} from "../model/ct_channel.ts";
import {CtTag} from "../model/ct_tag.ts";
import {CategoryWithChildrenItem, CtCategory, CtCategoryTagRelation} from "../model/ct_category.ts";


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

/******************tag*****************/
export async function useFetchTagList(name: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<CtTag>,
            total: string,
        },
    }>("category_api/ct/tag/list?name=" + name + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useFetchTagAll() {
    return await http.get<{
        code: number,
        message: string,
        data: Array<CtTag>
    }>("category_api/ct/tag/listAll");
}

export async function useCreateTag(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/tag/create", data);
}

export async function useUpdateTag(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/update/" + id, data);
}


export async function useDeleteTag(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/tag/delete/" + id)
}

/**************************category****************************/
export async function useFetchCategoryList(parentId: string, nameKeyword: string, pageSize: number, pageNum: number) {
    return await http.get<{
        code: number,
        message: string,
        data: {
            list: Array<CtCategory>,
            total: string,
        },
    }>("category_api/ct/category/list/" + parentId + "?nameKeyword=" + nameKeyword + "&pageSize=" + pageSize + "&pageNum=" + pageNum)
}

export async function useCreateCategory(data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/create", data);
}

export async function useUpdateCategory(id: string, data: any) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/update/" + id, data);
}


export async function useDeleteCategory(id: string) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/delete/" + id)
}

export async function useGetCategory(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: CtCategory,
    }>("category_api/ct/category/" + id);
}

export async function useUpdateNavStatus(ids: Array<string>, navStatus: number) {
    return await http.post<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/update/navStatus?ids=" + ids + "&navStatus=" + navStatus);
}

export async function useUpdateShowStatus(ids: Array<string>, showStatus: number) {
    return await http.post<{
        code: number,
        message: string,
        data: Array<CategoryWithChildrenItem>,
    }>("category_api/ct/category/update/showStatus?ids=" + ids + "&showStatus=" + showStatus);
}

export async function useListWithChildren() {
    return await http.get<{
        code: number,
        message: string,
        data: number,
    }>("category_api/ct/category/list/withChildren");
}

export async function useGetCategoryTagRelation(id: string) {
    return await http.get<{
        code: number,
        message: string,
        data: Array<CtCategoryTagRelation>,
    }>("category_api/ct/category/getCategoryTagRelation/" + id);
}