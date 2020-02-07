<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">{{title}}</h3>
        </div>
        <div class="col text-right">
          <!-- <base-button type="primary" size="sm">See all</base-button> -->
        </div>
      </div>
    </div>
    <!-- Table -->
    <!-- <el-dialog title="Answer Table" :visible.sync="dialogTableVisible">
      <el-table :data="answerData" style="width: 100%">
        <el-table-column prop="added_on">
          <template slot-scope="props">
            <p>Date: {{ props.row.added_on.$date | moment("MMM Do YYYY, h:mm:ss a") }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Question" prop="question"></el-table-column>
        <el-table-column label="Answer" prop="answer"></el-table-column>
      </el-table>
    </el-dialog>-->
    <el-dialog title="Answer Table" :visible.sync="dialogTableVisible">
      <el-table
        :data="answerData.filter(data => !search || data.added_by.full_name.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column prop="added_on" label="Date" width="90">
          <template
            slot-scope="scope"
          >{{scope.row.added_on.$date | moment("MMM Do YYYY, h:mm:ss a")}}</template>
        </el-table-column>
        <el-table-column align="center" prop="added_by" label="Name" width="150">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>Name: {{ scope.row.added_by.full_name }}</p>
              <p>Email: {{ scope.row.added_by.email }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.added_by.full_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column property="question" label="Question" width="200"></el-table-column>
        <el-table-column property="answer" label="Answer"></el-table-column>
        <el-table-column prop="correct" label="Correct">
          <template slot-scope="scope">
            <el-tag :type="scope.row.correct === true ? 'success' : 'danger'" disable-transitions>
              <span v-if="scope.row.correct===true">correct</span>
              <span v-else>wrong</span>
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <div
      class="table-responsive"
      v-loading.fullscreen.lock="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark': ''"
        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
        tbody-classes="list"
        :data="pointData"
        sortable
      >
        <template slot="columns">
          <th>Added On</th>
          <th>Playing</th>
          <th>Group ID</th>
          <!-- <th sortable>Team</th> -->
        </template>

        <template slot-scope="{row}">
          <!-- <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img" />
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>-->
          <td class="points" sortable>{{row.added_on.$date | moment("MMM Do YYYY, h:mm:ss a")}}</td>

          <td @click="getAnswers(row.gid)">
            <badge circle type="primary">{{row.teams_playing}}</badge>
          </td>

          <td sortable>{{row.gid}}</td>
          <!-- <td>{{row.team}}</td> -->
        </template>
      </base-table>

      <!-- <el-table :data="pointData" style="width: 100%">
        <el-table-column prop="full_name" label="Player" width="120" style="font-size:8em"></el-table-column>
        <el-table-column prop="score" label="Points" sortable></el-table-column>
        <el-table-column prop="mobile" label="Mobile" width="100"></el-table-column>
        <el-table-column prop="team" label="Team" sortable></el-table-column>
      </el-table>-->
    </div>

    <!-- <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>-->
  </div>
</template>
<script>
import { base_url } from "../../../config";
export default {
  name: "answers-table",
  props: {
    type: {
      type: String
    },
    title: String
  },
  data() {
    return {
      search: "",
      pointData: [],
      answerData: [],
      dialogTableVisible: false,
      loading: true,
      tableData: [
        {
          img: "img/theme/bootstrap.jpg",
          title: "Ballu",
          points: "250",
          status: "pending",
          statusType: "warning",
          completion: 60
        },
        {
          img: "img/theme/angular.jpg",
          title: "Ashraf",
          points: "225",
          status: "completed",
          statusType: "success",
          completion: 100
        },
        {
          img: "img/theme/sketch.jpg",
          title: "Adramu",
          points: "220",
          status: "delayed",
          statusType: "danger",
          completion: 72
        },
        {
          img: "img/theme/react.jpg",
          title: "SST",
          points: "210",
          status: "on schedule",
          statusType: "info",
          completion: 90
        },
        {
          img: "img/theme/vue.jpg",
          title: "Siraj",
          points: "160",
          status: "completed",
          statusType: "success",
          completion: 100
        }
      ]
    };
  },
  methods: {
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
      var url = base_url + "allgroups";
      this.axios.get(url).then(response => {
        this.loading = false;
        this.pointData = response.data.result;
        // this.pointData = this.pointData.map(data => {
        //   data.added_on = new Date(data.added_on.$date).moment.updateLocale(
        //     "en",
        //     options
        //   );
        //   return data;
        // });
      });
    },
    getAnswers(gid) {
      var url = base_url + "groups/answers/" + gid;
      this.dialogTableVisible = true;
      this.axios.get(url).then(res => {
        this.loading = false;
        this.answerData = res.data.result;
      });
    }
  },
  created() {
    this.getGroups();
  }
};
</script>
<style>
.avatar {
  background-color: #fff;
}
.el-table {
  font-size: 11px;
  font-weight: inherit;
}
</style>
