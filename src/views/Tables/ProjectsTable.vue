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
      >
        <template slot="columns">
          <th>Player</th>
          <th>Points</th>
          <th>mobile</th>
          <th>Team</th>
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
          <td class="points" sortable>{{row.full_name}}</td>
          <td>{{row.score}}</td>
          <td>{{row.mobile}}</td>
          <td>{{row.team}}</td>
        </template>
      </base-table>
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
  name: "projects-table",
  props: {
    type: {
      type: String
    },
    title: String
  },
  data() {
    return {
      pointData: [],
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
    getPoints() {
      var url = base_url + "points";
      // console.log(url);
      this.axios.get(url).then(response => {
        this.loading = false;
        this.pointData = response.data.result;
        // console.log(this.pointData);
      });
    }
  },
  created() {
    this.getPoints();
  }
};
</script>
<style>
.avatar {
  background-color: #fff;
}
</style>
