<template>
	<view>
		<u-navbar :is-back="false" :background="background" title="生活圈" :height="48">
			<view class="slot-wrap" slot="right">
				<u-icon name="../../static/fabiao.png" color="#2979ff" size="46" v-on:click="btn_Edit()"
					style="margin-right: 15rpx;"></u-icon>
				<u-badge type="error" :count="tag" size="mini" v-on:click="btn_OnChat()"></u-badge>
				<u-icon name="../../static/xiaoxi.png" color="#2979ff" size="45" v-on:click="btn_OnChat()"></u-icon>
			</view>
		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- beg 搜索框 -->
			<view style="margin: 20rpx;">
				<u-search placeholder="输入内容" v-model="keyword" @search="getArticleLk" @custom="getArticleLk"></u-search>
			</view>
			<!-- end 搜索框 -->
			<!-- Subsection 分段器 -->
			<view style="margin: 0rpx 15rpx;">
				<u-subsection :list="list" :subsection_current="1" @change="change"></u-subsection>
			</view>
			<!-- end Subsection 分段器-->
			<!-- 贴子内容 beg -->
			<u-card v-for="(item, index) in articles" :title="item.user.username" :thumb="url+item.user.image"
				:thumb-width="60" :thumb-circle="true" padding="8" v-on:click="btnOnArticle(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">{{item.content}}</view>
						<image v-if=" item.imgLists.length > 0 " :src="imgurl+item.imgLists[0].imgUrl"
							mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-row>
						<u-col span="4">
							<u-icon name="../../static/liulan.png" size="34" color="" :label="item.readCount"></u-icon>
						</u-col>
						<u-col span="4">
							<u-icon name="../../static/pinglun.png" size="34" color="" :label="item.commentCount">
							</u-icon>
						</u-col>
						<u-col span="4">
							<u-icon name="../../static/dianzan.png" size="34" color="" :label="item.praiseCount">
							</u-icon>
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
				imgurl: this.$url + 'image/article_img/', //文章图片
				url: this.$url + 'image/', //头像
				articles: null,
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
				title: ' ',
				thumb: '../../static/tx.jpg',
				current: 1,
				keyword: '',
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
			this.getArticle();
			uni.$on("new_massage", (rel) => {
				this.getUser();
			})

		},
		onShow() {
			this.getUser()
			this.getArticle()
		},
		methods: {
			btn_Edit() {
				this.$u.route('pages/life/edit/edit', {});
			},
			btnOnArticle(item) {
				var uuid = item.uuid
				this.$u.route('pages/life/article/article', {
					"uuid": uuid
				});
			},
			change(index) {
				this.subsection_current = index;
				let temp = {
					"current": 1,
					"size": 999,
					"userid": "",
					"content": "",
					"tag":index
				}
				this.$request('article/getList', temp, 'POST').then(res => {
					if (res != null) {
						this.articles = res.list
					}
				}).catch(error => {
					this.$u.toast('系统错误');
				})
			},
			btn_OnChat() {
				this.$u.route('pages/chat/chat', {});
			},
			getUser() {
				this.user_list = this.$t_data.get("user_list")
				var km = 0;
				//统计未读消息
				for (var i = 0; i < this.user_list.length; i++) {
					var m = parseInt(this.user_list[i].tag)
					if (!isNaN(m)) {
						km += m;
					}
				}
				this.tag = km
			},
			//获取帖子集合
			getArticle() {
				let temp = {
					"current": 1,
					"size": 999,
					"userid": "",
					"content": ""
				}
				this.$request('article/getList', temp, 'POST').then(res => {
					if (res != null) {
						this.articles = res.list
					}
				}).catch(error => {
					this.$u.toast('系统错误');
				})
			},
			getArticleLk() {
				console.log(1111)
				let temp = {
					"current": 1,
					"size": 999,
					"userid": "",
					"content": this.keyword
				}
				this.$request('article/getList', temp, 'POST').then(res => {
					if (res != null) {
						this.articles = res.list
					}
				}).catch(error => {
					this.$u.toast('系统错误');
				})
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
