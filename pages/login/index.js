//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
   
  },
  positionQR:function(e){
   
  },
  inputID(e){
    app.globalData.cardId=e.detail.value
  },
  inputName(e){
    app.globalData.userName=e.detail.value
  },
  //事件处理函数
  returnMain: function() {
    console.log("click")
    if(app.globalData.userName.length<2 
      || app.globalData.userName>=3 
      || app.globalData.cardId.length!==12
      ){
        return 
      }
    wx.navigateTo({
      url: '../index/index',
    
    })
  },
  onLoad: function () {
   
  }
 
})
