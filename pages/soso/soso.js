var api = require('../../utils/api.js');//api
Page({
    data: {
        multiArray: [['全部', '1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线支线', '10号线主线', '11号线主线', '11号线支线', '12号线', '13号线', '16号线', '磁悬浮'], ['全部']],
        pickerOn: [['全部', '浦东', '黄浦', '卢湾', '徐汇', '长宁', '静安', '普陀', '闸北', '虹口', '杨浦', '闵行', '宝山', '嘉定', '松江', '青浦', '奉贤', '上海周边'], ['全部']],
        PriceOn: [['按总价', '按单价'], ["不限", "0-0.5万元\/月", "0.5-1.5万元\/月", "1.5-3万元\/月", "3-5万元\/月", "5-10万元\/月", "10万元\/月以上"]],
        OtherOn: [['面积', '装修', '类型'], ["全部面积", "100-300m²", "300-500m²", "500-1000m²", "1000m²以上"]],
        multiIndex: [0, 0],
        pickerData: [0, 0],
        PriceData: [0, 0],
        OtherData: [0, 0],
        checkbox: [],//添加box
        msg: [], //楼盘数据
        Loading: true,//加载
        button: false,//到底啦
        showhide: false,//搜索条件隐藏
        nullhide: false,//没有数据隐藏
        page: 0,//页数
        arrt:'',//记录url
        datac:"",
        condition: [{
            "地铁": {
                "type": "全部",
                "content": "全部"
            }
        },
        {
            "商圈": {
                "type": "全部",
                "content": "全部"
            }
        },
        {
            "价格": {
                "type": "全部",
                "content": "全部"
            }
        },
        {
            "面积": {
                "content": "全部"
            }
        },
        {
            "装修": {
                "content": "全部"
            }
        },
        {
            "类型": {
                "content": "全部"
            }
        }]
    },
    onLoad: function (option) {
        console.log(api.soso)
        var that = this;
        var datac = option.dataso; //c上个页面的参数
        console.log("%c上个页面的参数   " + datac, "color:red;font-size:2em")
        //判断页面是否是从搜索页面进来的 
        if (option.dataso) {
            //显示条件
            that.setData({
                OtherOnnnnn: option.dataso,
                showhide: true,
                datac: datac,
                page: 0
            });
            console.log(option.dataso)
            wx.request({
                url: api.soso,
                data: { datac: datac },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);
                    if (res.data.code == 0){
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    } if (res.data.code==1){
                        that.setData({
                            nullhide: true
                        });
                    }
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
        } else {
            //正常进入
            wx.request({
                url: api.soso,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);

                    if (res.data.code == 0) {
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    }
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
        }
    },
    //地铁
    bindMultiPickerChange: function (e) {
        var that = this;
        console.log(e.detail.value);
        that.setData({
            multiIndex: e.detail.value
        })
        var data_d1 = {
            multiArray: that.data.multiArray[0][e.detail.value[0]]
        };
        var data_d2 = {
            multiArray: that.data.multiArray[1][e.detail.value[1]]
        };
        // console.log(data_d1.multiArray);//几号地铁
        // console.log(data_d2.multiArray);//地铁
        var cb = that.data.checkbox;
        var typee = that.data.condition["0"]["地铁"].type = data_d1.multiArray;
        var content = that.data.condition["0"]["地铁"].content = data_d2.multiArray;
        var arrt = that.data.condition;
        console.log(arrt) //ajax
        //关闭Loading
        that.setData({
            Loading: true,
            arrt: arrt,
            page: 0
        });
        //清空内容
        that.setData({
            msg: ""
        });
        //显示条件
        that.setData({
            multiArrayy: typee + " " + content,
            showhide: true
        });
        wx.request({
            url: api.soso,
            data: {
                arrt: arrt,
                page: that.data.page
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data.data["0"].jsonData.data);

                if (res.data.code == 0) {
                    that.setData({
                        msg: res.data.data["0"].jsonData.data
                    });
                } if (res.data.code == 1) {
                    that.setData({
                        nullhide: true
                    });
                }

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
    //商圈
    pickerShangq: function (e) {
        var that = this;
        console.log(e.detail.value)
        that.setData({
            pickerData: e.detail.value
        })
        var data_d1 = {
            pickerOn: that.data.pickerOn[0][e.detail.value[0]]
        };
        var data_d2 = {
            pickerOn: that.data.pickerOn[1][e.detail.value[1]]
        };
        // console.log(data_d1.pickerOn);//商圈
        // console.log(data_d2.pickerOn);//商圈
        var cb = that.data.checkbox;
        var typee = that.data.condition["1"]["商圈"].type = data_d1.pickerOn;
        var content = that.data.condition["1"]["商圈"].content = data_d2.pickerOn;
        var arrt = that.data.condition;
        console.log(arrt) //ajax
         //关闭Loading
        that.setData({
            Loading: true,
            arrt: arrt,
            page: 0
        });
        //清空内容
        that.setData({
            msg: ""
        });
        //显示条件
        that.setData({
            pickerOnn: typee + " " + content,
            showhide: true
        });
        wx.request({
            url: api.soso,
            data: { arrt: arrt},
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data.data["0"].jsonData.data);
                if (res.data.code == 0) {
                    that.setData({
                        msg: res.data.data["0"].jsonData.data
                    });
                } if (res.data.code == 1) {
                    that.setData({
                        nullhide: true
                    });
                }
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
    //价格
    Price_c: function (e) {
        var that = this;
        console.log(e.detail.value)
        that.setData({
            PriceData: e.detail.value
        })
        var data_d1 = {
            PriceOn: that.data.PriceOn[0][e.detail.value[0]]
        };
        var data_d2 = {
            PriceOn: that.data.PriceOn[1][e.detail.value[1]]
        };
        // console.log(data_d1.PriceOn);//价格
        // console.log(data_d2.PriceOn);//价格
        var cb = that.data.checkbox;
        var typee = that.data.condition["2"]["价格"].type = data_d1.PriceOn;
        var content = that.data.condition["2"]["价格"].content = data_d2.PriceOn;
        var arrt = that.data.condition;
        console.log(arrt) //ajax
         //关闭Loading
        that.setData({
            Loading: true,
            arrt: arrt,
            page: 0
        });
        //清空内容
        that.setData({
            msg: ""
        });
        //显示条件
        that.setData({
            PriceOnn: typee + " " + content,
            showhide: true
        });
        wx.request({
            url: api.soso,
            data: { arrt: arrt},
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data.data["0"].jsonData.data);
                if (res.data.code == 0) {
                    that.setData({
                        msg: res.data.data["0"].jsonData.data
                    });
                } if (res.data.code == 1) {
                    that.setData({
                        nullhide: true
                    });
                }
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

    //其他
    Other_c: function (e) {
        var that = this;
        console.log(e.detail.value)
        that.setData({
            OtherData: e.detail.value
        })
        var data_d1 = {
            OtherOn: that.data.OtherOn[0][e.detail.value[0]]
        };
        var data_d2 = {
            OtherOn: that.data.OtherOn[1][e.detail.value[1]]
        };
        console.log(data_d1.OtherOn);//其他
        console.log(data_d2.OtherOn);//其他
        if (data_d1.OtherOn == "面积") {
            var content = that.data.condition["3"]["面积"].content = data_d2.OtherOn;
            var arrt = that.data.condition;
            console.log(arrt) //ajax
            //关闭Loading
            that.setData({
                Loading: true,
                arrt: arrt,
                page: 0
            });
            //清空内容
            that.setData({
                msg: ""
            });
            //显示条件
            that.setData({
                OtherOnn: content,
                showhide: true
            });
            wx.request({
                url: api.soso,
                data: { arrt: arrt},
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);
                    if (res.data.code == 0) {
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    } if (res.data.code == 1) {
                        that.setData({
                            nullhide: true
                        });
                    }
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
        } else if (data_d1.OtherOn == "装修") {
            var content = that.data.condition["4"]["装修"].content = data_d2.OtherOn;
            var arrt = that.data.condition;
            console.log(arrt) //ajax
            //关闭Loading
            that.setData({
                Loading: true,
                arrt: arrt,
                page: 0
            });
            //清空内容
            that.setData({
                msg: ""
            });
            //显示条件
            that.setData({
                OtherOnnn: content,
                showhide: true
            });
            wx.request({
                url: api.soso,
                data: { arrt: arrt},
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);
                    if (res.data.code == 0) {
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    } if (res.data.code == 1) {
                        that.setData({
                            nullhide: true
                        });
                    }
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
        } else if (data_d1.OtherOn == "类型") {
            var content = that.data.condition["5"]["类型"].content = data_d2.OtherOn;
            var arrt = that.data.condition;
            console.log(arrt) //ajax
            //关闭Loading
            that.setData({
                Loading: true,
                arrt: arrt,
                page: 0
            });
            //清空内容
            that.setData({
                msg: ""
            });
            //显示条件
            that.setData({
                OtherOnnnn: content,
                showhide: true
            });
            wx.request({
                url: api.soso,
                data: { arrt: arrt},
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);
                    if (res.data.code == 0) {
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    } if (res.data.code == 1) {
                        that.setData({
                            nullhide: true
                        });
                    }
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
        } else {
            wx.showModal({
                title: "警告",
                content: "没有此类型",
                showCancel: false,
                confirmText: "确定"
            })
        }
    },
    bindMultiPickerColumnChange: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ["全部"];
                        break;
                    case 1:
                        data.multiArray[1] = ["1号线沿线", "富锦路", "友谊西路", "宝安公路", "共富新村", "呼兰路", "通河新村", "共康路", "彭浦新村", "汶水路", "上海马戏城", "延长路", "中山北路", "上海火车站", "汉中路", "新闸路", "人民广场", "黄陂南路", "陕西南路", "常熟路", "衡山路", "徐家汇", "上海体育馆", "漕宝路", "上海南站", "锦江乐园", "莲花路", "外环路", "莘庄"];//1
                        break;
                    case 2:
                        data.multiArray[1] = ["2号线沿线", "浦东国际机场", "海天三路", "远东大道", "凌空路", "川沙", "华夏东路", "创新中路", "唐镇", "广兰路", "金科路", "张江高科", "龙阳路", "世纪公园", "上海科技馆", "世纪大道", "东昌路", "陆家嘴", "南京东路", "人民广场", "南京西路", "静安寺", "江苏路", "中山公园", "娄山关路", "威宁路", "北新泾", "淞虹路", "虹桥2号航站楼", "虹桥火车站", "徐泾东"];//2
                        break;
                    case 3:
                        data.multiArray[1] = ["3号线沿线", "宝山路", "东宝兴路", "虹口足球场", "赤峰路", "大柏树", "江湾镇", "殷高西路", "长江南路", "淞发路", "张华浜", "淞滨路", "水产路", "宝杨路", "友谊路", "铁力路", "江杨北路"];//3
                        break;
                    case 4:
                        data.multiArray[1] = ["4号线沿线", "宜山路", "上海体育馆", "上海体育场", "东安路", "大木桥路", "鲁班路", "西藏南路", "南浦大桥", "塘桥", "蓝村路", "浦电路(4号线)", "世纪大道", "浦东大道", "杨树浦路", "大连路", "临平路", "海伦路", "宝山路", "上海火车站", "中潭路", "镇坪路", "曹杨路", "金沙江路", "中山公园", "延安西路", "虹桥路"];//4
                        break;
                    case 5:
                        data.multiArray[1] = ["5号线沿线", "莘庄", "春申路", "银都路", "颛桥", "北桥", "剑川路", "东川路", "金平路", "华宁路", "文井路", "闵行开发区"];//5
                        break;
                    case 6:
                        data.multiArray[1] = ["6号线沿线", "港城路", "外高桥保税区北", "航津路", "外高桥保税区南", "洲海路", "五洲大道", "东靖路", "巨峰路", "五莲路", "博兴路", "金桥路", "云山路", "德平路", "北洋泾路", "民生路", "源深体育中心", "世纪大道", "浦电路(6号线)", "蓝村路", "上海儿童医学中心", "临沂新村", "高科西路", "东明路", "高青路", "华夏西路", "上南路", "灵岩南路", "东方体育中心"];//6
                        break;
                    case 7:
                        data.multiArray[1] = ["7号线沿线", "花木路", "龙阳路", "芳华路", "锦绣路", "杨高南路", "高科西路", "云台路", "耀华路", "长清路", "后滩", "中华艺术", "东安路", "肇嘉浜路", "常熟路", "静安寺", "昌平路", "长寿路", "镇坪路", "岚皋路", "新村路", "大华三路", "行知路", "大场镇", "场中路", "上大路", "南陈路", "上海大学", "祁华路", "顾村公园", "刘行", "潘广路", "罗南新村", "美兰湖"];//7
                        break;
                    case 8:
                        data.multiArray[1] = ["8号线沿线", "沈杜公路", "联航路", "江月路", "浦江镇", "芦恒路", "凌兆新村", "东方体育中心", "杨思", "成山路", "耀华路", "中华艺术宫", "西藏南路", "陆家浜路", "老西门", "大世界", "人民广场", "曲阜路", "中兴路", "西藏北路", "虹口足球场", "曲阳路", "四平路", "鞍山新村", "江浦路", "黄兴路", "延吉中路", "黄兴公园", "翔殷路", "嫩江路", "市光路"
                        ];//8
                        break;
                    case 9:
                        data.multiArray[1] = ["9号线沿线", "杨高中路", "世纪大道", "商城路", "小南门", "陆家浜路", "马当路", "打浦桥", "嘉善路", "肇嘉浜路", "徐家汇", "宜山路", "桂林路", "漕河泾开发区", "合川路", "星中路", "七宝", "中春路", "九亭", "泗泾", "佘山", "洞泾", "松江大学城", "松江新城", "松江体育中心", "醉白池", "松江南站"];//9
                        break;
                    case 10:
                        data.multiArray[1] = ["10号支线沿线", "新江湾城", "殷高东路", "三门路", "江湾体育场", "五角场", "国权路", "同济大学", "四平路", "邮电新村", "海伦路", "四川北路", "天潼路", "南京东路", "豫园", "老西门", "新天地", "陕西南路", "上海图书馆", "交通大学", "虹桥路", "宋园路", "伊犁路", "水城路", "龙溪路", "龙柏新村", "紫藤路", "航中路"];//10号线支线
                        break;
                    case 11:
                        data.multiArray[1] = ["10号主线沿线", "新江湾城", "殷高东路", "三门路", "江湾体育场", "五角场", "国权路", "同济大学", "四平路", "邮电新村", "海伦路", "四川北路", "天潼路", "南京东路", "豫园", "老西门", "新天地", "陕西南路", "上海图书馆", "交通大学", "虹桥路", "宋园路", "伊犁路", "水城路", "龙溪路", "上海动物园", "虹桥1号航站楼", "虹桥2号航站楼", "虹桥火车站"];//10号线主线
                        break;
                    case 12:
                        data.multiArray[1] = ["11号主线沿线", "迪士尼", "康新公路", "秀沿路", "罗山路", "御桥", "浦三路", "三林东", "三林", "东方体育中心", "龙耀", "云锦路", "龙华", "上海游泳馆", "徐家汇", "交通大学", "江苏路", "隆德路", "曹杨路", "枫桥路", "真如", "上海西站", "李子园", "祁连山路", "武威路", "桃浦新村", "南翔", "马陆", "嘉定新城", "白银路", "嘉定西", "嘉定北"];//11号线主线
                        break;
                    case 13:
                        data.multiArray[1] = ["11号主线沿线", "迪士尼", "康新公路", "秀沿路", "罗山路", "御桥", "浦三路", "三林东", "三林", "东方体育中心", "龙耀", "云锦路", "龙华", "上海游泳馆", "徐家汇", "交通大学", "江苏路", "隆德路", "曹杨路", "枫桥路", "真如", "上海西站", "李子园", "祁连山路", "武威路", "桃浦新村", "南翔", "马陆", "嘉定新城", "上海赛车场", "昌吉东路", "上海汽车城", "安亭", "兆丰路", "光明路", "花桥"];//11号线支线
                        break;
                    case 14:
                        data.multiArray[1] = ["12号线沿线", "七莘路", "虹莘路", "顾戴路", "东兰路", "虹梅路", "虹漕路", "桂林公园", "漕宝路", "龙漕路", "龙华", "中华艺术", "大木桥路", "嘉善路", "陕西南路", "南京西路", "汉中路", "曲阜路", "天潼路", "国际客运中心", "提篮桥", "大连路", "江浦公园", "宁国路", "隆昌路", "爱国路", "复兴岛", "东陆路", "巨峰路", "杨高北路", "金京路", "申江路", "金海路"];//12号线
                        break;
                    case 15:
                        data.multiArray[1] = ["13号线沿线", "金运路", "金沙江西路", "丰庄", "祁连山南路", "真北路", "大渡河路", "金沙江路", "隆德路", "武宁路", "长寿路", "江宁路", "汉中路", "自然博物馆", "南京西路", "淮海中路", "新天地", "马当路", "世博会博物馆", "世博大道"];//13号线
                        break;
                    case 16:
                        data.multiArray[1] = ["16号线沿线", "龙阳路", "华夏中路", "罗山路", "周浦东", "鹤沙航城", "航头东", "新场", "野生动物园", "惠南", "惠南东", "书院", "临港大道", "滴水湖"];//16号线
                        break;
                    case 17:
                        data.multiArray[1] = ["磁悬浮", "龙阳路", "浦东国际机场"];//磁悬浮
                        break;
                }
                data.multiIndex[1] = 0;
                break;
        }
        this.setData(data);
    },

    pickerShangqC: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            pickerOn: this.data.pickerOn,
            pickerData: this.data.pickerData
        };
        data.pickerData[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.pickerData[0]) {
                    case 0:
                        data.pickerOn[1] = ["全部"];
                        break;
                    case 1:
                        data.pickerOn[1] = ["全浦东", "八佰伴", "北蔡\/塘桥", "川沙", "金桥开发区", "陆家嘴", "南码头", "浦东外环", "三林", "上南地区", "世博滨江", "世纪公园", "外高桥", "洋泾", "御桥", "张江高科", "竹园商贸区"];
                        break;
                    case 2:
                        data.pickerOn[1] = ["全黄浦", "董家渡", "老西门", "南京东路", "人民广场", "外滩"];
                        break;
                    case 3:
                        data.pickerOn[1] = ["全卢湾", "打浦桥", "淮海中路", "五里桥\/鲁班路", "新天地"];
                        break;
                    case 4:
                        data.pickerOn[1] = ["全徐汇", "漕河泾", "淮海西路", "龙华", "上海南站", "万体馆", "徐家汇"];
                        break;
                    case 5:
                        data.pickerOn[1] = ["全长宁", "北新泾", "虹桥火车站", "虹桥开发区\/古北", "天山路", "延安西路", "中山公园"];
                        break;
                    case 6:
                        data.pickerOn[1] = ["全静安", "北京西路", "曹家渡", "静安寺", "南京西路\/江宁路"];
                        break;
                    case 7:
                        data.pickerOn[1] = ["全普陀", "甘泉宜川", "中远两湾城", "中山北路", "长风商务区", "长寿路", "真如\/李子园"];
                        break;
                    case 8:
                        data.pickerOn[1] = ["全闸北", "大宁 \/延长路", "火车站", "汶水路\/共和新路", "彭浦", "闸北公园"];
                        break;
                    case 9:
                        data.pickerOn[1] = ["全虹口", "北外滩", "大柏树", "凉城路\/虹口足球场", "临平\/和平公园", "曲阳", "四川北路", "四平路"];
                        break;
                    case 10:
                        data.pickerOn[1] = ["全杨浦", "四平路", "鞍山", "控江路", "周家嘴", "东外滩", "平凉", "长阳路", "五角场", "新江湾城", "中原"];
                        break;
                    case 11:
                        data.pickerOn[1] = ["全闵行", "七宝", "七莘路", "莘庄", "颛桥\/老闵行", "春申", "虹桥镇", "华漕", "南方商城", "浦江", "龙柏金汇", "其他"];
                        break;
                    case 12:
                        data.pickerOn[1] = ["全宝山", "淞南高境", "其他", "顾村", "共康", "共富", "大华"];
                        break;
                    case 13:
                        data.pickerOn[1] = ["全嘉定", "安亭", "丰庄", "嘉定城区", "江桥", "南翔", "其他"];
                        break;
                    case 14:
                        data.pickerOn[1] = ["全松江", "九亭\/新桥", "其他", "泗泾", "松江新城\/松江大学城"];
                        break;
                    case 15:
                        data.pickerOn[1] = ["全青浦", "其他", "青浦"];
                        break;
                    case 16:
                        data.pickerOn[1] = ["全奉贤", '南桥'];
                        break;
                    case 17:
                        data.pickerOn[1] = ["上海周边"];
                        break;
                }
                data.pickerData[1] = 0;
                break;
        }
        this.setData(data);
    },


    Price_cc: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            PriceOn: this.data.PriceOn,
            PriceData: this.data.PriceData
        };
        data.PriceData[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.PriceData[0]) {
                    case 0:
                        data.PriceOn[1] = ["不限", "0-0.5万元\/月", "0.5-1.5万元\/月", "1.5-3万元\/月", "3-5万元\/月", "5-10万元\/月", "10万元\/月以上"];
                        break;
                    case 1:
                        data.PriceOn[1] = ["不限", "3-4元\/m²·天", "4-5元\/m²·天", "5-7元\/m²·天", "7-9元\/m²·天", "9-12元\/m²·天", "12元\/m²·天以上"];
                        break;
                }
                data.PriceData[1] = 0;
                break;
        }
        this.setData(data);
    },
    Other_cc: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            OtherOn: this.data.OtherOn,
            OtherData: this.data.OtherData
        };
        data.OtherData[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.OtherData[0]) {
                    case 0:
                        data.OtherOn[1] = ["全部面积", "100-300m²", "300-500m²", "500-1000m²", "1000m²以上"];
                        break;
                    case 1:
                        data.OtherOn[1] = ["全部装修", "豪华装修", "精装修", "中等装修", "简装修", "毛坯"];
                        break;
                    case 2:
                        data.OtherOn[1] = ["全部写字楼", "普通办公", "共享办公", "创意园区"];
                        break;
                }
                data.OtherData[1] = 0;
                break;
        }
        this.setData(data);
    },
    insert: function () {
        var cb = this.data.checkbox;
        cb.push("this.data.checkbox.length");
        this.setData({
            checkbox: cb
        });
    },
    delBind: function (e) {

        function removeByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        var cb = this.data.checkbox;
        removeByValue(cb, e.currentTarget.dataset.shu);
        // console.log(e.currentTarget.dataset.shu);
        // cb.pop(this.data.checkbox.length);
        console.log(this.data.checkbox.length)
        this.setData({
            checkbox: cb
        });
        console.log(cb);//条件
    },
    onReachBottom: function () {
        wx.showLoading({
            title: '加载中',
        })
      
        var that = this;
        var Dataa = that.data.msg;
        // var Dataa = Dataa.concat(Dataa);//模拟数据增回
        var pages = parseInt(that.data.page) + 1; 
        that.setData({
            page: parseInt(pages)
        });
        if (that.data.datac == "" || that.data.datac == undefined){
            if (!that.data.nullhide) {
                wx.request({
                    url: api.soso,
                    data: {
                        arrt: that.data.arrt,
                        page: that.data.page,
                        datac: that.data.datac
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        var p = that.data.page;
                        console.log(p)
                        console.log(res.data);
                        console.log('circle 下一页');
                        if (res.data.code == 0) {
                            var pushData = Dataa.concat(res.data.data["0"].jsonData.data);//数据增回
                            that.setData({
                                msg: pushData,
                            });
                            wx.hideLoading()
                        } else if (res.data.code == 1) {
                            that.setData({
                                button: true
                            });
                            console.log("没有数据")
                            wx.hideLoading()
                            return false;
                        } else if (res.data == "") {
                            wx.hideLoading()
                            wx.showModal({
                                title: "警告",
                                content: "后台数据调用失败",
                                showCancel: false,
                                confirmText: "确定"
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading()
                        wx.showModal({
                            title: "警告",
                            content: "app数据调用失败",
                            showCancel: false,
                            confirmText: "确定"
                        })
                    }
                })
            } else {
                wx.hideLoading()
            }
        }else{
            if (!that.data.nullhide) {
                wx.request({
                    url: api.soso,
                    data: {
                        page: that.data.page,
                        datac: that.data.datac
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        var p = that.data.page;
                        console.log(p)
                        console.log(res.data);
                        console.log('circle 下一页');
                        if (res.data.code == 0) {
                            var pushData = Dataa.concat(res.data.data["0"].jsonData.data);//数据增回
                            that.setData({
                                msg: pushData,
                            });
                            wx.hideLoading()
                        } else if (res.data.code == 1) {
                            that.setData({
                                button: true
                            });
                            console.log("没有数据")
                            wx.hideLoading()
                            return false;
                        } else if (res.data == "") {
                            wx.hideLoading()
                            wx.showModal({
                                title: "警告",
                                content: "后台数据调用失败",
                                showCancel: false,
                                confirmText: "确定"
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading()
                        wx.showModal({
                            title: "警告",
                            content: "app数据调用失败",
                            showCancel: false,
                            confirmText: "确定"
                        })
                    }
                })
            } else {
                wx.hideLoading()
            }
        }
       
    },
    clickPhone: function (e) {
        //打电话
        wx.makePhoneCall({
            phoneNumber: '021-68771866'
        })
    },
    removee: function () {
        wx.hideLoading()
        var that = this;
        //清空内容
        that.setData({
            msg: "",
            OtherOnnnnn:"",
            multiArrayy: "",
            pickerOnn: "",
            PriceOnn: "",
            OtherOnn: "",
            OtherOnnn: "",
            OtherOnnnn: "",
            datac:"",
        });
        //显示条件
        that.setData({
            showhide: false
        });
         wx.request({
                url: api.soso,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data.data["0"].jsonData.data);

                    if (res.data.code == 0) {
                        that.setData({
                            msg: res.data.data["0"].jsonData.data
                        });
                    }
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

    }
})