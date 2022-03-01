import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
        vuex_tabbar:[{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '社区',
					customIcon: false,
					pagePath: "/pages/index/index",
				}, {
					iconPath: "heart",
					selectedIconPath: "heart-fill",
					text: '生活',
					customIcon: false,
					pagePath: "/pages/life/life",
				}, {
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					customIcon: false,
					pagePath: "/pages/my/my",
				}]
    }
})
export default store