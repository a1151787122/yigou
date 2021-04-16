const DB = wx.cloud.database();
import regeneratorRuntime from '../../lib/runtime/runtime';
const goodInfo={
  Id:'',
  imgId:[],
  issueTime:'',
  status:0,
  discribe:'',
  ownerId :'',
  newOwnerId:''
}
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  data:{
    // data 中的数据 在JS 中调用时候 要用 this.data.var
    img_src:[]
  },

  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    wx.getSavedFileList({
      success: (result) => {
        this.setData({
          img_src:result.fileList
        });
      }
    });
    // wx.cloud.downloadFile({
    //   fileID:'cloud://cloud-miniprograming-7bi974e03dc.636c-cloud-miniprograming-7bi974e03dc-1305521591/example.png',
    //   success:(res)=>{
    //     console.log(res);
    //     this.setData({
    //       img_src:res.tempFilePath
    //     })
    //   }
    // })
  },
  submitGoodInfo(e){
    // 绑定imageId
    for(let i=0;i<this.data.img_src.length;i++){
      const now = new Date();
      wx.cloud.uploadFile({
        cloudPath: String(now.getTime())+'-'+String(i)+'png',
        filePath:this.data.img_src[i].filePath,
        success:res=>{
          goodInfo.imgId.push(res.fileID)
        },complete(res){
        }
      })
    }
    
    // 绑定 时间 和 id
    const now = new Date();
    goodInfo.issueTime = now.getFullYear().toString()+'-'+ now.getMonth().toString()+'-'+ now.getDay().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString();
    goodInfo.Id = now.getTime().toString();
    // 绑定 原物主
    wx.cloud.callFunction({
      name:'getOpenId',
      data:{}
    }).then(res=>{
      goodInfo.ownerId = res.result.userInfo.openId
    })

    // 绑定  描述
    goodInfo.discribe = e.detail.value.text;

    if(goodInfo.imgId.length>=5){
      DB.collection('goodsList').add({
        data:goodInfo,
        success:res=>{
          console.log(res);
        }
      })
    }
  },

})