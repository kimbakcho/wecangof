import Vue from "vue";
import { MyStore } from "../store/types";

declare module "vue/types/vue" {
    interface Vue {
        $store: MyStore;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        store?: MyStore;
    }
}

declare module "naver_id_login"

declare global {
    interface Window { popStateDetected : boolean; }
}

