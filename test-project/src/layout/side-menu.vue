<template>
  <el-col :span='6'>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Multiple Items Test</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2" @click="routerPush('/')">
        <i class="el-icon-location"></i>
        <span slot="title">
          Home
        </span>
      </el-menu-item>
      <el-menu-item index="3" @click="routerPush('/cards')">
        <i class="el-icon-view"></i>
        <span slot="title">
          Manage Card Sets
        </span>
      </el-menu-item>
      <el-menu-item index="4" :disabled='false' @click="routerPush('/table')">
        <i class="el-icon-document"></i>
        <span slot="title">
          Data form
        </span>
      </el-menu-item>
      <el-menu-item index="5" @click="routerPush('/vfor-table')">
        <i class="el-icon-setting"></i>
        V-for Table
      </el-menu-item>
      <el-menu-item index="6" @click="routerPush('/render-table')">
        <i class="el-icon-setting"></i>
        Render Table
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'sideMenu',
  beforeCreate: function () {
    // TODO
  },
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key)
      console.log(keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key)
      console.log(keyPath)
    },
    routerPush (url) {
      this.$router.push(url)
    }
  }
}
</script>
