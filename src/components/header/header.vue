<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="companyAvatar" alt="" width="70" height="70">
      </div>
      <div class="content">
        <h1>{{companyName}}</h1>
        <div class="msg">
          <i class="icon-xiaolaba iconfont"></i>
          <span>欢迎您的光临！</span>
        </div>
      </div>
      <div class="userInfo" @click="changeNameLayer">
        <i v-if="ismale" class="icon-male iconfont"></i>
        <i v-else class="icon-female iconfont"></i>
        <span class="userName">{{nickname}}</span>
      </div>
    </div>
    <div class="mask" :class="{hide: genderflag}">
      <div class="msg-box-wrapper">
        <div class="msg-box">
          <div class="msg-box-header">你是哥哥还是妹妹</div>
          <div class="msg-box-content">
            <div class="msg-box-left" @click="changeGender('male')">
              <div class="icon" :class="{active: ismale}">
                <i class="icon-male iconfont"></i>
              </div>
              <span>Boy</span>
            </div>
            <div class="msg-box-right" @click="changeGender('female')">
              <div class="icon" :class="{active: isfemale}">
                <i class="icon-female iconfont"></i>
              </div>
              <span>Girl</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal"></div>
    </div>
    <div class="msg-name msg-box-wrapper" :class="{hide: changeName}" @click.self="closeChangenameFlag">
      <div class="msg-box" @click.self.prevent="closeChangenameFlag">
        <div class="msg-box-header">呢称</div>
        <div class="msg-box-content">
          <input :value="nickname" class="c-nikename" maxlength="8" ref="nicknamebox">
        </div>
        <div class="btn">
          <div class="left" @click="saveNewName"><div class="btn-save">保存</div></div>
          <div class="right" @click="cancelNewName"><div class="btn-cancel">取消</div></div>
        </div>
      </div>
    </div>
    <div class="msk-c" :class="{hide: changeName}" ></div>
  </div>
