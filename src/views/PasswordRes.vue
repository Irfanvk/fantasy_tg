<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign up with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/github.svg" />
              </span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/google.svg" />
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
            <h3>Reset Password</h3>
          </div>
        </div>
        <div id="beforeotp" class="card-body px-lg-5 py-lg-5" v-if="flag==0">
          <div class="text-center text-muted mb-4">
            <small>Enter your email id</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>
            <div class="text-center">
              <base-button type="danger" class="my-4" v-on:click="resetVerify">
                <i v-if="loading==true" class="fa fa-spinner fa-spin"></i> Submit
              </base-button>
            </div>
          </form>
        </div>
        <div id="afterotp" class="card-body px-lg-5 py-lg-5" v-if="flag==1">
          <div class="text-center text-muted mb-4">
            <small>Enter your new password</small>
          </div>
          <form role="form">
            <div id="mainselection"></div>
            <base-input
              class="input-group-alternative"
              placeholder="OTP here"
              addon-left-icon="el-icon-key"
              v-model="model.otp_value"
            ></base-input>
            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>
            <base-input
              class="input-group-alternative"
              placeholder="Confirm password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.confirmpass"
            ></base-input>

            <div class="text-center">
              <base-button type="danger" class="my-4" v-on:click="resetPassword">
                <i v-if="loading==true" class="fa fa-spinner fa-spin"></i> Submit
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <!-- <small>Forgot password?</small> -->
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { base_url } from "../../config";
export default {
  name: "reset",
  data() {
    return {
      loading: false,
      flag: 0,
      model: {
        full_name: "",
        email: "",
        otp_value: "",
        password: "",
        confirmpass: ""
      }
    };
  },
  methods: {
    resetVerify() {
      this.loading = true;
      var url = base_url + "resetrequest";
      if (this.model.email === "") {
        this.$alert("Email cannot be blank", "Error", {
          confirmButtonText: "OK"
        });
        this.loading = false;
        return;
      }
      this.axios
        .post(url, {
          email: this.model.email
        })
        .then(res => {
          this.$notify({
            title: res.data.title,
            type: res.data.type,
            message: res.data.msg
          });
          this.loading = false;
          this.flag = res.data.flag;
          this.$notify({
            type: "primary",
            message: res.data.result.email
          });
        })
        .catch(err => {
          // console.log(err, "aaa");
        });
    },
    resetPassword() {
      var url2 = base_url + "reset/" + this.model.otp_value;
      if (this.model.otp_value === "") {
        this.$alert("Please enter the otp", "Error", {
          confirmButtonText: "OK"
        });
        return;
      }
      if (this.model.password === "") {
        this.$alert("Please enter your password", "Error", {
          confirmButtonText: "OK"
        });
        return;
      }
      // if (this.model.password.match(/.{6,}/)) {
      //   this.$alert("Password must be atleast 6 characters", "Error", {
      //     confirmButtonText: "OK"
      //   });
      //   return;
      // }
      if (this.model.password !== this.model.confirmpass) {
        // this.$alert({ type: "danger", message: "Password doesn't match!" });
        this.$alert("Password doesn't match!", "Error", {
          confirmButtonText: "OK"
        });
        this.model.password = "";
        this.model.confirmpass = "";
        return;
      }
      this.axios.post(url2, { password: this.model.password }).then(res => {
        this.$notify({
          title: res.data.title,
          type: res.data.type,
          message: res.data.msg
        });
        if (res.data.retry === false) {
          this.$router.push({ name: "login" });
        }
      });
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
.el-message-box {
  width: auto;
}
#mainselection select {
  border: 0;
  /* color: #eee; */
  background: transparent;
  /* font-size: 20px; */
  font-weight: bold;
  /* padding: 2px 10px; */
  /* width: auto; */
  /* *width: 350px; */
  *background: #58b14c;
  -webkit-appearance: none;
}
</style>
