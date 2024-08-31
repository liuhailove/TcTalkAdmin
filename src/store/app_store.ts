import {defineStore} from "pinia";
import Cookies from "js-cookie";

export const useAppStore = defineStore("appStore", {
    state: () => {
        return {
            sidebar: {
                opened: !+Cookies.get('sidebarStatus'),
                withoutAnimation: false,
            },
            device: 'desktop',
        }
    },
    getters: {},
    actions: {
        toggleSideBar() {
            if (this.sidebar.opened) {
                Cookies.set('sidebarStatus', "1");
            } else {
                Cookies.set('sidebarStatus', "0");
            }
            this.sidebar.opened = !this.sidebar.opened;
        },
        closeSideBar(withoutAnimation: boolean) {
            Cookies.set('sidebarStatus', "1");
            this.sidebar.opened = false;
            this.sidebar.withoutAnimation = withoutAnimation;
        },
        toggleDevice(device: string) {
            this.device = device;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
});