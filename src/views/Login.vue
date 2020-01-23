<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/github.svg">
              </span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/google.svg">
              </span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>-->
        <div class="card bg-secondary bg-transparent pb-5">
          <div
            class="text-center mt-6"
            style="display:flex;justify-content:center;align-items:center;"
          >
            <img style="padding-right:1em;" src="img/brand/tpl0.png" width="80" />
            <span
              class
              style="border-right:0.5px dotted #8c8b8b;width:2px;height:3rem;display:inline-block;"
            ></span>
            <!-- <img style="padding-left:1em;" src="img/brand/2019-ICCWC.png" width="80" /> -->
            <img style="padding-left:1em;" src="img/brand/ipl-logo.png" width="90" />
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>sign in with credentials</small>
          </div>

          <!-- Login Form -->
          <form role="form" @submit.prevent="login">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
              aria-required="true"
              data-netlify="true"
              required
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
              required
            ></base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <button
                type="submit"
                class="my-4"
                style="background:#5dcfbd;color:white;font-weight:700;padding:.5em 1em;"
              >
                <i v-if="loading==true" class="fa fa-spinner fa-spin"></i> Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/resetpassword" class="text-light">
            <small>Forgot password?</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { base_url } from "../../config";
import EventBus from "./EventBus";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      model: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.loading = true;
      var url = base_url + "users/login";
      this.axios
        .post(url, {
          email: this.model.email,
          password: this.model.password
        })
        .then(res => {
          if (
            res.data.msg == "invalid login credential" ||
            res.data.msg == "Invalid username or password"
          ) {
            this.$notify({
              type: "warning",
              message: res.data.msg
            });
          }
          this.loading = false;
          localStorage.setItem("usertoken", res.data.result.access_token);
          localStorage.setItem("refreshtoken", res.data.result.refresh_token);
          this.loading = false;

          this.email = "";
          this.password = "";
          this.$notify({
            type: "info",
            message: res.data.full_name + " logged in Successfully "
          });

          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          this.$notify({
            type: "warning",
            message: err.data.msg
          });
        });
      this.emitMethod();
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    }
  },
  beforeCreate() {
    if (localStorage.getItem("usertoken")) {
      this.$router.push({ name: "dashboard" });
      //   this.$router.go(-1);
    }
  }
};
</script>
<style>
</style>
