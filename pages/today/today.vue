<template>
	<view>
		<view v-if="todaymenu==''"  class="none">没有数据</view>
		<view v-else>
			<view class="end-title ">
				<view v-for="(item,index) in todaymenu" :class="{active:index == num}" @click="tab(index)">{{item.out_type}}</view>
			</view>
			<view class="tabCon ">
				<!-- 菜的类型 -->
				<view v-for='(itemCon,index) in todaymenu' v-show=" index == num" class="content">

					<view v-for="item in itemCon.out_food">
						<view class="wu">{{item.food_type}}</view>

						<view class="L1" v-for="y in item.food_name">
							<text>{{y}}</text>
							<text>X1</text>
						</view>
					</view>
				</view>
			</view>
			<view>
			</view>
			
			<view class="attention">
				<text >请在72小时内食用完毕，</text><br>
				<text>若未能食用，请自然冷却后放入冰箱</text>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: true,
				num: 0,
				todaymenu: ''
			}
		},
		methods: {
			tab(index) {
				this.num = index;
				this.isActive = !isActive;
			},
			gettoday() {
				let url = 'http://xy.vs-time.com/api/customer/today_dining_out';
				let that = this;
				uni.request({
					url: url,
					data: {

						id: "838",
						from: 1,
						token: "849o4n12dr3qps64"
					},
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: res => {
						if (res.data.code == 0) {
							let todaymenu = res.data.data;
							that.todaymenu = todaymenu;
						} else {
							let msg = res.data.msg
							// console.log(msg)
							uni.showToast({
								title: msg,
								icon: "none"
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: "网络错误",
							icon: "none",

						})
					}
				});
				console.log(todaymenu)
			}
		},
		onLoad() {
			this.gettoday();
			this.id = option.id;

		}

	}
</script>

<style>
	@import url("/pages/today/today.css");
</style>
