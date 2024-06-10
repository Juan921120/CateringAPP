<template>
	<view class="issueDetail">
		<view v-if="foodlist==''"  class="none">
			没有出单记录
		</view>
		<view class="issue" v-else>
			<view class="issues">
				<text class="I1">出单日期：{{outdate}}</text>
				<text class="I1">出单类别：{{outtype}}</text>
			</view>
			<view class="issueContent">
				
				<view class="issue-item" v-for="item in foodlist">
					<view class="nooning">
						<text>{{item.food_type}}</text>
					</view>
					<view class="E4" v-for="items in item.food_name">
						<view class="food-name" >{{items}}					
						</view>
						<view class="x1">X1</view>
					</view>
						
				</view> 
				<!-- <view class="issue-item">
					<view class="nooning">
						<text>点心</text>
					</view>
					<view class="E2">
						<text>{{cake}}</text>
						<text>X1</text>
					</view>
				</view>
				<!-- <view class="issue-item">
					<view class="nooning">
						<text>饮品</text>
					</view>
					<view class="E3">
						<text>{{tea}}</text>
						<text>X1</text>
					</view>
				</view> -->
				<!-- <view class="issue-item">
					<view class="nooning">
						<text>餐具</text>
					</view>
					<view class="E4">
						<text>{{ricebox}}</text>
						<text>X1</text>
					</view>
					<view class="E4">
						<text>{{soup}}</text>
						<text>X1</text>
					</view>
				</view> -->
			</view>
			<view class="attention">
				<text class="attentions">请在72小时内食用完毕，</text>
				<text>若未能食用，请自然冷却后放入冰箱</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				outtype:'',
				foodlist:[],
				outdate:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.showlist();	
		},
		methods: {
			showlist(){
				let url = 'http://xy.vs-time.com/api/customer/dining_out_info/129064';
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
						
						let foodlist = res.data.data.food_list;
						let outtype = res.data.data.out_type;
						let outdate = res.data.data.out_date;
						
						that.outdate = outdate;
						that.foodlist = foodlist;
						that.outtype = outtype
						console.log(outdate);
						console.log(outdate);	
						}else{
						 let msg = res.data.msg 
						 uni.showToast({
						        title: msg,
						        icon: "none"
						       })	
							
							
						};
						
						
						
						
						
					
				    
				    },
				    fail: () => {
						 uni.showToast(msg)
				    }
				});
			}
		}
	}
</script>

<style>
	@import url("/pages/detail/detail.css");
</style>
