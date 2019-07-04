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
            <img style="padding-right:1em;" src="img/brand/tpl0.png" width="80" />
            <span
              class
              style="border-right:0.5px dotted #8c8b8b;width:2px;height:3rem;display:inline-block;"
            ></span>
            <img style="padding-left:1em;" src="img/brand/2019-ICCWC.png" width="80" />
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>sign up with credentials</small>
          </div>
          <form role="form">
            Pick
            <base-dropdown v-model="model.team">
              <base-button slot="title" type="secondary" class="dropdown-toggle">Your Team</base-button>
              <option
                class="dropdown-item"
                v-for="tm in model.teams"
                v-bind:key="tm.abbr"
                v-bind:value="tm"
                v-on:click="displ(tm.abbr)"
              >{{ tm.name }}</option>
            </base-dropdown>
            <el-tag size="mini" v-if="model.team!==''">{{model.team}}</el-tag>
            <!-- <select v-model="model.team">
              <option
                v-for="tm in model.teams"
                v-bind:key="tm.abbr"
                v-bind:value="{ abbr: tm.abbr, name: tm.name }"
              >{{ tm.name }}</option>
            </select>-->
            <base-input
              class="input-group-alternative mb-3 mt-2"
              placeholder="Full Name"
              addon-left-icon="ni ni-hat-3"
              v-model="model.full_name"
              required
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>

            <!-- <base-input
              class="input-group-alternative mb-3"
              placeholder="Team"
              addon-left-icon="ni ni-hat-3"
              v-model="model.team"
            ></base-input>-->

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Mobile number"
              addon-left-icon="fa fa-mobile"
              v-model="model.mobile"
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
            <!-- <span v-if="model.password!==model.confirmpass">password doesn't match</span> -->

            <div class="text-muted font-italic">
              <small>
                <!-- password strength: -->
                <span class="text-success font-weight-700"></span>
              </small>
            </div>

            <div class="row my-4">
              <div class="col-12">
                <!-- <base-checkbox class="custom-control-alternative" required>
                  <span class="text-muted">
                    I agree with the
                    <a href="#!">Privacy Policy</a>
                  </span>
                </base-checkbox>-->
              </div>
            </div>
            <div class="text-center">
              <base-button type="danger" class="my-4" v-on:click="register">Create account</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
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
  name: "register",
  data() {
    return {
      selected: "",
      products: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" }
      ],
      model: {
        full_name: "",
        email: "",
        password: "",
        confirmpass: "",
        mobile: "",
        team: "",
        // teams: [
        //   { abbr: "CSK.", name: "Chennai Super Kings." },
        //   { abbr: "DC.", name: " Delhi Capitals." },
        //   { abbr: "KXIP.", name: "Kings XI Punjab." },
        //   { abbr: "KKR.", name: "Kolkata Knight Riders." },
        //   { abbr: "MI.", name: " Mumbai Indians." },
        //   { abbr: "RR.", name: " Rajasthan Royals." },
        //   { abbr: "RCB.", name: "Royal Challengers Bangalore." },
        //   { abbr: "SRH.", name: " Sunrisers Hyderabad." }
        // ]
        teams: [
          { abbr: "IND.", name: "India." },
          { abbr: "AUS.", name: "Australia." },
          { abbr: "PAK.", name: "Pakistan." },
          { abbr: "SL.", name: "Srilanka." },
          { abbr: "WI.", name: "West Indies." },
          { abbr: "BAN.", name: "Bangladesh." },
          { abbr: "SA.", name: "South Africa." },
          { abbr: "NZ.", name: "New Zealand." },
          { abbr: "AFG.", name: "Afghanistan." },
          { abbr: "ENG.", name: "England." }
        ]
      }
    };
  },
  methods: {
    displ(value) {
      this.model.team = value;
    },
    register() {
      var url = base_url + "users/register";
      if (this.model.full_name === "") {
        this.$alert("Name cannot be blank", "Error", {
          confirmButtonText: "OK"
        });
        return;
      }
      if (this.model.team === "") {
        this.$alert("Please select your team", "Error", {
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
      if (this.model.password !== this.model.confirmpass) {
        // this.$alert({ type: "danger", message: "Password doesn't match!" });
        this.$alert("Password doesn't match!", "Error", {
          confirmButtonText: "OK"
        });
        this.model.password = "";
        this.model.confirmpass = "";
        return;
      }
      if (
        !this.model.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) ||
        this.model.mobile.match(/0{5,}/)
      ) {
        this.$alert("Enter valid mobile number", "Error", {
          confirmButtonText: "OK"
        });
        return;
      }
      // console.log(this.model)
      this.axios
        .post(url, {
          full_name: this.model.full_name,
          email: this.model.email,
          password: this.model.password,
          mobile: this.model.mobile,
          team: this.model.team
        })
        .then(res => {
          this.$router.push({ name: "login" });
          // this.$notify({
          //   type: "default",
          //   message: res.data.result.email + " Successfully "
          // });
          this.$notify({
            type: "primary",
            message: res.data.result.email + " Successfully "
          });
          // this.$notify({
          //   type: "secondary",
          //   message: res.data.result.email + " Successfully "
          // });
          // this.$notify({
          //   type: "success",
          //   message: res.data.result.email + " Successfully "
          // });
          // this.$notify({
          //   type: "info",Blood
          //   message: res.data.result.email + " Successfully "
          // });
        })
        .catch(err => {
          // console.log(err);
          this.$router.go();
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
</style>
