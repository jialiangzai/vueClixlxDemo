// 引入请求数据的插件
import axios from 'axios';
import store from '../../store'
import router from '../../router'

export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },
    $axios (options = {}) {
        options.method = options.method || this.common.method;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;
        options.headers = options.headers || this.common.headers

        // 判断登陆状态
        // if (options.headers.token) {
        // 	options.headers.token = store.state.user.token
        //     if (!options.headers.token) {
        //         router.push('/about')
        //     }
        // }

        return axios(options).then(v => {
            let data = v.data
            return new Promise((res, rej) => {
                if (!v) return rej();
                res(data)
            })
        })
    }
}