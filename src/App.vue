<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gender: null
    }
  },
  mounted() {
    this.getCompanyInfo()
  },
  methods: {
    getCompanyInfo() {
      axios.post('/api/tSeatController.do?Update', {
        seat: 8,
        departId: '8a8ab0b246dc81120146dc8180a20016',
        sex: 0
      }).then((res) => {
        res = res.body
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
