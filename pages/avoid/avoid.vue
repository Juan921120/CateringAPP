<template>
	<view>
		<hr>
	<view class="choose">
		
		<view class="optionContent">
			<view class="options">
				<text>请选择您忌口的选项:</text>
			</view>
			<view class="avoid">
				<view class="avoids">
					<view class="avoid-item" :class="{'cur': rSelect.indexOf(index)!=-1}" v-for="(value,index) in infoArr" :key="index"
					 @tap="tapInfo(index)">{{value.name}}</view>
				</view>
			</view>
		</view>
		<view class="save">
			<button class="saves animate animated" hover-class="animated pulse" hover-start-time="10" hover-stay-time="500"
			 @tap="saveAvoid">保存</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rSelect: [],
				infoArr: [{
						name: '甜食'
					},
					{
						name: '内脏'
					},
					{
						name: '发疹'
					},
					{
						name: '发奶'
					},
					{
						name: '胀气'
					},
					{
						name: '妊糖'
					},
					{
						name: '高碘'
					},
					{
						name: '难消化'
					},
					{
						name: '活血'
					},
					{
						name: '高盐'
					},
					{
						name: '酱油'
					},
					{
						name: '烟熏'
					},
					{
						name: '奶制品'
					},
					{
						name: '发酵'
					},
					{
						name: '鱼肉'
					},
				]
			}
		},
		methods: {
			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
					console.log(e) //打印下标
					this.rSelect.push(e); //选中添加到数组里
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			saveAvoid(){
				uni.navigateTo({
						url:"../index/index"
				})
			}
		}
	}
</script>

<style>
	@import url("/pages/avoid/avoid.css");
</style>
