<template>
	<view>
		<u-navbar leftText="返回" title="消息" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="center">
			<u-row style="margin: 10rpx;">
				<u-line style="margin: 5rpx;"></u-line>
				<u-col span="2">
					<u-avatar :src="src">
					</u-avatar>
				</u-col>
				<u-col span="9">
					<text style="font-weight:bold;">系统消息</text>
				</u-col>
				<u-col span="1" v-if="false">
					<text style="color:#FA3534;">9</text>
				</u-col>
				<u-line style="margin: 5rpx;"></u-line>
			</u-row>

			<u-row style="margin: 10rpx;" v-for="(item,index) in user_list" v-on:click="btn_OnCar(item)">
				<u-line style="margin: 5rpx;"></u-line>
				<u-col span="2">
					<u-avatar :src="url+item.image">
					</u-avatar>
				</u-col>
				<u-col span="9">
					<text>{{item.username}}</text>
				</u-col>
				<u-col span="1">
					<p style="color:#FA3534;">{{item.tag}}</p>
				</u-col>
				<u-line style="margin: 5rpx;"></u-line>
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
				url: this.$url+'image/',
				tag: this.$t_data.get("tag"),
				user_list: [],
				src: 'http://n.sinaimg.cn/sinacn21/10/w480h330/20180829/218c-hikcahf5857486.jpg',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},

		watch: {

		},
		computed: {

		},
		onLoad() {
			this.getUserList(),
				//全局事件订阅，只要订阅了事件就可以收到值
				uni.$on("new_massage", (rel) => {
					// this.tag = this.$t_data.get("tag")
					this.getUserList()
				})


		},
		methods: {
			getUserList() {
				this.user_list = this.$t_data.get("user_list")
				// for (var i=0;i<this.user_list.length;i++)
				// { 
				//     this.user_list[i].tag = i
				// }
			},
			btn_OnCar(item) {
				this.$u.route('pages/chat/list/list', item);
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
