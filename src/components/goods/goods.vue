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
    <div class="foods-wrapper">
      <ul>
        <li>
          <h1>{{typename}}</h1>
          <ul>
            <li v-for="item in goods" class="food-list">
              <h2>{{item.productName}}</h2>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import shopcart from '../shopcart/shopcart'

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
          })
      }
    },
    components: {
      shopcart
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

    }
  }
</style>
