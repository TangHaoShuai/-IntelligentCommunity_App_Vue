<template>
	<view>
		<u-navbar :custom-back="back" class="uni_card" leftText="返回" :title="t_user.username" :safeAreaInsetTop="false"
			:background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<scroll-view id="gundong" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll" :style="{height:navHeight+'px'}">

				<view v-for="(item,index) in data_list">
					<!-- 如果聊天记录里面table标记为 tName的id 那试图渲染为 对伐发来的消息 -->
					<u-row style="margin: 10rpx;" v-if="item.label == t_user.phone ">
						<u-line style="margin: 5rpx;"></u-line>
						<u-col span="2">
							<u-avatar :src="url+t_user.image">
							</u-avatar>
						</u-col>
						<u-col span="10">
							<text> {{item.message}}</text>
						</u-col>
						<u-line style="margin: 5rpx;"></u-line>
						<u-col style="text-align: right; margin: 0;padding: 0;"><text
								style="font-size: smaller;margin: 0;padding: 0;"> {{item.date}} </text> </u-col>
					</u-row>
					<!-- 如果聊天记录里面table标记为 sName的id 那试图渲染为 我发的消息 -->
					<u-row style="margin: 10rpx;" justify="flex-end" v-if="item.label == userid ">
						<u-line style="margin: 5rpx;"></u-line>
						<u-col span="10" style="text-align: right;">
							<text> {{item.message}}</text>
						</u-col>
						<u-col span="2">
							<u-avatar :src="url+user.image">
							</u-avatar>
						</u-col>
						<u-line style="margin: 5rpx;"></u-line>
						<u-col style="text-align: left; margin: 0;padding: 0;"><text
								style="font-size: smaller;margin: 0;padding: 0;"> {{item.date}} </text> </u-col>
					</u-row>

				</view>



			</scroll-view>
		</view>
		<!-- beg 所有内容的容器 -->
		<view class="ipput_view">
			<u-row justify="around">
				<u-col span="10">
					<u-input v-model="value" :type="type" :border="border" :clearable="true" />
				</u-col>
				<u-col span="2">
					<u-button type="info" v-on:click="btn_Send()">发送</u-button>
				</u-col>
			</u-row>
		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js' //需要引入store

	export default {
		data() {
			return {
				user: this.$t_data.get('user'),
				url: this.$url + 'image/',
				t_user: {}, //对方的账户消息 由上一个页面传过来的
				userid: '', //登录者的ID
				webSocket: null,
				data_list: null, //聊天记录
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				value: '',
				type: 'text',
				border: true,
				src: 'http://n.sinaimg.cn/sinacn21/10/w480h330/20180829/218c-hikcahf5857486.jpg',
				src1: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fca%2F90%2F8c%2Fca908c35f0d819a3eb93f46931fd2096.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647789509&t=7c82074858da3ddf7c38d9315cd87755',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				pH: 0, //窗口高度
				navHeight: 0 //元素的所需高度
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			this.t_user = options;
			this.getUserID();
			this.getChatList();
			// this.webSocket = this.getWebSocket();
			//监听消息，判断消息ID是否是当前聊天对象的
			uni.$on("new_massage", (rel) => {
				var char = rel;
				if (char.t_name == this.userid) {
					var pages = getCurrentPages() // 获取栈实例
					let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由
					if (currentRoute == 'pages/chat/list/list') {
						this.$t_data.set(char.s_name, 0) //标记已读信息
					}
					var tmp = {
						"sName": char.s_name,
						"message": char.msg,
						"tName": char.t_name,
						"date": char.t_date,
						"label": char.s_name,
					}
					this.data_list.push(tmp);
					this.roll()
				}
			})
		},
		// 每次刷新页面获取一次高度
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".ipput_view"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						uni.createSelectorQuery().select(".uni_card")
							.boundingClientRect(cardBoundRect => {
								let pH = that._data.pH;
								that._data.navHeight = pH - data.height - cardBoundRect.height -
									5 //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
							}).exec();
					}).exec()
				}
			})
		},
		watch: {
			data_list: function() {
				this.roll()
			},
			deep: true

		},
		methods: {
			//返回
			back() {
				var user_list = this.$t_data.get("user_list")
				for (var i = 0; i < user_list.length; i++) {
					if (user_list[i].phone == this.t_user.phone) {
						user_list[i].tag = 0
						this.$t_data.set("user_list", user_list)
					}
				}
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			//获取登录用户ID
			getUserID() {
				// if (typeof(this.$store.state.count) != "undefined") {
				// 	if (this.$store.state.count.phone != "undefined")
				// 		this.userid = this.$store.state.count.phone
				// }
				this.userid = this.$t_data.get("user").phone
				this.$t_data.set(this.userid, 0)
			},
			//获取聊天记录
			getChatList() {
				this.$request('chats/getList', {
					"sName": this.userid,
					"tName": this.t_user.phone,
				}, 'POST').then(res => {
					this.data_list = res;
					this.roll()
					// 打印调用成功回调
					// console.log(this)
				})

			},
			btn_Send() {
				//页面添加数据渲染视图

				var tmp = {
					"sName": this.userid,
					"message": this.value,
					"tName": this.t_user.phone,
					"date": this.getDate(),
					"label": this.userid
				}
				if (this.value != '') {
					//发送消息
					this.$websocket.sendMessage(
						JSON.stringify({
							s_name: this.userid,
							msg: this.value,
							t_name: this.t_user.phone,
							type: "SPEAK"
						})
					)
					this.data_list.push(tmp);
				}
				this.value = '' //制空输入框
				this.roll()
			},
			// 滚动到顶部/左边，会触发 scrolltoupper 事件
			upper: function(e) {
				// console.log(e)
			},
			// 滚动到底部/右边，会触发 scrolltolower 事件
			lower: function(e) {
				// console.log(e)

			},
			// 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			roll() {
				//滚动
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 111111111
				});
			},
			getDate() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			}

		}
	}
</script>
<style lang="scss" scoped>
	.ipput_view {
		margin-bottom: 10rpx;
	}
</style>
