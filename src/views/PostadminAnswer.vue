<style>
.box-container {
  display: inline-flex;
  flex-wrap: wrap;
}
.box {
  /* width: 2em; */
  width: 10em;
  max-width: 50em;
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
      var url = base_url + "questions/" + this.$route.params.qid;
      this.axios.post(url, { answer: this.ansData }).then(response => {
        this.apiPostData = response.data.msg;
        this.$message({
          message: this.apiPostData,
          type: "success"
        });
        this.$router.push("/adminanswer");
      });
    },
    getQuestion() {
      // console.log("ansques");
      var url = base_url + "questions/" + this.$route.params.qid;

      this.axios.get(url).then(response => {
        console.log(response.data.questions);
        console.log("aa");
        this.apiData = response.data.questions;
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
