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
      <!-- <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark': ''"
        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
        tbody-classes="list"
        :data="pointData"
        sortable
      >
        <template slot="columns">
          <th>Player</th>
          <th>Points</th>
          <th>mobile</th>
          <th sortable>Team</th>
        </template>

      <template slot-scope="{row}">-->
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
      <!-- <td class="points">{{row.full_name}}</td>
          <td sortable>{{row.score}}</td>
          <td>{{row.mobile}}</td>
          <td>{{row.team.toUpperCase()}}</td>
        </template>
      </base-table>-->

      <el-table :data="pointData" style="width: 100%">
        <el-table-column prop="full_name" label="Player" width="120" style="font-size:8em"></el-table-column>
        <el-table-column prop="score" label="Points" sortable></el-table-column>
        <el-table-column prop="mobile" label="Mobile" width="100"></el-table-column>
        <el-table-column prop="team" label="Team" sortable></el-table-column>
      </el-table>
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
      var url = base_url + "points?point";
      this.axios.get(url).then(response => {
        this.loading = false;
        this.pointData = response.data.result;
      });
    }
  },
  created() {
    this.getPoints();
  }
};
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
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
