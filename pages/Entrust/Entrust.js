
var api = require('../../utils/api.js');//api

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mobilee:'',//phone
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('生命周期函数--监听页面加载 1')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('生命周期函数--监听页面初次渲染完成3')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('生命周期函数--监听页面显示2')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    avalue: function (e) {
        this.setData({
            mobilee: e.detail.value
        })
        // console.log(e.detail.value);
    },
    formSubmit: function (e) {
        //提交
        var mobile = this.data.mobilee;
        var regMobile = /^1\d{10}$/;
        var that = this;
        if (mobile == "") {
            wx.vibrateShort();
            wx.showToast({
                title: '手机号不能为空！',
                image: '/image/no.png'
            })
            this.setData({
                yuyue: true
            })
            return false;
        } else {
            if (!regMobile.test(mobile)) {
                wx.vibrateShort();
                wx.showToast({
                    title: '手机号码错误！',
                    image: '/image/no.png'
                })
                this.setData({
                    yuyue: true
                })
                return false;
            } else {
                console.log(JSON.stringify(e.detail.value))
                wx.request({
                    url: api.Entrust,
                    data: { Entrust: e.detail.value },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        console.log(res.data)
                       
                        if (res.data==1){
                            wx.showToast({
                                title: '预约成功！'
                            })
                        } else if (res.data == 2){
                            wx.showToast({
                                title: '已预约！'
                            })
                        }else{
                            wx.showToast({
                                title: '预约失败',
                                image: '/image/no.png'
                            })
                        }
                    }
                })

            }
        }
    },
    clickPhone: function (e) {
        //打电话
        wx.makePhoneCall({
            phoneNumber: '021-68771866'
        })
    }
})