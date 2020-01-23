<template>
  <div v-loading="loading">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-1 pt-md-8">
      <i class="fa fa-clone"></i>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7" v-loading="loading">
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-2">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <!-- <projects-table title="Points Table"></projects-table> -->
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <!-- <projects-table type="dark" title="Dark Table"></projects-table> -->
            </div>
          </div>
          <div class="row">
            <div class="col">
              <!-- <users-table type="light" title="Users Table"></users-table> -->
              <!-- <projects-table title="Points Table"></projects-table> -->
            </div>
          </div>
        </div>
      </div>
      <!--End tables-->
    </div>
    <div class="row mt--3">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <el-table :data="userData" style="border:2px solid black;border-radius:5px">
              <el-table-column type="index" />
              <el-table-column prop="full_name" label="Name" width="150"></el-table-column>
              <el-table-column prop="email" label="Email" width="120"></el-table-column>
              <el-table-column prop="mobile" label="Contact" width="120"></el-table-column>
              <el-table-column prop="team" label="Team" width="120" sortable></el-table-column>
              <el-table-column prop="joined" label="Joined on" width="155" sortable></el-table-column>
              <el-table-column label="Operations">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="editUser(scope.row.email)">Edit</el-button> -->
                  <el-button size="mini" type="danger" @click="deleteUser(scope.row.email)">Delete</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column fixed="right" label="Operations" width="100">
                <template slot-scope="scope">
                  <el-tooltip content="Delete User" placement="top">
                    <el-button
                      @click="deleteUser(scope.row.email)"
                      type="text"
                      name="delete"
                      size="small"
                    >
                      <i class="fa fa-trash"></i>
                    </el-button>
                  </el-tooltip>
                  <el-button type="text" size="small">Edit</el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
// import ProjectsTable from "./Tables/ProjectsTable";
import UsersTable from "./Tables/UsersTable";
import { base_url } from "../../config";

export default {
  name: "users",
  components: {
    // PageVisitsTable,
    // ProjectsTable,
    // UsersTable
  },
  data() {
    return {
      userData: {
        email: "",
        full_name: "",
        mobile: "",
        team: "",
        joined: ""
      },
      loading: false
    };
  },
  methods: {
    getUsers() {
      this.loading = true;
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        year: "numeric",
        month: "long"
      };
      var url = base_url + "users/all";

      // const token = localStorage.usertoken;
      // var config = {
      //   headers: { Authorization: "bearer " + token }
      // };
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
      this.axios
        .get(url)
        .then(response => {
          this.userData = response.data.result;
          this.userData = this.userData.map(user => {
            user.joined = new Date(user.joined).toLocaleString("en", options);
            return user;
          });
          this.userCount = response.data.count;
          this.loading = false;
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
          this.loading = false;

          this.$notify({
            type: "primary",
            message: err.response.data.msg + ", please login to continue "
          });
        });
    },
    deleteUser: function(id) {
      var url = base_url + "users/remove";
      this.$confirm(
        "This will permanently delete the user. Continue?",
        "Delete User!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error"
        }
      )
        .then(() => {
          // this.$Progress.start()
          this.axios.delete(url, { email: id }).then(res => {
            this.$notify({
              title: "Warning",
              message: res.data.msg,
              type: "warning"
            });

            this.getUsers();
          });
        })
        .catch(() => {
          this.$message.error("You cancelled the opertation");
          // this.$notify({
          //   type: "error",
          //   title: "Error",
          //   message: "You cancelled the opertation"
          // });
        });
    }
  },
  created() {
    this.getUsers();
  },
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      //   this.$router.go(-1);
    }
  }
};
</script>
<style>
.el-message-box {
  width: 330px;
}
</style>
