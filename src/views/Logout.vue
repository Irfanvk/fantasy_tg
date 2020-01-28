<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5 text-center">User logged out Successfully</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 3,
      value2: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"] // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  created() {
    setTimeout(() => {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("avatar");
      window.location = "/";
    }, 5000);
  },
  beforeCreate() {
    if (localStorage.getItem("usertoken")) {
      localStorage.clear();
      this.$message({
        type: "warning",
        message: " User Logged Out "
      });

      //   this.$router.go(-1);
    }
  }
};
</script>
