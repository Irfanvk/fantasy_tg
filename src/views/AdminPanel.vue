<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3">
            <div class="push">
              <el-button type="primary"  @click="displayNotification">{{msg}}<i class="el-icon-upload el-icon-right"></i></el-button>
              <!-- <button type="info" @click="displayNotification">{{msg}}</button> -->
            </div>
        </div>
      </div>
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
        <div class="col-xl-3">
          <el-card class="box-card pb-4 pt-5 mt-4 mb-4" style="text-align:center">
            <div slot="header" class="clearfix">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">All otps</h6>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
              <el-divider>
                <i class="el-icon-star-on"></i>
              </el-divider>
              <a style="cursor:pointer" @click="getOtps">
                <i class="el-icon-key fa-7x" style="color:green"></i>
              </a>
            </div>
            <div class="text item" style="cursor:pointer" @click="getOtps">
              <h5>Click to see the list</h5>
            </div>
          </el-card>
        </div>
        <el-dialog title="OTP table" :visible.sync="dialogTableVisible">
          <span v-if="otp_data!==[]">
            <el-table :data="otp_data">
              <el-table-column property="otp" label="OTP" width="150"></el-table-column>
              <el-table-column property="name" label="Name" width="200"></el-table-column>
              <el-table-column property="email" label="email" width="200"></el-table-column>
              <el-table-column  label="Action" width="200">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="editUser(scope.row.email)">Edit</el-button> -->
                  <el-button size="mini" type="danger" @click="deleteOtp(scope.row.otp)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </span>
          <span v-else>
            <h3>No data here :)</h3>
          </span>
        </el-dialog>
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
      msg: 'Push',
      dialogTableVisible: false,
      otp_data: [],
      point2Data: [],
      testingCode: "",
      flag: 0,
      loading: false
    };
  },
  methods: {
    getOtps() {
      this.dialogTableVisible = true;
      var url = base_url + "resetrequest";
      this.axios.get(url).then(response => {
        this.otp_data = response.data.result;
      });
    },
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
    deleteOtp: function(id) {
      this.loading=true
      var url = base_url + "otp/remove/"+id;
      this.$confirm(
        "This will delete the OTP. Continue?",
        "Delete User!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error"
        }
      )
        .then(() => {
          // this.$Progress.start()
          this.axios.delete(url).then(res => {
            this.$notify({
              title: "Warning",
              message: res.data.msg,
              type: "warning"
            });

            this.getOtps();
            this.loading=false
          });
        })
        .catch(() => {
          this.$message.error("You cancelled the operation");
          this.loading=false
          // this.$notify({
          //   type: "error",
          //   title: "Error",
          //   message: "You cancelled the opertation"
          // });
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
    // push notifications
    displayNotification () {
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
      if (Notification.permission === 'granted') {
        console.log(navigator)
        navigator.serviceWorker.getRegistration()
          .then(function (reg) {
            if(reg == undefined){
              console.log("only works online")
              return
            }
            var options = {
              body: 'First notification!',
              icon: 'img/newico/notification-flat.png',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              },
              actions: [
                {
                  action: 'explore',
                  title: 'Go to the site',
                  icon: 'img/newico/checkmark.png'
                },
                {
                  action: 'close',
                  title: 'Close the notification',
                  icon: 'img/newico/xmark.png'
                }
              ]
            }
            reg.showNotification('IPL & TPL... SOON!', options)
          }
        )
      }
    }
  
    // getPoints() {
    //   var url = base_url + "points";
    //   this.axios
    //     .get(url)
    //     .then(response => {
    //       this.point2Data = response.data.result;
    //     })
    //     .catch(err => {
    //       this.$notify({ message: err });

    //       // window.location = "/";
    //       // let reftoken = localStorage.getItem("refreshtoken");
    //       // delete this.axios.defaults.headers.common.Authorization;
    //       // if (err.response && err.response.status === 401) {
    //       //   this.axios
    //       //     .post(base_url + "refresh", {
    //       //       headers: { Authorization: `Bearer ${reftoken}` }
    //       //     })
    //       //     .then(response => {
    //       //       localStorage.setItem("usertoken", response.data.access_token);
    //       //     })
    //       //     .catch(e => {
    //       //       localStorage.clear();
    //       //       window.location = "/";
    //       //     });
    //       // }
    //       // this.$notify({
    //       //   type: "primary",
    //       //   message: err.response.data.msg + ", please login to continue "
    //       // });
    //     });
    // }
  },
  created() {
    // this.getPoints();
  },
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      // this.$router.go(-1);
    }
  }
};
</script>
<style>
  h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #35495E;
}
</style>
