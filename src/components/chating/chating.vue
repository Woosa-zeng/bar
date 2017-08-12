<template>
  <div class="chating">
    <div class="seat">
      <span class="goPrev" @click="goPrev"><</span><span class="seatName">{{otherSeat}}</span>
    </div>
    <div class="msg-wrapper" ref="msgwrapper">
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
    <div class="input-box">
      <input  ref="iptmsg" maxlength="30">
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
        mySeat: 1,
        otherSeat: '11号桌',
        otherAvatar: '',
        myAvatar: '',
        chatMsg: [
          {
            msg: 'hello I am andy,bala……,hello I am andy,bala……',
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
      this.getCurMsg = setInterval(() => {
        axios.get('/api/tChatController.do?getNewMsg', {params: {
          departId: 1,
          sendSeat: 22,
          receiveSeat: 1
        }}).then((res) => {
          console.log(res)
        })
      }, 3000)
    },
    methods: {
      goPrev() {
        this.$router.push({name: 'chat'})
        window.clearInterval(this.getCurMsg)
      },
      sendmsg() {
        let val = this.$refs.iptmsg.value
        axios.post('/api/tChatController.do?doAdd', {
          msg: val,
          departId: 1,
          sendSeat: 1,
          receiveSeat: 11
        }).then((res) => {
          this.chatMsg.push({
            msg: val,
            createDate: this._initTime(),
            sendSeat: 1
          })
          this.$nextTick(() => {
            this._initScroll()
          })
          this.$refs.iptmsg.value = ''
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
        console.log('type' + typeof s)
        if (m.length < 10) {
          m = '0' + m
        }
        if (s.length < 10) {
          s = '0' + s
        }
        console.log(s)
        let _time = `${m}: ${s}`
        return _time
      }
    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  .input-box{
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
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
      padding-top: 10px;
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
</style>
