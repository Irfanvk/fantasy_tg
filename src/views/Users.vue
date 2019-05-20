<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/RCB.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Royal Challengers Bangalore</h5>
              </div>
            </div>
          </card>
        </div>
        <!-- <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
        </div>-->
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
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
            <el-table :data="userData" style="width: 100%;border:2px solid black;border-radius:5px">
              <el-table-column type="index"/>
              <el-table-column prop="full_name" label="Name" width="150"></el-table-column>
              <el-table-column prop="email" label="email" width="120"></el-table-column>
              <el-table-column prop="mobile" label="Contact" width="120"></el-table-column>
              <el-table-column prop="team" label="Team" width="120"></el-table-column>
              <el-table-column prop="joined" label="Joined on" width="155"></el-table-column>

              <el-table-column fixed="right" label="Operations" width="120">
                <template slot-scope="scope">
                  <el-button @click="handleClick" type="text" size="small">Detail</el-button>
                  <el-button type="text" size="small">Edit</el-button>
                </template>
              </el-table-column>
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
      }
    };
  },
  methods: {
    getUsers() {
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        weekday: "short",
        year: "numeric",
        month: "long"
      };
      var url = base_url + "users/all";
      this.axios.get(url).then(response => {
        this.userData = response.data.result;
        this.userData = this.userData.map(user => {
          user.joined = new Date(user.joined).toLocaleString("en", options);
          return user;
        });
        this.userCount = response.data.count;
        console.log(this.userData);
      });
    },
    handleClick() {
      console.log("click");
    }
  },
  created() {
    this.getUsers();
  },
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
      //   console.log("vgahvgacca");
      //   this.$router.go(-1);
    }
    // console.log("Nothing gets called before me!");
  }
};
</script>
<style></style>
