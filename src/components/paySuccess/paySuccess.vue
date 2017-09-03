<template>
  <div class="pay-success">
    <div class="seat">
      <span class="goPrev" @click="goPrev"><i class="icon-arrow_lift iconfont"></i></span><span class="seatName">支付成功</span>
    </div>
    <div class="content">
      <div class="img-wrapper">
        <span>1</span>
        <img src="./zhifuchenggong.png" alt="" width="187.5" height="158.64">
      </div>
      <p>您的订单我们已经收到</p>
      <p>请您耐心等待</p>
    </div>
    <div class="btn" @click="goPrev">
      确定
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      goPrev() {
        this.$router.push({name: 'goods'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import "../../common/less/mixin.less";
  .pay-success{
  .content{
    .img-wrapper{
      span{
        visibility: hidden;
      }
      img{
        display: block;
        margin: 25% auto 10px;
      }
    }
    p{
      text-align: center;
      font-size: 15px;
      line-height: 24px;
    }
  }
  .btn{
    height: 44px;
    width: 65%;
    margin: 20px auto;
    line-height: 44px;
    border-radius: 44px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    .bg-pink-l-r;
  }
  .seat{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #000;
    color: #fff;
  .goPrev{
    float: left;
    padding: 0 10px;
    font-size: 24px;
  }
  .seatName{
    position: relative;
    left: -20px;
    font-size: 18px;
  }
  }
  }
</style>
