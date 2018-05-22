//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js'); //搜索
var search_ = require('../../utils/search.js');//大厦名
var app = getApp()
Page({
  data: {
      Search: [] //大厦名
  },
  onLoad: function () {
    var that = this;
    
    that.setData({
        Search: search_.getSearch()
    });
    // console.log(search_.getSearch());
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['江苏大厦','上海中心','人民广场','新一百大厦','环球金融中心']);
    WxSearch.initMindKeys(search_.getSearch());
  },
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    console.log(e.detail.value);
    wx.showToast({
        title: "搜索中...",
        icon: "loading"
    });//搜索中
    wx.redirectTo({
        url: '../../pages/soso/soso?dataso=' + e.detail.value
    });

  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
    console.log(e.target.dataset.key);//点击文字
    WxSearch.wxSearchAddHisKey(that);
    wx.showToast({
        title: "搜索中...",
        icon: "loading"
    });//搜索中
    wx.redirectTo({
        url: '../../pages/soso/soso?dataso=' + e.target.dataset.key
    });

  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})
