// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    collect: '',
    list2: [
      ['地点收藏', '../coll/coll'],
      ['天气小知识', '../kno/kno'],
      ['问题反馈', '../que/que'],
      ['完善资料', '../ziliao/ziliao']
    ]
  },

  gonext:function(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 事件处理函数
  onLoad() {
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
  exit: function () {
    this.setData({
      userInfo: '',
      hasUserInfo: false
    })
  },

  // getUserInfo(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  getUserProfile: function (e) {
      wx.getUserProfile({
        desc: '业务需要',
        success: res => {
        	//拿到信息处理业务
			app.globalData.userInfo = res.userInfo
			this.setData({
			    userInfo: res.userInfo,
			    hasUserInfo: true
			  })
			console.log(res.userInfo)
			console.log(e)
        }
      })
  },
  onShow: function () {
    this.setData({
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
      collect: wx.getStorageSync('collect')
    })
  }
})