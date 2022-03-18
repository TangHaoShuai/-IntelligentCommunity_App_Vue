import Vue from 'vue'
import App from './App'
import store from './store'

let ip = '192.168.31.68'
Vue.prototype.$url = 'http://'+ip+':8088/'
Vue.prototype.$websocketIP = 'ws://'+ip+':8088/chat/'

//全局引用request
import request from 'common/request.js'
Vue.prototype.$request = request

import websocket from '@/common/websocket.js'
Vue.prototype.$websocket = websocket

import t_data from '@/common/t_data.js'
Vue.prototype.$t_data = t_data

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

Vue.prototype.$store = store

const app = new Vue({
	store,
	...App
})
app.$mount()
