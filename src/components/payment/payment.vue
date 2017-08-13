<template>
  <div class="payment">
    <div class="col">
      <p class="bor-1px"><span class="title">我的桌号</span> <span class="tr">18</span></p>
    </div>
    <div class="col">
      <p><span class="title mr20">酒水送往</span><input :value="sentSomeone" class="sentOut" maxlength="8" ref="nicknamebox" placeholder="如果要赠送给他人，可以填写对方桌号"></p>
    </div>
    <div class="goods-content mt20" ref="shopcarwrapper">
      <ul>
        <li class="bor-1px list-item" v-for="item in shopCar">
          <div class="left">
            <img src="" width="70" height="70">
            <div class="ct">
              <div class="title">{{item.productName}}</div>
              <div class="desc">{{item.speci}}</div>
            </div>
          </div>
          <div class="right">
            <div class="price">¥&nbsp{{item.amount}} &nbsp*&nbsp {{item.number}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col pay-online mt20">
      <p><span class="title">支付方式</span><span class="tr">在线支付</span></p>
    </div>
    <div class="vfooter">
      <div class="content">
        <div class="footer-left">
          <p>¥800.00</p>
        </div>
        <div class="footer-right" @click="pay(2)">
          <div class="pay">确认付款</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        sentSomeone: '',
        shopCar: []
      }
    },
    created() {
      this.getShopCar()
    },
    methods: {
      pay(type) {
        axios.post('/api/tOrderController.do?pay', {
          id: 1,
          payType: type,
          giveSeatNumber: 18
        }).then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: 'ok'
          })
        })
      },
      getShopCar() {
        axios.get('/api/tOrderDetailController.do?getShopCar', {
          params: {
            orderId: 1,
            page: 1,
            row: 8,
            field: 'id,productName,speci,images,number'
          }
        }).then((res) => {
          this.shopCar = (res.data)
          this.$nextTick(() => {
            this.initScroll()
          })
        })
      },
      initScroll() {
        this.shopcarScroll = new BScroll(this.$refs.shopcarwrapper, {
          click: true
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .payment{
    position: absolute;
    background: #eee;
    width: 100%;
    height: 100%;
    .bor-1px{
      .border-1px;
    }
    .mt20{
      margin-top: 15px;
    }
    .mr20{
      margin-right: 15px;
    }
    .sentOut{
      width: 76%;
    }
    .goods-content{
      padding: 0 15px;
      max-height: 425px;
      overflow: hidden;
      background: #fff;
      img{
        vertical-align: bottom;
        margin-right: 5px;
      }
      .list-item{
        display: flex;
        padding: 10px 0;
        .left,.right{
          flex: 1;
        }
        .right{
          padding-top: 20px;
          text-align: right;
          color: rgb(240,20,20);
        }
        .ct{
          display: inline-block;
          .title{
            line-height: 40px;
            font-size: 14px;
            color: #000;
            font-weight:700;
          }
          .desc{
            line-height:30px;
            font-size: 12px;
            color: #7e8c8d;
          }
        }
      }
    }
    .col{
      background: #fff;
      height: 48px;
      line-height:48px;
      font-size: 14px;
      font-weight: 700;
      p{
        margin-left: 20px;
        margin-right: 20px;
        .tr{
          float: right;
        }
      }
      .title{
        color: #333;
      }
    }
    .pay-online{
      position: fixed;
      left: 0;
      bottom: 65px;
      z-index: 50;
      width: 100%;
      height: 48px;
      line-height: 48px;
    }
  }
  .vfooter{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      display: flex;
      background:#201e34;
    }
    .footer-left{
      flex: 1;
      height: 48px;
      line-height: 48px;
      margin-left: 20px;
      font-size: 14px;
      font-weight:700;
      color: #fff;
    }
    .footer-right{
      flex: 0 0 110px;
      width: 110px;
      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 14px;
        font-weight:700;
        color: #fff;
      }
      .bg-pink-l-r;
    }
  }
</style>
