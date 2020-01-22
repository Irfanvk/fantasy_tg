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
                <div slot="header" class="clearfix" v-for="data in apiData_0" v-bind:key="data.qid">
                  <!-- <code>{{data}}</code> -->
                  <span>Pick your answer and click submit</span>
                  <el-button style="float: right; padding: 3px 0" type="text">{{data.gid}}</el-button>
                </div>
                <div v-for="data in apiData_0" v-bind:key="data.qid">
                  <small text-muted>Please answer</small>
                  <circular-count-down-timer
                    class="text-center"
                    @finish="finished()"
                    :size="100"
                    :initial-value="60"
                    :steps="60"
                  ></circular-count-down-timer>
                  <h4 style="padding:5px 0 15px 0">Q. {{data.question.toUpperCase()}}</h4>
                  <el-form>
                    <el-form-item>
                      <el-radio-group class="box-container" v-model="ansData" size="medium">
                        <span v-for="opt,index in data.options" v-bind:key="index">
                          <h5>Option {{index+1}}</h5>
                          <el-radio
                            class="box"
                            border
                            v-bind:label="opt.value"
                            v-bind:value="opt.value"
                          >{{opt.value}}</el-radio>
                          <br />
                        </span>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item size="large">
                      <el-button type="primary" @click="onSubmit">Submit</el-button>
                      <el-button @click="$router.go(-1)">Cancel</el-button>
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
      apiData_0: "",
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
    finished() {
      this.$message({
        message: "Sorry, Timeout",
        type: "error"
      });
      // this.$router.go(-1);
      this.ansData = "UNANSWERED";
      this.onSubmit();
      // this.$notify({
      //   message: "Sorry, Timeout",
      //   type: "warning"
      // });
    },
    onSubmit() {
      const token = localStorage.usertoken;
      const decoded = jwtDecode(token);
      var url =
        base_url +
        "answer/" +
        decoded.identity.email +
        "?qid=" +
        this.$route.params.oneid;
      this.axios.post(url, { answer: this.ansData }).then(response => {
        this.apiPostData = response.data;
        this.$message({
          message: this.apiPostData.msg,
          type: this.apiPostData.type
        });
        // this.$router.push("/questions");
        this.$router.go(-1);
      });
    },
    getQuestion() {
      // console.log("ansques");
      var url = base_url + "questions/one/" + this.$route.params.oneid;
      this.axios
        .get(url)
        .then(response => {
          this.apiData_0 = response.data.questions;
        })
        .catch(err => {
          // window.location = "/";

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
