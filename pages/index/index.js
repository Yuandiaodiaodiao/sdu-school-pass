//index.js
//获取应用实例
const app = getApp()
require ('../../utils/util');
let formatStr="yyyy年M月d日hh:mm:ss 星期W";
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: true,
    showSuccess:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: new Date().format(formatStr),
  },
  directgo:function(e){
    wx.navigateTo({
      url: '../goout/index'
    })
  },
  positionQR:function(e){
    console.log("地点扫码")
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log(res)
        wx.navigateTo({
          url: '../goout/index'
        })
      }
    })
   
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    setInterval(()=>{
      this.setData({
        time:new Date().format(formatStr)
      })
    },1000)
    const eventChannel = this.getOpenerEventChannel()
    // console.log(eventChannel)
    if(eventChannel.on){
      eventChannel.on('acceptDataFromOpenerPage', (data)=> {
        console.log(data)
        if(data.data==='show'){
          this.setData({
            showSuccess:true
          })
          setTimeout(()=>{
            this.setData({
              showSuccess:false
            })
          },1000)
        }
      })
    }
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
