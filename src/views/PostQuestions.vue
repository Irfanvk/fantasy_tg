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
                    <h3 class="mb-0">Add Question Group</h3>
                  </div>
                </div>
              </div>
              <template>
                <!-- <form @submit.prevent> -->
                <!-- <form role="form"> -->
                <el-form
                  :model="dynamicValidateForm"
                  ref="dynamicValidateForm"
                  label-width="120px"
                  class="demo-dynamic"
                  label-position="top"
                >
                  <h6 class="heading-small text-muted mb-4">Teams</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-sm-12">
                        <el-select
                          id="postteam"
                          v-model="team1"
                          slot="prepend"
                          placeholder="Match Between"
                          style="padding:10px"
                        >
                          <el-option
                            v-for="tm in teamlist"
                            v-bind:value="tm.value"
                            v-bind:key="tm.label"
                          >{{ tm.label }}</el-option>
                        </el-select>
                        <i class="container">vs</i>
                        <el-select
                          id="postteam"
                          v-model="team2"
                          slot="prepend"
                          placeholder="Match Between"
                          style="padding:10px"
                          :rules="[{ required: true, message: 'Please select a Team', trigger: 'change' }]"
                        >
                          <el-option
                            v-for="tm in teamlist"
                            v-bind:value="tm.value"
                            v-bind:key="tm.label"
                          >{{ tm.label }}</el-option>
                        </el-select>
                        <!-- <base-dropdown label="match between" placeholder="enter">aa</base-dropdown> -->
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <el-form-item
                          label="Score"
                          prop="score"
                          :rules="[{ required: true, message: 'Score is required'},
                          { type: 'number', message: 'this must be a number'}]"
                        >
                          <el-input
                            type="age"
                            class="col-sm-4"
                            v-model.number="dynamicValidateForm.score"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-lg-6">
                        <el-form-item
                          label="Bonus Score"
                          prop="bscore"
                          :rules="[{ required: true, message: 'Score is required'},
                          { type: 'number', message: 'this must be a number'}]"
                        >
                          <el-input
                            type="age"
                            class="col-sm-4"
                            v-model.number="dynamicValidateForm.bscore"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <!-- <div class="row">
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
                    </div>-->
                  </div>
                  <hr class="my-4" />
                  <base-button block type="primary" @click="PostQuest" v-loading="loading">Add</base-button>
                </el-form>
                <!-- </form> -->
              </template>
            </card>
          </div>
        </div>
      </div>
    </base-header>
    <span v-for="data in groupData" v-bind:key="data.gid">
      <base-button block type="default mt-3 " style>
        <small>{{data.series_name}}</small>
        <br />
        <span>
          <strong>{{data.team1.name +" vs "+data.team2.name}}</strong>
        </span>
        <badge type="black">{{data.match_id}}</badge>
        <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
        <el-divider content-position="left">{{data.header.status}}</el-divider>
        <span>{{data.header.type}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{data.header.match_desc}}</span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <el-divider></el-divider> -->
        <br />
        <small>{{data.venue.name}}</small>
        <small>{{" ("+ data.venue.location}} )</small>
      </base-button>
    </span>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import { base_url } from "../../config";
import axios from "axios";

export default {
  name: "post-quest",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);

    return {
      dynamicValidateForm: {
        score: "10",
        bscore: "5"
      },
      loading: false,
      full_name: decoded.identity.full_name,
      team1: null,
      team2: "",
      teamlist: [
        { label: "CSK", value: "CSK", name: "Chennai Super Kings" },
        { label: "DC", value: "DC", name: " Delhi Capitals" },
        { label: "KKR", value: "KKR", name: "Kings XI Punjab" },
        { label: "KXIP", value: "KXIP", name: "Kolkata Knight Riders" },
        { label: "MI", value: "MI", name: " Mumbai Indians" },
        { label: "RCB", value: "RCB", name: " Rajasthan Royals" },
        { label: "RR", value: "RR", name: "Royal Challengers Bangalore" },
        { label: "SRH", value: "SRH", name: " Sunrisers Hyderabad" }
      ],
      model: {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        added_by: this.full_name,
        teams: this.team1 + " vs " + this.team2
      },
      groupData: ""
    };
  },
  methods: {
    getUsers() {
      url = base_url + "test";
      this.axios
        .get(url)
        .then(response => {
          this.userData = response.data.status;
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
                localStorage.clear();
                window.location = "/";
              });
          }
          // console.log(err.response);
          this.$notify({
            type: "primary",
            message: err.response.data.msg + ", please login to continue "
          });
        });
    },
    RefToken() {
      var rurl = base_url + "refresh";
      var ref_token = localStorage.getItem("refreshtoken");
      var usertoken = localStorage.getItem("usertoken");
    },
    getGroups() {
      var loading = true;
      var url = base_url + "questiongroups";
      this.axios
        .get(url)
        .then(res => {
          this.groupData = res.data.result;
          console.log(this.groupData);
        })
        .catch(err => {
          this.$notify({
            type: "danger",
            message: err
          });
        });
    },
    PostQuest() {
      var loading = true;
      var url = base_url + "questiongrp";
      this.axios
        .post(url, {
          group: this.dynamicValidateForm,
          added_by: this.full_name,
          teams_playing: this.team1 + " vs " + this.team2
        })
        .then(res => {
          this.$notify({
            type: "primary",
            message: res.data.msg + " Successfully "
          });
          // this.$router.push({ name: "Questions" });
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
          this.RefToken();
          // this.$router.go();
        });
      var loading = false;
    }
  },
  mounted() {
    this.getGroups;
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
#postteam {
  padding: 10px;
}
</style>
