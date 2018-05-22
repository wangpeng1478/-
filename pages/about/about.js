//index.js 
//获取应用实例 
var app = getApp()
Page({
    data: {
        // 页面配置  
        winWidth: 0,
        winHeight: 0,
        // tab切换 
        currentTab: 0,
        togg: true,//map
    },
    onLoad: function (options) {
        var that = this;
        var index = options.index;
        that.setData({
            currentTab: index
        });
        // 获取系统信息 
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    // 滑动切换tab 
    bindChange: function (e) {
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
    // 点击tab切换 
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    butmao1:function(){
        var that = this;
        that.setData({ togg: true});
    },
    butmao2: function () {
        var that = this;
        that.setData({ togg: false });
    }
}) 