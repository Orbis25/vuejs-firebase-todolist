import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from '@/components/Login'
import Register from '@/components/Register'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:"*",
      redirect: '/login'
    }
    ,
    {
      path: "/",
      name: "home",
      component: HelloWorld,
      meta: { requiredAuth: true }
    },
    {
      path: "/login",
      name:'auth',
      component:Login,
      meta: { requiredAuth: false }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta: { requiredAuth: false }
      
    }
  ]
});
