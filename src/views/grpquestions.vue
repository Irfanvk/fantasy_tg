<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <card header-classes="bg-transparent" class="row align-items-center">
          <div>
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Add Question Group</h6>
              </div>
            </div>
            <el-form
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              label-width="120px"
              class="demo-dynamic"
            >
              <el-form-item
                prop="email"
                label="Email"
                :rules="[
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"
              >
                <el-input v-model="dynamicValidateForm.email"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'Team ' + index"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: 'domain can not be null', trigger: 'blur'
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
              <div class="col">
                <h5>Kolkata Knight Riders</h5>
              </div>
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
        email: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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