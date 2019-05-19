<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/RCB.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Royal Challengers Bangalore</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/CSK.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Chennai Super Kings</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/SRH.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Sun Risers Hyderabad</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/DC.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Delhi Capitals</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/MI.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Mumbai Indians</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/KXIP.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Kings XI Punjab</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center" style="max">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/RR.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Rajasthan Royals</h5>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <card header-classes="bg-transparent" class="row align-items-center">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">IPL Team</h6>
              </div>
            </div>
            <img src="../../public/img/brand/KKR.png" height="80">

            <div slot="footer" class="row align-items-center">
              <div class="col">
                <h5>Kolkata Knight Riders</h5>
              </div>
            </div>
          </card>
        </div>
        <!-- <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
        </div>-->
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-2">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <projects-table title="Points Table"></projects-table>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <projects-table type="dark" title="Dark Table"></projects-table>
            </div>
          </div>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
// import PageVisitsTable from "./Dashboard/PageVisitsTable";
import ProjectsTable from "./Tables/ProjectsTable";

export default {
  name:'users'
  components: {
    // PageVisitsTable,
    ProjectsTable
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  beforeCreate() {
    if (!localStorage.getItem("usertoken")) {
      this.$router.push({ name: "login" });
    //   this.$router.go(-1);
    }
    // console.log("Nothing gets called before me!");
  }
};
</script>
<style></style>
