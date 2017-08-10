<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            {{item.dictType}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1>{{item.dictType}}</h1>
          <ul>
            <li></li>
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
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        axios.get('/api/tProductController.do', {
          page: 1,
          rows: 4,
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
        line-height: 14px;
        .border-1px;
        .text{
          display: table-cell;
          width: 80px;
          vertical-align: middle;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .foods-wrapper{
      flex: 1;

    }
  }
</style>
