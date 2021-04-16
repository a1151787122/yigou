// pages/issue/issue.js
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  imgSrc:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleIssueGood(){

  },
  async handleIssueCircle(){
    // this.chooseUserImage();   //调用 内部函数要有This !?
    const res = await wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:(result)=>{
        console.log(result.tempFilePaths[0]);
        for(let path of result.tempFilePaths){
          wx.saveFile({
            tempFilePath: path,
          })
        }
        wx.navigateTo({
          url: '/pages/issue_circle/issue_circle',
        })
      }

    });
    // this.imgSrc = res.tempFilePaths;
    // console.log(this.imgSrc);
    // wx.navigateTo({
    //   url: '/pages/issue_circle/issue_circle?',
    // })
  }

})