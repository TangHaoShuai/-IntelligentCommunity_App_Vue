<template>
	<!-- 编辑文章 -->
	<view>
		<u-navbar leftText="返回" title="编辑文章" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-input v-model="content" maxlength="2000" type="textarea" :border="true" height="500"
				style="margin: 20rpx;" />
			<u-upload :formData="fromdata" ref="uUpload" :action="action" :auto-upload="false" @ @on-change="uploaded">
			</u-upload>
			<u-button @click="submit">提交</u-button>
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
				fromdata: {},
				user: {},
				data: {},
				action: this.$url + 'imgFileUpload',
				content: '',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad() {
			this.user = this.$t_data.get("user")
		},
		methods: {
			//延时
			delay() {
				uni.switchTab({
					url: '/pages/life/life'
				});
			},
			//上传完成的回调
			uploaded(res, index, lists, name) {
				if (index + 1 == lists.length) {
					var tmp = false
					for (var i = 0; i < lists.length; i++) {
						if (lists[index].progress == 100) {
							tmp = true
						} else {
							tmp = false
						}
					}
					if (tmp) {
						this.showToast('添加成功美滋滋', 'success')
						setTimeout(this.delay, 1000)

					} else {
						this.showToast('完蛋了添加失败失败', 'error')
					}
				}
			},
			//提示语
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			submit() {
				// this.$refs.uUpload.formData.imgID = "123131321"
				// this.$refs.uUpload.upload();
				if (this.content == '' || this.user.phone == '') {
					this.showToast("内容为空", "error");
				} else {
					this.$request('article/addArticle', {
						"userid": this.user.phone,
						"content": this.content,
					}, 'POST').then(res => {
						// debugger
						// var message = JSON.parse(res) || {};
						var message = res;

						if (message.message == 200 && message.imgID != null) {
							let files = [];
							files = this.$refs.uUpload.lists;
							if (files.length > 0) {
								//给准备上传的图片设置ID
								this.$refs.uUpload.formData.imgID = message.imgID
								this.$refs.uUpload.upload(); //上传
							} else {
								this.showToast('添加成功美滋滋', 'success')
								setTimeout(this.delay, 1000)
							}


							// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
							// files = this.$refs.uUpload.lists.filter(val => {
							// 	return val.progress == 100;
							// })
							// 如果您不需要进行太多的处理，直接如下即可
							// files = this.$refs.uUpload.lists;
						}
						// this.showToast('添加成功', 'success')
						// uni.switchTab({
						// 	url: '/pages/life/life'
						// });
					})
				}
			},
			showToast(title, type) {
				this.$refs.uToast.show({
					title: title,
					type: type,
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
