
var api = require('../../utils/api.js');//api

Page({
  data: {
    msg: [],
    Loading: true
  },
  onLoad: function () {
      console.log(api.index)
      var that = this;
      wx.request({
          url: api.index, 
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
              console.log(res.data.data["0"].jsonData.data);
              that.setData({
                  msg: res.data.data["0"].jsonData.data
              });
              //关闭Loading
              that.setData({
                  Loading: false
              });
          },
          fail: function () {
              wx.showModal({
                  title: "警告",
                  content: "数据调用失败",
                  showCancel: false,
                  confirmText: "确定"
              })
          }
      })
    
  },
  onReady: function () {
      console.log('生命周期函数--监听页面初次渲染完成3');
  },
  onShow: function () {
      console.log('生命周期函数--监听页面显示2')
  },

  clickPhone: function (e) {
      //打电话
    wx.makePhoneCall({
      phoneNumber: '021-68771866'
    })
  }
})

App({
  onLaunch: function () {
    // console.log('当小程序初始化完成时，会触发 onLaunch（全局只触发一次）');
  },
  onShow: function () {
    // console.log('当小程序启动，或从后台进入前台显示，会触发 onShow');
  },
  onHide: function () {
    // console.log('当小程序从前台进入后台，会触发 onHide');
  },
  onError: function (e) {
    console.log('%c错误', 'color:red;font-size: 3em;');
    console.log(e)
    wx.showModal({
        title: "警告",
        content: "页面发生错误",
        showCancel: false,
        confirmText: "确定"
    })
  },
  onShareAppMessage: function () {
      wx.showShareMenu({
          withShareTicket: true
      })
  }
})