<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">智慧社区</view>
			<u-form-item>
				<u-input v-model="userName" placeholder="请输入用户名" />
			</u-form-item>
			<u-form-item>
				<u-input type="password" v-model="password" placeholder="请输入密码" />
			</u-form-item>
			<u-gap height="80"></u-gap>
			<button @click="submit" class="getSmsCode">登录</button>
			<view class="alternative">
				<view class="password" @click="passwordLogin()">忘记密码</view>
				<view class="issue" @click="loginBy()">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalTimer: null, //定义定时器
				userName: '18077229249',
				password: '123123',
			}
		},
		computed: {

		},
		onLoad() {
			
		},
		methods: {
			submit() {
				this.$request('user/getUser', {
					"phone": this.userName,
					"password": this.password
				}, 'POST').then(res => {
					if (res.username != null) {
						this.$store.state.count = res
						this.$t_data.set("user",res)
						// this.$u.toast('登录成功');
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						this.$u.toast('账户密码错误');
					}
				}).catch(error => {
					this.$u.toast('系统错误');
				})
			},
			loginBy() {
				// this.$u.toast('开发中，敬请期待');
				this.$u.route('pages/register/register');
			},
			passwordLogin() {
				this.$u.toast('开发中，敬请期待');
			},

		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 0 auto;
			padding-top: 80rpx;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				font-size: 20rpx;
				margin-bottom: 60rpx;
				margin-top: 30rpx;
			}

			.getSmsCode {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.bottom {
			.loginType {
				display: flex;
				padding: 260rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
