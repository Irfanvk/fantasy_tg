<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">{{title}}</h3>
        </div>
        <div class="col text-right">
          <!-- <base-button type="primary" size="sm">See all</base-button> -->
          <h6>click on the question ID to answer</h6>
        </div>
      </div>
    </div>
    <span v-if="quesData!==[]">
      <div class="table-responsive" style="z-index:0">
        <base-table
          class="table align-items-center table-flush"
          :class="type === 'dark' ? 'table-dark': ''"
          :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
          tbody-classes="list"
          :data="quesData"
        >
          <template slot="columns">
            <!-- <th>Index</th> -->
            <th>Question ID</th>
            <!-- <th>ID</th> -->
          </template>

          <template slot-scope="{row}">
            <!-- <th scope="row" type="index" :data="qnum">{{qnum++}}</th> -->
            <th scope="row" style="max-width:50%">
              <div class="media align-items-center">
                <div class="media-body">
                  <!-- <span class="name mb-0 text-sm" @click="open">{{row.question}}</span> -->
                  <el-badge :value="row.q_count" class="item" type="primary">
                    <el-tag
                      style="cursor:pointer;"
                      type="primary"
                      @click="$router.push('questions/'+row.gid)"
                    >{{row.teams_playing.toString().substr(0,18)}}</el-tag>
                  </el-badge>
                  <el-divider direction="vertical"></el-divider>
                  <el-tag
                    effect="plain"
                    size="mini"
                    type="success"
                  >Score per question: {{row.group.score}}</el-tag>
                  <el-divider direction="vertical"></el-divider>

                  <el-tag
                    effect="plain"
                    size="mini"
                    type="success"
                  >Bonus score: {{row.group.bscore}}</el-tag>
                  <br />
                  <span v-if="row.description!==''">
                    <el-tag type="warning" block class="mt-2">{{row.description}}</el-tag>
                  </span>
                </div>
              </div>
            </th>
            <!-- <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <a
                slot="title"
                class="btn btn-sm btn-icon-only text-light"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </template>-->
            <!-- </base-dropdown> -->
            <!-- </td> -->
          </template>
        </base-table>
      </div>
    </span>
    <span v-else class="text-center">
      <i class="el-icon-moon-night fa-7x"></i>
      <br />
      <small>No data</small>
    </span>
  </div>
</template>


<!--Script-->
<script>
import { base_url } from "../../../config";
export default {
  name: "custom-table",
  props: {
    type: {
      type: String
    },
    title: String
  },
  data() {
    return {
      qnum: 1,
      modals: { modal0: false },
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: [
          {
            option1: ""
          }
        ],
        desc: ""
      },
      quesData: []
    };
  },
  methods: {
    //  .............................
    open() {
      this.$confirm("You have unsaved changes, save and proceed?", "Confirm", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Save",
        cancelButtonText: "Discard Changes"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "Changes saved. Proceeding to a new route."
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel"
                ? "Changes discarded. Proceeding to a new route."
                : "Stay in the current route"
          });
        });
    },
    onSubmit() {},
    // ............................
    getQuestions() {
      // var options = {
      //   day: "numeric",
      //   weekday: "short",
      //   year: "numeric",
      //   month: "long"
      // };
      var url = base_url + "questiongroups";

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
          this.quesData = response.data.result;
          if (this.quesData.length === 0) {
            this.$notify({
              type: "primary",
              message:
                " There are no questions right now, Pls come back later !!"
            });
          }
          // this.quesData = this.quesData.map(user => {
          // user.added_on = new Date(Date.now()).toLocaleString("en", options);
          // return user;
          // });
          // this.userCount = response.data.count;
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
              .catch(() => {
                localStorage.clear();
                window.location = "/";
              });
          } else if (err.response && err.response.status === 422) {
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
    },
    repeatData() {
      this.polling = setInterval(() => {
        this.getQuestions();
      }, 10000);
    }
  },
  mounted() {
    this.getQuestions();
    this.repeatData();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },

  created() {
    // location.reload()
  },
  beforeCreate() {}
};
// var intvl = setInterval(this.getQuestions(), 10000);
</script>
<style>
.avatar {
  background-color: #fff;
}
</style>
