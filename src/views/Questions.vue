<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

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
      // this.$router.go(-1);
      this.$notify({
        type: "danger",
        message: "Please login to continue"
      });
    }
  }
};
</script>
<style></style>
