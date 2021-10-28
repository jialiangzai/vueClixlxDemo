// 保存用户状态的数据
export default {
	state:{
		userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
		isLogin: JSON.parse(sessionStorage.getItem('isLogin'))
	},
	getters:{},
	mutations:{
		

		
	},
	actions:{
	
	}
}