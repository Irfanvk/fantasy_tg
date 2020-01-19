<template>
  <div>
    <base-alert type="default text-center text-black">
      <strong class="display-1 text-center" style>Add questions</strong>
    </base-alert>
    <el-page-header @back="goBack" content="groups"></el-page-header>
    <base-header type="gradient-success" class="pb-8 pt-5 p-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <card header-classes="bg-transparent" class="row align-items-center">
          <div>
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">
                  Add Questions to Group ID:
                  <i>{{ $route.params.gid }}</i>
                </h6>
                <h6 class="text-uppercase ls-1 mb-1 pt-1">
                  Playing:
                  <i>{{ $route.params.teams }}</i>
                </h6>
              </div>
            </div>
            <el-form
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              label-width="120px"
              class="demo-dynamic"
              label-position="top"
            >
              <el-form-item
                prop="question"
                label="Question"
                :rules="[
      { required: true, message: 'Please input question', trigger: 'blur' }
    ]"
              >
                <el-input v-model="dynamicValidateForm.question"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'Option ' + index"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: 'option can not be null', trigger: 'blur'
    }"
              >
                <el-input v-model="domain.value"></el-input>
                <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">Submit</el-button>
                <el-button @click="addDomain">New</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
              </el-form-item>
            </el-form>

            <div slot="footer" class="row align-items-center">
              <div class="col"></div>
            </div>
          </div>
        </card>
      </div>
    </base-header>
  </div>
</template>
<script>
export default {
  name: "question-group",
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            key: 1,
            value: ""
          }
        ],
        question: ""
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm);
          alert("submited!");
          this.resetForm("dynamicValidateForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ""
      });
    }
  }
};
</script>