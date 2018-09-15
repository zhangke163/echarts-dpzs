var overlay;
var option = {
	color: ['gold', 'aqua', 'lime'],
	tooltip: {
		trigger: 'item',
		formatter: '{b} </br> 当前水深：{c}',
		zlevel: 900, // 一级层叠，频繁变化的tooltip指示器在pc上独立一层
		z: 800, // 二级层叠
		textStyle: {
			color: '#fff'
		}
	},

	dataRange: {
		show: true,
		min: 0,
		max: 50,
		calculable: true,
		//			color: ['#000079', '#0000C6', '#4A4AFF', '#9393FF'], //green-yellow-red
		//			color: ['#ff3333', 'orange', 'yellow', 'lime'],//green-yellow-red
		color: ['#ff3333', 'orange', 'lime'], //green-yellow-red
		textStyle: {
			color: '#000'
		}
	},
	series: [{
			name: 'jh',
			type: 'map',
			roam: true,
			hoverable: false,
			mapType: 'none',
			itemStyle: {
				normal: {
					borderColor: 'rgba(100,149,237,1)',
					borderWidth: 1,
					areaStyle: {
						color: '#1b1b1b'
					}
				}
			},
			data: [],
			geoCoord: {}
		},
		{
			name: 'jh',
			type: 'map',
			mapType: 'none',
			data: [],

			markPoint: {
				symbol: 'emptyCircle',
				symbolSize: function(v) {
					return v * 2
				},
				effect: {
					show: true,
					shadowBlur: 1,
					loop: true,
					period: 15,
					type: 'scale', // 可用为 scale | bounce
					scaleSize: 1, // 放大倍数，以markPoint点size为基准
					bounceDistance: 20 // 跳动距离，单位px
				},
				itemStyle: {
					normal: {
						label: {
							show: false
						}
					},
					emphasis: {
						label: {
							position: 'top'
						}
					}
				},
				data: []
			}
		}
	]
};
var _min = 0,
	_max = 300,
	_min1 = 25,
	_max1 = 45;
var geojsonYLD = {
	"type": "FeatureCollection",
	"features": []
};
$(function() {
	initMap();

	$.ajax({
		url: "http://47.100.247.54:8080/jhzhps-back/checkPoint/get?type=1&used=2",
		async: false,
		success: function(result) {
			jsonYLD = result.data;
			jsonYLD.forEach(function(item, index) {

				var feature = {
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [item.longitude, item.latitude]
					},
					"properties": {
						"id": item.id,
						"type": 1,
						"device": 1,
						"name": item.location,
						"value": "0.26",
						"paras": {
							"a": item.a,
							"b": item.b,
							"c": item.c
						}
					}
				};
				geojsonYLD.features.push(feature);
			});

		}
	});

	initRange();
	initYLDData();
});

function initMap() {
	var normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
		maxZoom: 18,
		minZoom: 5
	});

	map = L.map('mapContainer', {
		zoomControl: false,
		attributionControl: false,
		doubleClickZoom: false,
		boxZoom: true,
		dragging: true,
		minZoom: 11,
		maxZoom: 16,
		layers: [normalm3]
	}).setView([29.08948, 119.65279], 13);
	
	
	normalm3.on('click',function(e){
		console.log(e);
	});

}

//进度条	
function change($input) {
	$($input).parent().next().val($($input).val());
	$('#rainfall').css('background-size', $('#rainfall').val() / _max * 100 + '% 100%');
	$('#water_line1').css('background-size', ($('#water_line1').val() - _min1) / (_max1 - _min1) * 100 + '% 100%');
	$('#water_line2').css('background-size', ($('#water_line2').val() - _min1) / (_max1 - _min1) * 100 + '% 100%');
	
	var rain =$('#rainfall').val();
	var water1 = $('#water_line1').val();
	var water2 = $('#water_line2').val();
	// debugger
	updateEchats(rain,water1,water2);

}

function initRange() {

	$('#rainfall').RangeSlider({
		min: _min,
		max: _max,
		step: 0.1,
		callback: change
	});
	$('#rainfall').siblings('.show-min').html(_min).siblings('.show-max').html(_max);

	$('#water_line1').RangeSlider({
		min: _min1,
		max: _max1,
		step: 0.01,
		callback: change
	});
	$('#water_line1').siblings('.show-min').html(_min1).siblings('.show-max').html(_max1);

	$('#water_line2').RangeSlider({
		min: _min1,
		max: _max1,
		step: 0.01,
		callback: change
	});
	$('#water_line2').siblings('.show-min').html(_min1).siblings('.show-max').html(_max1);

	$('#rainfall').css('background-size', $('#rainfall').val() / _max * 100 + '% 100%');
	$('#water_line1').css('background-size', ($('#water_line1').val() - _min1) / (_max1 - _min1) * 100 + '% 100%');
	$('#water_line2').css('background-size', ($('#water_line1').val() - _min1) / (_max1 - _min1) * 100 + '% 100%');
}

var arrCoord = {},
	arrData = new Array();

function updateEchats(rainValue, waterValue1, waterValue2) {

	var rain = parseFloat(rainValue),
		water1 = parseFloat(waterValue1),
		water2 = parseFloat(waterValue2);
	arrData.length = 0;
	arrCoord = {};
	//易涝点模拟数据处理；
	L.geoJSON(geojsonYLD, {
		onEachFeature: function(feature, layer) {
			if(feature.properties.device == 1) {

				var lat = feature.geometry.coordinates[0],
					lng = feature.geometry.coordinates[1],
					k = feature.properties.name,
					paras = feature.properties.paras;
				//					debugger

				var v = paras.a * rain + paras.b * (water1 + water2) - paras.c;
				v = v > 0 ? v.toFixed(2) : 0;
				data = {
					name: k,
					value: v
				};
				arrData.push(data);
				arrCoord[k] = [lat, lng];
			}
		}
	});
	option.series[1].markPoint.data = arrData;
	option.series[0].geoCoord = arrCoord;
	overlay.setOption(option);
}
var range1, range2, range3;

function initYLDData() {
	//
	overlay = new L.echartsLayer(map, echarts);
	var chartsContainer = overlay.getEchartsContainer();
	var myChart = overlay.initECharts(chartsContainer);
	window.onresize = myChart.onresize;
	//初始值
	updateEchats(30, 40, 30);
}