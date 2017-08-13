<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="ct-left">
        <div class="logo-wrapper">
          <i class="icon-gouwuchekong iconfont"></i>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥<span>{{totalPrice}}</span>元</div>
      </div>
      <div class="ct-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow" >
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listct">
        <ul>
          <li class="food" v-for="item in selectFoods">
            <span class="name">{{item.productName}}</span>
            <div class="price">
              <span>￥{{item.price*item.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :item="item"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <div class="list-mask" @click="hideList" v-show="listShow" transition="fade"></div>
  </div>

</template>
<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
          ]
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return '购物车为空'
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice === 0) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listct, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        console.log('show: ' + show)
        return show
      }
    },
    methods: {
      toggleList() {
        console.log(this.totalCount)
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
        console.log(this.fold)
      },
      hideList() {
        this.fold = true
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay() {
        if (this.totalPrice === 0) {
          return
        }
        this.$router.push({name: 'payment'})
        // this.$store.commit('ROUTE_CHANGE', {activeRoute: this.$route.name})
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .fold-enter-active,fold-leave-active {
    transition: all .5s ease;
  }
  .fold-enter, .fold-leave-to{
    opacity: 0;
  }
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      display: flex;
      background:#201e34;
      .ct-left{
        flex: 1;
        font-size: 0;
        .logo-wrapper{
          position: relative;
          top: -15px;
          display: inline-block;
          width: 55px;
          height: 55px;
          line-height: 55px;
          margin-left: 10px;
          text-align: center;
          border-radius: 50%;
          .bgimg-pink-t-b;
          .icon-gouwuchekong{
            color: #fff;
            font-size:28px;
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight:700;
            color: #fff;
            background: rgb(240,20,20);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }
      }
      .ct-right{
        flex: 0 0 110px;
        width: 110px;
        .pay{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 14px;
          font-weight:700;
          color: #fff;
          &.not-enough{
             background: #ccc;
           }
          &.enough{
            .bg-pink-l-r;
           }
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transition: all 1s;
      transform: translate3d(0, -100%, 0);
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          padding-left: 8px;
          padding-right: 8px;
          font-size: 14px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: 12px 0;
          height: 24px;
          .border-1px;
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, 0.6);
  }
</style>
