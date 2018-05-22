var api = require('../../utils/api.js');//api
Page({
    data: {
        indicatorDots: true, //是否显示面板指示点
        autoplay: true, //是否自动切换
        interval: 5000, //自动切换时间间隔,3s
        duration: 1000, //  滑动动画时长1s
        yuyue: false, //预约
        mobilee: "",//phone
        mobileee: "",//phone2
        id:''
    },
    //预览图片
    previewImage: function (e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: this.data.imgUrls // 需要预览的图片http链接列表  
        })
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中...',
        })

        var that = this;
        var DataPageName = options.id; //c上个页面的参数
        console.log("%c上个页面的参数 " + DataPageName, "color:red;font-size:2em")
        that.setData({
            id: DataPageName
        })
        // ajax
        wx.request({
            url: api.pagex,
            data: { id: that.data.id },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data.data["0"].jsonData;
                console.log(data);
                var mapD = [];
                mapD = data.parameter["0"].map.split(',');//经纬度
                //介绍
                if (data.introduce["0"].jianjie.length < 120) {
                    that.setData({
                        isFold: true
                    })
                } else {
                    that.setData({
                        isFold: false
                    })
                }
                //标题
                wx.setNavigationBarTitle({
                    title: data.offname
                })
                that.setData({
                    OfficeBuildingg: data.OfficeBuilding,//标题
                    imgUrls: data.banner,//banner
                    area: data.parameter["0"].area,//地区
                    TradingArea: data.parameter["0"].TradingArea,//商圈
                    address: data.parameter["0"].address,//地区
                    metro: data.parameter["0"].metro,//地铁
                    Recommend: data.Recommend,//写字楼周边
                    ASmap: data.parameter["0"].map,//map
                    OfficeBuilding: data.offname,//所属大厦
                    yue: data.introduce["0"].yue,
                    tian: data.introduce["0"].tian,
                    jianjie: data.introduce["0"].jianjie,
                    zhuanx: data.introduce["0"]["装修程度"],
                    jmian: data.introduce["0"]["建筑面积"],
                    shiyl: data.introduce["0"]["使用率"],
                    mianzuq: data.introduce["0"]["免租期"],
                    louceng: data.introduce["0"]["楼层"],
                    shidasd: data.introduce["0"]["是否可注册"],
                    zuizaozu: data.introduce["0"]["最早可租"],
                    ziomin: data.introduce["0"]["最短租期"],
                    jiahesss: data.introduce["0"]["价格优势"],
                    zhuanxiu: data.introduce["0"]["装修情况"],
                    loofang: data.introduce["0"]["看房时间"],
                    mainyin: data.introduce["0"]["面积信息"],
                    imgg: data.Ename["0"].img,
                    namee: data.Ename["0"].name,
                    enamee: data.Ename["0"].enaem,
                    zhiw: data.Ename["0"].zhiw,
                    mobileee: data.Ename["0"].phone,
                });
                wx.hideLoading();//关闭加载
                console.log(mapD);//
                wx.request({
                    url: 'https://restapi.amap.com/v3/place/around?key=31e75a14b4666b3a920c6e9ea089f1b5&location=' + mapD["0"] + '%2C' + mapD["1"]+'&s=rsx&platform=WXJS&appname=31e75a14b4666b3a920c6e9ea089f1b5&sdkversion=1.2.0&logversion=2.0&keywords=地铁站', //地铁
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        // console.log(res.data.pois.length)//
                        if (res.data.pois.length<=20){
                            that.setData({
                                subway: res.data.pois.length+"个以上"
                            })
                        }else{
                            that.setData({
                                subway: res.data.pois.length+"个"
                            })
                        }
                    },
                    fail: function () {
                        that.setData({
                            subway: "加载失败!"
                        })
                    }
                }) 
                wx.request({
                    url: 'https://restapi.amap.com/v3/place/around?key=31e75a14b4666b3a920c6e9ea089f1b5&location=' + mapD["0"] + '%2C' + mapD["1"] + '&s=rsx&platform=WXJS&appname=31e75a14b4666b3a920c6e9ea089f1b5&sdkversion=1.2.0&logversion=2.0&keywords=公交站', //地铁
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        // console.log(res.data.pois.length)//
                        if (res.data.pois.length <= 20) {
                            that.setData({
                                transit: res.data.pois.length + "个以上"
                            })
                        } else {
                            that.setData({
                                transit: res.data.pois.length+"个"
                            })
                        }
                    },
                    fail: function () {
                        that.setData({
                            transit: "加载失败!"
                        })
                    }
                }) 
                wx.request({
                    url: 'https://restapi.amap.com/v3/place/around?key=31e75a14b4666b3a920c6e9ea089f1b5&location=' + mapD["0"] + '%2C' + mapD["1"] + '&s=rsx&platform=WXJS&appname=31e75a14b4666b3a920c6e9ea089f1b5&sdkversion=1.2.0&logversion=2.0&keywords=酒店', //地铁
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        // console.log(res.data.pois.length)//
                        if (res.data.pois.length <= 20) {
                            that.setData({
                                Hotel: res.data.pois.length + "个以上"
                            })
                        } else {
                            that.setData({
                                Hotel: res.data.pois.length+"个"
                            })
                        }
                    },
                    fail: function () {
                        that.setData({
                            Hotel: "加载失败!"
                        })
                    }
                }) 
                wx.request({
                    url: 'https://restapi.amap.com/v3/place/around?key=31e75a14b4666b3a920c6e9ea089f1b5&location=' + mapD["0"] + '%2C' + mapD["1"] + '&s=rsx&platform=WXJS&appname=31e75a14b4666b3a920c6e9ea089f1b5&sdkversion=1.2.0&logversion=2.0&keywords=银行', //地铁
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        // console.log(res.data.pois)//
                        if (res.data.pois.length <= 20) {
                            that.setData({
                                Bank: res.data.pois.length + "个以上"
                            })
                        } else {
                            that.setData({
                                Bank: res.data.pois.length+"个"
                            })
                        }
                    },
                    fail: function () {
                        that.setData({
                            Bank: "加载失败!"
                        })
                    }
                }) 


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
        //ajax
    },
    flodFn: function () {
        this.setData({
            isFold: !this.isFold
        });
    },
    clickPhone: function (e) {
        //打电话
        wx.makePhoneCall({
            phoneNumber: '021-68771866'
        })
    },
    clickPhonee: function (e) {
        //打电话
        var mobile = this.data.mobileee;
        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },
    yuyue: function () {
        //预约show
        var that = this;
        that.setData({
            yuyue: true
        })
    },
    hideyuyue: function () {
        //预约hide
        var that = this;
        that.setData({
            yuyue: false
        })
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
        if (mobile == "") {
            wx.vibrateShort();
            wx.showToast({
                title: '手机号不能为空！',
                image: '/image/no.png'
            })
            return false;
        } else {
            if (!regMobile.test(mobile)) {
                wx.vibrateShort();
                wx.showToast({
                    title: '手机号码错误！',
                    image: '/image/no.png'
                })
                return false;
            } else {
                var that = this;
                console.log(e.detail.value)
                wx.request({
                    url: api.pagexphone,
                    data: { pagexphone: e.detail.value },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data == 1) {
                            wx.showToast({
                                title: '预约成功！'
                            })
                            setTimeout(function () {
                                that.setData({
                                    yuyue: false
                                })
                                that.setData({
                                    yuv: ""
                                })
                                that.setData({
                                    mobilee: ""
                                })
                            }, 2000)
                        } else if (res.data == 2) {
                            wx.showToast({
                                title: '已预约'
                            })
                            setTimeout(function () {
                                that.setData({
                                    yuyue: false
                                })
                                that.setData({
                                    yuv: ""
                                })
                                that.setData({
                                    mobilee: ""
                                })
                            }, 2000)
                        } else {
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
})