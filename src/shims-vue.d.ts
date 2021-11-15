/* eslint-disable */
import {Store} from "vuex";

declare module '*.vue' {
  import {DefineComponent} from 'vue';
  const component: DefineComponent;
  export default component;
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $store: Store
  }
}

