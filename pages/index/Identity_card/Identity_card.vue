<template>
	<!-- 身份卡 -->
	<view>
		<u-navbar leftText="返回" :custom-back="back" title="身份卡" :safeAreaInsetTop="false" :background="background"
			:height="48">
		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-row>
				<u-col span="4">
					<u-avatar v-on:click="chooseAvatar()" :src="user_src" size="180" mode="circle"
						style="margin: 20rpx;" :show-sex="true" sex-icon="man"></u-avatar>
				</u-col>
				<u-col span="8">
					<view>昵称:{{user.username}}</view>
					<view>账号:{{user.phone}}</view>
					<view>个性签名:{{user.uDescribe}}</view>
				</u-col>

				<view class="nothing" v-if="tag">
					<u-image mode="widthFix" :src="src"></u-image>
				</view>
			</u-row>
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
				tag: false,
				user: {},
				// src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				src: '',
				user_src: '',
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
			// this.user = this.$t_data.get("user")
			// this.user_src = this.$url + 'image/' + this.user.image
			// this.getUserQrCode()
			this.src = this.$url + 'image/qrcode/'
			this.user = this.$t_data.get("user")
			this.user_src = this.$url + 'image/' + this.user.image
			this.user = this.$t_data.get("user")
			this.getUserQrCode()
		},
		onShow() {

		},
		methods: {
			back() {
				if (this.temp == 'index') {
					uni.switchTab({
						url: '/pages/index/index'
					});
				} else {
					uni.switchTab({
						url: '/pages/my/my'
					});
				}
			},
			getUserQrCode() {
				this.$request('qrcode/getUserQrCode', this.user, 'POST').then(res => {
					if (res != "") {
						this.tag = true
						this.src = this.src + this.user.phone + '.jpg'
					}
				}).catch(error => {
					this.showToast('系统错误', 'error')
				})
			}
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
