<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods"
            :class="{'cur': currentIndex === index}"
            @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.dictType < 1 "><i class="icon-fire iconfont"></i></span>
            {{item.dictTypeName}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.dictTypeName}}</h1>
          <ul>
            <li v-for="food in item.productList" class="food-item">
              <div class="icon">
                <img width="70" height="70" :src=imgurl+food.speciDetail.images>
              </div>
              <div class="content">
                <h2 class="name">{{food.productName}}</h2>
                <p class="desc">{{food.speciDetail.dictNameNext}}</p>
                <div class="price">
                  <span class="now">￥{{food.discount < 1 ? food.discountPrice : food.price}}</span>
                  <span class="old" v-show="food.discount < 1">￥{{food.discount < 1 ? food.price : food.discountPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  import qs from 'qs'

  export default {
    data() {
      return {
        imgurl: 'http://sz.jlhuanqi.com:8080/api/cgformTemplateController.do?showPic&path=',
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created() {
      axios.post('/api/tProductController.do?getListIndex', qs.stringify({
        departid: this.$store.state.companyId
      }))
        .then((res) => {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
          console.log(this.goods)
        })
        .catch((res) => {
          console.log(res)
        })
    },
    mounted() {
    },
    computed: {
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.productList.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      selectMenu(index) {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          // console.log(pos.y)
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
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
    background: #fff;
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
          img{
            display: block;
            border-radius: 7px;
            border: 1px solid #ccc;
          }
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
