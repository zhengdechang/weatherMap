// pages/weather/weather.js
var QQMapWX = require('../sdk/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    flag: false,
    city: '',
    key: 'S2RBZ-CJA3R-4A5WK-W5GOH-XIMK5-QYBXN',
    weatherlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    qqmapsdk = new QQMapWX({
      key: this.data.key
    });

    var that = this
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showToast({
            title: '请授权后使用',
            icon: 'none',
            duration: 1000
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          that.loc()
        } else {
          that.loc()
        }
      }
    })
  },

  openset: function () {
    var that = this
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        if (res.authSetting["scope.userLocation"] == true) {
          that.loc()
        }
      }
    })
  },

  sendRequest: function (qqMapApi) {
    const that = this
    wx.request({
      url: qqMapApi,
      header: {
        'Content-Type': 'application/json'
      },
      data: {},
      method: 'GET',
      success: (res) => {
        console.log(11, res)
        if (res.statusCode == 200 && res.data.status == 0) {
          // 从返回值中提取需要的业务地理信息数据 国家、省、市、县区、街道
          that.setData({
            nation: res.data.result.address_component.nation
          });
          that.setData({
            province: res.data.result.address_component.province
          });
          that.setData({
            city: res.data.result.address_component.city.replace("市", "")
          });
          that.setData({
            district: res.data.result.address_component.district
          });
          that.setData({
            street: res.data.result.address_component.street
          });
          that.getweather(res.data.result.address_component.city.replace("市", ""))
        }
      }
    })
  },

  getweather: function (city2) {
    var that = this
    wx.request({
      url: 'https://tianqiapi.com/api?version=v1&appid=32139722&appsecret=v1jwx1vU',
      data: {
        city: city2
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        that.setData({
          weatherlist:res.data.data
        })
      }
    })
  },

  loc: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          flag: true
        })
        wx.setStorage({
          data: res.latitude,
          key: 'latitude',
        })
        wx.setStorage({
          data: res.longitude,
          key: 'longitude',
        })
        var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + that.data.latitude + ',' +
          that.data.longitude + "&key=" + that.data.key + "&get_poi=1";
        that.sendRequest(qqMapApi)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})