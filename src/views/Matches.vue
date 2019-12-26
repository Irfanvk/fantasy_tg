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
      <span v-for="data in matchData" v-bind:key="data.id">
        <base-button block type="default mt-3 " style="margin:0px 10px 0px 10px">
          <small>{{data.srs}}</small>
          <br />
          <span>
            <strong>{{data.team1.name +" vs "+data.team2.name}}</strong>
          </span>
          <badge type="black">{{data.id}}</badge>
          <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
          <el-divider content-position="left">{{data.status}}</el-divider>
          <span>{{data.type}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{data.mnum}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{data.venue_location}}</span>
        </base-button>
      </span>
    </base-header>
  </div>
</template>
<script>
import { base_url } from "../../config";

export default {
  name: "matches",
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
      var url = base_url + "getmatches";
      this.axios
        .get(url)
        .then(res => {
          console.log(res.data);
          this.matchData = res.data;
          this.loading = false;
        })
        .catch(err => {
          this.$notify({
            type: "warning",
            message: err.data.msg
          });
        });
    }
  },
  beforeCreate() {
    // this.matchDetails();
    this.loading = true;
    this.value = 10;
    var url = base_url + "getmatches";
    this.axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.matchData = res.data;
        this.loading = false;
      })
      .catch(err => {
        this.$notify({
          type: "warning",
          message: err.data.msg
        });
      });
  }
};
</script>
<style >
</style>