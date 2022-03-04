<template>
	<view>
		<u-navbar leftText="返回" title="个人中心" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-row style="margin: 10rpx;">
					<u-col span="1.4"   >
						<u-avatar :size="70" :src="src" ></u-avatar> 
					</u-col>
					<u-col span="10" style="text-align: left; margin: 0;padding: 0;">
						唐冠希
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
				src : "../../static/tx.jpg",
				content: `				
					<p  style="text-indent:2em;">uView2.0是继1.0以来的一次重大更新，2.0已全面兼容nvue，为了这个最初的梦想，我们曾日以夜继，挑灯夜战，闻鸡起舞。您能看到屏幕上的字，却看不到我们洒在键盘上的泪。
uView来源于社区，也回归到社区，正是
有一群热爱uni-app生态的同学推着它前行，而我们也一如既往的承诺，uView永久开源，永远免费。
关于uView的取名来由，首字母u来自于uni-app首字母，uni-app是基于Vue.js，Vue和View(延伸为UI、视图之意)同音，同时view组件是uni-app中 最基础，最重要的组件，故取名uView，表达源于uni-app和Vue之意，同时在此也对它们表示感谢。
#适用领域</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>

</style>
