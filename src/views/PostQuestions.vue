<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="container-fluid mt-2">
        <div class="row">
          <div class="col-xl-8 order-xl-1">
            <card shadow type="secondary">
              <div slot="header" class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Add Questions</h3>
                  </div>
                </div>
              </div>
              <template>
                <!-- <form @submit.prevent> -->
                <form role="form">
                  <h6 class="heading-small text-muted mb-4">Question</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-sm-6">
                        <el-select v-model="team1" slot="prepend" placeholder="Match Between">
                          <el-option label="IND" value="IND"></el-option>
                          <el-option label="AUS" value="AUS"></el-option>
                          <el-option label="ENG" value="ENG"></el-option>
                          <el-option label="NZ" value="NZ"></el-option>
                          <el-option label="SA" value="SA"></el-option>
                          <el-option label="PAK" value="PAK"></el-option>
                          <el-option label="AFG" value="AFG"></el-option>
                          <el-option label="WI" value="WI"></el-option>
                          <el-option label="SL" value="SL"></el-option>
                          <el-option label="BAN" value="BAN"></el-option>
                        </el-select>
                        <i class="container">vs</i>
                        <el-select v-model="team2" slot="prepend" placeholder="Match Between">
                          <el-option label="IND" value="IND"></el-option>
                          <el-option label="AUS" value="AUS"></el-option>
                          <el-option label="ENG" value="ENG"></el-option>
                          <el-option label="NZ" value="NZ"></el-option>
                          <el-option label="SA" value="SA"></el-option>
                          <el-option label="PAK" value="PAK"></el-option>
                          <el-option label="AFG" value="AFG"></el-option>
                          <el-option label="WI" value="WI"></el-option>
                          <el-option label="SL" value="SL"></el-option>
                          <el-option label="BAN" value="BAN"></el-option>
                        </el-select>
                        <!-- <base-dropdown label="match between" placeholder="enter">aa</base-dropdown> -->
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <base-input
                          alternative
                          label="Question"
                          placeholder="enter here"
                          input-classes="form-control-alternative"
                          v-model="model.question"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="option 1"
                          placeholder="option"
                          input-classes="form-control-alternative"
                          v-model="model.option1"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="option 2"
                          placeholder="option"
                          input-classes="form-control-alternative"
                          v-model="model.option2"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="option 3"
                          placeholder="option"
                          input-classes="form-control-alternative"
                          v-model="model.option3"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="option 4"
                          placeholder="option"
                          input-classes="form-control-alternative"
                          v-model="model.option4"
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <base-button block type="primary" @click="PostQuest">Submit</base-button>
                  <!-- Address -->
                  <!-- <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative
                        label="Address"
                        placeholder="Home Address"
                        input-classes="form-control-alternative"
                        v-model="model.address"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="City"
                        placeholder="City"
                        input-classes="form-control-alternative"
                        v-model="model.city"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Country"
                        placeholder="Country"
                        input-classes="form-control-alternative"
                        v-model="model.country"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Postal code"
                        placeholder="Postal code"
                        input-classes="form-control-alternative"
                        v-model="model.zipCode"
                      />
                    </div>
                  </div>
                </div>
                  <hr class="my-4">-->
                  <!-- Description -->
                  <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <base-input alternative label="About Me">
                      <textarea
                        rows="4"
                        class="form-control form-control-alternative"
                        placeholder="A few words about you ..."
                      >A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                    </base-input>
                  </div>-->
                  <!-- </div> -->
                </form>
              </template>
            </card>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import { base_url } from "../../config";
import axios from "axios";

export default {
  name: "user-profile",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);

    return {
      full_name: decoded.identity.full_name,
      team1: null,
      team2: "",
      model: {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        added_by: this.full_name,
        teams: this.team1 + " vs " + this.team2
      }
    };
  },
  methods: {
    RefToken() {
      var rurl = base_url + "refresh";
      var ref_token = localStorage.getItem("refreshtoken");
      var usertoken = localStorage.getItem("usertoken");
      // var config = {
      //   headers: { Authorization: "bearer " + ref_token }
      // };
      // this.axios.post(rurl, config).then(res => {
      //   console.log(res.data);
      //   localStorage.setItem("access_token", res.data.access_token);
      // });
      // axios.defaults.baseURL = rurl;
      // axios.defaults.headers.common = { Authorization: `Bearer ${usertoken}` };
    },
    PostQuest() {
      var url = base_url + "questions";
      // console.log(this.model)
      console.log(this.team1 + " vs " + this.team2);
      this.axios
        .post(url, {
          question: this.model.question,
          option1: this.model.option1,
          option2: this.model.option2,
          option3: this.model.option3,
          option4: this.model.option4,
          added_by: this.model.added_by,
          teams_playing: this.team1 + " vs " + this.team2
        })
        .then(res => {
          console.log(this.teams_playing);
          console.log(res);
          console.log(res.data.result);
          // this.$router.push({ name: "login" });
          // this.$notify({
          //   type: "default",
          //   message: res.data.result.email + " Successfully "
          // });
          this.$notify({
            type: "primary",
            message: res.data.msg + " Successfully "
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
          console.log(err);
          this.RefToken();
          // this.$router.go();
        });
    }
  },

  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      // this.$router.go(-1);
      this.$notify({
        type: "danger",
        message: "Please login to continue"
      });
    }
  }
};
</script>
<style>
.el-select .el-input {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
