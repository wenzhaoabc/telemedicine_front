import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InquiryView from '../views/InquiryView.vue'
import HeaderView from '../views/HeaderView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MyInfoView from '../views/MyInfoView.vue'
import DoctorInfoView from '../views/DoctorInfoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
   
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/inquiry',
      name: 'inquiry',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InquiryView.vue')
    },
    {
      path: '/header',
      name: 'header',
      component: HeaderView,
      children:[
        {
          path: '/myInfo',
          name: 'myInfo',
          component: MyInfoView,
        },
        {
          path: '/doctorInfo/:id',
          name: 'doctorInfo',
          component: DoctorInfoView,
          props:true
        },
      ]
    },
  ]
})

export default router
