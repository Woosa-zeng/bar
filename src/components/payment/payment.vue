<template>
  <div class="payment">
    <div class="col">
      <p class="bor-1px"><span class="title">我的桌号</span> <span class="tr">{{seat}}</span></p>
    </div>
    <div class="col">
      <p class="bor-1px"><span class="title mr20">酒水送往</span><input v-model="sentSomeone" class="sentOut" maxlength="8" ref="nicknamebox" placeholder="如果要赠送给他人，可以填写对方桌号" ></p>
    </div>
    <div class="col pay-online">
      <p><span class="title">支付方式</span><span class="fr goChangePayment" @click="show=!show">{{payment}}</span></p>
    </div>
    <div class="goods-content mt20" ref="shopcarwrapper">
      <ul>
        <li class="bor-1px list-item" v-for="item in shopCar">
          <div class="left">
            <img :src="imgurl+item.images" width="70" height="70">
            <div class="ct">
              <div class="title">{{item.productName}}</div>
              <div class="desc">{{item.speci}}</div>
            </div>
          </div>
          <div class="right">
            <div class="price">¥&nbsp{{item.price}} &nbsp*&nbsp {{item.number}}</div>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="vfooter">
      <div class="content">
        <div class="footer-left">
          <p>¥{{amount}}</p>
        </div>
        <div class="footer-right" @click="payType">
          <div class="pay">确认付款</div>
        </div>
      </div>
    </div>
    <div class="payment-mask" v-if="show"></div>
    <transition name="fold">
      <div class="selectPayment" v-if="show">
        <div class="paymentHeader">选择付款方式</div>
        <ul>
          <li class="payment-item" @click="changePayment(0)">
            <div>
              <img src="./icon_wx.png" alt="" width="30" height="30">
              <span>微信支付</span>
              <img src="./icon_gouxuan.png" alt="" width="20" height="20" :class="{cur: paymentFlag===0}" class="hide">
            </div>
          </li>
          <li class="payment-item" @click="changePayment(1)">
            <div>
            <img src="./icon_xx.png" alt="" width="30" height="30">
            <span>线下支付</span>
            <img src="./icon_gouxuan.png" alt="" width="20" height="20" :class="{cur: paymentFlag===1}" class="hide">
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script >
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import qs from 'qs'
  export default {
    data() {
      return {
        imgurl: 'http://pay.zuchezaixian.net/api/cgformTemplateController.do?showPic&path=',
        seat: this.$store.state.selfSeat,
        sentSomeone: '',
        shopCar: [],
        show: false,
        payment: '微信支付',
        paymentFlag: 0,
        amount: ''
      }
    },
    created() {
      this.getShopCar()
      this.getAmount()
    },
    methods: {
      isNumber() {
        let val = this.sentSomeone
        val = val - 0
        if (val > 0) {
          console.log(typeof val)
        } else {
          this.$message({
            type: 'error',
            message: '请输入数字！'
          })
        }
      },
      changePayment(val) {
        this.paymentFlag = val
        if (val === 0) {
          this.payment = '微信支付'
        } else {
          this.payment = '在线支付'
        }
        setTimeout(() => {
          this.show = false
        }, 800)
      },
      payType() {
        let type = this.paymentFlag
        if (type === 0) {
          this.payOnline()
        } else {
          this.pay()
        }
      },
      payOnline() {
        let state = this.$store.state.orderId + ',' + (this.sentSomeone || 0)
        console.log(`state== ${state}`)
        // let url = 'http://pay.zuchezaixian.net/api/tOrderController.do?wxPay'
        // let weixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxea944f4cb5ae3127&redirect_uri=' + encodeURI(url) + `&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
        // window.location.href = encodeURI(weixinUrl)
        // console.log(weixinUrl)
      },
      pay() {
        axios.post('/api/tOrderController.do?pay', qs.stringify({
          id: this.$store.state.orderId,
          payType: this.paymentFlag,
          giveSeatNumber: this.sentSomeone
        })).then((res) => {
          if (res.data.success) {
            this.$router.push({name: 'paysuccess'})
//            this.$message({
//              type: 'success',
//              message: '支付成功，即将返回！'
//            })
//            setTimeout(() => {
//              this.$router.push('goods')
//            }, 1500)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      getShopCar() {
        axios.get('/api/tOrderDetailController.do?getShopCar', {
          params: {
            orderId: this.$store.state.orderId,
            page: 1,
            row: 8,
            field: 'id,productName,speci,amount,number,price,images'
          }
        }).then((res) => {
          res = res.data.rows
          if (res) {
            this.shopCar = (res)
            this.$nextTick(() => {
              this.initScroll()
            })
          }
          console.log(this.shopCar)
        })
      },
      getAmount() {
        axios.get('/api/tOrderController.do?getId', {
          params: {
            id: this.$store.state.orderId
          }
        }).then((res) => {
          this.amount = res.data.amount
          console.log(this.amount)
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
  .hide{
    display: none;
  }
  .goChangePayment{
    &:after{
      display: inline-block;
      content: "";
       width: 8px;
       height: 13px;
       background: url('./icon_gengduo.png') no-repeat;
       background-size: cover;
       vertical-align: middle;
       margin-left: 10px;
     }
  }
  .payment-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    background: #000;
    opacity: 0.5;
    z-index:8888;
    backdrop-filter: blur(10px);
  }
  .selectPayment{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 160px;
    width: 100%;
    z-index: 9999;
    background: #fff;
    .paymentHeader{
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      .border-1px;
    }
    .payment-item{
      height: 60px;
      line-height: 60px;
      width:100%;
      span, img{
        vertical-align: middle;
      }
      img{
        margin-left: 15px;
        margin-right: 15px;
      }
      .cur{
        float: right;
        margin-top: 20px;
        display: block;
      }
      &:nth-child(1){
        .border-1px;
       }
    }
  }
  .payment{
    position: absolute;
    background: #eee;
    width: 100%;
    height: 100%;
    .bor-1px{
      .border-1px;
    }
    .mt20{
      margin-top: 10px;
    }
    .mr20{
      margin-right: 15px;
    }
    .sentOut{
      width: 76%;
    }
    .goods-content{
      padding: 0 15px;
      max-height: 456px;
      overflow: hidden;
      background: #fff;
      img{
        vertical-align: bottom;
        margin-right: 5px;
      }
      .list-item{
        display: flex;
        padding: 10px 0;
        .left{
          img{
            display: inline-block;
            border-radius: 7px;
            border: 1px solid #ccc;
          }
        }
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
        .fr{
          float: right;
        }
      }
      .title{
        color: #333;
        margin-right: 10px;
      }
    }
    .pay-online{
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
