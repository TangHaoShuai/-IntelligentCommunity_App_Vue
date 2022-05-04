<template>
	<!-- 共享 -->
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="我的共享" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">

			<view v-if="fromData.length == 0" class="t_empty" :style="{marginTop: navHeight}">
				<u-empty :show="empty_show" icon-size="240" font-size="38" text="请扫码获取共享物品" mode="list">
				</u-empty>
			</view>
			<!-- v-on:body-click="tem_test(item)" -->
			<u-card v-else :title="'物品名称:'+item.name" v-for="(item, index) in fromData">
				<view class="" slot="body" :id="index">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">物品描述:{{item.description}}</view>
					</view>
					<view style="margin: 20rpx;">
						<u-image width="100%" height="300rpx" border-radius="30" :src="src+item.img" mode="aspectFill">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<view>
						<u-row justify="end">
							<view style="margin-right: 20rpx;">开始时间:{{item.begdate}}</view>
							<view>结束时间:{{item.enddate}}</view>
						</u-row>
					</view>
				</view>
			</u-card>



		</view>
		<!-- beg 所有内容的容器 -->

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				empty_show: true,
				src: this.$url + 'image/Share/',
				fromData: [
					// 	{
					// 	uuid: '1312',
					// 	name: '123',
					// 	title: '自行车',
					// 	description: '这是一个超级库的山地自行车,这是一个超级库的山地自行车这是一个超级库的山地自行车',
					// 	begdate: '开始时间:2021/21/21',
					// 	enddate: '结束时间:2021/21/21',
					// 	img:'',
					// qrimg:'',
					// },
				],
				user: {},
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				pH: 0, //窗口高度
				navHeight: 0 //元素的所需高度
			}
		},
		computed: {

		},
		onLoad() {
			this.user = this.$t_data.get("user")
			this.getShareList()
		},
		methods: {
			back() {
				// this.$u.route("pages/index/index")
				// if (this.temp == 'index') {
				uni.switchTab({
					url: '/pages/index/index'
				});
				// } 
			},
			getShareList() {
				let mzz = this
				let temp = {
					"userid": mzz.user.phone
				}
				this.$request('share/getUserShareList', temp, 'POST').then(res => {
					if (res) {
						mzz.fromData = res
					} else {
						// mzz.empty_show = false
					}

				}).catch(
					error => {
						this.showToast('完蛋了系统错误', 'error')
					})
			}
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".t_empty");
					titleH.boundingClientRect(callback => {
						let ph = that._data.pH
						let viewWidth = callback.width
						that._data.navHeight = (ph - viewWidth) / 2 + "px"
					}).exec()
				}
			})
		}
	}
</script>
<style lang="scss" scoped>

</style>
