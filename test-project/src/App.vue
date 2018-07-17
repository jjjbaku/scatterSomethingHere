<template>
  <div id="app">
    <side-menu></side-menu>
    <el-col :offset='1' :span='17' class='right-content'>
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
import sideMenu from '@/layout/side-menu'

export default {
  name: 'App',
  components: {
    sideMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2a3c4e;
  /* margin-top: 60px; */
}

.right-content {
  /* text-align: center; */
  padding-top: 10px;
}
</style>
