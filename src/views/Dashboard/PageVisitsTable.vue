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
      <base-table thead-classes="thead-light" :data="newMatches">
        <template slot="columns">
          <th>Index</th>
          <th>Start Time</th>
          <!-- <th>Status</th> -->
          <th>Team-1</th>
          <th>Team-2</th>
          <th>Type</th>
          <th>Winner</th>
          <th>Started</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">{{row.unique_id}}</th>
          <td>{{row.dateTimeGMT}}</td>
          <td>{{row.team1}}</td>
          <td>{{row.team2}}</td>
          <td>{{row.type}}</td>
          <td>{{row.winner_team}}</td>
          <td>{{row.matchStarted}}</td>

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
      newMatches: [],
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
  },
  methods: {
    getMatches() {
      var url =
        "https://cricapi.com/api/matches?apikey=oMAzt90U1xN3MfOKmtasnbNmFq12";
      this.axios.get(url).then(response => {
        // console.log(response);
        this.newMatches = response.data.matches;
        // var d = new Date(this.newMatches.date);
        this.newMatches = this.newMatches.map(user => {
          user.dateTimeGMT = new Date(user.dateTimeGMT).toLocaleString("en");
          // console.log(user);
          return user;
        });
        this.newMatches1 = this.newMatches.map(user => {
          user.team1 = user["team-1"];
          user.team2 = user["team-2"];
          // console.log(user);
          return user;
        });

        // console.log(d.getUTCHours()); // Hours
        // console.log(d.getUTCMinutes());
      });
    }
  },
  created() {
    this.getMatches();
  }
};
</script>
<style>
</style>
