<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}}
          <a
            href="https://www.google.com"
            class="font-weight-bold ml-1"
            target="_blank"
          >TPL</a> &
          <a
            href="https://www.google.com"
            class="font-weight-bold ml-1"
            target="_blank"
          >Target Guyz</a>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <!-- <li class="nav-item">
            <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Creative Tim</a>
          </li>-->
          <li class="nav-item">
            <a href="#" class="nav-link" target="_blank">About Us</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" target="_blank">Blog</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" target="_blank">License</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
import { base_url } from "../../config";
import jwtDecode from "jwt-decode";

export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      email: decoded.identity.email,
      year: new Date().getFullYear()
    };
  },
  methods: {
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
      let url = base_url + "avatar/" + this.email;
      this.axios
        .post(url)
        .then(response => {
          if (response.data.url !== undefined) {
            this.url_img = response.data.url;
            localStorage.setItem("avatar", response.data.url);
          }
        })
        .catch(() => {
          this.$notify({
            message: "You haven't uploaded your avatar",
            type: "info"
          });

          // window.location = "/";
        });
    }
  },
  created() {
    if (!localStorage.getItem("avatar")) {
      this.getAvatar();
    }
  }
};
</script>
<style></style>
