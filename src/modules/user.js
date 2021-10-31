// 保存用户状态的数据
export default {
	state:{
		userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {
			avatar: '/image/common/avator.png',
			nickName: '小鹿线-默认',
			gender: 1,
			city: '北京',
			id:1,
		},
		isLogin: JSON.parse(sessionStorage.getItem('isLogin')) || false
	},
	getters:{
		avatar:state => state.userInfo.avatar
	},
	mutations:{
		saveUserInfo(state,payload){
			state.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || payload
		},
		saveLogin(state,payload) {
			state.isLogin = JSON.parse(sessionStorage.getItem('isLogin')) || false
		},
		saveAvator(state,payload){
			state.userInfo.avatar = payload
		}
	},
	actions:{
		saveUserInfoAction({commit},payload){
			commit('saveUserInfo',payload)
		},
		saveLoginAction({commit},payload){
			commit('saveLogin',payload)
		},
		saveAvatorAction({commit},payload){
			commit('saveAvator',payload)
		}
	}
}
