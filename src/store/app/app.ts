/*
 * @Description:
 * @Autor: WJM
 * @Date: 2021-01-16 15:49:20
 * @LastEditors: WJM
 * @LastEditTime: 2021-01-16 16:01:31
 */
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'

import {store} from '@/store'
import {User} from "@/components/sysfunc/user/User";

export interface AppState {
  user: User | null,
  isLogin: boolean,
  sidebar: {
    opened: boolean
  }
  menu: {
    menuId: string,
    menuName: string
  }

}

@Module({dynamic: true, name: 'app', store: store})
class App extends VuexModule implements AppState {
  user: User | null = null;
  isLogin = false;
  public sidebar = {
    opened: true
  }
  public menu = {
    menuId: "",
    menuName: ""
  }

  @Mutation
  private TOGGLE_SIDEBAR() {
    this.sidebar.opened = !this.sidebar.opened
  }

  @Mutation
  private CLOSE_SIDEBAR() {
    this.sidebar.opened = false
  }

  @Mutation
  private setMenuId_(menuId: string) {
    this.menu.menuId = menuId;
  }

  @Mutation
  private   setUser_(user: User | null) {
    this.user = user;
  }

  @Mutation
  private setMenuName_(menuName: string) {
    this.menu.menuName = menuName;
  }

  @Action
  public toggleSideBar() {
    this.TOGGLE_SIDEBAR()
  }

  @Action
  public setUser(user: User | null) {
    if (!user?.userId) {
      user = null;
    }
    this.setUser_(user);
  }

  @Mutation
  private setIsLogin_(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  @Action
  public setIsLogin(isLogin: boolean) {
    this.setIsLogin_(isLogin)
  }

  @Action
  public setMenuId(menuId: string) {
    this.setMenuId_(menuId);
  }

  @Action
  public setMenuName(menuName: string) {
    this.setMenuName_(menuName);
  }


  @Action
  public closeSideBar() {
    this.CLOSE_SIDEBAR()
  }

}

export const AppModule = getModule(App)
