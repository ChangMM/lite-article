//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollTop: 0,
    article: {
      article_id: '',
      title: '',
      author: '',
      content: ''
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  getMoreArticle: function () {
    let self = this
    wx.request({
      url: "https://ued.bingyan.net/api/random",
      success: function (res) {
        let data = res.data.data
        data.content = data.content.replace(/<p>/ig, "<p style='line-height:1.6;color:#333;font-size:15px;margin:10px 0px;text-align:justify;text-indent:2em;letter-spacing:1.5px;'>")
        self.setData({
          article: data,
          scrollTop: 0
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '今日精选文章',
      path: '/pages/article/article?id=' + this.data.article.article_id
    }
  },
  onLoad: function (params) {
    let self = this
    if (params.id == undefined) {
      wx.request({
        url: "https://ued.bingyan.net/api/daily",
        success: function (res) {
          let data = res.data.data
          data.content = data.content.replace(/<p>/ig, "<p style='line-height:1.6;color:#333;font-size:15px;margin:10px 0px;text-align:justify;text-indent:2em;letter-spacing:1.5px;'>")
          self.setData({
            article: data,
            scrollTop: 0
          })
        }
      })
    } else {
      wx.request({
        url: "https://ued.bingyan.net/api/random/" + params.id,
        success: function (res) {
          let data = res.data.data
          data.content = data.content.replace(/<p>/ig, "<p style='line-height:1.6;color:#333;font-size:15px;margin:10px 0px;text-align:justify;text-indent:2em;letter-spacing:1.5px;'>")
          self.setData({
            article: data,
            scrollTop: 0
          })
        }
      })
    }
  }
})
