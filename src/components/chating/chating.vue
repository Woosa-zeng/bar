<template>
  <div class="chating">
    <div class="seat">
      <span class="goPrev" @click="goPrev"><i class="icon-arrow_lift iconfont"></i> </span><span class="seatName">{{otherSeat}}</span>
    </div>
    <div class="msg-wrapper" :class="{inputFocus: focus}" ref="msgwrapper">
      <ul ref="msgwrapperul">
        <li v-for="item in chatMsg" class="msg-item clearfix">
          <p class="time">{{item.createDate}}</p>
          <div class="wrapper" :class="{selfMsg: item.sendSeat == selfId}">
            <img :src="msgurl+item.sendImage" alt="" width="50" height="50">
            <div class="msg-bor">
              <p>{{item.msg}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="ios" class="android-input-box box1">
      <!--<input ref="iptmsg" maxlength="30" @focus="onfocus" @blur="onblur">-->
      <textarea ref="iptmsg" maxlength="30" resize="none" @focus="onfocus"></textarea>
      <span @click="sendmsg" class="sendmsg">发送</span>
    </div>
    <div v-else class="android-input-box box2" id="ipt-box">
      <textarea ref="iptmsg" maxlength="30" resize="none"></textarea>
      <span @click="sendmsg" class="sendmsg">发送</span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import qs from 'qs'
  export default {
    data() {
      return {
        msgurl: 'http://sz.jlhuanqi.com:8080',
        ios: false,
        focus: false,
        selfId: this.$store.state.userId,
        otherSeat: this.$store.state.chatName,
        otherAvatar: '',
        myAvatar: '',
        chatMsg: []
      }
    },
    beforeDestroy() {
      window.clearInterval(this.getCurMsg)
    },
    created() {
      let u = navigator.userAgent
      // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        this.ios = true
      } else {
        this.ios = false
      }
      // this.$message.error('是否是Android：' + isAndroid)
      // this.$message.error('是否是iOS：' + isiOS)
      this.getChatingDetail()
      this.getCurMsg = setInterval(() => {
        axios.post('/api/tChatController.do?getNewMsg', qs.stringify({
          departId: this.$store.state.companyId,
          sendSeat: this.$store.state.chatId,
          receiveSeat: this.$store.state.userId
        })).then((res) => {
          // console.log(res.data)
          if (res.data.msg) {
            this.chatMsg.push({
              msg: res.data.msg,
              createDate: res.data.createDate,
              sendSeat: res.data.sendSeat,
              sendImage: res.data.sendImage
            })
          }
          this.goScrollY() // 重新绘制
        })
      }, 3000)
    },
    methods: {
      onfocus() {
        if (this.ios) {
          this.focus = true
          this.goScrollY() // 重新绘制
        }
      },
      onblur() {
        if (this.ios) {
          this.focus = false
        }
      },
      goPrev() {
        this.$router.push({name: 'chat'})
        window.clearInterval(this.getCurMsg)
      },
      sendmsg() {
        if (this.ios) {
          this.focus = false
        }
        let val = this.$refs.iptmsg.value
        this.chatMsg.push({
          msg: val,
          createDate: this._initTime(),
          sendSeat: this.selfId,
          sendImage: this.$store.state.selfAvatar
        })
        this.goScrollY() // 重新绘制
        this.$refs.iptmsg.value = ''
        axios.post('/api/tChatController.do?doAdd', qs.stringify({
          msg: val,
          departId: this.$store.state.companyId,
          sendSeat: this.$store.state.userId,
          receiveSeat: this.$store.state.chatId
        })).then((res) => {
          // console.log(res)
        })
        // console.log(val)
      },
      getChatingDetail() {
        axios.get('/api/tChatController.do?datagrid', {
          params: {
            departId: this.$store.state.companyId,
            sendSeat: this.$store.state.chatId,
            receiveSeat: this.$store.state.userId,
            field: 'departId,sendSeat,receiveSeat,msg,createDate'
          }
        }).then((res) => {
          console.log(`获取消息`)
          if (res.data) {
            this.chatMsg = res.data
            this.$nextTick(() => {
              this._initScroll()
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      goScrollY() {
        if (this.chatMsg.length) {
          this.$nextTick(() => {
            let el = this.$refs.msgwrapperul.lastElementChild
            this.msgScroll.refresh()
            this.msgScroll.scrollToElement(el, 400)
          })
        }
      },
      _initScroll() {
        if (this.chatMsg.length) {
          this.msgScroll = new BScroll(this.$refs.msgwrapper, {
            click: true,
            probeType: 3
          })
          let el = this.$refs.msgwrapperul.lastElementChild
          this.msgScroll.scrollToElement(el, 400)
        }
      },
      _initTime() {
        let time = new Date()
        let m = time.getHours()
        let s = time.getMinutes()
        // console.log('type' + typeof s)
        if (m < 10) {
          m = '0' + m
        }
        if (s < 10) {
          s = '0' + s
        }
        console.log('type' + typeof s)
        let _time = `${m}: ${s}`
        return _time
      }
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .android-input-box, .ios-input-box{
    textarea, input{
      flex: 1;
      box-sizing: border-box;
      height: 40px;
      padding-left: 5px;
      font-size: 16px;
      line-height: 30px;
      outline: none;
      resize: none;
    }
    .sendmsg{
      flex: 0 0 80px;
      width: 80px;
      height: 40px;
      line-height: 38px;
      text-align: center;
      background: #7b3ce2;
      color: #fff;
      font-size: 17px;
      font-weight:700;
    }
  }
  .android-input-box{
    display: flex;
    width: 100%;
    height: 40px;

  }
  .ios-input-box{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 40px;
  }
  .chating{
    height: 100%;
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
    .msg-wrapper{
      width: 100%;
      height: 87%;
      overflow: hidden;
      background: #eee;
      ul{
        padding: 0 20px;
      }
      .msg-item{
        margin: 5px;
        width: 100%;
        .wrapper{
          img{
            display: inline-block;
            border-radius: 50%;
            vertical-align: top;
            margin-right: 8px;
          }
          .msg-bor{
            display: inline-block;
            margin-top: 10px;
            padding: 15px;
            max-width: 60%;
            background: #fff;
            vertical-align: top;
            border-radius: 0 30px 30px 30px;
            p{
              font-size: 17px;
              color: #333;
            }
          }
        }
        .selfMsg{
          img,.msg-bor{
            float: right;
          }
          img{
            margin-right: 0;
            margin-left: 8px;
          }
          .msg-bor{
            border-radius: 30px 0px 30px 30px;
            background: #7b3ce2;
            p{
              color: #fff;
            }
          }
          &:after{
            content: '.';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
           }
        }
        .time{
          line-height: 20px;
          text-align: center;
          font-size: 13px;
          color: #ccc;
        }
      }
    }
  }
  .chating{
    .msg-wrapper{
      &.inputFocus{
        height: 80%;
        overflow: hidden;
      }
    }
  }
</style>
