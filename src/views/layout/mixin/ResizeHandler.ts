import {onMounted, onBeforeUnmount, watch, toRefs} from 'vue';
import {useRoute} from 'vue-router';
import {useAppStore} from "@/store/app_store.ts";

const {body} = document;
const WIDTH = 1024;
const RATIO = 3;

export default {
    setup() {
        const {toggleDevice, closeSideBar} = useAppStore();
        const {device, sidebar} = toRefs(useAppStore());

        const route = useRoute();

        const isMobile = () => {
            const rect = body.getBoundingClientRect();
            return rect.width - RATIO < WIDTH;
        };

        const resizeHandler = () => {
            if (!document.hidden) {
                const isMobileDevice = isMobile();
                toggleDevice(isMobileDevice ? 'mobile' : 'desktop');
                if (isMobileDevice) {
                    closeSideBar(true);
                }
            }
        };

        watch(
            () => route.path,
            () => {
                if (device.value === 'mobile' && sidebar.value.opened) {
                    closeSideBar(false);
                }
            }
        );

        onMounted(() => {
            const isMobileDevice = isMobile();
            if (isMobileDevice) {
                toggleDevice('mobile');
                closeSideBar(true);
            }
            window.addEventListener('resize', resizeHandler);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', resizeHandler);
        });
    }
};
