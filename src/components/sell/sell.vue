<template>
  <div id="sell">
    <vheader></vheader>
    <div class="nav">
      <div class="nav-goods"
           @click="doActive(0)">
        <span :class="{'isActive': isActive[0]}">点单</span>
      </div>
      <div class="nav-chart"
           @click="doActive(1)">
        <span :class="{'isActive': isActive[1]}">聊天</span>
      </div>
    </div>
    <div id="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import vheader from '../header/header'
  export default {
    data() {
      return {
        isActive: [true, false]
      }
    },
    created() {
      // this.$router.push({name: 'goods'})
      // this.$store.commit('ROUTE_CHANGE', {activeRoute: 'goods'})
    },
    mounted() {
      this.setActiveNav()
    },
    computed: {
      activeRoute() {
        return this.$store.state.activeRoute
      }
    },
    methods: {
      doActive(index) {
        this.go(index)
        console.log('router==' + this.$route.name)
        this.$store.commit('ROUTE_CHANGE', {activeRoute: this.$route.name})
        this.setActiveNav()
      },
      go(index) {
        switch (index) {
          case 0:
            this.$router.push({name: 'goods'})
            break
          case 1:
            this.$router.push({name: 'chat'})
            break
        }
      },
      setActiveNav() {
        let mapRoute = {
          'goods': 0,
          'chat': 1
        }
        this.isActive = [false, false]
        this.isActive[mapRoute[this.activeRoute]] = true
        console.log('id' + this.activeRoute)
      }
    },
    components: {
      vheader
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  @import "../../common/less/mixin.less";

  .nav{
    display: flex;
    height: 40px;
    line-height: 36px;
    background: #fff;
    .border-1px;
    .nav-goods,.nav-chart{
      flex: 1;
      box-sizing: border-box;
      text-align: center;
      span{
        display: inline-block;
        width: 100px;
        color: #000;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
      }
    .isActive{
      color: #7b3ce2;
      border-bottom: 2px solid #7b3ce2;
      }
    }

  }

</style>
