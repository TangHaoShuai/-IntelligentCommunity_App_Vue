<template>
	<!-- 文章评论 -->
	<view>
		<u-navbar leftText="返回" title="评论" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-input v-model="content" maxlength="2000" type="textarea" :border="true" height="800"
				style="margin: 20rpx;" />
			<u-button @click="submit">提交</u-button>
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
				user: '',
				articleid: '',
				content: '',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			this.articleid = options.articleid
			this.user = this.$t_data.get("user") // 获取登录者信息
		},
		methods: {
			//延时
			delay() {
				this.$u.route('pages/life/article/article',{"uuid":this.articleid});
			},
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			submit() {
				this.$request('comment/addComment', {
					"articleid": this.articleid,
					"userid": this.user.phone,
					"message": this.content
				}, 'POST').then(res => {
					if (res) {
						this.showToast("评论成功", 'success')
						setTimeout(this.delay, 1000)
					} else {
						this.showToast('评论失败', 'error')
					}
				}).catch(error => {
					this.showToast('系统错误', 'error')
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
