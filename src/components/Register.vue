<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12">
        <h1>Register</h1>
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="120px"
          class="demo-ruleForm"
        >
          <img src="@/assets/logo.png" alt>
          <el-form-item label="Username" prop="email">
            <el-input type="email" v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">Enter</el-button>
            <el-button @click="resetForm('form')">Reset</el-button>
          </el-form-item>
        </el-form>
        <router-link :to="{ path: 'login' }" tag="a">Login</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      form: {
        email: "",
        pass: ""
      },
      rules: {
        email: { required: true, message: "insert a email", trigger: "blur" },
        pass: {
          required: true,
          message: "insert a password",
          trigger: "blur"
        },
        name: {
          required: true,
          message: "insert a name",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.pass)
            .then(r => {
              this.$notify({
                title: "Success",
                message: "account created!",
                type: "success"
              });
              this.$router.push({ path: "/login" });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>