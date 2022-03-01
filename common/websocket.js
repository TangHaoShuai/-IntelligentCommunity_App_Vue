import t_data from '@/common/t_data.js'
const _WEBSOCKET = {
	//是否打开连接
	isOpen: false,
	//连接socket
	connectSocket(url, successFunc = null, errorFunc = null) {
		try {
			//连接socket
			uni.connectSocket({
				url,
				success() {
					console.log('websocket连接成功！')
				}
			})
			//监听socket连接
			uni.onSocketOpen((res) => {
				this.isOpen = true
				console.log('WebSocket连接已打开！')
				if (successFunc) {
					successFunc(res)
				}
			})
			//监听socket连接失败
			uni.onSocketError((res) => {
				this.isOpen = false
				console.log('WebSocket连接打开失败，请检查！')
				if (errorFunc) {
					errorFunc(res)
				}
			})
			// {"msg":"18077229249链接成功！当前在线人数:1","onlineCount":1,"s_name":"18077229249","t_date":"","t_name":"","type":"ENTER"}
			//监听收到消息
			uni.onSocketMessage((res) => {
				console.log('收到服务器内容：' + res.data)
				// t_data.set("tag", t_data.get("tag") + 1)
				// console.log("tag:" + t_data.get("tag"))
				//字符串专JSON
				var message = JSON.parse(res.data) || {};
				var user_list = t_data.get("user_list") //获取用户集合
				if (message.type == 'SPEAK') {
					var mes = parseInt(t_data.get(message.s_name));		
					if (mes == null || isNaN(mes) || typeof(mes) == "undefined") {
						mes = 1 ;
						t_data.set(message.s_name, mes) //标记未读信息
					} else {
						t_data.set(message.s_name, mes + 1) //标记未读信息
					}
					for (var i = 0; i < user_list.length; i++) {
						if (user_list[i].phone == message.s_name) {
							user_list[i].tag = mes
						}
					}
					t_data.set("user_list",user_list)
					uni.$emit("new_massage", message) //发送广播
				}

			})
			//监听socket关闭
			uni.onSocketClose((res) => {
				console.log('WebSocket 已关闭！')
				this.isOpen = false
			})
		} catch (error) {
			console.log('err:' + error)
		}
	},
	//发送消息
	sendMessage(msg = '', successFunc = null, errorFunc = null) {
		if (!this.isOpen || !msg) {
			if (errorFunc) {
				errorFunc('未传消息内容或连接未打开！')
			}
			return
		}
		uni.sendSocketMessage({
			data: msg,
			success(res) {
				console.log('消息发送成功！')
				if (successFunc) {
					successFunc(res)
				}
			},
			fail(err) {
				console.log('消息发送失败！')
				if (errorFunc) {
					errorFunc(err)
				}
			}
		})
	},
	//关闭连接
	closeSocket() {
		if (!this.isOpen) {
			return
		}
		//关闭socket连接
		uni.closeSocket()
	}
}

export default _WEBSOCKET
