<template>
	<view>
		<u-navbar :is-back="false" :background="background" title="个人中心" :height="48">
			<view class="slot-wrap" slot="right">
				<u-badge type="error" count="3" size="mini"></u-badge>
				<u-icon name="../../static/xiaoxi.png" color="#2979ff" size="45"></u-icon>
			</view>
		</u-navbar>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<view>
				<u-row>
					<u-col span="4">
						<u-avatar :src="src" size="180" mode="circle" style="margin: 20rpx;" :show-sex="true"
							sex-icon="man"></u-avatar>
					</u-col>
					<u-col span="8">
						<view>昵称:{{user.username}}</view>
						<view>账号:{{user.phone}}</view>
						<view>爱好:{{user.u_describe}}</view>
						<view>个性签名:{{user.u_describe}}</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin: 30rpx;font-size: 40rpx;font-weight: bold;">
				<view style="margin-bottom: 15rpx;">
					<p>个人设置</p>
				</view>
				<u-cell-group>
					<u-cell-item icon="../../static/company-fill.png" title="我的房子"></u-cell-item>
					<u-cell-item icon="../../static/erweima.png" title="身份码" ></u-cell-item>
				</u-cell-group>
				<view style="margin-bottom: 15rpx; margin-top: 15rpx;">
					<p>系统设置</p>
				</view>
				<u-cell-group>
					<u-cell-item icon="../../static/prompt-fill.png" title="帮助中心"></u-cell-item>
					<u-cell-item icon="../../static/star-fill.png" title="去评分"></u-cell-item>
					<u-cell-item icon="../../static/sketch-square-fill.png" title="商务合作"></u-cell-item>
					<u-cell-item icon="../../static/setting-fill.png" title="检查更新" value="新版本"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				user: '',
				src: 'http://n.sinaimg.cn/sinacn21/10/w480h330/20180829/218c-hikcahf5857486.jpg',
				current: 2,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			}
		},
		computed: {
			vuex_tabbar() {
				return store.state.vuex_tabbar
			}
		},
		onLoad() {
			this.user = this.$store.state.count
		},
		methods: {

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
</style>
