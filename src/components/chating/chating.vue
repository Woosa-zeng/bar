<template>
  <div class="chating">
    <div class="seat">
      <span class="goPrev" @click="goPrev"><</span><span class="seatName">{{otherSeat}}</span>
    </div>
    <div class="msg-wrapper" :class="{inputFocus: focus}" ref="msgwrapper">
      <ul>
        <li v-for="item in chatMsg" class="msg-item">
          <p class="time" v-if="item.createDate">{{item.createDate}}</p>
          <div class="wrapper" :class="{selfMsg: item.sendSeat == mySeat}">
            <img src="../../assets/avatar.jpeg" alt="" width="50" height="50">
            <div class="msg-bor">
              <p>{{item.msg}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-box" id="ipt-box" :class="{inputFocus: focus}">
      <input ref="iptmsg" maxlength="30" @blur="test" @focus="test2">
      <span @click="sendmsg" class="sendmsg">发送</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        focus: false,
        mySeat: 1,
        otherSeat: '11号桌',
        otherAvatar: '',
        myAvatar: '',
        chatMsg: [
          {
            msg: 'I am andy,bala……,hello I am andy,bala……',
            createDate: '12:31',
            sendSeat: 11
          },
          {
            msg: 'hello I am woosa',
            createDate: '12:30',
            sendSeat: 1
          }
        ]
      }
    },
    beforeDestroy() {
      console.log(222)
      window.clearInterval(this.getCurMsg)
    },
    created() {
      this.getChatingDetail()
//      this.getCurMsg = setInterval(() => {
//        axios.get('/api/tChatController.do?getNewMsg', {params: {
//          departId: 1,
//          sendSeat: 22,
//          receiveSeat: 1
//        }}).then((res) => {
//          console.log(res)
//        })
//      }, 3000)
    },
    methods: {
      test2() {
        this.focus = true
        this.$nextTick(() => {
          this._initScroll()
        })
        // alert('focus')
//        let ipt = document.getElementById('ipt-box')
//        setTimeout(() => {
//          ipt.scrollIntoViewIfNeeded(true)
//        }, 100)
      },
      test() {
        console.log('blur')
        // this.focus = false
//        this.$nextTick(() => {
//          this._initScroll()
//        })
      },
      goPrev() {
        this.$router.push({name: 'chat'})
        window.clearInterval(this.getCurMsg)
      },
      sendmsg() {
        this.focus = false
        console.log('sendmsg')
        let val = this.$refs.iptmsg.value
        this.chatMsg.push({
          msg: val,
          createDate: this._initTime(),
          sendSeat: 1
        })
        this.$nextTick(() => {
          this._initScroll()
        })
        this.$refs.iptmsg.value = ''
        axios.post('/api/tChatController.do?doAdd', {
          msg: val,
          departId: 1,
          sendSeat: 1,
          receiveSeat: 11
        }).then((res) => {
          console.log(res)
        })
        console.log(val)
      },
      getChatingDetail() {
        axios.get('/api/tChatController?datagrid', {
          params: {
            departId: 1,
            sendSeat: 12,
            receiveSeat: 11,
            field: 'departId,sendSeat,receiveSeat,msg,createDate'
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
        this.msgScroll = new BScroll(this.$refs.msgwrapper, {
          click: true
        })
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
  .input-box{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 40px;
    input{
      flex: 1;
      height: 40px;
      padding-left: 5px;
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
  .chating{
    .seat{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      text-align: center;
      background: #000;
      color: #fff;
      .goPrev{
        float: left;
        padding: 0 10px;
      }
      .seatName{
        position: relative;
        left: -20px;
      }
    }
    .msg-wrapper{
      position: absolute;
      top:40px;
      bottom: 40px;
      width: 100%;
      overflow: hidden;
      background: #eee;
      .msg-item{
        margin: 10px;
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
          line-height: 30px;
          text-align: center;
          font-size: 13px;
          color: #ccc;
        }
      }
    }
  }
  .chating{
    .msg-wrapper{
      .inputFocus{
        position: relative !important;
        top: 0;
        bottom: 0;
      }
    }
  }
  .inputFocus{
    position: absolute;
    top: 500px;
  }
</style>
