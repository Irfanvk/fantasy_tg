<template >
  <div v-loading="loading">
    <base-alert type="success">
      <h1 class="display-1 text-center" style>
        <span class="alert-inner--icon">
          <i class="ni ni-watch-time"></i>
        </span>Match Details
      </h1>
    </base-alert>
    <el-page-header @back="goBack" content="match"></el-page-header>

    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- </base-header> -->
      <span v-for="data in matchData" v-bind:key="data.match_id">
        <base-button block type="default mt-3 " style="margin:0px 10px 0px 10px">
          <small>{{data.series_name}}</small>
          <br />
          <span>
            <strong>{{data.team1.name +" vs "+data.team2.name}}</strong>
          </span>
          <badge type="black">{{data.match_id}}</badge>
          <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
          <el-divider content-position="left">{{data.header.status}}</el-divider>
          <span>{{data.header.type}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{data.header.match_desc}}</span>
          <!-- <el-divider direction="vertical"></el-divider> -->
          <!-- <el-divider></el-divider> -->
          <br />
          <small>{{data.venue.name}}</small>
          <small>{{" ("+ data.venue.location}} )</small>
        </base-button>
      </span>
    </base-header>
  </div>
</template>
<script>
import { base_url } from "../../config";

export default {
  name: "matches_",
  components: {},
  data() {
    return {
      matchData: "",
      loading: true
    };
  },
  methods: {
    goBack() {
      //   this.$router.push({ name: "login" });
      this.$router.go(-1);
    },
    matchDetails() {
      this.loading = true;
      // var url = base_url + "getmatches";
      var url = base_url + "livematches";
      this.axios
        .get(url)
        .then(res => {
          // console.log(res.data.matches);
          // this.loading = false;

          this.matchData = res.data.result.matches;
          // console.log(this.matchData);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$notify({
            type: "warning",
            message: "something went wrong"
          });
        });
    }
  },
  created() {
    var refreshdata = setInterval(this.matchDetails, 60000);
    // this.matchDetails();
  }
  // beforeCreate() {
  //   // this.matchDetails();
  //   this.loading = true;
  //   // var url = base_url + "getmatches";
  //   var url = "https://mapps.cricbuzz.com/cbzios/match/livematches";
  //   // console.log(url);

  //   this.axios
  //     .get(url)
  //     .then(res => {
  //       console.log(url);
  //       this.matchData = res.data.matches;
  //       this.loading = false;
  //     })
  //     .catch(err => {
  //       this.$notify({
  //         type: "warning",
  //         message: err
  //       });
  //     });
  // }
};
</script>
<style >
</style>