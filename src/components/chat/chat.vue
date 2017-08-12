<template>
  <div class="chat">
    <div class="list-wrapper" ref="listwrapper">
      <ul>
        <li @click="goChating" class="list-item">
          <div class="left">
            <img src="../../assets/avatar.jpeg" alt="" width="60" height="60">
            <div class="ct">
              <div class="title">
                10号桌
                <div class="icon" :class="{r40: ismale}">
                  <i v-if="ismale" class="icon-male iconfont"></i>
                  <i v-else class="icon-female iconfont"></i>
                </div>
              </div>
              <div class="msg">
                hello~
              </div>
            </div>
          </div>
          <div class="right">
            <div class="time">12:00</div>
            <div class="icon"></div>
          </div>
        </li>
        <li @click="goChating" class="list-item">
          <div class="left">
            <img src="../../assets/avatar.jpeg" alt="" width="60" height="60">
            <div class="ct">
              <div class="title">
                10号桌
                <div class="icon">
                  <i class="icon-female iconfont"></i>
                </div>
              </div>
              <div class="msg">
                hello~
              </div>
            </div>
          </div>
          <div class="right">
            <div class="time">12:00</div>
            <div class="icon"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        listItem: {
          imgs: '../../assets/logo.png'
        },
        ismale: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        axios.get('/api/tSeatController.do?datagrid', {
          params: {
            page: 1,
            rows: 10,
            departId: 112,
            currentSeat: 11,
            field: 'seat,sex,images,msgs'
          }
        }).then((res) => {
          console.log(res)
          this.$nextTick(() => {
            this._initScroll()
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      _initScroll() {
        this.listScroll = new BScroll(this.$refs.listwrapper, {
          click: true
        })
      },
      goChating() {
        this.$router.push({name: 'chating'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .chat{
    padding: 10px;
    .list-item{
      display: flex;
      padding: 10px;
      margin-bottom: 10px;
      .left{
        flex: 1;
      }
      .right{
        flex: 0 0 80px;
        width: 80px;
        text-align: right;
        .time{
          font-size: 13px;
          color: #7e8c8d;
          margin-top: 10px;
          margin-bottom: 8px;
        }
        .icon{
          float: right;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgb(240,20,20);
        }
      }
      img{
        display: inline-block;
        border-radius: 50%;
        vertical-align: bottom;
      }
      .ct{
        display: inline-block;
        .title{
          display: inline-block;
          height: 30px;
          line-height: 30px;
          font-size: 17px;
          font-weight: 700;
          color: #333;
          vertical-align: bottom;
          .icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            .bgimg-pink-t-b;
            .iconfont{
              font-size: 15px;
              color: #fff;
            }
          }
          .r40{
            transform: rotate(40deg);
          }
        }
        .msg{
          height: 20px;
          line-height: 20px;
          margin-bottom: 4px;
          color: #7e8c8d;
        }
      }
    }
  }
</style>
