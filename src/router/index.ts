import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {ApplicationContext} from "@/common/ApplicationContext";
import {Login} from "@/views/login/Login";
import {MainFrame} from "@/views/MainFrame";
import {useStore} from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login1",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: MainFrame,
    children: [
      {
        path: '/',
        name: 'home',
        component: ApplicationContext.getMenuFunc("test1"),
        props: {textToShow: "home", properties: {menuId: "xxx"}}
      },
      {
        path: '/1',
        name: 'test1',
        component: ApplicationContext.getMenuFunc("test1"),
        props: {textToShow: "test1", properties: {menuId: "xxx"}}
      },
      {
        path: '/2',
        name: 'test2',
        component: ApplicationContext.getMenuFunc("test2"),
        props: {textToShow: "test2", properties: {menuId: "xxx"}}
      },
      {
        path: '/3',
        name: 'test3',
        component: ApplicationContext.getMenuFunc("test3"),
        props: {textToShow: "test3", properties: {menuId: "xxx"}}
      },
    ]
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !useStore().state.app.isLogin) {
    next({name: 'login'})
  } else {
    next()
  }
});

export default router
