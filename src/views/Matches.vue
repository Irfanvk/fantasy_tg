<template >
  <div v-loading="loading">
    <base-alert type="success">
      <h1 class="display-1 text-center" style>
        <span class="alert-inner--icon"></span>Match Details
      </h1>
    </base-alert>
    <el-page-header @back="goBack" content="match"></el-page-header>

    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- </base-header> -->
      <span v-for="data in matchData" v-bind:key="data.match_id">
        <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">{{data.team1.name +" vs "+data.team2.name}}</h6>
              </div>
            </div>
            <!-- <img src="../../public/img/brand/KKR.png" height="80" /> -->
            <p>{{data.series_name}}</p>

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Kolkata Knight Riders</h5>
              </div>
            </div>
          </card>
        <base-button block type="default mt-3 " style>
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
    getMatches() {
      this.loading = true;
      var url = "https://mapps.cricbuzz.com/cbzios/match/livematches";
      fetch(url)
        .then(response => {
          this.loading = false;
          return response.json();
        })
        .then(response => {
          this.matchData = response.matches;

          this.loading = false;
        });
    }
  },
  beforeCreate(){
    this.getMatches()
  },
  created() {
    this.getMatches();
    var refreshdata = setInterval(this.getMatches, 60000);
  }
};
</script>
<style >
</style>