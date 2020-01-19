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
                    <span v-if="editmode===false">
                      <h3 class="mb-0">Add Question Group</h3>
                    </span>
                    <span v-else>
                      <h3 class="mb-0" id="edit_id">Edit Question Group</h3>
                    </span>
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
                          label="Score per question"
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
                        <!-- <el-input></el-input> -->
                      </div>
                      <h5 style="margin-left:20px">Description</h5>
                      <textarea
                        required
                        label="Description"
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
                        placeholder="Write description here ..."
                        v-model="description"
                        style="margin:20px"
                      ></textarea>
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
                  <span v-if="editmode==false">
                    <base-button block type="primary" @click="PostQuest" v-loading="loading">Add</base-button>
                  </span>
                  <span v-if="editmode==true">
                    <base-button block type="primary" @click="PostQuest" v-loading="loading">Update</base-button>
                  </span>
                </el-form>
                <!-- </form> -->
              </template>
            </card>
          </div>
        </div>
      </div>
    </base-header>
    <span v-for="data in groupData" v-bind:key="data.gid" class="container">
      <base-button block type="default mt-3 " v-on:click="navigate(data.gid,data.teams_playing)">
        <small>{{data.gid}}</small>
        <!-- <badge type="black">{{data.added_on.$date}}</badge> -->
        <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
        <el-divider content-position="center">{{data.teams_playing}}</el-divider>
        <span>
          <i>
            Score is
            {{data.group.score}}
          </i>
        </span>
        <el-divider direction="vertical"></el-divider>
        <span>
          <i>Bonus is {{data.group.bscore}}</i>
        </span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <el-divider></el-divider> -->
        <br />
        <small>{{" ( added by "+ data.added_by+", "}}</small>
        <!-- <small>{{", "+ data.added_on.$date | moment("from", true) }} ago )</small> -->
        <small>{{ data.added_on.$date | moment("from", true) }} ago )</small>
        <br />
        <small>{{ data.description}}</small>
        <br />
        <span>
          <!-- <strong>{{data.teams_playing}}</strong> -->
          <strong>
            <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editGroup(data.gid)"></el-button> -->
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteGroup(data.gid)"></el-button>
          </strong>
        </span>
      </base-button>
    </span>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import { base_url } from "../../config";
import axios from "axios";
// import moment from "vue-moment";

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
      editmode: false,
      loading: false,
      full_name: decoded.identity.full_name,
      team1: null,
      team2: null,
      description: "",
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
    navigate(qgid, teams) {
      this.$router.push({
        name: "question qroups",
        params: { gid: qgid, teams: teams }
      });
    },
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
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        weekday: "short",
        year: "numeric",
        month: "long"
      };
      this.loading = true;
      var url = base_url + "questiongroups";
      this.axios
        .get(url)
        .then(res => {
          this.groupData = res.data.result;
          // this.groupData = this.groupData.map(data => {
          //   data.added_on = new Date(data.added_on.$date).moment.updateLocale(
          //     "en",
          //     options
          //   );
          //   return data;
          // });
        })
        .catch(err => {
          this.$notify({
            type: "danger",
            message: err
          });
        });
      this.loading = false;
    },
    // editGroup(gid) {
    //   this.editmode = true;
    //   var url = base_url + "editgroup/" + gid;
    //   this.axios.get(url).then(res=>
    //   this.group.score=
    //   this.group.bscore=
    //   this.teams_playing=
    //   )
    // },
    editGroup_() {
      // var url = base_url + "editgroup/" + gid;
      // this.axios
      //   .post(url, {
      //     group: this.dynamicValidateForm,
      //     added_by: this.full_name,
      //     teams_playing: this.team1 + " vs " + this.team2
      //   })
      //   .then(res => {
      //     this.$notify({
      //       type: "primary",
      //       message: res.data.msg + " Successfully "
      //     });
      //     this.getGroups();
      //   });
      this.editmode = false;
    },
    deleteGroup(gid) {
      var url = base_url + "deletegroup/" + gid;
      this.$confirm(
        "This will delete the question group. Continue?",
        "Delete!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error"
        }
      )
        .then(() => {
          this.axios.delete(url).then(response => {
            this.$notify({
              type: "warning",
              message: response.data.msg
            });
            this.getGroups();
          });
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "action cancelled"
          });
        });
    },
    PostQuest() {
      this.loading = true;
      var url = base_url + "questiongrp";
      this.axios
        .post(url, {
          group: this.dynamicValidateForm,
          added_by: this.full_name,
          teams_playing: this.team1 + " vs " + this.team2,
          description: this.description
        })
        .then(res => {
          this.$notify({
            type: "primary",
            message: res.data.msg + " Successfully "
          });
          this.getGroups();
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
          console.log(err);
          this.RefToken();
          // this.$router.go();
        });
      this.loading = false;
    }
  },
  mounted() {
    this.getGroups();
  },
  created() {
    // this.getGroups;
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
