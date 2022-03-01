<template>
	<view>
		<u-navbar leftText="返回" autoBack="false"  title="时政新闻" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- <a href="https://www.uviewui.com/components/parse.html">跳转到顶部</a>	 -->
			<web-view :src="url"></web-view>
		</view>
		<!-- beg 所有内容的容器 -->

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				url: 'https://www.163.com/dy/article/H0GM1L8M053469LG.html',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			this.url = options.url;
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>

</style>