</template>
<script >
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data() {
      return {
        imgurl: 'http://sz.jlhuanqi.com:8080/api/cgformTemplateController.do?showPic&path=',
        gender: '',
        companyAvatar: '',
        companyName: '',
        ismale: true,
        isfemale: false,
        genderflag: this.$store.state.genderFlag,
        changeName: true,
        nickname: '',
        userInfo: {}
      }
    },
    created() {
      this.getInfo()
      // console.log('created==' + this.genderflag)
    },
    watch: {
      gender() {
        console.log('watch==' + this.ismale)
      }
    },
    computed: {
    },
    methods: {
      GetQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return r[2]
        } else {
          return null
        }
      },
      getInfo() {
        // 扫描存储用户信息
//        axios.get('/html/index.html?seat=88888&logo=index_16849634.jpg&cId=402880e447e99cf10147e9a03b320003&cName=encodeURI(%E2%80%99%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%A5%BD%E5%A5%BD%E9%85%92%E5%90%A7%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E2%80%98)#/goods').then(res => {
//          console.log(res)
//        })
//        let cId = this.GetQueryString('cId')
//        let cName = decodeURI(this.GetQueryString('cName'))
//        let seat = this.GetQueryString('seat')
//        this.companyAvatar = 'http://sz.jlhuanqi.com:8080/api/cgformTemplateController.do?showPic&path=' + this.GetQueryString('logo')
        let nickname = window.localStorage.getItem('nickname')
        console.log('nickname===' + nickname)
        let cId = '402880e447e99cf10147e9a03b320003'
        let cName = '深圳市好好酒吧有限公司'
        let seat = 88888
        this.companyAvatar = 'http://sz.jlhuanqi.com:8080/api/cgformTemplateController.do?showPic&path=index_16849634.jpg'
        this.companyName = cName
        this.nickname = nickname || seat
        this.$store.commit('SELF_SEAT', {selfSeat: seat})
        this.$store.commit('COMPANY_NAME', {companyName: cName})
        this.$store.commit('COMPANY_ID', {companyId: cId})
      },
      // 保存修改昵称
      saveNewName() {
        let newName = this.$refs.nicknamebox.value
        axios.post('/api/tChatUserController.do?doUpdate', qs.stringify({
          Id: this.$store.state.userId,
          nickName: newName
        })).then(res => {
          this.nickname = newName
          window.localStorage.setItem('nickname', newName)
          this.$store.commit('NICKNAME', {nickname: newName})
        })
        this.closeChangenameFlag()
      },
      // 取消修改昵称
      cancelNewName() {
        this.$refs.nicknamebox.value = this.nickname
        this.closeChangenameFlag()
      },
      // 打开切换昵称层
      closeChangenameFlag() {
        this.changeName = true
      },
      // 关闭切换昵称层
      changeNameLayer() {
        this.changeName = false
      },
      // 入口选择性别
      changeGender(val) {
        this.gender = val
        // let id = 0
        if (val === 'male') {
          this.ismale = true
          this.isfemale = false
          this.$store.commit('SEX', {sex: 0})
          this.selectSex()
          // id = 0
        } else {
          this.ismale = false
          this.isfemale = true
          this.$store.commit('SEX', {sex: 1})
          this.selectSex()
          // id = 1
        }
        // this.saveGender(id)
        setTimeout(() => {
          this.genderflag = true
          this.$store.commit('GENDER_FLAG', {genderFlag: true})
          // window.localStorage.setItem('genderflag', true)
        }, 1000)
      },
      selectSex(val) {
        axios.post('/api/tChatUserController.do?doAdd', qs.stringify({
          departId: this.$store.state.companyId,
          seat: this.$store.state.selfSeat,
          sex: this.$store.state.sex
        })).then(res => {
          // console.log(typeof res.data)
          this.$store.commit('USER_ID', {userId: res.data.id})
          this.$store.commit('SELF_AVATAR', {selfAvatar: res.data.images})
          // console.log(this.$store.state.userId)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .msg-name{
    .msg-box-content{
      padding: 20px 20px 10px;
    }
    .c-nikename{
      width: 100%;
      height: 45px;
      background: #e5e5e5;
      color: #000;
      font-size: 15px;
      line-height: 45px;
      text-align: center;
    }
    .btn{
      display: flex;
      margin-bottom: 20px;
      .left,.right{
        flex: 1;
      }
      .btn-save,.btn-cancel{
        height: 44px;
        width: 115px;
        margin: 0 auto;
        line-height: 44px;
        border-radius: 44px;

        text-align: center;
        font-size: 15px;
      }
      .btn-save{
        color: #fff;
        margin-right: 8px;
        .bg-pink-l-r;
      }
      .btn-cancel{
        border: 1px solid #7b3ce2;
        color: #333;
        margin-left: 8px;
      }
    }
  }

  .msk-c{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 2000;
  }
  .hide{
    display: none;
    transition: all 0.8s;
  }
  .mask{
  .modal{
    z-index: 1999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }
  .msg-box-wrapper{
    z-index: 2000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  &:after{
     content: "";
     display: inline-block;
     height: 100%;
     width: 0;
     vertical-align: middle;
   }
  .msg-box{
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    width: 295px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
  .msg-box-header{
    line-height:45px;
    text-align: center;
  .border-1px;
  }
  .msg-box-content{
    display: flex;
    margin-bottom: 10px;
  span{
    font-size: 15px;
  }
  .msg-box-left,.msg-box-right{
    flex: 1;
  .icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 10px auto;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
  .icon-male,.icon-female{
    display: block;
    font-size: 20px;
  }
  .icon-male{
    transform: rotate(45deg);
  }
  &.active{
   .bg-pink-l-r;
  .iconfont{
    color: #fff;
  }
  }
  }

  }
  }
  }
  }
  }
 .header{
   width: 100%;
   background: #201e34;
   color: #fff;
   .content-wrapper{
     padding: 14px;
     font-size: 0;
     .avatar{
       display: inline-block;
       vertical-align: bottom;
       width: 70px;
       height: 70px;
       background: #ccc;
     }
     .content{
       display: inline-block;
       vertical-align: bottom;
       margin-left: 15px;
       h1{
         font-size: 18px;
         width: 145px;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
       }
       .msg{
         font-size: 12px;
         margin-top: 8px;
         margin-bottom: 8px;
         .icon-xiaolaba{
           font-size: 12px;
           color: #fff;
         }
       }
     }
     .userInfo{
       float: right;
       width: 55px;
       padding-left: 5px;
       margin-top: 12px;
       text-align: center;
       border-left: 1px solid #ccc;
       .iconfont{
         display: inline-block;
         width: 50px;
         margin-bottom: 2px;
         font-size: 30px;
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
         .bgimg-pink-t-b;
       }
       .userName{
         display: inline-block;
         width: 50px;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         font-size: 14px;
       }
     }
   }
 }
</style>
