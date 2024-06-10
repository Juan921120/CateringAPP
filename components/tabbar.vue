<template>
	<view>
		<!--顶部导航栏-->
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
						{{tabBar.name}}
						<view class="swiper-tab-line">
						</view>
					</view>
				</block>
				
			</scroll-view>
		</view>
		
		<!--内容区-->
		<view class="uni-tab-bar">
			<swiper :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(content,index) in contentList" :key="index" >
					<view class="swiper-item">{{content}}</view>
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
	
	
</template>

<script>
	
	export default {
		data() {
			return {
				tabIndex: 0,	//选中标签栏的序列
				contentList: [
								"关注",
								"推荐",
								"热点",
								"体育",
								'财经',
								'娱乐',
							 ],
				tabBars:[
					{
						name: '关注',
						id: 'guanzhu'
					},
					{
						name: '推荐',
						id: 'tuijian'
					},
					{
						name: '热点',
						id: 'redian'
					},
					{
						name: '体育',
						id: 'tiyu'
					},
					{
						name: '财经',
						id: 'caijing'
					},
					{
						name: '娱乐',
						id: 'yule'
					}
				],
				swiperHeight: 0
			
			}
		},
		components:{
			
		},
		onLoad() {
			
			
		},
		methods: {
			toggleTab(index){
				console.log(index)
				this.tabIndex = index
			},
			//滑动切换swiper
			tabChange(e){
				console.log(e.detail)
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
				
			}
		}
	}
</script>

<style>
	.swiper-tab-list{
		color: #969696;
		font-weight: bold;
	}
	.uni-tab-bar .active{
		color: #343434;
	}
	
	.active .swiper-tab-line{
		border-bottom: 6upx solid #FEDE33;
		width: 70upx;
		margin: auto;
		border-top: 6upx solid #FEDE33;
		border-radius: 20upx;
	}
	.uni-swiper-tab{
		border-bottom: 1upx solid #eeeeee;
	}
	
	

</style>
