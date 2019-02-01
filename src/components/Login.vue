<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12">
        <h1>Login</h1>
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="120px"
          class="demo-ruleForm"
        >
          <img src="@/assets/logo.png" alt>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="auth('form')">Enter</el-button>
            <el-button @click="resetForm('form')">Reset</el-button>
          </el-form-item>
        </el-form>
        <router-link :to="{ path: 'register' }" tag="a">Don't have account , create here!</router-link>
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
        email: { required: true, message: "Ingrese un email", trigger: "blur" },
        pass: {
          required: true,
          message: "ingrese una contraseña",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    auth(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //loggueo al usuario
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              return firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.pass)
                .then(r => {
                  console.log("login!");
                  this.$router.push({ path: "/" });
                })
                .catch(e => console.log("error!"));
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