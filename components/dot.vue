<template>
	<view class="dot-main">
		<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in list" :key="index"></view>
	</view>
</template>
<script>
	export default {
			props: [ 'list','current'],
			data() {
				return {
					
				};
			}
		}
</script>

<style>
	.dot-main {
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.dot-item {
			width: 14rpx;
			height: 14rpx;
			border: 1rpx solid #FF0000;
			margin: 0 6rpx;
			box-sizing: border-box;
		}
		.active {
			border-width: 5rpx;
		}
</style>
