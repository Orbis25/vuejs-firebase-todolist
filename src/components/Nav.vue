<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2" class="homa">{{username}}</el-menu-item>
      <el-menu-item index="2" class="out">
        <el-button type="danger" @click="singOut">SignOut</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  props: ["username"],
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect() {
      console.log("yp");
    },
    singOut() {
      //deslogueo al usuario
      firebase
        .auth()
        .signOut()
        .then(r => {
          console.log("singOut");
          this.$router.push({ path: "/login" });
        })
        .catch(e => {
          console.log("error");
        });
    }
  }
};
</script>
<style >
.homa {
  position: relative;
  left: 65em;
}
.out {
  position: relative;
  left: 65em;
}
</style>