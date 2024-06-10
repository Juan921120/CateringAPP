<template>
	<view class="record">
		<view class="recordBg" v-cloak>
			<view class="recordContent">
				<view class="record-item">
					<view class="recordDetail">
						<text class="R1">{{customer_name}}</text>
						<view class="recordNumber">
							<image src="../../static/NO.icon.png"></image>
							<text class="N1">{{room}}</text>
						</view>
						<view class="recordAdress">
							<image src="../../static/ship-icon.png"></image>
							<text class="N2">{{hotel_name}}</text>
						</view>
					</view>
					<view class="mother">
						<image src="../../static/user-image.png"></image>
					</view>
				</view>
			</view>
			<view class="single">
				<text class="singleTitle">出单记录</text>
				<text class="total">总计:{{count}}次</text>
			</view>
			<block v-for="(item,index) in out_list" :key="item.index">
				<view class="singleDetail">
					<view class="left">
						<view class="singleDate">
							<image src="../../static/record.png"></image>
							<view class="dates">
								<text class="D1">日期：</text>
								<text class="S1">{{item.out_date}}</text>
							</view>
						</view>
						<view class="line"></view>
						<view class="singleCategory">
							<image src="../../static/icon.png"></image>
							<view class="category">
								<text class="D1">类别：</text>
								<text class="S1">{{item.out_type}}</text>
							</view>
						</view>
					</view>
					<view class="right" @tap="openInfo" :data-id="item.out_id">
						<text class="detail">详情</text>
						<image src="../../static/turnto.png"></image>
					</view>
				</view>
			</block>
			<!-- <view class="singleDetail">
				<view class="left">
					<view class="singleDate">
						<image src="../../static/record.png"></image>
						<view class="dates">
							<text class="D1">日期：</text>
							<text class="S1">2020年06月03日</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="singleCategory">
						<image src="../../static/icon.png"></image>
						<view class="category">
							<text class="D1">类别：：</text>
							<text class="S1">午出单</text>
						</view>
					</view>
				</view>
				<view class="right" @tap="openinfo">
					<text class="detail">详情</text>
					<image src="../../static/turnto.png"></image>
				</view>
			</view>
			<view class="singleDetail">
				<view class="left">
					<view class="singleDate">
						<image src="../../static/record.png"></image>
						<view class="dates">
							<text class="D1">日期：</text>
							<text class="S1">2020年06月03日</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="singleCategory">
						<image src="../../static/icon.png"></image>
						<view class="category">
							<text class="D1">类别：：</text>
							<text class="S1">午出单</text>
						</view>
					</view>
				</view>
				<view class="right" @tap="openinfo">
					<text class="detail">详情</text>
					<image src="../../static/turnto.png"></image>
				</view>
			</view>
			<view class="singleDetail">
				<view class="left">
					<view class="singleDate">
						<image src="../../static/record.png"></image>
						<view class="dates">
							<text class="D1">日期：</text>
							<text class="S1">2020年06月03日</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="singleCategory">
						<image src="../../static/icon.png"></image>
						<view class="category">
							<text class="D1">类别：：</text>
							<text class="S1">午出单</text>
						</view>
					</view>
				</view>
				<view class="right" @tap="openinfo">
					<text class="detail">详情</text>
					<image src="../../static/turnto.png"></image>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				room: "双阳路",
				customer_name: "沈小姐",
				hotel_name: "住家（包贴）",
				count: 0,
				out_list: [],
				page: 1,
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				let url = 'http://xy.vs-time.com/api/customer/dining_out_list';
				let that = this;
				uni.request({
					url: url,
					data: {
						page: this.page,
						id: "838",
						from: 1,
						token: "849o4n12dr3qps64"
					},
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: res => {
						if(res.data.code == 0
						){
							let out = res.data.data.out_list;
						that.count = res.data.data.count;
						//console.log(out);
						that.out_list = out;}
							else{
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
						
					},
				});
			},
			openInfo(e){
				let id = e.currentTarget.dataset.id;

				uni.navigateTo({
					url: "../detail/detail?id=" + id
				})
			}
		}
	}
</script>

<style>
	@import url("/pages/record/record.css");
</style>
