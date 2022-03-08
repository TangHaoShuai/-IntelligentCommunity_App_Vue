<template>
	<view>
		<u-navbar leftText="返回" title="服务进度" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view style="margin: 30rpx;">
				<u-time-line>
					<u-time-line-item nodeTop="2" v-for="(item,index) in item">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="u-node" style="background: #19be6b;">
								<!-- 此处为uView的icon组件 -->
								<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">{{item.title}}</view>
								<view class="u-order-desc" style="">
									<p>{{item.message}}</p>
								</view>
								<view class="u-order-time">{{item.date}}</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
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
				item: [{
					uuid: "",
					title: "",
					message: "",
					date: "",
					serviceid: ""
				}],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
				undefined
			var serviceid = options.uuid
			this.$request('schedule/getSchedule', {
				"serviceid": serviceid
			}, 'POST').then(res => {
				if (res) {
					this.item = res
				}
			}).catch(
				error => {
				})
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
