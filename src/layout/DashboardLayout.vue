<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="TPL"
      title="Target Prediction League"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />
        <!-- <sidebar-item :link="{name: 'Points Table', icon: 'ni ni-collection text-blue', path: '/points'}"/> -->
        <sidebar-item
          :link="{name: 'Points Table', icon: 'fa fa-list-ol text-blue', path: '/points'}"
        />
        <sidebar-item
          :link="{name: 'Questions', icon: 'fa fa-question text-blue', path: '/questions'}"
        />
        <span v-if="admin">
          <sidebar-item
            :link="{name: 'Post Questions', icon: 'ni ni-notification-70 text-red', path: '/postquest'}"
          />
        </span>
        <span v-if="admin">
          <sidebar-item
            :link="{name: 'Post Admin Answer', icon: 'ni ni-notification-70 text-yellow', path: '/adminanswer'}"
          />
        </span>
        <!-- <span v-if="admin">
          <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}" />
        </span>-->
        <sidebar-item
          :link="{name: 'Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"
        />
        <!-- <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/> -->
        <span v-if="admin">
          <sidebar-item
            :link="{name: 'Users', icon: 'ni ni ni-single-02 text-red', path: '/users'}"
          />
          <sidebar-item
            :link="{name: 'Admins', icon: 'ni ni ni-single-02 text-green', path: '/users/admin'}"
          />
          <sidebar-item :link="{name:'Admin Panel', icon: 'ni ni-settings', path:'/adminpanel'}" />
        </span>

        <!-- <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}" /> -->
        <!-- <sidebar-item
          :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"
        />-->
        <sidebar-item
          :link="{name: 'Logout', icon: 'ni ni-button-power text-red', path: '/logout'}"
          @click="logout"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";
import jwtDecode from "jwt-decode";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    // console.log(decoded.identity);
    return {
      full_name: decoded.identity.full_name,
      team: decoded.identity.team,
      mobile: decoded.identity.mobile,
      email: decoded.identity.email,
      admin: decoded.identity.admin,
      sidebarBackground: "vue" //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      localStorage.clear();
    }
  }
};
</script>
<style lang="scss">
</style>
