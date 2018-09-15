$(function(){
	
	initMap();
	initAnimation();
});
function initAnimation() {
		L.esri.query({
			url: wsServer + "/0"
		}).where("1=1").run(function (error, result) {
			// debugger
			animationGroup.clearLayers();
			result.features.forEach(function (item) {
				route = item.geometry.coordinates;
				var coords = [];
				route.forEach(function (e, i) {
					// debugger
					coords.push(e.reverse());
				});

				var antPath = L.polyline.antPath;
				var path = antPath(coords, {
					"paused": false,
					"reverse": false,
					"delay": 3000,
					"dashArray": [10, 20],
					"weight": 5,
					"opacity": 1,
					"color": "#008FD6",
					"pulseColor": "#36F6FF"
				});
				path.addTo(animationGroup);

				var elements = document.getElementsByClassName("leaflet-ant-path");;
				var count = elements.length;
				for (var i = 0; i < count; i++) {
					var pathLength = elements[i].getTotalLength();
					elements[i].style.strokeDashoffset = pathLength;
					animateRoute(elements[i], pathLength);
				}
			});
		});
	}

	function animateRoute(e, len) {

		len -= 1; //每次偏移的位置
		if (len >= 1000) {
			//大于1000后重置初始偏移，重复运动
			len = -200;
		}
		//设置元素偏移
		e.style.strokeDashoffset = len;
		//10毫秒执行一次
		setTimeout(function () {
			animateRoute(e, len);
		}, 100);
	}

	function initMap() {
		wsServer = 'http://122.225.120.146:6082/arcgis/rest/services/jhzhps/金华市区污水干管/MapServer';
		var normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
			maxZoom: 18,
			minZoom: 5
		});

		wsWSC = L.esri.dynamicMapLayer({
			url: wsServer,
			layers: [1],
			opacity: 0.8
		});
		
        animationGroup = L.layerGroup([]);
		var groupedOverlays = {
			"专题图": {
				"污水": animationGroup,
				"汇水区域": wsWSC
			}
		};

		map = L.map('map_box', {
			zoomControl: false,
			attributionControl: false,
			doubleClickZoom: false,
			boxZoom: true,
			dragging: true,
			minZoom: 11,
			maxZoom: 16,
			layers: [normalm3, wsWSC, animationGroup]
		}).setView([29.08948, 119.65279], 13);

	}
