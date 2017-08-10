<template>
  <div id="sell">
    <vheader></vheader>
    <div class="nav">
      <div class="nav-goods">
        <!--<router-link to="/sell/goods">点单</router-link>-->
        <a @click="go('sell')">点单</a>
      </div>
      <div class="nav-chart">
        <!--<router-link to="/sell/chat">聊天</router-link>-->
        <a @click="go('chart')">聊天</a>
      </div>
    </div>
    <div id="content">
      <!--<router-view></router-view>-->
      <goods></goods>
    </div>
    <vfooter></vfooter>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import vheader from '../header/header'
  import vfooter from '../footer/footer'
  import goods from '../goods/goods'
  export default {
    data() {
      return {
        gender: '',
        ismale: false,
        isfemale: false,
        genderflag: false
      }
    },
    methods: {
      go(path) {
        console.log(path)
      },
      changeGender(val) {
        this.gender = val
        if (val === 'male') {
          this.ismale = true
          this.isfemale = false
        } else {
          this.ismale = false
          this.isfemale = true
        }
        setTimeout(() => {
          this.genderflag = true
        }, 1000)
      }
    },
    components: {
      vheader,
      vfooter,
      goods
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  @import "../../common/less/mixin.less";
  @pink: #584f60;

  .nav{
    display: flex;
    height: 40px;
    line-height: 36px;
    .border-1px;
    .nav-goods,.nav-chart{
      flex: 1;
      box-sizing: border-box;
      text-align: center;
      span{
        display: inline-block;
        width: 100px;
        color: #000;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
      }
      .active{
        color: #7b3ce2;
        border-bottom: 2px solid #7b3ce2;
      }
    }
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
                background: @pink;
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

</style>
