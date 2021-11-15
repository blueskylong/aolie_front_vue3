import {createLogger, createStore, Store as VuexStore} from 'vuex'
import {AppState} from "@/store/app/app";

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export interface RootState {
  app: AppState
  // settings: SettingsState,
}

export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
// export type SettingsStore<S = SettingsState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
export type Store = AppStore<Pick<RootState, 'app'>> //& SettingsStore<Pick<RootState, 'settings'>>

export const store = createStore({
  modules: {

  }
})

export function useStore(): Store {
  return store as Store
}

