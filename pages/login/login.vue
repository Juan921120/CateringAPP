<template>
	<view class="login" v-cloak>
		<view class="loginFrom">
			<view class="loginHead">
				<image src="../../static/logo.png"></image>
			</view>
			<view class="useNumber">
				<image src="../../static/uersicon@2x.png"></image>
				<input v-model="mobile" pattern="/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/"
				 placeholder="请输入手机号" type="number" maxlength="11" style="
				font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: rgba(194, 190, 190, 1);line-height: 36rpx;" />
			</view>
			<view class="usePwd">
				<image src="../../static/lock@2x.png"></image>
				<input v-model="pwd" pattern="/^\d{6,}$/" placeholder="请输入密码" password="true" style="
				font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: rgba(194, 190, 190, 1);line-height: 36rpx;" />
			</view>
			<view class="refer">
				<button class="submit animate__animated" hover-class="animated pulse" hover-start-time="10" hover-stay-time="500"
				 @tap="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import $C from '../../common/jquery-1.8.3.min.js'
	export default {
		data() {
			return {
				mobile: "",
				pwd: ""
			}
		},
		onLoad() {
			this.mobile = uni.getStorageSync('mobile'); //保存到手机内存
		},
		methods: {
			login() {
				if (this.mobile.length <= 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					});
					return;
				}
				if (this.pwd.length <= 0) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
					});
					return;
				}
				if (this.loading == true) {
					return;
				}
				//赋值
				let mobile = this.mobile.trim();
				let pwd = this.pwd.trim();
				let data = "";
				let that = this;
				let url = 'http://xy.vs-time.com/api/index/login';
				this.loading = true;
				uni.request({
					url: url,
					data: {
						mobile: this.mobile,
						pwd: this.pwd
					},
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: (res) => {
						console.log(res);
						let json = res.data;
						//登录成功时判断
						if (json.code == 0) {
							uni.setStorageSync('id', json.data.id);
							uni.setStorageSync('token', json.data.token);
							uni.setStorageSync('from', json.data.from);
							if (json.data.from == 1) {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
								uni.navigateTo({
									url: "../index/index"
								})
							}
							if (json.data.from == 2) {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
								uni.navigateTo({
									url: "../store/store"
								})
							}
							if (json.data.from == 3) {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
								uni.navigateTo({
									url: "../sales/sales"
								})
							}
						} else { //登录失败时
							uni.showToast({
								title: json.msg,
								icon: 'none'
							})
						}
						this.loading = false;
					},
					fail: (res) => {
						uni.showToast({
							title: '登录失败，请稍后再试！',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("/pages/login/login.css");
</style>
