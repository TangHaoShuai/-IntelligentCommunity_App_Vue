<template>
	<view>
		<u-navbar leftText="返回" title="文章内容" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-row style="margin: 10rpx;">
					<u-col span="1.4">
						<u-avatar v-if="data.user" :size=" 70" :src="url+data.user.image"></u-avatar>
					</u-col>
					<u-col v-if="data.user" span="10" style="text-align: left; margin: 0;padding: 0;">
						{{data.user.username}}
					</u-col>
				</u-row>


			</view>
			<view class="u-content">
				<u-parse :html="content"></u-parse>
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
				imgurl: this.$url + 'image/article_img/', //文章图片
				url: this.$url + 'image/', //头像
				data: {},
				src: "../../static/tx.jpg",
				content: ``,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			var uuid = options.uuid
			this.$request('article/getOneArticle', {
				"id": uuid
			}, 'POST').then(res => {
				if (res != null) {
					this.data = res
					var value = "<p  style=\"text-indent:2em;\"> " + res.content + "</p>";
					if (res.imgLists.length > 0) {
						for (var i = 0; i < res.imgLists.length; i++) {
							var img = " <img src=\" " + this.imgurl + res.imgLists[i].imgUrl + " \"/>"
							value += img
						}
					}
					this.content = value
				}
			}).catch(error => {
				this.$u.toast('系统错误');
			})
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>

</style>
