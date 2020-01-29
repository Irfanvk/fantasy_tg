<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <!-- <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">ICC WC Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/India_flag.png" height="80" />

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>India</h5>
              </div>
            </div>
          </card>
        </div>-->
        <!-- <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">ICC WC Team</h6>
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
        <!-- <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">ICC WC Team</h6>
              </div>
            </div>
            <img
              src="../../public/img/brand/pakistan_flag.png"
              height="80"
              style="border: 1px solid green;border-radius:5px"
            />

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Pakistan</h5>
              </div>
            </div>
          </card>
        </div>-->

        <!-- <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center" style="max">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">ICC WC Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/West_indies_flag.png" height="80" />

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>West Indies</h5>
              </div>
            </div>
          </card>
        </div>

        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center" style="max">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">ICC WC Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/new-zealand_flag.jpg" height="80" />

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>New Zealand</h5>
              </div>
            </div>
          </card>
        </div>-->

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
              <projects-table title="Points Table"></projects-table>
            </div>
          </div>
          <!-- <div class="row mt-5">
            <div class="col">
              <template>
                <el-table
                  ref="singleTable"
                  :data="point2Data"
                  highlight-current-row
                  style="max-width: 720px; border: 1px solid black; border-radius: 5px"
                >
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column property="name" label="Name" width="120">
                    <template slot-scope="scope">{{scope.row.full_name}}</template>
                  </el-table-column>
                  <el-table-column property="point" prop="score" label="point" width="120" sortable></el-table-column>
                  <el-table-column property="mobile" label="mobile" prop="mobile"></el-table-column>
                  <el-table-column property="team" label="team" prop="team"></el-table-column>
                </el-table>
              </template>
            </div>
          </div>-->
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
import ProjectsTable from "./Tables/ProjectsTable";
import { base_url } from "../../config";

export default {
  components: {
    // PageVisitsTable,
    ProjectsTable
  },
  data() {
    return {
      point2Data: [],
      loading: false
    };
  },
  methods: {
    getPoints() {
      // loading = true;
      var url = base_url + "points";
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
          this.point2Data = response.data.result;
        })
        .catch(err => {
          // window.location = "/";
          let reftoken = localStorage.getItem("refreshtoken");
          // let usertoken = localStorage.getItem("usertoken");
          delete this.axios.defaults.headers.common.Authorization;
          if (err.response && err.response.status === 401) {
            this.axios
              .post(base_url + "refresh", {
                headers: { Authorization: `Bearer ${reftoken}` }
              })
              .then(response => {
                localStorage.setItem("usertoken", response.data.access_token);
              })
              .catch(() => {
                localStorage.clear();
                window.location = "/";
              });
          }

          this.$notify({
            type: "primary",
            message: err.response.data.msg + ", please login to continue "
          });
        });
      // loading = false;
    }
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
<style></style>
