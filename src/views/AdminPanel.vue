<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center mt-4">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Generate Code</h6>
              </div>
            </div>
            <!-- <div class>
              <base-progress
                type="default"
                :height="8"
                :value="60"
                label="Generating"
                v-if="loading==true"
              ></base-progress>
            </div>-->
            <!-- <img src="../../public/img/brand/India_flag.png" height="80" /> -->
            <!-- <i class="fa fa-cog fa-4x"></i> -->
            <div id="app" v-cloak>
              <div class="container">
                <div class="row">
                  <div class="col-sm-12">
                    <div
                      class="wizard-form-control d-flex align-items-center testing-code px-20px mb-1px"
                    >
                      <!-- generate code -->
                      <span v-if="flag==0" class="text-center">
                        <span class="title">Generate Code:</span>
                        <br />
                        <br />

                        <!-- <span class="code text-red ml-2">{{ testingCode }}</span> -->
                        <span
                          class="btn btn-info text-white copy-btn ml-auto"
                          @click.stop.prevent="generateCode"
                        >
                          <i v-if="loading==true" class="fa fa-spinner fa-spin"></i> Generate
                        </span>
                        <input type="hidden" id="testing-code" :value="testingCode" />
                      </span>

                      <!-- copy code -->
                      <span v-if="flag==1" class="text-center">
                        <span class="title">Invite Code:</span>
                        <hr />
                        <span class="code text-red ml-2">{{ testingCode }}</span>
                        <hr />
                        <br />
                        <span
                          class="btn btn-info text-white copy-btn"
                          @click.stop.prevent="copyTestingCode"
                        >Copy</span>
                        <input type="hidden" id="testing-code" :value="testingCode" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div slot="footer" class="row align-items-center text-center">
              <div class="col">
                <h5>Generate 'Invite to Register' Code</h5>
                <i class="text-red">Members having invite code only are able to register.</i>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <el-card class="box-card pb-4 pt-5 mt-4 mb-4" style="text-align:center">
            <div slot="header" class="clearfix">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Admin List</h6>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
              <el-divider>
                <i class="el-icon-star-on"></i>
              </el-divider>
              <a style="cursor:pointer" @click="$router.push('/users/admin')">
                <i class="fa fa-user fa-7x" style="color:green"></i>
              </a>
            </div>
            <div class="text item" style="cursor:pointer" @click="$router.push('/users/admin')">
              <h5>Click to see the list</h5>
            </div>
          </el-card>
        </div>
        <div class="col-xl-3">
          <el-card class="box-card pb-4 pt-5 mt-4 mb-4" style="text-align:center">
            <div slot="header" class="clearfix">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">All Questions</h6>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
              <el-divider>
                <i class="el-icon-star-on"></i>
              </el-divider>
              <a style="cursor:pointer" @click="$router.push('/allquestions')">
                <i class="fa fa-list fa-7x" style="color:green"></i>
              </a>
            </div>
            <div class="text item" style="cursor:pointer" @click="$router.push('/allquestions')">
              <h5>Click to see the list</h5>
            </div>
          </el-card>
        </div>
        <!-- <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Users</h6>
              </div>
            </div>
            <img src="../../public/img/brand/Australia_flag.png" height="80" />

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Australia</h5>
              </div>
            </div>
          </card>
        </div>-->
      </div>
    </base-header>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
import { base_url } from "../../config";
import jwtDecode from "jwt-decode";

export default {
  components: {
    // PageVisitsTable
  },
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      point2Data: [],
      testingCode: "",
      flag: 0,
      loading: false
    };
  },
  methods: {
    generateCode() {
      this.loading = true;
      const token = localStorage.usertoken;
      const decoded = jwtDecode(token);
      var url = base_url + "generatecode/" + decoded.identity.email;
      this.axios.get(url).then(response => {
        this.inviteCode = response.data.code;
        this.testingCode = this.inviteCode;
        this.apiPostData = response.data.msg;
        this.$message({
          message: "Generating",
          type: "success"
        });
        this.flag = 1;
        this.loading = false;

        // this.$router.push("/questions");
      });
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.$notify({
          title: "success",
          message: "Invite code was copied ",
          type: "success"
        });
        // alert("Testing code was copied " + msg);
      } catch (err) {
        this.$notify({
          title: "Error",
          message: "Oops, unable to copy",
          type: "danger"
        });
        // alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    getPoints() {
      var url = base_url + "points";
      // console.log(url);
      this.axios
        .get(url)
        .then(response => {
          this.point2Data = response.data.result;

          // console.log(this.point2Data);
        })
        .catch(err => {
          // window.location = "/";
          let reftoken = localStorage.getItem("refreshtoken");
          // delete this.axios.defaults.headers.common.Authorization;
          // if (err.response && err.response.status === 401) {
          //   this.axios
          //     .post(base_url + "refresh", {
          //       headers: { Authorization: `Bearer ${reftoken}` }
          //     })
          //     .then(response => {
          //       localStorage.setItem("usertoken", response.data.access_token);
          //     })
          //     .catch(e => {
          //       localStorage.clear();
          //       window.location = "/";
          //     });
          // }
          // // console.log(err.response);
          // this.$notify({
          //   type: "primary",
          //   message: err.response.data.msg + ", please login to continue "
          // });
        });
    }
  },
  created() {
    this.getPoints();
  },
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      // this.$router.go(-1);
    }
    // console.log("Nothing gets called before me!");
  }
};
</script>
<style></style>
