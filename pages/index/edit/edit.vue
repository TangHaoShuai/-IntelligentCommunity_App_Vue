<template>
	<view>
		<u-navbar leftText="返回" title="编辑内容" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-input v-model="content" maxlength="2000" type="textarea" :border="true" height="500"
				style="margin: 20rpx;" />
			<u-button  :disabled="disabled" @click="submit">提交</u-button>
			<u-toast ref="uToast" />
		</view>
		<!-- beg 所有内容的容器 -->
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				disabled:false,
				service: {},
				user: {},
				content: '',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad() {
			this.user = this.$t_data.get("user")
		},
		methods: {
			//延时
			delay() {
				this.$u.route('pages/index/service/service');
			},
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			submit() {
				this.service = {
					uuid: '',
					userid: this.user.phone,
					message: this.content,
					date: '',
					state: ''
				}
				if (this.service.userid == '' || this.service.message == '') {
					this.showToast('靓仔啊...内容为空!!!!!', 'error')
				} else {
					this.$request('community-services/addCommunityServices', this.service, 'POST').then(res => {
						if (res) {
							this.showToast('添加成功美滋滋', 'success')
							this.disabled = true
							setTimeout(this.delay, 1000)
						} else {
							this.showToast('完蛋了添加失败失败', 'error')
						}
					}).catch(
						error => {
							this.showToast('完蛋了系统错误', 'error')
						})
				}

			}
		},
	}
</script>
<style lang="scss" scoped>

</style>
