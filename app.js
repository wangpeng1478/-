App({
  onLaunch: function () {
    // console.log('App Launch')
      wx.showShareMenu({
          withShareTicket: true
      })
    
  },
  onShow: function () {
    // console.log('App Show')
      wx.showShareMenu({
          withShareTicket: true
      })
  },
  onHide: function () {
    // console.log('App Hide')
      wx.showShareMenu({
          withShareTicket: true
      })
  }
})




