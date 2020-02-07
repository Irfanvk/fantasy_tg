<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row"></div>
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
              <answer-table title="Question Groups"></answer-table>
            </div>
          </div>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
import AnswerTable from "./Tables/AnswerTable";
import { base_url } from "../../config";

export default {
  components: {
    // PageVisitsTable,
    AnswerTable
  },
  data() {
    return {
      point2Data: [],
      loading: false
    };
  },
  methods: {
    getAnswers() {
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
