<template>
  <div class="hello">
      <navbar :username="username"></navbar>
    <div>
    </div>
    {{msg}}
  </div>
</template>

<script>
import firebase from 'firebase'
import navbar from './Nav'
export default {
  name: 'HelloWorld',
  components:{
    navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log(firebase.auth().currentUser)
  },
  computed:{
    username : () => firebase.auth().currentUser.email
  }
}
</script>