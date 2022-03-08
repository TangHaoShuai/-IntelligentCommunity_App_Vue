<template>
	<view>

		<u-navbar :is-back="false" :background="background" title="社区" :height="48">
			<!-- 自定义标题栏 -->
			<view class="slot-wrap" slot="right" v-on:click="scan2()">
				<u-icon name="scan" color="#2979ff" size="45"></u-icon>
			</view>
		</u-navbar>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<view>
				<!-- 滚动通知 -->
				<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
			</view>
			<!-- <u-sticky> -->
			<view>
				<!-- 功能栏 -->
				<u-row justify="space-around" style="margin-top: 30rpx;">
					<u-col span="4" style="text-align: center;" v-on:click="idCard()">
						<u-icon name="../../static/userid2.png" color="#2979ff" size="70" label-pos="bottom"
							label="身份卡">
						</u-icon>
					</u-col>
					<u-col span="4" style="text-align: center;">
						<u-icon name="../../static/wuyejiaofei.png" color="#2979ff" size="70" label-pos="bottom"
							label="物业缴费">
						</u-icon>
					</u-col>
					<u-col span="4" style="text-align: center;" v-on:click="house()">
						<u-icon name="../../static/fangzi.png" color="#2979ff" size="70" label-pos="bottom"
							label="我的房屋">
						</u-icon>
					</u-col>
				</u-row>
				<u-row justify="space-around" style="margin-top: 30rpx;">
					<u-col span="4" style="text-align: center;" v-on:click="service()">
						<u-icon name="../../static/weixiudian.png" color="#2979ff" size="70" label-pos="bottom"
							label="报事报修">
						</u-icon>
					</u-col>
					<u-col span="4" style="text-align: center;">
						<u-icon name="../../static/tousu.png" color="#2979ff" size="70" label-pos="bottom" label="投诉建议">
						</u-icon>
					</u-col>
					<u-col span="4" style="text-align: center;" v-on:click="servePhone()">
						<u-icon name="../../static/dianhua.png" color="#2979ff" size="70" label-pos="bottom"
							label="服务电话">
						</u-icon>
					</u-col>
				</u-row>
			</view>
			<!-- </u-sticky> -->

			<view class="huadong" style="margin-top: 25rpx;">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll" :style="{height:navHeight+'px'}">
					<u-card :title="item.title" :sub-title="item.newTime" :thumb="thumb"
						v-for="(item, index) in t_data.list" v-on:body-click="tem_test(item)">
						<view class="" slot="body" :id="index">
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">{{item.title}}</view>
								<image :src="item.imgUrl" mode="aspectFill"></image>
							</view>
							<view>
								<u-row justify="end">
									<p>{{item.newTime}}</p>
								</u-row>
							</view>
						</view>
					</u-card>
					<u-loadmore v-if="tem_show" :status="status" :loadText="loadText" />
				</scroll-view>
			</view>

		</view>

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false" class="u_tab"></u-tabbar>
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				globalTimer: null, //定义定时器
				userid: '',
				tem_show: false,

				// 通过status设置组件的状态，加载前值为loadmore，加载中为loading，没有数据为nomore
				status: 'loading',
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				t_data: [],
				list: [
					'各位出去在外的兄弟要注意隔壁老王上门修水龙头',
					'隔壁村的李寡妇失踪了，看到的村民及时联系村长上报',
					'最新特码一手资料，请联系18077229249',
					'小康不是梦——广西的千年跨越'
				],
				items: [{
						message: 'Foo'
					},
					{
						message: 'Bar'
					}
				],
				title: '素胚勾勒出青花，笔锋浓转淡',
				subTitle: '2020-05-15',
				thumb: 'https://iconfont.alicdn.com/t/e7055b94-ceda-4bb6-a298-45742a5d21e6.png',
				current: 0,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				current: 1,
				size: 5,
				belowPage: false, //是否有下一页
				total: 0,
				pH: 0, //窗口高度
				navHeight: 0 //元素的所需高度
			}
		},
		computed: {
			vuex_tabbar() {
				return store.state.vuex_tabbar
			}
		},
		onLoad() {
			this.getUserID();
			this.t_onShow();
			this.getList();
			this.getUserList();
			//监听收到消息
			// uni.onSocketMessage((res) => {
			// 	console.log('INDEX页面收到服务器内容：' + res.data)
			// })
		},
		// 每次刷新页面获取一次高度
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".scroll-Y"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => { //data  返回控件头部距离顶部的距离 
						// uni.createSelectorQuery().select(".u_tab")
						// 	.boundingClientRect(cardBoundRect => {
						let pH = that._data.pH;
						that._data.navHeight = pH - data
							.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						// }).exec();
					}).exec()
				}
			})
		},
		methods: {
			house() {
				this.$u.route("pages/index/house/house", {
					"tag": "index"
				})
			},
			service() {
				this.$u.route("pages/index/service/service")
			},
			servePhone() {
				//拨打电话
				uni.makePhoneCall({
					phoneNumber: "10086"
				});
			},
			idCard() {
				this.$u.route("pages/index/Identity_card/Identity_card", {
					"tag": "index"
				})
			},
			scan1() {
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						that.result1 = res.result;
					}
				});
			},
			scan2() {
				let that = this;
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						that.result2 = res.result;
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			scan3() {
				let that = this;
				// 调起条码扫描
				uni.scanCode({
					scanType: 'barCode',
					success: function(res) {
						that.result3 = res.result;
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			dataSet() {
				// var userdata = {
				// 	"current": 'tang',
				// 	"size": 5
				// }
				// this.$t_data.set("users", userdata, true)
				// console.log("数据保存成功")

				this.$t_data.set("15778676033", 1) //标记未读信息
				this.$t_data.set("18077229249", 1) //标记未读信息
			},
			dataGet() {
				var m = this.$t_data.get("user_list")
				console.log(m)
			},
			dataDet() {
				this.$t_data.del("users")
				console.log("数据删除成功")
			},
			//获取用户列表
			getUserList() {
				this.$request('user/getUsers', this.userid, 'POST').then(res => {
					if (res.length > 0) {
						for (var i = 0; i < res.length; i++) {
							var mes = parseInt(this.$t_data.get(res[i].phone));
							if (!isNaN(mes)) {
								res[i].tag = mes
							}
						}
						this.$t_data.set("user_list", res)
						console.log(res)
					}
				})
			},

			//心跳检测
			heartBeatTest() {
				//清除定时器
				clearInterval(this.globalTimer)
				//开启定时器定时检测心跳
				this.globalTimer = setInterval(() => {
					//发送消息给服务端
					this.$websocket.sendMessage(
						JSON.stringify({
							s_name: '15778676033',
							msg: '快点帮我改一下代码（模拟消息发送）',
							t_name: "18077229249",
							type: "SPEAK"
						}), //与服务端约定好消息格式
						null,
						() => {
							//如果失败则清除定时器
							clearInterval(this.globalTimer)
						}
					)
				}, 10000)
			},
			getUserID() {
				// if (typeof(this.$store.state.count) != "undefined") {
				// 	if (this.$store.state.count.phone != "undefined")
				// 		this.userid = this.$store.state.count.phone
				// }
				this.userid = this.$t_data.get("user").phone
			},
			//建立socket连接
			t_onShow() {
				this.$websocket.connectSocket('ws://192.168.68.238:8088/chat/' + this.userid)
				// this.heartBeatTest()
				// this.$websocket.sendMessage(
				// 	JSON.stringify({
				// 		s_name: this.userid,
				// 		msg: 'sdvdv',
				// 		t_name: "18077229249",
				// 		type: "SPEAK"
				// 	}))

				// this.$websocket.connectSocket('ws://192.168.1.33:8088/chat/' + this.userName, () => {
				// 	//如果连接成功则发送心跳检测
				// 	// this.heartBeatTest()
				// })
				// this.heartBeatTest();
			},

			onHide() {
				//关闭socket
				// this.$websocket.closeSocket()
			},

			tem_test(item) {
				this.$u.route('pages/news/news', {
					"url": item.url
				});
			},
			// 滚动到顶部/左边，会触发 scrolltoupper 事件
			upper: function(e) {
				// console.log(e)
			},
			// 滚动到底部/右边，会触发 scrolltolower 事件
			lower: function(e) {
				// console.log(e)
				this.tem_show = true;
				if (this.size <= this.total) {
					this.status = 'loading';
					this.$request('news/getNewsPage', {
						"current": this.current,
						"size": this.size += 5
					}, 'POST').then(res => {
						this.t_data.list = res.list;
						this.belowPage = res.belowPage;
						this.current = res.current;
						// 打印调用成功回调
						// console.log(res)
					})
				} else {
					this.status = 'nomore';
				}
			},
			// 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			getList() {
				this.$request('news/getNewsPage', {
					"current": this.current,
					"size": this.size
				}, 'POST').then(res => {
					this.t_data = res;
					this.belowPage = res.belowPage;
					this.current = res.current;
					this.total = res.total;
					// 打印调用成功回调
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		// height: 750rpx;
	}

	// .scroll-view_H {
	// 	white-space: nowrap;
	// 	width: 100%;
	// }

	// .scroll-view-item {
	// 	height: 300rpx;
	// 	line-height: 300rpx;
	// 	text-align: center;
	// 	font-size: 36rpx;
	// }

	// .scroll-view-item_H {
	// 	display: inline-block;
	// 	width: 100%;
	// 	height: 300rpx;
	// 	line-height: 300rpx;
	// 	text-align: center;
	// 	font-size: 36rpx;
	// }


	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.u-icon-name {

		word-wrap: break-word;
		word-break: break-all;
		margin-top: 16rpx;
		font-size: 26rpx;
		padding: 0 14rpx;
		// 给定高度是为了图标名超出一行时，进行换行能有更好的效果
		height: 26rpx;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}
</style>
