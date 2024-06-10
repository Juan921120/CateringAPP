<template>
	<view class="container">
		<view class="containerContent">
			<view class="container-item">
				<view class="lili">
					<view class="lili1">
						<navigator url="../avoid/avoid">
							<button class="notice">
								<image src="../../static/taboo-icon@2x.png"></image>
								<text class="notices">忌口注意</text>
							</button>
						</navigator>
					</view>
					<view class="lili2">
						<navigator url="../record/record">
							<button class="recorder">
								<image src="../../static/history-icon@2x.png"></image>
								<text class="records">出单记录</text>
							</button>
						</navigator>
					</view>
					<view class="lili3">
						<navigator url="../today/today">
							<button class="today">
								<image src="../../static/todayList-icon@2x.png"></image>
								<text class="nowToday">今日出单</text>
							</button>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="package">
			<view class="packageContent">
				<view class="message">
					<text>套餐信息</text>
				</view>
				<view class="packageName">
					<text>套餐名称</text>
					<text class="T1">{{combo}}</text>
				</view>
				<view class="packageDate">
					<text>订购日期</text>
					<text class="T1">{{date}}</text>
				</view>
				<view class="packageMoney">
					<text>订单费用</text>
					<text class="T1">￥{{money}}</text>
				</view>
				<view class="packageNumber">
					<text>订单编号</text>
					<text class="T1">{{code}}</text>
				</view>
				<view class="packageAdress">
					<text>送餐地址</text>
					<text class="T1">{{address}}</text>
				</view>
				<view class="orderMessage">
					<text>订购人信息</text>
				</view>
				<view class="orderName">
					<text>订购人</text>
					<text class="T1">{{name}}</text>
				</view>
				<view class="orderPhone">
					<text>手机</text>
					<text class="T1">{{phone}}</text>
				</view>
				<view class="orderAdress">
					<text>地址</text>
					<text class="T1">{{addresses}}</text>
				</view>
				<view class="orderHospital">
					<text>生产医院</text>
					<text class="T1">{{hospital}}</text>
				</view>
				<view class="orderDate">
					<text>预产期</text>
					<text class="T1">{{product}}</text>
				</view>
				<view class="orderWay">
					<text>生产方式</text>
					<text class="T1">{{way}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				combo:'轻松恢复30日餐',
				date:'2020年3月4日',
				money:'15000',
				code:'2081403',
				address:'浦东新区XX路1899弄88号401',
				name:'刘媛媛',
				phone:'15221556948',
				addresses:'虹口区XX小区182号302号',
				hospital:'仁济医院',
				product:'5月中',
				way:'剖腹产'
			}
		},
		onLoad() {
			const id = uni.getStorageSync('id');
			const from = uni.getStorageSync('from');
			const token = uni.getStorageSync('token')
			// uni.showToast({
			// 	title: id,
			// 	icon: 'none'
			// })
			let url = 'http://xy.vs-time.com/api/customer/index';
			uni.request({
				url:url,
				data:{
					id:this.id,
					from:this.from,
					token:this.token
				},
				header: {
					"content-type": "application/x-www-form-urlencoded"
				},
				method: "POST",
				success: (res) =>{
					
				}
			})
		},
		methods: {
		}
	}
</script>

<style>
	@import url("/pages/index/index.css");
</style>
