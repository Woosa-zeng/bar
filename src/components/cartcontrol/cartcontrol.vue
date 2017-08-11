<template lang="html">
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="item.count>0" @click="decreaseCart">
      <i class="icon-jian iconfont"></i>
    </div>
    <div class="cart-count" v-show="item.count>0">{{item.count}}</div>
    <div class="cart-add" @click="addCart">
      <i class="icon-add iconfont"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      item: {
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
        if (!this.item.count) {
          Vue.set(this.item, 'count', 1)
        } else {
          this.item.count++
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.item.count) {
          this.item.count--
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
