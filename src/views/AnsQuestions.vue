<style>
.box-container {
  display: flex;

  /* overflow-x: scroll; */
  /* background: rgb(190, 153, 153); */
  flex-wrap: wrap !important;
}
.box {
  /* width: 2em; */
  min-width: 20em;
  max-width: 50em;
  /* min-height: 5vh; */
  flex-wrap: wrap;
}

@media only screen and (max-width: 720px) {
  .box-container {
    display: inline-flex;
    flex-direction: column;
  }
}

.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
</style>


<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-2">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <!-- <custom-table title="Todays Questions"></custom-table> -->
              <el-card class="box-card">
                <div slot="header" class="clearfix" v-for="data in apiData" v-bind:key="data.qid">
                  <span>Pick your answer and click submit</span>
                  <el-button style="float: right; padding: 3px 0" type="text">{{data.teams}}</el-button>
                </div>
                <div v-for="data in apiData" v-bind:key="data.qid">
                  <h4 style="padding:5px 0 15px 0">Q. {{data.question.toUpperCase()}}</h4>
                  <el-form>
                    <el-form-item>
                      <el-radio-group class="box-container" v-model="ansData" size="medium">
                        <el-radio
                          class="box"
                          border
                          v-bind:label="data.option1"
                          v-bind:value="data.option1"
                        >A. {{data.option1.toUpperCase()}}</el-radio>
                        <el-radio
                          class="box"
                          border
                          v-bind:label="data.option2"
                          v-bind:value="data.option2"
                        >B. {{data.option2.toUpperCase()}}</el-radio>
                        <el-radio
                          class="box"
                          border
                          v-bind:label="data.option3"
                          v-bind:value="data.option3"
                        >C. {{data.option3.toUpperCase()}}</el-radio>
                        <!-- <el-radio
                          class="box"
                          border
                          v-bind:label="data.option4"
                          v-bind:value="data.option4"
                        >D. {{data.option4.toUpperCase()}}</el-radio>-->
                        <el-radio
                          class="box"
                          border
                          v-bind:label="data.option4"
                          v-bind:value="data.option4"
                        >D. {{data.option4.toUpperCase()}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item size="large">
                      <el-button type="primary" @click="onSubmit">Submit</el-button>
                      <el-button @click="$router.go(-1)">Cancel</el-button>
                      <el-button v-if="admin" type="danger" @click="onDelete">Delete</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
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
// import ProjectsTable from "./Tables/ProjectsTable";
import CustomTable from "./Tables/CustomTable";
import { base_url } from "../../config";
import jwtDecode from "jwt-decode";

export default {
  name: "AnsQuestions",
  components: {
    // PageVisitsTable,
    // ProjectsTable,
    CustomTable
  },
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      admin: decoded.identity.admin,
      ansData: "",
      apiData: {
        emailid: decoded.identity.email,
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        teams: "",
        question: ""
      }
    };
  },
  methods: {
    onSubmit() {
      const token = localStorage.usertoken;
      const decoded = jwtDecode(token);
      var url =
        base_url +
        "answer/" +
        decoded.identity.email +
        "?qid=" +
        this.$route.params.qid;
      this.axios.post(url, { answer: this.ansData }).then(response => {
        this.apiPostData = response.data.msg;
        this.$message({
          message: this.apiPostData,
          type: "success"
        });
        this.$router.push("/questions");
      });
    },
    onDelete() {
      var url = base_url + "questions/" + this.$route.params.qid;
      this.$confirm(
        "This will permanently delete the question. Continue?",
        "Delete Question!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error"
        }
      ).then(() => {
        this.axios.delete(url).then(response => {
          this.deleteData = response.data.msg;
          this.$message({
            message: this.deleteData,
            type: "success"
          });
          this.$router.push("/questions");
        });
      });
    },
    getQuestion() {
      // console.log("ansques");
      var url = base_url + "questions/" + this.$route.params.qid;

      this.axios
        .get(url)
        .then(response => {
          this.apiData = response.data.questions;
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
    }
  },
  created() {
    this.getQuestion();
  },
  mounted() {},
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
<style></style>
