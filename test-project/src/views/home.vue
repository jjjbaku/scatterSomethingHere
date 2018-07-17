<template>
  <div class='center'>
    <img src="../assets/logo.png">
    <p>Welcome to the home page!</p>
    <p>So this is the noob number: {{noobNumber}}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      noobNumber: 123,
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style>
.center {
  text-align: center;
  margin: 10px;
}
</style>
