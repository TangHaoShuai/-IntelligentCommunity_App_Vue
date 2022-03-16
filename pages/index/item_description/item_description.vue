<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="物品简介" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">

			<view>
				<view style="margin: 30rpx">
					<u-image mode="widthFix" :src="src"></u-image>
				</view>
				<u-cell-group>
					<u-cell-item icon="account-fill" :arrow="false" :title=" '物品名称:'+form.name"></u-cell-item>
					<u-cell-item icon="account-fill" :arrow="false" :title=" '描述:'+form.description ">
					</u-cell-item>
					<u-cell-item icon="integral-fill" :arrow="false" :title="'共享开始时间:'+form.begdate"></u-cell-item>
					<u-cell-item icon="integral-fill" :arrow="false" :title="'共享结束时间:'+form.enddate"></u-cell-item>
				</u-cell-group>
				<u-toast ref="uToast" />
				<view style="margin-bottom: 30rpx;">
					<u-button type="success" :disabled="disabled" v-on:click="submit()">确认租聘</u-button>
				</view>

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
				disabled: false,
				uuid: '',
				form: {
					uuid: '',
					userid: '',
					name: '自行车',
					description: '超级贵的山地变速自行车，很贵',
					begdate: '',
					enddate: '',
					state: '',
					img: ''
				},
				src: '',
				user: {},
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			this.user = this.$t_data.get("user")
			this.uuid = options.uuid
			if (options.uuid && options.uuid != '') {
				this.$request('share/getShare', {
					"uuid": this.uuid
				}, 'POST').then(res => {
					if (res) {
						this.form = res
						this.form.begdate = this.getNowDate()
						this.form.enddate = this.getDateAdd(3, this.form.begdate)
						this.form.userid = this.user.phone
						this.src = this.$url + 'image/Share/' + this.form.img
						console.debug(this.src)
					}
				})
			}
		},
		methods: {
			showToast(title, type, back) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					back: back
				})
			},
			//延时
			delay() {
				this.$u.route('pages/index/share/share');
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });
			},
			//提交表单
			submit() {
				if (this.user.phone != '') {
					let temp = this.form
					this.$request('share/upShare', temp, 'POST').then(res => {
						if (res.state == 'succeed') {
							this.showToast('租聘成功', 'success')
							this.disabled = true
							setTimeout(this.delay, 700)
						} else {
							this.showToast('租聘失败', 'error')
						}
					}).catch(
						error => {
							this.showToast('完蛋了系统错误', 'error')
						})
				} else {
					this.showToast('数据错误请重新登录', 'error')
				}
			},
			back() {
				// this.$u.route("pages/index/index")
				// if (this.temp == 'index') {
				uni.switchTab({
					url: '/pages/index/index'
				});
				// } 
			},
			//获取当前日期（年月日），如：2017-12-18
			getNowDate() {
				var dd = new Date();
				var y = dd.getFullYear();
				//获取当前月份的日期，不足10补0
				var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
				//获取当前几号，不足10补0
				var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
				return y + '-' + m + '-' + d;
			},
			//计算多少天前后的日期
			//addDayCount：前后要计算的天数
			//startDate：开始日期，为空则表示当前日期
			getDateAdd(addDayCount, startDate) {
				/******
				    半年前：getDateAdd(-180)
				    三月前：getDateAdd(-90)
				    一月前：getDateAdd(-30)
				    昨天：getDateAdd(-1)
				    今天：getDateAdd(0)
				    明天：getDateAdd(1)
				    后天：getDateAdd(2)
				    一月后：getDateAdd(30)
				    三月后：getDateAdd(90)
				    半年后：getDateAdd(180)
				******/
				var dd = startDate && startDate.length > 0 ? new Date(startDate) : new Date();
				//获取addDayCount天后的日期
				dd.setDate(dd.getDate() + addDayCount);
				var y = dd.getFullYear();
				//获取当前月份的日期，不足10补0
				var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
				//获取当前几号，不足10补0
				var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
				return y + '-' + m + '-' + d;
			},
			/**
			 * 计算2个日期相差的天数，可包含今天，如：2017-12-18到2017-12-20，相差2天（isIncludeToday=true时为3天）
			 *  startDateString：开始日期
			 *  endDateString：结束日期
			 *  isIncludeToday:是否包含今天
			 */
			dateDiff(startDateString, endDateString, isIncludeToday) {
				var separator = "-"; //日期分隔符
				var startDates = startDateString.split(separator);
				var endDates = endDateString.split(separator);
				var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
				var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
				//return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) + (isIncludeToday ? 1 : 0);//把相差的毫秒数转换为天数
				return parseInt((endDate - startDate) / 1000 / 60 / 60 / 24) + (isIncludeToday ? 1 : 0); //把相差的毫秒数转换为天数
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
