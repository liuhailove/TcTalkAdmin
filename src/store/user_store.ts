import {defineStore} from "pinia";
import {getToken, setToken} from "@/api/auth.ts";
import {useLogin} from "@/api/login.ts";
import {UserInfo} from "@/model/user_info.ts";

export const userStore = defineStore("userStore", {
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
    }
});