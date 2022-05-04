<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="">
			<u-navbar :background="background" title="手机注册" :borderBottom="false"></u-navbar>
		</view>
		<!-- 分割线 -->
		<!-- <view class="line"></view> -->
		<!-- 页面注册板块 -->
		<u-form :model="form" ref="uForm" class="form">
			<u-form-item label="昵称" prop="name" labelWidth="160" leftIcon="phone">
				<u-input v-model="form.name" class="form-item" placeholder="请输入你的名字" />
			</u-form-item>
			<u-form-item label="手机号码" prop="phone" labelWidth="160" leftIcon="man-add">
				<u-input v-model="form.phone" class="form-item" placeholder="请输入你的手机号码" />
			</u-form-item>
			<u-form-item label="登录密码" prop="password" labelWidth="160" leftIcon="level">
				<u-input v-model="form.password" class="form-item" placeholder="请输入密码" />
			</u-form-item>
			<u-form-item label="确认密码" prop="newpassword" labelWidth="160" leftIcon="photo">
				<u-input v-model="form.newpassword" class="form-item" placeholder="请再次确认密码" />
			</u-form-item>
			<u-form-item label="性别">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
						:disabled="item.disabled" active-color="#25afa2">
						{{item.name}}
					</u-radio>
				</u-radio-group>

			</u-form-item>
		</u-form>
		<u-button @click="submit" class="">提交</u-button>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
				form: {
					phone: '',
					name: '',
					password: '',
					newpassword: ''
				},
				list: [{
						name: '男',
						disabled: false //不禁用所有单选框
					},
					{
						name: '女',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '男', //默认展示
				rules: {
					// 字段名称
					password: [{
						min: 5,
						message: '密码要5个数字',
						trigger: 'change'
					}],
					newpassword: [{
							required: true,
							message: "确认密码不能为空",
							trigger: "blur"
						},
						{
							trigger: 'blur',
							validator: (rule, value, callback) => {
								if (value !== this.form.password) {
									callback(new Error('两次输入密码不一致'))
								} else {
									callback()
								}
							}
						}
					],
					name: [
						// 对name字段进行长度验证
						{
							min: 2,
							message: '简介不能少于2个字',
							trigger: 'change'
						},
						// 对name字段进行必填验证
						{
							required: true,
							message: '请填写姓名',
							trigger: ['change', 'blur']
						},
					],
					phone: [{
							required: true,
							message: '请输入电话号码',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				}
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$request('user/addUser', {
							"username": this.form.name,
							"phone": this.form.phone,
							"password": this.form.password,
							"sex": this.value,
						}, 'POST').then(res => {
							// 打印调用成功回调
							console.log(res)
							if (res) {
								// uni.navigateBack(2)
								// this.$u.toast('注册成功');
								this.$refs.uToast.show({
									title: '注册成功',
									type: 'success',
									duration: 1000,
									isTab: false,
									url: '/pages/login/login'
								})
							} else {
								this.$refs.uToast.show({
									title: '账户已经存在',
									type: 'error'
								})
							}
						}).catch(error => {
							this.$refs.uToast.show({
								title: '系统错误',
								type: 'error'
							})
						})
						// console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		width: 100%;
		height: 20rpx;
		background-color: #DDDDDD;
	}

	.form {
		width: 95%;
		margin: auto;

		.form-item {
			margin-left: 50rpx;
		}
	}
</style>
