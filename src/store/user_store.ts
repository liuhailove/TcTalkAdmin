import {defineStore} from "pinia";
import {getToken, setToken} from "@/api/auth.ts";
import {useLogin} from "@/api/login.ts";
import {UserInfo} from "@/model/user_info.ts";
import {useGetInfo, useLogout} from "../api/login.ts";
import {removeToken} from "../api/auth.ts";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            token: getToken(),
            name: '',
            avatar: '',
            roles: [],
        }
    },
    getters: {},
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setName(name: string) {
            this.name = name;
        },
        setAvatar(avatar: string) {
            this.avatar = avatar;
        },
        setRoles(roles: []) {
            this.roles = roles;
        },

        async login(userInfo: UserInfo) {
            try {
                const username = userInfo.username.trim();
                const response = await useLogin(username, userInfo.password);
                const data = response.data;
                const tokenStr = `${data.tokenHead}${data.token}`;
                // 设置 token
                setToken(tokenStr);
                // 更新 store 中的 token 状态
                this.token = tokenStr;
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        },

        // 获取用户信息
        async getInfo() {
            try {
                const {data} = await useGetInfo();
                // 验证返回的roles是否是一个非空数组
                if (data.roles && data.roles.length > 0) {
                    this.setRoles(data.roles);
                } else {
                    return Promise.reject("getInfo: roles 必需是非空数组");
                }
                this.setName(data.username);
                this.setAvatar(data.icon);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        },

        // 登出
        async logOut() {
            try {
                await useLogout();
                this.setToken("");
                this.setRoles([]);
                removeToken();
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        },

        // 前端 登出
        async fedLogout() {
            try {
                this.setToken("");
                this.setRoles([]);
                removeToken();
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
});