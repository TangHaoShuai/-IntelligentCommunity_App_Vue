<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" autoBack="false" title="时政新闻" :safeAreaInsetTop="false"
			:background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view style="height: 500rpx">
				<web-view :src="url"></web-view>
			</view>
		</view>
		<!-- beg 所有内容的容器 -->
	</view>
</template>

<script>
	var wv; //计划创建的webview
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				wv: '',
				url: 'https://www.163.com/dy/article/H0GM1L8M053469LG.html',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$scope
				.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					top: 75,
				})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		onLoad(options) {
			undefined
			this.url = options.url;
		},
		methods: {
			//返回
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
		}
	}
</script>
<style lang="scss" scoped>

</style>
