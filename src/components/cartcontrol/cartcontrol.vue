<template lang="html">
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
      <i class="icon-jian iconfont"></i>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <i class="icon-add iconfont"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        axios.post('/api/tOrderDetailController.do', {
          proId: this.food.id,
          number: 1,
          seatNumber: 11,
          dapartid: 12312
        }).then((res) => {
          console.log(res)
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }
//          if (res.success) {
//          } else {
//            this.$message({
//              type: 'error',
//              message: res.msg
//            })
//          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '出错了'
          })
        })
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .cartcontrol{
    font-size: 0;
    .cart-decrease, .cart-add{
      display: inline-block;
      padding: 6px;
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add{
      .icon-add{
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
        .bgimg-pink-t-b;
      }
    }
    .cart-decrease{
      .icon-jian{
        font-size: 20px;
        color: #ccc;
      }
    }
  }
</style>
