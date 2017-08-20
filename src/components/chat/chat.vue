<template>
  <div class="chat">
    <div class="list-wrapper" ref="listwrapper">
      <ul>
        <li @click="goChating(item.id)" class="list-item" v-for="item in listItem">
          <div class="left">
            <img :src="imgurl+item.images" alt="" width="60" height="60">
            <div class="ct">
              <div class="title">
                {{item.nickName}}
                <div class="icon" :class="{r40: ismale}">
                  <i v-if="item.sex > 0" class="icon-male iconfont"></i>
                  <i v-else class="icon-female iconfont"></i>
                </div>
              </div>
              <div class="msg">
                {{item.msgs}}
              </div>
            </div>
          </div>
          <div class="right" v-if="item.msgs">
            <div class="time">{{item.msgs.createDate}}</div>
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
        imgurl: 'http://sz.jlhuanqi.com:8080/api/cgformTemplateController.do?showPic&path=',
        listItem: [],
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
            departId: this.$store.state.companyId,
            currentId: this.$store.state.userId,
            field: 'seat,sex,images,msgs,id'
          }
        }).then((res) => {
          this.listItem = res.data.rows
          console.log(res.data.rows)
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
      goChating(id) {
        console.log('id===' + id)
        this.$store.commit('CHAT_ID', {'chatId': id})
        this.$router.push({name: 'chating'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .chat{
    display: flex;
    position: absolute;
    top: 138px;
    bottom:1px;
    width: 100%;
    overflow: hidden;
    .list-wrapper{
      width: 100%;
    }
    .list-item{
      display: flex;
      width:100%;
      overflow: hidden;
      margin-bottom: 10px;
      .left{
        flex: 1;
        padding:10px;
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
