// 保存用户状态的数据
export default {
	state:{
		loginSatus:false, //登录状态
		token:null, //token
		userInfo:{} //用户信息
	},
	getters:{},
	mutations:{
		// 设置本地存储
		user_login(state,user){
			state.loginSatus = true;
			state.token = user.token;
			state.userInfo = user;
			// 持久化存储 --》 本地存储
			localStorage.setItem('xlxUserInfo',JSON.stringify(user))
		},
		// 读取本地存储
		init_user(state){
			let userInfo = JSON.parse(localStorage.getItem('xlxUserInfo'))
			if( userInfo ){
				state.loginSatus = true;
				state.token = userInfo.token;
				state.userInfo = userInfo;
			}
		}
	},
	actions:{}
}