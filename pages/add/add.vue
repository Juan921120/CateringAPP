<template>
	<view class="add">
		<view class="addBg">
			<view class="addForm">
				<view class="client">
					<label class="C1">客户名称：</label>
					<input class="C2" type="text" placeholder="请输入客户名字" v-model="name"/>
				</view>
				<view class="client">
					<label class="C1">出餐次数：</label>
					<input class="C2" type="number" placeholder="请输入出餐次数" v-model="counter"/>
				</view>
				<view class="productionDate">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">生产日期：</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input" placeholder="请选择生产日期">{{date}}</view>
								</picker>
								<image src="../../static/calendar-icon.png" class="uniImage"></image>
							</view>
						</view>
					</view>
					<!-- <view class="customers">
						<label class="C1">生产日期：</label>
						<input class="C2" type="number" placeholder="请选择生产日期" />
					</view>
					<image src="../../static/calendar-icon.png" class="C3"></image> -->
				</view>
				<view class="productionWay">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">生产方式：</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input" placeholder="请选择生产方式" @click="product">{{array[index]}}</view>
								</picker>
								<image src="../../static/select-down.png" class="C4"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="storeCenter">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">月子中心：</view>
							<view class="uni-list-cell-db">
								<picker @change="bindCenterChange" :value="store" :range="center">
									<view class="uni-input" placeholder="请选择月子中心" @click="play">{{center[store]}}</view>
								</picker>
								<image src="../../static/select-down.png" class="C4"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="client">
					<label class="C1">房间编号：</label>
					<input class="C2" type="number" placeholder="请输入房间编号" v-model="number" />
				</view>
				<view class="customerBegin">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">开始日期：</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="dateline" :start="startDate" :end="endDate" @change="bindDatelineChange">
									<view class="uni-input" placeholder="请选择开始日期">{{dateline}}</view>
								</picker>
								<image src="../../static/calendar-icon.png" class="uniImage"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="customerBegin">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">开始时间点：</view>
							<view class="uni-list-cell-db">
								<picker @change="bindDeginChange" :value="degin" :range="point">
									<view class="uni-inputs" placeholder="请选择开始时间点">{{point[degin]}}
									</view>
								</picker>
								<image src="../../static/select-down.png" class="C4"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="customerEnd">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">结束日期：</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="endline" :start="startDate" :end="endDate" @change="bindEndlineChange">
									<view class="uni-input" placeholder="请选择结束日期">{{endline}}
									</view>
								</picker>
								<image src="../../static/calendar-icon.png" class="uniImage"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="customerBegin">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">结束时间点：</view>
							<view class="uni-list-cell-db">
								<picker @change="bindEndChange" :value="endover" :range="points">
									<view class="uni-inputs" placeholder="请选择结束时间点">{{points[endover]}}
									</view>
								</picker>
								<image src="../../static/select-down.png" class="C4"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="customer">
					<view class="main">
						<view>配送周期：</view>
						<ld-select :multiple="true" :list="options" list-key="label" value-key="value" placeholder="请选择配送周期" clearable
						 v-model="value2" @change="selectChange2"></ld-select>
					</view>
					<!-- <image src="../../static/select-down.png" class="C4"></image> -->
				</view>
				<view class="customer">
					<view class="main">
						<view>供应餐时：</view>
						<ld-select :multiple="true" :list="supply" list-key="label" value-key="name" placeholder="请选择供应餐时" clearable
						 v-model="value4" @change="selectChange4"><image src="../../static/select-down.png" style="width: 24rpx; height: 14rpx;"></image></ld-select>
					</view>
				</view>
				<view class="client">
					<label class="C1">联系地址：</label>
					<input class="C2" type="text" placeholder="请输入联系地址" v-model="address"/>
				</view>
				<view class="client">
					<label class="C1">手机号码：</label>
					<input class="C2" type="number" placeholder="请输入手机号码" v-model="mobile"/>
				</view>
				<view class="client">
					<label class="C1">应急电话：</label>
					<input class="C2" type="number" placeholder="请输入应急电话" v-model="urgencyMobile" />
				</view>
				<view class="client">
					<label class="C1">微信号码：</label>
					<input class="C2" v-model="weixin" placeholder="请输入微信号码" />
				</view>
				<view class="client">
					<label class="C1" >忌口类别：</label>
					<input class="C2" v-type="text" v-model="aviod" placeholder="请选择忌口类别" />
				</view>
				<view class="remark">
					<text class="remarks">忌口备注：</text>
					<textarea class="comment"  v-model="note" placeholder="请输入忌口备注"></textarea>
				</view>
				<view class="remark">
					<text class="remarks">其他备注：</text>
					<textarea class="comment" placeholder="请输入其他备注"></textarea>
				</view>
			</view>
		<view class="save">
			<button class="saves animate animated" hover-class="animated pulse" hover-start-time="10" hover-stay-time="500"
			 @tap="submit">保存</button>
		</view></view>
		</view>
	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			ldSelect
		},
		data() {
			const currentDate = this.getDate({
				format: true,
			})
			const currentDateline = this.getDate({
				format: true,
			})
			const currentEndline = this.getDate({
				format: true,
			})

			return {
				othernote:'',
				avoid:'',
				note:'',
				number:"",
				urgencyMobile:'',
				mobile:"",
				address:"",
				weixin:'',
				counter:"",
				title: 'picker',
				array: [],
				center: [],
				index: 0,
				store: 0,
				date: currentDate,
				dateline: currentDateline,
				point: ['早餐', '午餐', '晚餐'],
				degin: 0,
				endline: currentEndline,
				points: ['早餐', '午餐', '晚餐'],
				endover: 2,
				id: "838",
				from: 1,
				token: "wno1usglfq76cv7k",
				value: '',
				name: '',
				supply: [{
					name: '选项1',
					label: '早餐'
				}, {
					name: '选项2',
					label: '午餐'
				}, {
					name: '选项3',
					label: '晚餐'
				}],
				value4: [],
				options: [{
					value: '选项1',
					label: '周一'
				}, {
					value: '选项2',
					label: '周二'
				}, {
					value: '选项3',
					label: '周三'
				}, {
					value: '选项4',
					label: '周四'
				}, {
					value: '选项5',
					label: '周五'
				}, {
					value: '选项6',
					label: '周六'
				}, {
					value: '选项7',
					label: '周日'
				}],
				value2: [],
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			this.play();
			this.product();
			
		},

		methods: {
			//提交
			submit(){
				
			// uni.request({
			// 	url: url,
			// 	data: {
			// 		id: "838",
			// 		from: 1,
			// 		token: "849o4n12dr3qps64"
			// 	},
			// 	header: {
			// 		"content-type": "application/x-www-form-urlencoded"
			// 	},
			// 	method: "POST"
				
			},
			// 配送周期
			selectChange(val) {
				this.value = val;
			},
			selectChange2(val) {
				this.value2 = val;
			},
			selectChange4(val) {
				this.value4 = val;
			},
			selectChange5(val) {
				this.value5 = val;
			},
			// 生产方式
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.index = e.target.value
			},
			// 月子中心
			bindCenterChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.store = e.target.value
			},
			// 生产日期
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			// 开始日期
			bindDatelineChange: function(e) {
				this.dateline = e.target.value
			},
			// 开始时间点
			bindDeginChange: function(e) {
				this.degin = e.target.value
			},
			// 结束日期
			bindEndlineChange: function(e) {
				this.endline = e.target.value
			},
			// 结束时间点
			bindEndChange: function(e) {
				this.endover = e.target.value
			},
			// 选择生产方式
			product() {
				let url = 'http://xy.vs-time.com/api/store/born_type_store';
				let that = this;
				uni.request({
					url: url,
					data: {
						
					},
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: (res) => {
						// 数组循环
						let json = res.data.data;
						that.center = []
						for (var i = 0; i < json.length; i++) {
							that.array.push(json[i].text);
						}
					}
				})
			},

			// 选择月子中心 调用接口方法
			play() {
				let url = 'http://xy.vs-time.com/api/store/link_hotel_store';
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
					success: (res) => {
						// 数组循环
						let json = res.data.data;
						that.center = [];
						for (var i = 0; i < json.length; i++) {
							that.center.push(json[i].text);
						}
					}
				})
			},
			// 时间选择器
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	@import url("/pages/add/add.css");
</style>
