<template>
	<view>
		<u-navbar leftText="返回" title="文章内容" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-row style="margin: 10rpx;">
					<u-col span="1.4">
						<u-avatar v-if="data.user.image" :size=" 70" :src="url+data.user.image"></u-avatar>
					</u-col>
					<u-col v-if="data.user" span="10" style="text-align: left; margin: 0;padding: 0;">
						{{data.user.username}}
					</u-col>
				</u-row>
			</view>

			<view class="u-content">
				<u-parse :html="content"></u-parse>
				<!-- <u-image width="100%" height="500rpx"  v-for="(item,index) in this.data.imgLists" :src="imgurl+item.imgUrl"></u-image> -->
				<view style="margin: 10rpx;">
					<u-row>
						<u-col span="5">
							<view> {{data.date}} </view>
						</u-col>
						<u-col span="3">
							<view v-if="user.phone == data.user.phone " style="margin-left: 10rpx; color: #FA3534;"
								@click="show = true">删除</view>
						</u-col>
						<u-col span="3.5">
							<u-row justify="flex-end">
								<u-icon @click="show_2 = true" name="../../../static/diandian.png" size="34" color=""
									label="" />
							</u-row>
						</u-col>
					</u-row>
				</view>
				<u-action-sheet @click="click" :list="list" v-model="show"></u-action-sheet>
				<u-action-sheet @click="click_2" :list="list_2" v-model="show_2"></u-action-sheet>
			</view>
			<view class="">
				<u-row style="background-color: #f6f8fa;">
					<u-col span="1" style="margin: 0rpx;margin-left: 10rpx;">
						<u-icon v-if="this.data.praiseList.length > 0" name="../../../static/dianzan.png" size="34"
							color="" label="" />
					</u-col>
					<u-col span="10" style="margin-bottom:7rpx;">
						<text style="margin-right: 7rpx;"
							v-for="(item,index) in data.praiseList">{{item.user.username}}</text>
					</u-col>
				</u-row>
			</view>
			<u-row v-for="(item,index) in data.commentList" style="margin: 10rpx;background-color: #f6f8fa;">
				<u-line style="margin: 5rpx;"></u-line>
				<u-col span="10">
					<text> {{item.user.username}}:{{item.message}}</text>
				</u-col>
				<u-line style="margin: 5rpx;"></u-line>
			</u-row>

			<u-toast ref="uToast" />
		</view>
		<!-- beg 所有内容的容器 -->
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				isPraise: true,
				articleid: '',
				user: {
					phone: ''
				},
				list: [{
					text: '删除'
				}],
				list_2: null,
				show: false,
				show_2: false,
				imgurl: this.$url + 'image/article_img/', //文章图片
				url: this.$url + 'image/', //头像
				data: {
					user: {
						phone: ''
					},
					praiseList: [],
					commentList: []
				},
				src: "../../static/tx.jpg",
				content: ``,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		watch: {
			isPraise: {
				handler(newName, oldName) {
					if (newName) {
						this.list_2 = [{
							text: '取消点赞'
						}, {
							text: '评论'
						}]
					} else {
						this.list_2 = [{
							text: '点赞'
						}, {
							text: '评论'
						}]
					}
				},
				immediate: true
			}
		},
		onLoad(options) {
			undefined
			var uuid = options.uuid // 文章uuid
			this.articleid = uuid;
			this.user = this.$t_data.get("user") // 获取登录者信息
			this.getOneArticle()
			this.getPathParam()
		},
		methods: {
			getOneArticle() {
				this.$request('article/getOneArticle', {
					"id": this.articleid
				}, 'POST').then(res => {
					if (res != null) {
						this.data = res
						var value = "<p  style=\"text-indent:2em;\"> " + res.content + "</p>";
						if (res.imgLists.length > 0) {
							for (var i = 0; i < res.imgLists.length; i++) {
								var img = " <img style=\"width:100%;height:100%;\" src=\"" + this.imgurl + res
									.imgLists[i].imgUrl + "\"></img>"
								value += img
							}
						}
						this.content = value
					}
				}).catch(error => {
					this.$u.toast('系统错误');
				})
			},
			//查找数据库是否点赞
			getPathParam() {
				this.$request('praise/getPathParam', {
					"articleid": this.articleid,
					"userid": this.user.phone
				}, 'POST').then(res => {
					if (res == null || res == '') {
						this.isPraise = false
					} else {
						this.isPraise = true
					}
				}).catch(error => {
					this.showToast('系统错误', 'error')
				})
			},
			//延时
			delay() {
				uni.switchTab({
					url: '/pages/life/life'
				});
			},
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			//点赞评论
			click_2(index) {
				if (index == 0) {
					if (!this.isPraise) {
						if (this.articleid != '' && this.articleid) {
							//点赞
							this.$request('praise/addPraise', {
								"articleid": this.articleid,
								"userid": this.user.phone
							}, 'POST').then(res => {
								if (res == '200') {
									this.showToast('点赞', 'success')
									this.getPathParam()
									this.getOneArticle()
								} else {
									this.showToast('点赞失败', 'error')
								}
							}).catch(error => {
								this.$u.toast('系统错误');
							})
						}
					} else {
						if (this.articleid != '' && this.articleid) {
							//取消点赞
							this.$request('praise/deletePraise', {
								"articleid": this.articleid,
								"userid": this.user.phone
							}, 'POST').then(res => {
								if (res == '200') {
									this.showToast('取消点赞', 'success')
									this.getPathParam()
									this.getOneArticle()
								} else {
									this.showToast('取消点赞失败', 'error')
								}
							}).catch(error => {
								this.$u.toast('系统错误');
							})
						}
					}
				}
				if (index == 1) {
					this.$u.route('pages/life/comment/comment', {
						"articleid": this.articleid
					});
				}
			},
			click(index) {
				if (index == 0 && this.data.imgid) {
					this.$request('article/deleteArticle', {
						"id": this.data.imgid,
						"articleid": this.articleid
					}, 'POST').then(res => {
						if (res == '200') {
							this.showToast('删除成功', 'success')
							setTimeout(this.delay, 1000)
						} else {
							this.showToast('删除失败', 'error')
						}
					}).catch(error => {
						this.showToast('系统错误', 'error')
					})
				}
				console.log(`点击了第${index + 1}项，内容为：${this.data.imgid}`)
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
