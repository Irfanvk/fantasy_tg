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
                <div slot="header" class="clearfix">
                  <!-- <code>{{data}}</code> -->
                  <span>Click on the question ID to answer</span>
                  <el-button style="float: right; padding: 3px 0" type="text">{{$route.params.gid}}</el-button>
                </div>
                <div v-for="data,index in apiData_0" v-bind:key="data.qid">
                  <!-- <el-divider> -->
                  <el-tag
                    style="margin:10px;cursor:pointer;"
                    type="success"
                    @click="$router.push(data.gid+'/'+data.qid)"
                  >
                    <h4 style="padding:5px 0 15px 0">
                      {{index+1}}.
                      {{data.qid.toString().substr(0,18)}}
                    </h4>
                  </el-tag>
                  <!-- </el-divider> -->
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
      var url = base_url + "questions/" + this.$route.params.gid;
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
      var url = base_url + "questions/" + this.$route.params.gid;
      console.log(url);

      this.axios
        .get(url)
        .then(response => {
          console.log(response.data.questions);
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
