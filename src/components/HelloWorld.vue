<template>
  <div class="hello">
    <navbar :username="username"></navbar>
    <div></div>
    <h2>
      {{msg}}
      <el-button type="primary" @click="dialogFormVisible = true">Add new</el-button>
    </h2>
    <el-row :gutter="10" v-loading="loading">
      <div v-show="tasks.length <= 0">No hay tareas para mostrar</div>
      <el-col v-for="(task,index) in tasks" :key="index" :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span contenteditable="true">{{task.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="remove(task.key)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
          <p>
            <span contenteditable="true">{{task.task}}</span>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="Add Task" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Task" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="Please input" v-model="form.task"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; add()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
import navbar from "./Nav";
export default {
  name: "HelloWorld",
  components: {
    navbar
  },
  data() {
    return {
      msg: "Welcome to TodoList App with firebase!!",
      dialogFormVisible: false,
      form: {
        title: "",
        task: ""
      },
      formLabelWidth: "120px",
      tasks: [],
      existTask:false,
      loading: false
    };
  },
  created() {
    this.getAll();
  },
  computed: {
    username: () => firebase.auth().currentUser.email
  },
  methods: {
    add() {
      let db = firebase.database();
      this.tasks = [];
      this.loading = true;
      db.ref("tasks/")
        .push({
          username: firebase.auth().currentUser.email,
          title: this.form.title,
          task: this.form.task
        })
        .then(r => {
          this.$notify({
            title: "Success",
            message: "Task created!",
            type: "success"
          });
          this.loading = false;
        });
    },
    getAll() {
      let db = firebase.database();
      this.loading = true;
      this.tasks = [];
      db.ref("tasks/").on("value", snapshot => {
        let snap = snapshot.val();
        for (let key in snap) {
          this.tasks.push({
            title: snap[key].title,
            task: snap[key].task,
            key: key
          });
        }
        this.loading = false;
      });
    },
    remove(key) {
      let db = firebase.database();
      this.$confirm(
        "This will permanently delete the task. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          db.ref("tasks/" + key)
            .remove()
            .then(r => {
              this.$message({
                type: "success",
                message: "Delete completed"
              });
            })
            .catch(e => {
              this.$message({
                type: "info",
                message: "Delete canceled"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-row {
  margin-top: 100px;
}
h2 {
  margin-top: 30px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 280px;
  margin-top: 10px;
  margin-left: 20px;
}
</style>