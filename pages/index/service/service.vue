<template>
	<view>
		<u-navbar leftText="返回" :custom-back="back" title="报事报修" :background="background" :height="48">
			<view class="slot-wrap" slot="right">
				<u-icon name="../../../static/fabiao.png" color="#2979ff" size="46" v-on:click="btn_Edit()"
					style="margin-right: 15rpx;"></u-icon>
			</view>
		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- Subsection 分段器 -->
			<view style="margin: 20rpx">
				<u-subsection :list="list" @change="change"></u-subsection>
			</view>

			<u-cell-group :border="false" v-if="fromData[0].message">
				<view v-for="(item,index) in fromData" v-on:click="onServerList(item)" style="margin-bottom: 40rpx;">
					<u-cell-item :border-top="true" :border-bottom="false" style="padding-bottom: 0;padding-top: 5rpx;"
						:title="item.message">
					</u-cell-item>
					<u-cell-item :arrow="false" style="padding-top: 0;padding-bottom: 0;" :title="item.date">
						<view>
							<p>当前状态:{{item.state}}</p>
						</view>
					</u-cell-item>
				</view>
			</u-cell-group>

		</view>
		<!-- beg 所有内容的容器 -->
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				list: [{
						name: '正在处理'
					},
					{
						name: '处理完成'
					}
				],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				fromData: [{
					uuid: '',
					userid: '',
					message: '',
					date: '',
					state: ''
				}]
			}
		},
		computed: {

		},
		onLoad() {
			this.getCommunityServices()
		},
		methods: {
			// 分段器监听
			change(index) {
				if (index == 0) {
					this.getCommunityServices()
				}
				if (index == 1) {
					this.$request('community-services/getCommunityServices', {
						"state": "处理完成"
					}, 'POST').then(res => {
						if (res.length > 0) {
							this.fromData = res
						} else {
							this.fromData = [{
								uuid: '',
								userid: '',
								message: '',
								date: '',
								state: ''
							}]
						}
					}).catch(
						error => {

						})
				}
			},
			//导航栏返回监听
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			btn_Edit() {
				this.$u.route('pages/index/edit/edit');
			},
			onServerList(item) {
				this.$u.route('pages/index/service_list/service_list',item);
			},
			getCommunityServices() {
				this.$request('community-services/getCommunityServices', {}, 'POST').then(res => {
					if (res) {
						this.fromData = res
					}
				}).catch(
					error => {

					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}
</style>
