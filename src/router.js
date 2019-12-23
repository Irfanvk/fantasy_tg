import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [{
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [{
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/points',
          name: 'points table',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/PointsTable.vue')
        },
        {
          path: '/questions',
          name: 'Questions',
          component: () => import('./views/Questions.vue')
        },
        {
          path: '/postquest',
          name: 'Post Questions',
          component: () => import('./views/PostQuestions.vue')
        },
        {
          path: '/adminanswer',
          name: 'Admin Answer',
          component: () => import('./views/AdminAnswer.vue')
        },
        {
          path: '/postadminanswer/:qid',
          name: 'Post Admin Answer',
          component: () => import('./views/PostadminAnswer.vue')
        },
        {
          path: '/questions/:qid',
          name: 'Answer Questions',
          component: () => import('./views/AnsQuestions.vue')
        },
        {
          path: '/allquestions',
          name: 'All Questions',
          component: () => import('./views/AllQuestions.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import('./views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import('./views/Tables.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/Users.vue')
        },
        {
          path: '/users/admin',
          name: 'admin users',
          component: () => import('./views/UsersAdmin.vue')
        },
        {
          path: '/adminpanel',
          name: 'admin panel',
          component: () => import('./views/AdminPanel.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [{
          path: '/login',
          name: 'login',
          component: () => import( /* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/logout',
          name: '/logout',
          component: () => import( /* webpackChunkName: "demo" */ './views/Logout.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import( /* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path: '/resetpassword',
          name: 'Password reset',
          component: () => import('./views/PasswordRes.vue')
        }
      ]
    }
  ]
})