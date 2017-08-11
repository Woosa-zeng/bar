<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item"
            @click="go(0)"
            :class="{'cur': cur[0]}">
          <span class="text">
            <i class="icon-fire iconfont"></i>
            热销
          </span>
        </li>
        <li class="menu-item" @click="go(1)"
            :class="{'cur': cur[1]}">
          <span class="text">
            酒水
          </span>
        </li>
        <li class="menu-item" @click="go(2)"
            :class="{'cur': cur[2]}">
          <span class="text">
            饮料
          </span>
        </li>
        <li class="menu-item" @click="go(3)"
            :class="{'cur': cur[3]}">
          <span class="text">
            零食
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapper" id="wrapper">
      <div>
      <h1 class="title">{{typename}}</h1>
      <ul>
        <li v-for="item in goods" class="food-item">
          <div class="icon">
            <img width="70" height="70" :src=item.speciDetail.images>
          </div>
          <div class="content">
            <h2 class="name">{{item.productName}}</h2>
            <p class="desc">100ml</p>
            <div class="price">
              <span class="now">￥{{item.price}}</span>
              <span class="old" v-show="item.discount">￥{{item.discountPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :item="item"></cartcontrol>
            </div>
          </div>
        </li>
        <li v-for="item in goods" class="food-item">
          <div class="icon">
            <img width="70" height="70" :src=item.speciDetail.images>
          </div>
          <div class="content">
            <h2 class="name">{{item.productName}}</h2>
            <p class="desc">100ml</p>
            <div class="price">
              <span class="now">￥{{item.price}}</span>
              <span class="old" v-show="item.discount">￥{{item.discountPrice}}</span>
            </div>
          </div>
        </li>
      </ul>
      </div>
    </div>
    <shopcart :select-foods="selectFoods"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        goods: [],
        cur: [true, false, false, false],
        typename: '热销',
        type: 0,
        page: 1,
        rows: 6
      }
    },
    created() {
      console.log('create')
      this.go(0)
    },
    mounted() {
    },
    computed: {
      selectFoods() {
        let foods = []
        this.goods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
        return foods
      }
    },
    methods: {
      setCur() {
        this.cur = [false, false, false, false]
        this.cur[this.type] = true
        this.getInfo(this.type)
      },
      go(index) {
        switch (index) {
          case 0:
            this.type = 0
            this.setCur()
            break
          case 1:
            this.type = 1
            this.setCur()
            break
          case 2:
            this.type = 2
            this.setCur()
            break
          case 3:
            this.type = 3
            this.setCur()
            break
        }
      },
      getInfo() {
        axios.get('/api/tProductController.do', {
          dictType: this.type,
          page: this.page,
          rows: this.rows,
          departid: '8a8ab0b246dc81120146dc8180a20016',
          productStatus: 1,
          field: 'dictType,id,productName,discount,price,discountPrice,inventory,speciDetail.images'
        })
          .then((res) => {
            this.goods = res.data
            this.$nextTick(() => {
              this._initScroll()
            })
          })
      },
      _initScroll() {
        // this.foodsScroll = new BScroll(document.getElementById('wrapper'), {})
        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
          click: true
        })
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .goods{
    display: flex;
    position: absolute;
    top:138px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #eee;
      .menu-item{
        display: table;
        height: 54px;
        width: 80px;
        line-height: 54px;
        .border-1px;
        .text{
          display: table-cell;
          width: 80px;
          vertical-align: middle;
          font-size: 12px;
          text-align: center;
          .icon-fire{
            font-size: 20px;
            color: #e44b4b;
          }
        }

      }
      .cur{
        background: #fff;
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        padding-left:14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #e5e5e5;
        font-size: 12px;
        color: #333;
        background: #eee;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom:18px;
        .border-1px;
        &:last-child{
           margin-bottom: 0;
          .border-none;
         }
        .icon{
          flex: 0 0 70px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            margin: 2px 0 8px 0;
            height: 17px;
            line-height: 17px;
            font-size: 17px;
            color: #000;
          }
          .desc{
            margin-bottom: 8px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159)
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 4px;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159)
            }
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }

</style>
