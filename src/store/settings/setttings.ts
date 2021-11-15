import {getModule, VuexModule} from "vuex-module-decorators";

export interface SettingsState {
  opt1: string,

}


class Settings extends VuexModule implements SettingsState {
  opt1 = ""

}

export const SettingsModule = getModule(Settings);
