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
              <!-- <admin-answer-table title="Todays Questions"></admin-answer-table> -->
              <el-table
                :loading="loading"
                :data="apiData"
                style="border:2px solid black;border-radius:5px;max-width:420px"
              >
                <el-table-column type="index" />
                <el-table-column prop="question" label="Question" width="150">
                  <template slot-scope="scope">
                    <!-- <el-button type="warning" size="small" circle icon="el-icon-edit"></el-button> -->
                    <el-tag
                      @click="$router.push('postadminanswer/'+scope.row.qid)"
                    >{{scope.row.question}}</el-tag>
                    <!-- <span v-if="tempData===undefined">
                      <el-tag>No Data</el-tag>
                    </span>-->
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="email" label="email" width="120"></el-table-column> -->
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="Result" :visible.sync="dialogTableVisible">
        <download-csv
          class="btn btn-default"
          block
          :data="getResult"
          name="filename.csv"
        >Download CSV (This is a slot)</download-csv>
        <el-table :data="getResult">
          <el-table-column property="user_name" label="Name" width="150"></el-table-column>
          <el-table-column property="score" label="Score" sortable></el-table-column>
          <el-table-column property="bonus" label="Bonus" sortable></el-table-column>
          <el-table-column property="total_score" label="Total Score" sortable></el-table-column>
          <el-table-column prop="questions_answered" label="Qns Answered"></el-table-column>
        </el-table>
      </el-dialog>
      <div class="row">
        <span v-for="data in groupData" v-bind:key="data.gid" class="container">
          <base-button block type="default mt-3 ">
            <small>{{data.gid}}</small>
            <!-- <badge type="black">{{data.added_on.$date}}</badge> -->
            <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
            <el-divider content-position="center">{{data.teams_playing}}</el-divider>
            <span>
              <i>
                Score is
                {{data.group.score}}
              </i>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span>
              <i>Bonus is {{data.group.bscore}}</i>
            </span>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <!-- <el-divider></el-divider> -->
            <br />
            <small>{{" ( added by "+ data.added_by+", "}}</small>
            <!-- <small>{{", "+ data.added_on.$date | moment("from", true) }} ago )</small> -->
            <small>{{ data.added_on.$date | moment("from", true) }} ago )</small>
            <br />
            <small>{{ data.description}}</small>
            <br />
            <span>
              <!-- <strong>{{data.teams_playing}}</strong> -->
            </span>
            <div class="col">
              <el-button
                type="primary"
                :loading="loading"
                @click="getScore(data.gid,data.group.score,data.group.bscore)"
              >Get Scores</el-button>
            </div>
          </base-button>
        </span>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
// import ProjectsTable from "./Tables/ProjectsTable";
import AdminanswerTable from "./Tables/AdminanswerTable";
import { base_url } from "../../config";

export default {
  components: {
    // PageVisitsTable,
    // ProjectsTable,
    // eslint-disable-next-line vue/no-unused-components
    AdminanswerTable
  },
  data() {
    return {
      apiData: [],
      tempData: [],
      loading: false,
      groupData: [],
      getResult: [],
      dialogTableVisible: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getQuestion() {
      this.loading = true;
      var url = base_url + "questions/all/false";

      this.axios.get(url).then(response => {
        this.apiData = response.data.questions;
        this.tempData = response.config.data;
        this.loading = false;
      });
    },
    getGroups() {
      // eslint-disable-next-line no-unused-vars
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        weekday: "short",
        year: "numeric",
        month: "long"
      };
      this.loading = true;
      var url = base_url + "questiongroups";
      this.axios
        .get(url)
        .then(res => {
          this.groupData = res.data.result;
          // this.groupData = this.groupData.map(data => {
          //   data.added_on = new Date(data.added_on.$date).moment.updateLocale(
          //     "en",
          //     options
          //   );
          //   return data;
          // });
        })
        .catch(() => {
          this.$notify({
            type: "danger",
            message: "something went wrong"
          });
        });
      this.loading = false;
    },
    getScore: function(ggid, score, bonus) {
      this.loading = true;
      var url = base_url + "getscore";
      this.$confirm(
        "This will create score for the users. Continue?",
        "Generate Score!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error"
        }
      )
        .then(() => {
          // this.$Progress.start()
          this.axios.post(url, { gid: ggid, score: score, bonus: bonus }).then(
            // eslint-disable-next-line no-unused-vars
            response => {
              this.getResult = response.data.result;
              this.$notify({
                type: "warning",
                message: "You just calculated points"
              });
              this.loading = false;
              this.dialogTableVisible = true;
              this.getGroups();
            },
            err => {
              this.$notify({ message: err });
              this.loading = false;

              // this.$Progress.fail();
            }
          );
          this.getGroups();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: this.$createElement(
              "i",
              { style: "color: red" },
              "You cancelled the opertation"
            )
          });
          this.loading = false;
        });
    }
  },
  created() {
    this.getQuestion();
    this.getGroups();
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
<style>
.el-message-box {
  width: 330px;
}
.el-dialog {
  width: auto;
}
</style>
