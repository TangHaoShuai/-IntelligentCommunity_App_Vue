<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="我的房子" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">

			<view v-if="user.house">
				<u-image mode="widthFix" :src="src"></u-image>
				<u-cell-group>
					<u-cell-item icon="account-fill" :arrow="false" :title=" '业主账户:'+user.phone"></u-cell-item>
					<u-cell-item icon="account-fill" :arrow="false" :title=" '业主名字:'+user.username "></u-cell-item>
					<u-cell-item icon="integral-fill" :arrow="false" :title="'所在小区:'+user.house"></u-cell-item>
					<u-cell-item icon="rmb-circle-fill" v-on:click="toPropertyFee()"
						:title="'物业费余额:'+(user.propertyFee ==null?0:user.propertyFee)+'元'"></u-cell-item>
				</u-cell-group>
			</view>

			<view>
				<u-select @confirm="confirm" v-model="show_select" mode="single-column" :list="list"></u-select>
				<view v-on:click="bindingHouse()" class="t_empty" :style="{marginTop: navHeight}">
					<u-empty :show="empty_show" icon-size="240" font-size="38" text="您还没有绑定房子 \n 点击我前去绑定房子" mode="list">
					</u-empty>
				</view>
			</view>

		</view>
		<!-- beg 所有内容的容器 -->

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				src: this.$url + 'image/bieye.jpeg',
				show_select: false,
				empty_show: false,
				list: [{
						value: '1',
						label: '盛世江南-湖岸'
					},
					{
						value: '2',
						label: '恒大-绿地城'
					},
					{
						value: '3',
						label: '新隆竹苑'
					}, {
						value: '4',
						label: '万锦华府'
					},
					{
						value: '5',
						label: '中地滨江国际'
					},
					{
						value: '6',
						label: '长岛花园别墅(龙翔街)'
					},
					{
						value: '7',
						label: '金辉时代广场'
					},
					{
						value: '8',
						label: '佳信红林新都'
					}
				],
				user: {},
				temp: '',
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
			if (options.tag == 'index') {
				this.temp = options.tag
			}
			if (options.tag == 'my') {
				this.temp = options.tag
			}
			this.user = this.$t_data.get("user")
			if (!this.user.house) {
				this.empty_show = true
			} else {
				this.empty_show = false
			}
		},
		methods: {
			confirm(val) {
				let temp = this.user
				let state = false;
				temp.house = val[0].label
				this.$request('user/updateUser', temp, 'POST').then(res => {
					if (res) {
						this.$request('user/getUser', temp, 'POST').then(mzz => {
							if (mzz.house) {
								this.$t_data.set("user", mzz)
								this.user = this.$t_data.get("user")
								if (this.user.house) {
									this.empty_show = false
								}
							}
						})
					}
				})
			},
			bindingHouse() {
				this.show_select = true
			},
			toPropertyFee() {
				this.$u.route("pages/index/property_fee/property_fee", {
					"tag": "house"
				})
			},
			back() {
				if (this.temp == 'index') {
					uni.switchTab({
						url: '/pages/index/index'
					});
				} else if ((this.temp == 'my')) {
					uni.switchTab({
						url: '/pages/my/my'
					});
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},
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
	.nothing {
		// background: #FFFFFF;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		// image{
		//     width: 50%;
		// }
	}
</style>
