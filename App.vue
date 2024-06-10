<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	/* 公共css */
	@import url("@/common/animate.min.css");
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page {
		/* background: linear-gradient(to bottom, rgba(230, 28, 90, 1) 0% , rgba(230, 28, 90, 0) 20%); */
		/* background-image: linear-gradient(  #e61e5c 5%, white 30%); */
		background-image: url(static/color-bg.png);
		background-size: 100% 30%;
		background-repeat: repeat-x;
		
		/* height:100% */
	}	
</style>
