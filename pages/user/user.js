const DB = wx.cloud.database();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    })
    if(userInfo){
      let hasUserInfo=true;
      let canIUseGetUserProfile=true;
      this.setData({
        hasUserInfo,
        canIUseGetUserProfile
      })
    // 有用户信息则上传到云数据库做对比
    }else if(wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // 数据库添加操作
    DB.collection('user').add({
      data:userInfo,
      success:res=>{
        console.log(res);
      },fail:err=>{
        console.log(err);
      }
    })

    //数据库删除操作
    // DB.collection('user').where({_openid:'oyWNA5HeCVl6UVB4-QTbS-434u0k'}).remove({
    //   success:res=>{
    //     console.log(res);
    //   },fail:err=>{
    //     console.log(err);
    //   }
    // })

    // 数据库更新操作
    // DB.collection('user').where({_openid:'oyWNA5HeCVl6UVB4-QTbS-434u0k'}).update({
    //   data:{
    //     city:'yaan'
    //   },
    //   success:res=>{
    //     console.log(res);
    //   },fail:err=>{
    //     console.log(err);
    //   }
    // })

    // 数据库查询操作
    // DB.collection('user').where({_openid:'oyWNA5HeCVl6UVB4-QTbS-434u0k'}).get({
    //   success:res=>{
    //     console.log(res.data);
    //   },fail:err=>{
    //     console.log(err);
    //   }
    // })

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorage({
          data: res.userInfo,
          key: 'userInfo',
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    wx.setStorage({
      data: e.detail.userInfo,
      key: 'userInfo',
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})