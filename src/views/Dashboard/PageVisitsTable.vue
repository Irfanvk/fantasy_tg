<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Upcoming Matches</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tableData">
        <template slot="columns">
          <th>Name</th>
          <th>Start Time</th>
          <th>Status</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">{{row.name}}</th>
          <td>{{row.startTime}}</td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "upcoming-match-table",
  data() {
    // var now =new Date()
    return {
      tableData: [
        {
          name: "CSK vs DC",
          startTime: "2019-05-10",
          status: "NOT_STARTED",
          statusType: "info"
        },
        {
          name: "MI vs TBC",
          startTime: "2019-05-12",
          status: "UP_COMING",
          statusType: "warning"
        },
        {
          name: "CSK vs DC",
          startTime: "2019-05-10",
          status: "NOT_STARTED",
          statusType: "info"
        },
        {
          name: "MI vs CSK",
          startTime: "2019-05-12",
          status: "completed",
          statusType: "success"
        },
        {
          name: "RCB vs CSK",
          startTime: "2019-05-12",
          status: "dismissed",
          statusType: "danger"
        }
      ]
    };
  }
};
</script>
<style>
</style>
