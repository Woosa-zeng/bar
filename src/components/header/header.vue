<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"></div>
      <div class="content">
        <h1>WOLF酒吧</h1>
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
<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data() {
      return {
        gender: '',
        ismale: true,
        isfemale: false,
        genderflag: this.$store.state.genderFlag,
        changeName: true,
        nickname: this.$store.state.nickname || this.$store.state.selfSeat,
        userInfo: {
          cId: 1,
          cName: 'xxbar',
          seat: 11
        }
      }
    },
    created() {
      this.getInfo()
      console.log('created==' + this.genderflag)
    },
    watch: {
      gender() {
        console.log('watch==' + this.ismale)
      }
    },
    computed: {
    },
    methods: {
      // 扫描存储用户信息
      getInfo() {
        axios.get('/index.html').then((res) => {
          // console.log(res)
          if (res) {
            this.userInfo = res
            this.$store.commit('SELF_SEAT', {selfSeat: res.seat})
            this.$store.commit('COMPANY_NAME', {companyName: res.cName})
            this.$store.commit('COMPANY_ID', {companyId: res.cId})
          }
        })
      },
      // 保存修改昵称
      saveNewName() {
        this.nickname = this.$refs.nicknamebox.value
        this.$store.commit('NICKNAME', {nickname: this.$refs.nicknamebox.value})
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
          // id = 0
        } else {
          this.ismale = false
          this.isfemale = true
          // id = 1
        }
        // this.saveGender(id)
        setTimeout(() => {
          this.genderflag = true
          this.$store.commit('GENDER_FLAG', {genderFlag: true})
          // window.localStorage.setItem('genderflag', true)
        }, 1000)
      },
      // 保存用户性别
      saveGender(id) {
        axios.post('/api/tSeatController?doUpdate', {
          seat: 1,
          departId: 1,
          sex: id
        }).then((res) => {
          console.log(res)
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
