// pages/map/map.js
var QQMapWX = require('../sdk/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.4737,
    latitude: 31.23037,
    key: 'S2RBZ-CJA3R-4A5WK-W5GOH-XIMK5-QYBXN',
    markers:'',
    perimeter:'',
    in:'',
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: this.data.key
    });
  },

  fuzhi:function(e){
    // console.log(e.detail.value)
    this.setData({
      in:e.detail.value
    })
  },

  sousuo:function(){
    this.nearby_search(this.data.in)
  },

  mark:function(e){
    console.log(e)
  },

  coll:function(e){
    var id = e.detail.markerId
    var list = this.data.markers
    var collist = this.data.collect
    collist.push(list[id])
    list[id].callout.color = "#FF4500"
    list[id].callout.display =  'ALWAYS'
    // console.log(12,list)
    this.setData({
      markers:list,
      collect:collist
    })
    wx.showToast({
      title: '收藏成功'
    })
    // this.data.markers[id].callout.color = "#FF4500"
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
    this.setData({
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
      // collect:wx.getStorageSync('collect')
    })
   
  },

  nearby_search: function (keyword) {
    var _this = this;
    qqmapsdk.search({
      keyword: keyword,
      location: {
        latitude: _this.data.latitude,
        longitude: _this.data.longitude
      },
      page_size:20,
      success: function (res) {
        var obj = JSON.stringify(res);
        // console.log("obj=" + obj);
        var mks = [];
        for (var i = 0; i < res.data.length; i++) {
          mks.push({
            title: res.data[i].location.lat,
            id: i,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/img/map.png",
            width: 20,
            height: 20,
            callout: {
              content: res.data[i].title,
              color: '#000',
              display: 'BYCLICK',
              fontSize:18
            }
          })
        }
        _this.setData({
          markers: mks,
          perimeter: res.data
        })
        console.log(22,mks)
      },
      fail: function (res) {
        console.log("fail=" + res);
      },
      complete: function (res) {
        console.log("complete=" + res);
      }

    });
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      data: this.data.collect,
      key: 'collect'
    })
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