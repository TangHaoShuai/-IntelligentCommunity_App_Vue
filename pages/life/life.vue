<template>
	<view>
		<u-navbar :is-back="false" :background="background" title="生活圈" :height="48">
			<view class="slot-wrap" slot="right">
				<u-icon name="../../static/fabiao.png" color="#2979ff" size="46" style="margin-right: 15rpx;"></u-icon>
				<u-badge type="error" :count="tag" size="mini" v-on:click="btn_OnChat()"></u-badge>
				<u-icon name="../../static/xiaoxi.png" color="#2979ff" size="45" v-on:click="btn_OnChat()"></u-icon>

			</view>
		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- beg 搜索框 -->
			<view style="margin: 20rpx;">
				<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
			</view>
			<!-- end 搜索框 -->
			<!-- Subsection 分段器 -->
			<view style="margin: 0rpx 15rpx;">
				<u-subsection :list="list" :subsection_current="1"></u-subsection>
			</view>
			<!-- end Subsection 分段器-->
			<!-- 贴子内容 beg -->
			<u-card v-for="(item, index) in items" :title="title" :thumb="thumb" :thumb-width="60" :thumb-circle="true"
				padding="8">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
						<image
							src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
							mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-row>
						<u-col span="4">
							<u-icon name="../../static/liulan.png" size="34" color="" label="341"></u-icon>
						</u-col>
						<u-col span="4">
							<u-icon name="../../static/pinglun.png" size="34" color="" label="30"></u-icon>
						</u-col>
						<u-col span="4">
							<u-icon name="../../static/dianzan.png" size="34" color="" label="30"></u-icon>
						</u-col>
					</u-row>
				</view>
			</u-card>
			<!-- end帖子内容 -->
			<u-divider>没有更多啦</u-divider>
		</view>
		<!-- beg 所有内容的容器 -->

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				user_list: [],
				tag: 0,
				list: [{
						name: '全部'
					},
					{
						name: '最新'
					},
					{
						name: '热门'
					}
				],
				subsection_current: 1,
				items: [{
						message: 'Foo'
					},
					{
						message: 'Bar'
					}
				],
				title: '隔壁村李寡妇Ae',
				thumb: 'https://pic3.zhimg.com/80/v2-a1df4353e2664fbe021065607cf084ba_720w.jpg?source=1940ef5c',
				current: 1,
				keyword: '修水龙头事件',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {
			vuex_tabbar() {
				return store.state.vuex_tabbar
			}
		},
		onLoad() {
			this.getUser();
			uni.$on("new_massage", (rel) => {
				this.getUser();
			})

		},
		methods: {
			change(index) {
				this.tab_current = index;
			},
			btn_OnChat() {
				this.$u.route('pages/chat/chat', {});
			},
			getUser() {
				this.user_list = this.$t_data.get("user_list")
				var km = 0;
				for (var i = 0; i < this.user_list.length; i++) {
					var m = parseInt(this.user_list[i].tag)
					if (! isNaN(m)) {
						km += m;
					}
				}
				this.tag = km

			}
		}
	}
</script>
<style lang="scss" scoped>
	//beg  帖子内容
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
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

	//end
</style>
