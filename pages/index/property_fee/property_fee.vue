<template>
	<!-- 物业缴费 -->
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="物业缴费" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-image mode="widthFix" :src="src"></u-image>
			<u-cell-group>
				<u-cell-item icon="account-fill" :arrow="false" :title=" '业主名字:'+user.username "></u-cell-item>
				<u-cell-item icon="integral-fill" :arrow="false" :title="'所在小区:'+user.house"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="绿化管理费:30元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="保安费:20元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="清洁卫生费18元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="物业管理企业固定资产折旧率:50元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="公共设施、设备日常运行维修及保养费:50元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="工作人员的工资和福利费:40元"></u-cell-item>
				<u-cell-item icon="rmb-circle-fill" :arrow="false" title="法定税费:25元"></u-cell-item>
				<view style="background-color: #71D5A1;">
					<u-cell-item icon="rmb-circle-fill" :arrow="false" title="当月物业费共要:233元"></u-cell-item>
				</view>
				<view v-if="user.propertyFee < 233 " style="background-color: #ffff7f;">
					<u-cell-item icon="rmb-circle-fill" :arrow="false"
						:title="'当前账户物业费余额:'+ (user.propertyFee ==null?0:user.propertyFee)+'元 不够支付下个月的物业费 请尽快充值'">
					</u-cell-item>
				</view>
				<view v-else style="background-color: #71D5A1;">
					<u-cell-item icon="rmb-circle-fill" :arrow="false"
						:title="'当前账户物业费余额:'+(user.propertyFee ==null?0:user.propertyFee) +'元 余额充足'"></u-cell-item>
				</view>
			</u-cell-group>
			<u-button style="margin: 30rpx;" @click="show = true" type="success">充值</u-button>
			<u-toast ref="uToast" />
			<view>
				<u-popup :closeable="true" v-model="show" mode="bottom" border-radius="14" length="35%">
					<view style="margin: 50px 30rpx 0rpx 30rpx;">
						<u-input v-model="value" input-align="center" placeholder="输入充值金额" :border="true" />
						<u-button style="margin-top: 30rpx;" type="success" @click="topUp">确认</u-button>
					</view>
				</u-popup>
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
				temp: '',
				value: '',
				show: false,
				user: {},
				src: this.$url + 'image/wuye.jpg',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {},
		onLoad(options) {
			undefined
			if (options.tag == 'index') {
				this.temp = options.tag
			}
			if (options.tag == 'house') {
				this.temp = options.tag
			}
			this.user = this.$t_data.get("user")
		},
		methods: {
			back() {
				if (this.temp == 'index') {
					uni.switchTab({
						url: '/pages/index/index'
					});
				} else {
					// uni.switchTab({
					// 	url: 'pages/index/house/house'
					// });
					this.$u.route("pages/index/house/house")
				}
			},
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			topUp() {
				var i = parseInt(this.value);
				if (!isNaN(i) && i != 0) {
					let temp = this.user
					if (temp.propertyFee == null || !temp.propertyFee) {
						temp.propertyFee = parseInt(this.value)
					} else {
						temp.propertyFee = (parseInt(temp.propertyFee) + parseInt(this.value))
					}
					this.$request('user/updateUser', temp, 'POST').then(res => {
						if (res) {
							this.$request('user/getUser', temp, 'POST').then(mzz => {
								if (mzz.propertyFee) {
									this.$t_data.set("user", mzz)
									this.user = this.$t_data.get("user")
									this.value = ''
									this.show = false
									this.showToast('充值成功', 'success')
								}
							})
						}
					})
				} else {
					this.showToast('不要调皮,输入大于0的数字', 'error')
				}

			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
