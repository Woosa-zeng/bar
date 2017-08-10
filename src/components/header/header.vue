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
      <div class="userInfo">
        <i class="icon-male iconfont"></i>
        <span class="userName">18号桌</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style lang="less" rel="stylesheet/less">
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
         background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#7b3ce2), to(#c549d5));
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
         font-size: 30px;
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
