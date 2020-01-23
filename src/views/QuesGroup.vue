/* eslint-disable */
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
                :rules="[{ required: true, message: 'Please input question', trigger: 'blur' }]"
              >
                <el-input v-model="dynamicValidateForm.question"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(option, index) in dynamicValidateForm.options"
                :label="'Option ' + index"
                :key="option.key"
                :prop="'options.' + index + '.value'"
                :rules="{
      required: true, message: 'option can not be null', trigger: 'blur'
    }"
              >
                <el-input v-model="option.value"></el-input>
                <el-button @click.prevent="removeDomain(option)">Delete</el-button>
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
    <span v-for="data in quesData" v-bind:key="data.qindex" class="container">
      <base-button block type="default mt-3 ">
        <small>{{data.qid}}</small>
        <!-- <badge type="black">{{data.added_on.$date}}</badge> -->
        <!-- <el-divider content-position="left">{{data.status}}</el-divider> -->
        <el-divider content-position="center">{{data.question}}</el-divider>
        <span v-for="option,index in data.options" v-bind:key="index">
          <i>
            <el-divider direction="vertical"></el-divider>
            option {{index}} :
            {{option.value}}
            <el-divider direction="vertical"></el-divider>
          </i>
        </span>
        <span>
          <!-- <i>Bonus is {{data.group.bscore}}</i> -->
        </span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <el-divider></el-divider> -->
        <br />
        <small>( added {{ data.added_on.$date | moment("from", true) }} ago )</small>
        <br />
        <small>{{ data.description}}</small>
        <br />
        <span>
          <!-- <strong>{{data.teams_playing}}</strong> -->
        </span>
      </base-button>
      <card block class="text-center">
        <strong>
          <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editGroup(data.gid)"></el-button> -->
          <el-button
            data-toggle="tooltip"
            data-placement="top"
            title="Delete Question"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteQues(data.qid)"
          ></el-button>
        </strong>
      </card>
    </span>
  </div>
</template>
<script>
import { base_url } from "../../config";
export default {
  name: "question-group",
  data() {
    return {
      quesData: [],
      dynamicValidateForm: {
        options: [
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
    getGroups() {
      this.loading = true;
      // var options = {
      //   hour: "numeric",
      //   minute: "numeric",
      //   second: "numeric",
      //   day: "numeric",
      //   weekday: "short",
      //   year: "numeric",
      //   month: "long"
      // };
      this.loading = true;
      var url = base_url + "questions/" + this.$route.params.gid;
      this.axios
        .get(url)
        .then(res => {
          this.quesData = res.data.questions;
          // eslint-disable-next-line no-console
        })
        .catch(err => {
          this.$notify({
            type: "danger",
            message: err
          });
        });
      this.loading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
          gid: this.$route.params.gid
        })
        .then(res => {
          this.$notify({
            type: "primary",
            message: res.data.msg + " Successfully "
          });
          this.getGroups();
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
    },
    deleteQues(qid) {
      var url = base_url + "questions/" + qid;
      this.$confirm("This will delete the question. Continue?", "Delete!", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error"
      })
        .then(() => {
          this.axios.delete(url).then(response => {
            this.$notify({
              type: "warning",
              message: response.data.msg
            });
          });
          this.getGroups();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "action cancelled"
          });
        });
      // this.axios.delete(url).then(res=> )
    }
  },
  mounted() {
    this.getGroups();
  }
};
</script>