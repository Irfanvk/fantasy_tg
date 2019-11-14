<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      :style="{'background-image': `url('${url_img}')`}"
      style="min-height: 600px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{full_name}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <span v-if="url_img===undefined">
                      <img src="img/theme/team-1-800x800.jpg" class="rounded-circle" />
                    </span>
                    <span v-if="url_img!==undefined">
                      <img :src="url_img" class="rounded-circle" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <!-- <base-button size="sm" type="info" class="mr-4">Connect</base-button> -->
                <!-- <base-button size="sm" type="default" class="float-right">Message</base-button> -->
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4 text-center">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <!-- <div>
                                            <span class="heading">22</span>
                                            <span class="description">Friends</span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">Photos</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comments</span>
                    </div>-->
                  </div>
                </div>
              </div>

              <div class="text-center ni ni-glasses-2 mr-3 mt-6">
                <h3>
                  {{full_name.toUpperCase()}}
                  <!-- <span class="font-weight-light">, 27</span> -->
                </h3>
                <hr class="my-4" />
                <!-- <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>-->
                <div class="h5 mt-3 text-left">
                  <i class="fa fa-mobile fa-lg text-blue mr-3" aria-hidden="true"></i>
                  {{ mobile }}
                </div>
                <div class="h5 mt-3 text-left">
                  <i class="ni ni-email-83 text-blue mr-3" aria-hidden="true"></i>
                  {{ email }}
                </div>
                <div class="h5 mt-3 text-left" v-if="admin==false">
                  <!-- <i class="fas fa-flag"></i> -->
                  <i class="fas fa-flag text-blue mr-3"></i>
                  Team - {{team.toUpperCase()}}
                  <i class="far fa-hand-peace"></i>
                </div>

                <!-- <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p> -->
                <i href="#" v-if="admin" class="text-green">
                  <hr class />
                  <i class="fa fa-star text-red mr-3" aria-hidden="true"></i>
                  '{{full_name}}' has admin privileges
                </i>
              </div>
              <!-- upload image for profile pic -->
              <br />
              <el-button
                type="text"
                @click="dialogVisible = true"
              >click here to change profile picture</el-button>

              <el-dialog
                title="Change profile picture"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
              >
                <span>
                  <!-- http://127.0.0.1:5000/upload -->
                  <!-- :action="'http://127.0.0.1:5000/upload/'+email" -->
                  <el-upload
                    class="upload"
                    :action="base_url+'upload/'+email"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    list-type="picture-card"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <i class="el-icon-plus"></i>
                    <!-- <el-button size="small" type="primary" @change="handleSubmit">Click to upload</el-button> -->
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
                </span>
              </el-dialog>
              <div class="mt-3"></div>
            </div>
          </div>
        </div>

        <!-- <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">My account</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
        </div>-->
        <!-- <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Full Name"
                        placeholder="Full Name"
                        input-classes="form-control-alternative"
                        v-model="model.full_name_"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email address"
                        placeholder="example@example.com"
                        input-classes="form-control-alternative"
                        v-model="model.email_"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        v-model="model.firstName"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        v-model="model.lastName"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4">
        <!-- Address-->
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
                <hr class="my-4">
        <!-- Description-->
        <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="About Me">
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                                        </base-input>
                                    </div>
                </div>
              </form>
        </template>-->
        <!-- </card>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../config";
export const HTTP = axios.create({
  headers: { Autherization: "Bearer {token}" }
});
export default {
  name: "user-profile",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    // console.log(decoded.identity);
    return {
      base_url: base_url,
      url_img: "img/theme/team-1-800x800.jpg",
      dialogVisible: false,
      fileList: [],
      full_name: decoded.identity.full_name,
      team: decoded.identity.team,
      mobile: decoded.identity.mobile,
      email: decoded.identity.email,
      admin: decoded.identity.admin,
      prof_pic: decoded.identity.avatar,
      model: {
        full_name_: this.full_name,
        email_: this.email,
        address_: "",
        city: "",
        country: "",
        zipCode: "",
        about: ""
      }
    };
  },
  methods: {
    // handleSubmit() {
    //   console.log("submit");
    // },
    // submitUpload() {
    //   // console.log("submit");
    //   let url = base_url + "upload/" + this.mobile;
    //   this.axios
    //     .post(url, { email: this.model.email, mobile: this.mobile })
    //     .then(res => {});
    // },
    getAvatar() {
      let url = base_url + "avatar/" + this.email;
      // console.log(url);
      this.axios.post(url).then(response => {
        if (response.data.url !== undefined) {
          this.url_img = response.data.url;
          localStorage.setItem("avatar", response.data.url);
        }
      });
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this?", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleRemove(file, fileList) {
      // console.log("remove");
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log("preview");
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 1, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfer of ${file.name} ?`);
    },
    getData() {
      var url = base_url + "upload";
      // console.log(this.prof_pic);
      // console.log(url);
      this.axios
        .get(url)
        .then(response => {
          // this.point2Data = response.data.result;
          // console.log(this.point2Data);
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
          } else if (err.reponse && err.response.status === 422) {
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
    }
  },
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      //   this.$router.go(-1);
    }
    // console.log("Nothing gets called before me!");
  },
  created() {
    this.getAvatar();
    // this.getData();
  }
};
</script>
<style>
.el-message-box {
  width: auto;
}
</style>
