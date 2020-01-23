<template>
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
      { message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item
      v-for="(option, index) in dynamicValidateForm.options"
      :label="'Option ' + index"
      :key="option.key"
      :prop="'options.' + index + '.value'"
      :rules="{
      required: true, message: 'domain can not be null', trigger: 'blur'
    }"
    >
      <el-input v-model="option.value"></el-input>
      <el-button @click.prevent="removeDomain(option)">Delete</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">Submit</el-button>
      <el-button @click="addDomain">New domain</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { base_url } from "../../config";
export default {
  data() {
    return {
      dynamicValidateForm: {
        options: [
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
          this.postData();
        } else {
          return false;
        }
      });
    },
    postData() {
      var url = base_url + "question/new";
      this.axios
        .post(url, {
          options: this.dynamicValidateForm.options,
          question: this.dynamicValidateForm.question,
          gid: "group_219602"
        })
        .then(res => {
          this.$notify({
            type: "primary",
            message: res.data.msg + " Successfully "
          });
          // this.getGroups();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "Something Wrong"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.options.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.options.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.options.push({
        key: Date.now(),
        value: ""
      });
    }
  }
};
</script>

