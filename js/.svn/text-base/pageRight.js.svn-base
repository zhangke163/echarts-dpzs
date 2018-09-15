$(document).ready(function() {

	var update_time = $('.update-time');
	var myDate = new Date();
	for (var i = 0; i < update_time.length; i++) {
	  update_time.eq(i).html('数据更新至' + myDate.getFullYear() + '年' + parseInt(myDate.getMonth() + 1) + '月' + myDate.getDate() + '日');
	}

	var myChart_flow = echarts.init(document.getElementById('flow_chart'));
	option_flow = {
	    backgroundColor: 'transparent',
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            lineStyle: {
	                color: '#4bf2e2'
	            }
	        }
	    },
	    grid: {
	        left: '3%',
	        right: 45,
	        bottom: '5%',
	        top: '15%',
	        containLabel: true
	    },
	    xAxis: [{
	        type: 'category',
	        name: '(时间/h)',
	        nameRotate: '270',
	        nameTextStyle: {
						color: '#0079ff',
						fontSize: 14
					},
	        boundaryGap: false,
	        axisLine: {
	            show: false,
	        },
	        axisLabel: {
	            margin: 10,
	            textStyle: {
	                fontSize: 14,
	                color: '#0079ff'
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        data: []
	    }],
	    yAxis: [{
	        type: 'value',
	        name: '(流量/m³/s)',
	        nameTextStyle: {
						color: '#0079ff',
						fontSize: 14
					},
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	        	show: false,
	        },
	        axisLabel: {
	            margin: 10,
	            textStyle: {
	                fontSize: 14,
	                color: '#0079ff'
	            }
	        },
	        splitLine: {
	            show: false,
	        }
	    }],
      dataZoom: [ //给x轴设置滚动条
  			{
  				start: 0, //默认为0
  				end: 100,
  				type: 'slider',
  				show: false,
  			},
  			//下面这个属性是里面拖到
  			{
  				type: 'inside',
  				show: true,
  				xAxisIndex: [0],
  				start: 0, //默认为1
  				end: 50
  			}
  		],
	    series: [{
	        name: '流量',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 3
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: 'rgba(75, 242, 226, 0.2)',
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: 'rgb(75, 242, 226)',
	                borderColor: 'rgba(75, 242, 226, 0.27)',
	                borderWidth: 12
	            }
	        },
	        data: [],
	        markLine: {
	            silent: true,
	            data: [{
	                yAxis: 55
	            }],
	            lineStyle: {
	            	color: '#ff988d'
	            },
	            symbolSize: 0
	        },
	    }]
	};
	myChart_flow.setOption(option_flow);
	myChart_flow.resize();

	$.get('http://47.100.247.54:8080/jhzhps-back/checkPoint/get?type=3&origin=1', function(data) {
		var checkpointId;
		checkpointId = data.data[0].id;

		$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=流量&checkpointId=' + checkpointId), function(data) {
			if (data.data == '') {
				var _data = `<div style="display: table;width: 100%;height: 100%;">
											<div style="display: table-cell;vertical-align: middle;text-align: center;position: relative;top: 23px;">
												<img src="images/noData.png">
											</div>
										</div>`;
				$('#flow_chart').html(_data);
			} else {
				var timeData = [], valArry = [];
				data.data.forEach( function(element, index) {
					var _time = element.recordTime.substring(11, 16);
					timeData.push(_time);
					var _val = element.dataValue.toFixed(2);
					valArry.push(_val);
				});

				myChart_flow.setOption({
	        xAxis: [{
						data: timeData
					}],
	        series: [{
						data: valArry,
					}]
		    });
			}
		})

		var flow_update = setInterval(function () {
			$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=流量&checkpointId=' + checkpointId), function(data) {
				if (data.data == '') {
					var _data = `<div style="display: table;width: 100%;height: 100%;">
												<div style="display: table-cell;vertical-align: middle;text-align: center;position: relative;top: 23px;">
													<img src="images/noData.png">
												</div>
											</div>`;
					$('#flow_chart').html(_data);
				} else {
					var timeData = [], valArry = [];
					data.data.forEach( function(element, index) {
						var _time = element.recordTime.substring(11, 16);
						timeData.push(_time);
						var _val = element.dataValue.toFixed(2);
						valArry.push(_val);
					});

					myChart_flow.setOption({
		        xAxis: [{
							data: timeData
						}],
		        series: [{
							data: valArry,
						}]
			    });
				}
			})
		}, 5000 * 2)
	})

	var dataBeast = [], xAxisData = [];
	//易涝监测点历史水位数据TAB切换的3个图表（易涝点1、易涝点2、易涝点3）Y轴数据
	var dataBeast0 = [], dataBeast1 = [], dataBeast2 = [];

	//易涝监测点历史水位数据TAB切换的3个图表（易涝点1、易涝点2、易涝点3）X轴数据
	var xAxisData0 = [], xAxisData1 = [], xAxisData2 = [];
	var echartsApp = [],
		elemDataView = $('#flood_tab').children('div'),
		options = [
		{
		    backgroundColor: 'transparent',
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            lineStyle: {
		                color: '#7bbcff'
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        name: '(时间/h)',
		        nameRotate: '270',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        boundaryGap: false,
		        axisLine: {
		            show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        data: []
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '(水位/cm)',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		        	show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        splitLine: {
		            show: false,
		        }
		    }],
		    dataZoom: [ //给x轴设置滚动条
					{
						start: 0, //默认为0
						end: 100,
						type: 'slider',
						show: false,
					},
					//下面这个属性是里面拖到
					{
						type: 'inside',
						show: true,
						xAxisIndex: [0],
						start: 0, //默认为1
						end: 50
					}
				],
		    series: [{
		        name: '易涝监测点水位',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 3
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: 'rgba(123, 188, 255, 0.2)',
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(123, 188, 255)',
		                borderColor: 'rgba(123, 188, 255, 0.27)',
		                borderWidth: 12
		            }
		        },
		        data: [],
		        markLine: {
		            silent: true,
		            data: [{
		                yAxis: 55
		            }],
		            lineStyle: {
		            	color: '#ff988d'
		            },
		            symbolSize: 0
		        },
		    }]
		},
		{
		    backgroundColor: 'transparent',
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            lineStyle: {
		                color: '#7bbcff'
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        name: '(时间/h)',
		        nameRotate: '270',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        boundaryGap: false,
		        axisLine: {
		            show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        data: []
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '(水位/cm)',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		        	show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        splitLine: {
		            show: false,
		        }
		    }],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: 0, //默认为0
		    		end: 100,
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series: [{
		        name: '易涝监测点水位',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 3
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: 'rgba(123, 188, 255, 0.2)',
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(123, 188, 255)',
		                borderColor: 'rgba(123, 188, 255, 0.27)',
		                borderWidth: 12
		            }
		        },
		        data: [],
		        markLine: {
		            silent: true,
		            data: [{
		                yAxis: 55
		            }],
		            lineStyle: {
		            	color: '#ff988d'
		            },
		            symbolSize: 0
		        },
		    }]
		},
		{
		    backgroundColor: 'transparent',
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            lineStyle: {
		                color: '#7bbcff'
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        name: '(时间/h)',
		        nameRotate: '270',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        boundaryGap: false,
		        axisLine: {
		            show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        data: []
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '(水位/cm)',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		        	show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        splitLine: {
		            show: false,
		        }
		    }],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: 0, //默认为0
		    		end: 100,
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series: [{
		        name: '易涝监测点水位',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 3
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: 'rgba(123, 188, 255, 0.2)',
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(123, 188, 255)',
		                borderColor: 'rgba(123, 188, 255, 0.27)',
		                borderWidth: 12
		            }
		        },
		        data: [],
		        markLine: {
		            silent: true,
		            data: [{
		                yAxis: 55
		            }],
		            lineStyle: {
		            	color: '#ff988d'
		            },
		            symbolSize: 0
		        },
		    }]
		}];

	var _index1 = 0, _index2 = 0;

	$.get('http://47.100.247.54:8080/jhzhps-back/checkPoint/get?type=1&origin=1&used=2', function(data) {
		var checkpointId0, checkpointId1, checkpointId2;
		data.data.forEach( function(element, index) {
			// $('.new-tab-title li').eq(index).html(element.location)
			if (element.location == '八一立交') {
				checkpointId0 = element.id;
				// console.log(checkpointId0)
			}
			if (element.location == '环城东路/丰亭路') {
				checkpointId1 = element.id;
				// console.log(checkpointId1)
			}
			if (element.location == '洪源立交') {
				checkpointId2 = element.id;
				// console.log(checkpointId2)
			}
		});
		$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=水位&checkpointId=' + checkpointId0), function(data) {
			elemDataView.hide().eq(0).show();
			if (data.data == '') {
				var _data = `<div style="display: table;width: 100%;height: 100%;">
											<div style="display: table-cell;vertical-align: middle;text-align: center;">
												<img src="images/noData.png">
											</div>
										</div>`;
				elemDataView.eq(0).html(_data);
			} else {
				//生成数组之前先清空数组，避免在每次点击时数组内还有值
				dataBeast.splice(0,dataBeast.length);
				xAxisData.splice(0,xAxisData.length);

				// if(window.echartsFlood) {
				// 	window.echartsFlood.clear();
				// }
				echartsApp[0] = echarts.init(elemDataView[0]);
				// window.echartsFlood = echartsApp[0];
				echartsApp[0].setOption(options[0]);
				window.onresize = echartsApp[0].resize;

				data.data.forEach( function(element, index) {
					dataBeast.push((element.dataValue*100).toFixed(2));
					var recordTime = element.recordTime.substring(11, 16);
					xAxisData.push(recordTime);
				});

				// var endPercent = (11 / xAxisData.length) * 100;

				echartsApp[0].setOption({
		      xAxis: {
						data: xAxisData
					},
					// dataZoom: [
					// 	{
					// 		end: endPercent,
					// 	}
					// ],
		      series: [{
						data: dataBeast,
					}]
		    });
			}
		})

		var timer1 = setInterval(function () {
			if (_index1 == 2) {
				_index1 = 0;
			} else {
				_index1 ++;
			}
			$('#flood_ul li').eq(_index1).trigger('click');
		}, 5000 * 2)

		$('#flood_ul li').click(function(event) {
			clearInterval(timer1);
			$(this).addClass('active').siblings().removeClass('active');
			var _index = $(this).index();
			_index1 = _index;
			elemDataView.hide().eq(_index).show();

			if (_index == 0) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=水位&checkpointId=' + checkpointId0), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast0.splice(0,dataBeast0.length);
					xAxisData0.splice(0,xAxisData0.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView.eq(_index).html(_data);
					} else {
						// if(window.echartsFlood) {
						// 	window.echartsFlood.clear();
						// }
						echartsApp[_index] = echarts.init(elemDataView[_index]);
						// window.echartsFlood = echartsApp[_index];
						echartsApp[_index].setOption(options[_index]);
						window.onresize = echartsApp[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast0.push((element.dataValue*100).toFixed(2));
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData0.push(recordTime);
						});

						// var endPercent0 = (11 / xAxisData0.length) * 100;

						echartsApp[_index].setOption({
			        xAxis: {
								data: xAxisData0
							},
							// dataZoom: [
							// 	{
							// 		end: 100,
							// 	}
							// ],
			        series: [{
								data: dataBeast0,
							}]
				    });
					}
				})
			} else if (_index == 1) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=水位&checkpointId=' + checkpointId1), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast1.splice(0,dataBeast1.length);
					xAxisData1.splice(0,xAxisData1.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView.eq(_index).html(_data);
					} else {
						// if(window.echartsFlood) {
						// 	window.echartsFlood.clear();
						// }
						echartsApp[_index] = echarts.init(elemDataView[_index]);
						// window.echartsFlood = echartsApp[_index];
						echartsApp[_index].setOption(options[_index]);
						window.onresize = echartsApp[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast1.push((element.dataValue*100).toFixed(2));
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData1.push(recordTime);
						});

						// var endPercent1 = (11 / xAxisData1.length) * 100;

						echartsApp[_index].setOption({
			        xAxis: {
								data: xAxisData1
							},
							// dataZoom: [
							// 	{
							// 		end: endPercent1,
							// 	}
							// ],
			        series: [{
								data: dataBeast1,
							}]
				    });
					}
				})
			} else if (_index == 2) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=水位&checkpointId=' + checkpointId2), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast2.splice(0,dataBeast2.length);
					xAxisData2.splice(0,xAxisData2.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView.eq(_index).html(_data);
					} else {
						// if(window.echartsFlood) {
						// 	window.echartsFlood.clear();
						// }
						echartsApp[_index] = echarts.init(elemDataView[_index]);
						// window.echartsFlood = echartsApp[_index];
						echartsApp[_index].setOption(options[_index]);
						window.onresize = echartsApp[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast2.push((element.dataValue*100).toFixed(2));
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData2.push(recordTime);
						});

						// var endPercent2 = (11 / xAxisData2.length) * 100;

						echartsApp[_index].setOption({
			        xAxis: {
								data: xAxisData2
							},
							// dataZoom: [
							// 	{
							// 		end: endPercent2,
							// 	}
							// ],
			        series: [{
								data: dataBeast2,
							}]
				    });
					}
				})
			}

			timer1 = setInterval(function () {
				if (_index1 == 2) {
					_index1 = 0;
				} else {
					_index1 ++;
				}
				$('#flood_ul li').eq(_index1).trigger('click');
			}, 5000 * 2)
		});
	})

	var dataBeast_water = [], xAxisData_water = [];
	//水质变化情况数据TAB切换的5个图表--Y轴数据
	var dataBeast_water0 = [], dataBeast_water1 = [], dataBeast_water2 = [], dataBeast_water3 = [], dataBeast_water4 = [];
	//水质变化情况数据TAB切换的5个图表--X轴数据
	var xAxisData_water0 = [], xAxisData_water1 = [], xAxisData_water2 = [], xAxisData_water3 = [], xAxisData_water4 = [];
	var echartsApp_water = [],
		elemDataView_water = $('#water_tab').children('div'),
		options_water = [
		{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            type: 'category',
			        name: '(时间/h)',
			        nameRotate: '270',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        boundaryGap: false,
			        axisLine: {
			            show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
			        name: '(浓度/mg/l)',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			        	show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        splitLine: {
			            show: false,
			        }
		            
		        }
		    ],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: [], //默认为0
		    		end: [],
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series : [
		        {
		            name:'COD',
		            type:'bar',
		            barWidth: 9,
		            itemStyle: {
		                normal: {
		                    barBorderRadius: [30, 30, 0, 0],
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1, [{
		                                offset: 0,
		                                color: '#7bbcff'
		                            },
		                            {
		                                offset: 1,
		                                color: '#4da4ff'
		                            }
		                        ]
		                    )
		                }
		            },
		            data:[],
		            markLine: {
		                silent: true,
		                data: [{
		                    yAxis: 45
		                },{
		                    yAxis: 55
		                }],
		                lineStyle: {
		                	color: '#ff988d'
		                },
		                symbolSize: 0
		            },
		        }
		    ]
		},
		{
		    backgroundColor: 'transparent',
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            lineStyle: {
		                color: '#7bbcff'
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        name: '(时间/h)',
		        nameRotate: '270',
		        nameTextStyle: {
							color: '#0079ff',
							fontSize: 14
						},
		        boundaryGap: false,
		        axisLine: {
		            show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        data: []
		    }],
		    yAxis: [{
		        type: 'value',
		        min: 0,
		        max: 14,
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		        	show: false,
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14,
		                color: '#0079ff'
		            }
		        },
		        splitLine: {
		            show: false,
		        }
		    }],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: [], //默认为0
		    		end: [],
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series: [{
		        name: 'PH',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 3
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(123, 188, 255)',
		                borderColor: 'rgba(123, 188, 255, 0.27)',
		                borderWidth: 12
		            }
		        },
		        data: [],
		        markLine: {
		            silent: true,
		            data: [{
		                yAxis: 7
		            }],
		            lineStyle: {
		            	color: '#ff988d'
		            },
		            symbolSize: 0
		        },
		    }]
		},
		{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            type: 'category',
			        name: '(时间/h)',
			        nameRotate: '270',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        boundaryGap: false,
			        axisLine: {
			            show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
			        name: '(浓度/mg/l)',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			        	show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        splitLine: {
			            show: false,
			        }
		            
		        }
		    ],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: [], //默认为0
		    		end: [],
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series : [
		        {
		            name:'氨氮',
		            type:'bar',
		            barWidth: 9,
		            itemStyle: {
		                normal: {
		                    barBorderRadius: [30, 30, 0, 0],
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1, [{
		                                offset: 0,
		                                color: '#7bbcff'
		                            },
		                            {
		                                offset: 1,
		                                color: '#4da4ff'
		                            }
		                        ]
		                    )
		                }
		            },
		            data:[],
		            markLine: {
		                silent: true,
		                data: [{
		                    yAxis: 45
		                },{
		                    yAxis: 55
		                }],
		                lineStyle: {
		                	color: '#ff988d'
		                },
		                symbolSize: 0
		            },
		        }
		    ]
		},
		{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            type: 'category',
			        name: '(时间/h)',
			        nameRotate: '270',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        boundaryGap: false,
			        axisLine: {
			            show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
			        name: '(浓度/mg/l)',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			        	show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        splitLine: {
			            show: false,
			        }
		            
		        }
		    ],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: [], //默认为0
		    		end: [],
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series : [
		        {
		            name:'总磷',
		            type:'bar',
		            barWidth: 9,
		            itemStyle: {
		                normal: {
		                    barBorderRadius: [30, 30, 0, 0],
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1, [{
		                                offset: 0,
		                                color: '#7bbcff'
		                            },
		                            {
		                                offset: 1,
		                                color: '#4da4ff'
		                            }
		                        ]
		                    )
		                }
		            },
		            data:[],
		            markLine: {
		                silent: true,
		                data: [{
		                    yAxis: 45
		                },{
		                    yAxis: 55
		                }],
		                lineStyle: {
		                	color: '#ff988d'
		                },
		                symbolSize: 0
		            },
		        }
		    ]
		},
		{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: 45,
		        bottom: '5%',
		        top: '15%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            type: 'category',
			        name: '(时间/h)',
			        nameRotate: '270',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        boundaryGap: false,
			        axisLine: {
			            show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
			        name: '(浓度/mg/l)',
			        nameTextStyle: {
								color: '#0079ff',
								fontSize: 14
							},
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			        	show: false,
			        },
			        axisLabel: {
			            margin: 10,
			            textStyle: {
			                fontSize: 14,
			                color: '#0079ff'
			            }
			        },
			        splitLine: {
			            show: false,
			        }
		            
		        }
		    ],
		    dataZoom: [ //给x轴设置滚动条
		    	{
		    		start: [], //默认为0
		    		end: [],
		    		type: 'slider',
		    		show: false,
		    	},
		    	//下面这个属性是里面拖到
		    	{
		    		type: 'inside',
		    		show: true,
		    		xAxisIndex: [0],
		    		start: 0, //默认为1
		    		end: 50
		    	}
		    ],
		    series : [
		        {
		            name:'总氮',
		            type:'bar',
		            barWidth: 9,
		            itemStyle: {
		                normal: {
		                    barBorderRadius: [30, 30, 0, 0],
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1, [{
		                                offset: 0,
		                                color: '#7bbcff'
		                            },
		                            {
		                                offset: 1,
		                                color: '#4da4ff'
		                            }
		                        ]
		                    )
		                }
		            },
		            data:[],
		            markLine: {
		                silent: true,
		                data: [{
		                    yAxis: 45
		                },{
		                    yAxis: 55
		                }],
		                lineStyle: {
		                	color: '#ff988d'
		                },
		                symbolSize: 0
		            },
		        }
		    ]
		}];


	$.get('http://47.100.247.54:8080/jhzhps-back/checkPoint/get?type=2&origin=1', function(data) {
		var checkpointId;
		checkpointId = data.data[0].id;

		$.get('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=COD&checkpointId=' + checkpointId, function(data) {
			elemDataView_water.hide().eq(0).show();
			if (data.data == '') {
				var _data = `<div style="display: table;width: 100%;height: 100%;">
											<div style="display: table-cell;vertical-align: middle;text-align: center;">
												<img src="images/noData.png">
											</div>
										</div>`;
				elemDataView_water.eq(0).html(_data);
			} else {
				//生成数组之前先清空数组，避免在每次点击时数组内还有值
				dataBeast_water.splice(0,dataBeast_water.length);
				xAxisData_water.splice(0,xAxisData_water.length);

				// if(window.echartsWater) {
				// 	window.echartsWater.clear();
				// }
				echartsApp_water[0] = echarts.init(elemDataView_water[0]);
				// window.echartsWater = echartsApp_water[0];
				echartsApp_water[0].setOption(options_water[0]);
				window.onresize = echartsApp_water[0].resize;

				data.data.forEach( function(element, index) {
					dataBeast_water.push(element.dataValue);
					var recordTime = element.recordTime.substring(11, 16);
					xAxisData_water.push(recordTime);
				});

				var startPercent_water;
				if (xAxisData_water.length > 13) {
					startPercent_water = ((xAxisData_water.length - 13) / xAxisData_water.length) * 100;
				} else {
					startPercent_water = 0;
				}

				echartsApp_water[0].setOption({
		      xAxis: {
						data: xAxisData_water
					},
					dataZoom: [
						{
							start: startPercent_water,
							end: 100
						}
					],
		      series: [{
						data: dataBeast_water,
					}]
		    });
			}
		})

		var timer2 = setInterval(function () {
			if (_index2 == 4) {
				_index2 = 0;
			} else {
				_index2 ++;
			}
			$('#water_ul li').eq(_index2).trigger('click');
		}, 5000 * 2)

		$('#water_ul li').click(function(event) {
			clearInterval(timer2);
			$(this).addClass('active').siblings().removeClass('active');
			var _index = $(this).index();
			_index2 = _index;
			elemDataView_water.hide().eq(_index).show();

			if (_index == 0) {
				$.get('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=COD&checkpointId=' + checkpointId, function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast_water0.splice(0,dataBeast_water0.length);
					xAxisData_water0.splice(0,xAxisData_water0.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView_water.eq(_index).html(_data);
					} else {
						// if(window.echartsWater) {
						// 	window.echartsWater.clear();
						// }
						echartsApp_water[_index] = echarts.init(elemDataView_water[_index]);
						// window.echartsWater = echartsApp_water[_index];
						echartsApp_water[_index].setOption(options_water[_index]);
						window.onresize = echartsApp_water[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast_water0.push(element.dataValue);
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData_water0.push(recordTime)
						});

						var startPercent_water0;
						if (xAxisData_water0.length > 13) {
							startPercent_water0 = ((xAxisData_water0.length - 13) / xAxisData_water0.length) * 100;
						} else {
							startPercent_water0 = 0;
						}

						echartsApp_water[_index].setOption({
			        xAxis: {
								data: xAxisData_water0
							},
							dataZoom: [
								{
									start: startPercent_water0,
									end: 100
								}
							],
			        series: [{
								data: dataBeast_water0,
							}]
				    });
					}
				})
			} else if (_index == 1) {
				$.get('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=PH&checkpointId=' + checkpointId, function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast_water1.splice(0,dataBeast_water1.length);
					xAxisData_water1.splice(0,xAxisData_water1.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView_water.eq(_index).html(_data);
					} else {
						// if(window.echartsWater) {
						// 	window.echartsWater.clear();
						// }
						echartsApp_water[_index] = echarts.init(elemDataView_water[_index]);
						// window.echartsWater = echartsApp_water[_index];
						echartsApp_water[_index].setOption(options_water[_index]);
						window.onresize = echartsApp_water[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast_water1.push(element.dataValue);
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData_water1.push(recordTime)
						});

						var startPercent_water1;
						if (xAxisData_water1.length > 13) {
							startPercent_water1 = ((xAxisData_water1.length - 13) / xAxisData_water1.length) * 100;
						} else {
							startPercent_water1 = 0;
						}

						echartsApp_water[_index].setOption({
			        xAxis: {
								data: xAxisData_water1
							},
							dataZoom: [
								{
									start: startPercent_water1,
									end: 100
								}
							],
			        series: [{
								data: dataBeast_water1,
							}]
				    });
					}
				})
			} else if (_index == 2) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=氨氮&checkpointId=' + checkpointId), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast_water2.splice(0,dataBeast_water2.length);
					xAxisData_water2.splice(0,xAxisData_water2.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView_water.eq(_index).html(_data);
					} else {
						// if(window.echartsWater) {
						// 	window.echartsWater.clear();
						// }
						echartsApp_water[_index] = echarts.init(elemDataView_water[_index]);
						// window.echartsWater = echartsApp_water[_index];
						echartsApp_water[_index].setOption(options_water[_index]);
						window.onresize = echartsApp_water[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast_water2.push(element.dataValue);
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData_water2.push(recordTime)
						});

						var startPercent_water2;
						if (xAxisData_water2.length > 13) {
							startPercent_water2 = ((xAxisData_water2.length - 13) / xAxisData_water2.length) * 100;
						} else {
							startPercent_water2 = 0;
						}

						echartsApp_water[_index].setOption({
			        xAxis: {
								data: xAxisData_water2
							},
							dataZoom: [
								{
									start: startPercent_water2,
									end: 100
								}
							],
			        series: [{
								data: dataBeast_water2,
							}]
				    });
					}
				})
			} else if (_index == 3) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=总磷&checkpointId=' + checkpointId), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast_water3.splice(0,dataBeast_water3.length);
					xAxisData_water3.splice(0,xAxisData_water3.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView_water.eq(_index).html(_data);
					} else {
						// if(window.echartsWater) {
						// 	window.echartsWater.clear();
						// }
						echartsApp_water[_index] = echarts.init(elemDataView_water[_index]);
						// window.echartsWater = echartsApp_water[_index];
						echartsApp_water[_index].setOption(options_water[_index]);
						window.onresize = echartsApp_water[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast_water3.push(element.dataValue);
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData_water3.push(recordTime)
						});

						var startPercent_water3;
						if (xAxisData_water3.length > 13) {
							startPercent_water3 = ((xAxisData_water3.length - 13) / xAxisData_water3.length) * 100;
						} else {
							startPercent_water3 = 0;
						}

						echartsApp_water[_index].setOption({
			        xAxis: {
								data: xAxisData_water3
							},
							dataZoom: [
								{
									start: startPercent_water3,
									end: 100
								}
							],
			        series: [{
								data: dataBeast_water3,
							}]
				    });
					}
				})
			} else if (_index == 4) {
				$.get(encodeURI('http://47.100.247.54:8080/jhzhps-back/checkPointData/queryListForToday?dataType=总氮&checkpointId=' + checkpointId), function(data) {
					//生成数组之前先清空数组，避免在每次点击时数组内还有值
					dataBeast_water4.splice(0,dataBeast_water4.length);
					xAxisData_water4.splice(0,xAxisData_water4.length);

					if (data.data == '') {
						var _data = `<div style="display: table;width: 100%;height: 100%;">
													<div style="display: table-cell;vertical-align: middle;text-align: center;">
														<img src="images/noData.png">
													</div>
												</div>`;
						elemDataView_water.eq(_index).html(_data);
					} else {
						// if(window.echartsWater) {
						// 	window.echartsWater.clear();
						// }
						echartsApp_water[_index] = echarts.init(elemDataView_water[_index]);
						//   window.echartsWater = echartsApp_water[_index];
						echartsApp_water[_index].setOption(options_water[_index]);
						window.onresize = echartsApp_water[_index].resize;

						data.data.forEach( function(element, index) {
							dataBeast_water4.push(element.dataValue);
							var recordTime = element.recordTime.substring(11, 16);
							xAxisData_water4.push(recordTime)
						});

						var startPercent_water4;
						if (xAxisData_water4.length > 13) {
							startPercent_water4 = ((xAxisData_water4.length - 13) / xAxisData_water4.length) * 100;
						} else {
							startPercent_water4 = 0;
						}

						echartsApp_water[_index].setOption({
			        xAxis: {
								data: xAxisData_water4
							},
							dataZoom: [
								{
									start: startPercent_water4,
									end: 100
								}
							],
			        series: [{
								data: dataBeast_water4,
							}]
				    });
					}
				})
			}

			timer2 = setInterval(function () {
				if (_index2 == 4) {
					_index2 = 0;
				} else {
					_index2 ++;
				}
				$('#water_ul li').eq(_index2).trigger('click');
			}, 5000 * 2)
		});
	})

	function getOtherData() {
		$.get('http://47.100.247.54:8080/jhzhps-back/rain/getListByType?type=1', function(data) {
			var precipitation = $('#precipitation');
			precipitation.html('');
			for (var i = 0; i < 3; i++) {
				var precipitation_html = `<div class="other-data">
																		<div class="other-data-name">${data.data[i].stnm}</div>
																		<div class="other-data-time">${data.data[i].time.substring(5, 16)}</div>
																		<div class="other-data-val"><span>${parseFloat(data.data[i].val).toFixed(2)}</span>mm</div>
																	</div>`;
				precipitation.append(precipitation_html);
			}
		});

		$.get('http://47.100.247.54:8080/jhzhps-back/rain/getListByType?type=2', function(data) {
			var water_level = $('#water_level');
			water_level.html('');
			for (var i = 0; i < 3; i++) {
				var water_level_html = `<div class="other-data">
																	<div class="other-data-name">${data.data[i].stnm}</div>
																	<div class="other-data-time">${data.data[i].time.substring(5, 16)}</div>
																	<div class="other-data-val"><span>${parseFloat(data.data[i].val).toFixed(2)}</span>m</div>
																</div>`;
				water_level.append(water_level_html);
			}
		});
	}

	getOtherData();

	var other_timer = setInterval(function() {
		getOtherData();
	}, 1000 * 30);
});