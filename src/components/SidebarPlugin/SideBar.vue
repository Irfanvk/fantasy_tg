<template>
  <nav
    class="navbar navbar-vertical fixed-left fixed-top navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand" to="/">
        <img
          src="../../../public/img/brand/tpl0.png"
          class="navbar-brand-img"
          alt="..."
          width="auto"
        />
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a
              slot="title"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></a>
            <!-- 
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>-->
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Profile" :src="img_url" width="50%" height="95%" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <!-- <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>-->
            <div class="dropdown-divider"></div>
            <a href @click="logout" to="/logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
            <!-- <div class="text-center">
              <base-button type="primary" class="my-4" @click="logout">Sign out</base-button>
            </div>-->
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <!-- <img src="../../../public/img/brand/ipl-logo.png" /> -->
                <!-- <img src="../../../public/img/brand/2019-ICCWC.png" /> -->
                <img src="../../../public/img/logo/apple-touch-icon.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"></slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <!--Heading-->
        <h6 class="navbar-heading text-muted">TPL - Target Prediction League</h6>
        <!--Navigation-->
        <!-- <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard/documentation"
            >
              <i class="ni ni-spaceship"></i> Getting started
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html"
            >
              <i class="ni ni-ui-04"></i> Components
            </a>
          </li>
        </ul>-->
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import { base_url } from "../../../config";
import jwtDecode from "jwt-decode";

export default {
  name: "sidebar",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      email: decoded.identity.email,
      img_url: localStorage.getItem("avatar")
    };
  },
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: "../../../public/img/brand/ipl-logo.png",
      description: "Sidebar app logo"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("avatar");
      var url = base_url + "logout";
      this.axios
        .delete(url)
        .then(res => {
          this.$notify({
            type: "warning",
            message: res.data.message
          });
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          this.$notify({ message: err, type: "warning" });
        });
      // this.emitMethod();
    },
    getAvatar() {
      this.axios.interceptors.request.use(
        config => {
          let token = localStorage.usertoken;

          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }

          return config;
        },

        error => {
          return Promise.reject(error);
        }
      );
      let url = base_url + "avatar/" + this.email + "?sidebar";
      this.axios
        .post(url)
        .then(response => {
          if (response.data.url !== undefined) {
            this.url_img = response.data.url;
            localStorage.setItem("avatar", response.data.url);
          }
        })
        .catch(err => {
          // window.location = "/";
          let reftoken = localStorage.getItem("refreshtoken");
          delete this.axios.defaults.headers.common.Authorization;
          if (err.response && err.response.status === 401) {
            this.axios
              .post(base_url + "refresh", {
                headers: { Authorization: `Bearer ${reftoken}` }
              })
              .then(response => {
                localStorage.setItem("usertoken", response.data.access_token);
              })
              .catch(e => {
                this.$notify({ message: e });
                localStorage.clear();
                window.location = "/";
              });
          }
          this.$notify({
            type: "primary",
            message: err.response.data.msg + ", please login to continue "
          });
        });
    },
    // emitMethod() {
    //   EventBus.$emit("logged-in", "loggedin");
    // },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    }
  },
  created() {
    this.getAvatar();
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>
<style >
@media (max-width: 750px) {
  .fixed-left {
    display: none;
  }
  .fixed-top {
    display: block;
  }
}

@media (min-width: 751px) {
  .fixed-left {
    display: block;
  }
  .fixed-top {
    display: none;
  }
}
</style>