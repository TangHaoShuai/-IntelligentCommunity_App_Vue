const _DATAGS = {
	//获取缓存 sync true 异步 false 同步
	get(key, sync = true) {
		try {
			if (sync) {
				return uni.getStorageSync(key);
			} else {
				let data = '';
				uni.getStorage({
					key: key,
					success: function(res) {
						data = res.data;
					}
				});
				return data;
			}
		} catch (e) {
			return false;
		}
	},

	//赋值 sync true 异步 false 同步
	set(key, value, sync = true) {
		try {
			if (sync) {
				var tmp = uni.setStorageSync(key, value);
				if (key = 'tag') {
					uni.$emit("globleEvent","有新的聊天消息")
				}
				return tmp
			} else {
				uni.setStorage({
					key: key,
					data: value
				});
			}
		} catch (e) {
			return false
		}
	},

	//移除
	del(key, sync = true) {
		try {
			if (sync) {
				return uni.removeStorageSync(key);
			} else {
				uni.removeStorage({
					key: key
				});
			}
		} catch (e) {
			return false;
		}
	},

	//清空
	clear(sync = true) {
		try {
			if (sync) {
				return uni.clearStorageSync();
			} else {
				uni.clearStorage();
			}
		} catch (e) {
			return false;
		}
	}
}
export default _DATAGS
