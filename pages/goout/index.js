//index.js
//获取应用实例
const app = getApp()
require ('../../utils/util');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    eyeStatus: "close",
    userName: undefined,
    userNameShow:undefined,
    cardId:undefined,
    cardIdShow: undefined,
    idcard:undefined,
    time:undefined,
  },
  positionQR: function (e) {
    console.log("地点扫码")
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  //事件处理函数
  returnMain: function () {
    wx.navigateTo({
      url: '../index/index',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'show'
        })
      }
    })
  },
  changeeyes(){
    if(this.data.eyeStatus==='close'){
      this.setData({
        eyeStatus:'open'
      })
    }else{
      this.setData({
        eyeStatus:'close'
      })
    }
    this.changeEye(this.data.eyeStatus)
  },
  changeEye(status) {
    if (status === 'close') {
      let userName=this.data.userName
      let newUserName=this.data.userName[0]
      +(new Array(this.data.userName.length-1).fill("*")).join("")
      let cardId=this.data.cardId[0]
      +(new Array(this.data.cardId.length-2).fill("*")).join("")
      +this.data.cardId[this.data.cardId.length-1]
      let idcard=this.data.idcarddata.slice(0,2)
      +(new Array(14).fill("*")).join("")
      +this.data.idcarddata.slice(this.data.idcarddata.length-2,this.data.idcarddata.length)
      this.setData({
        userNameShow: newUserName,
        cardIdShow: cardId,
        idcard
      })
    } else {
     
      
      this.setData({
        userNameShow: this.data.userName,
        cardIdShow: this.data.cardId,
        idcard:this.data.idcarddata,
      })
    }
  },
  onLoad: function () {
    let time=new Date().format("yyyy-MM-dd hh:mm:ss");
    
    console.log(app.globalData)
    console.log(app.globalData.userName)
    console.log(app.globalData.cardId)
    let idcard=""
    +(Math.floor(Math.random() * (999999 - 111111 + 1)) + 1111111)
    +"1998"
    +(Math.floor(Math.random() * (12 - 10 + 1)) + 10)
    +(Math.floor(Math.random() * (30 - 10 + 1)) + 10)
    +(Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111)
    this.setData({
      userName: app.globalData.userName,
      cardId: app.globalData.cardId,
      time,
      idcarddata:idcard
    })
 
    this.changeEye(this.data.eyeStatus)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})