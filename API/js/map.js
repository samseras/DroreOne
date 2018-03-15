var mapset = {
	labelNameShow: true, // 是否在地图上显示标签名称
};
var  BaseSet = {
	    //http://121.199.5.95:10010/
	    //http://123.207.35.71:11121/
	    //http://115.159.160.97:5551
	    //http://115.159.160.97:9527
	    //http://115.159.160.97:10086/洪园
	    //http://192.0.10.14:10086/洪园服务器
	    //http://192.168.11.110:17011/百里杜鹃
	    //http://120.55.243.225:10086/
	    //192.0.1.15:8080
	    secondurl: "http://120.26.14.115:17011"
};
BaseSet.map = {};
const SMALLSIZE = 0,
	MEDIUMSIZE = 0,
	LARGESIZE = 0;
var labelTypeList = { // subtype值 设备种类

	"shexiangtou": ["ca7564a458ab4775b2d2ab7f9a7c10f3", "6154d09b989e4e81a19a8b0a0bc50584", "69225e76fb9b4c129be2f819ade2f0a8", "850f66e11a9c4987a1053ca1c3d28691", "76e21fb18488488cb767acf0d99c069b", "d243038487944f4fa3116c9a4559b3c5", "d3a98e547b86486dab3a95d17821425d", "320c16e2e6d84a60aab2bb8fbc33cd91", "50b343e0c3654adab16229feed933574", '94bf6ebd5b7d481390e957828d3d18c2', '7f99210b88604699a58f7be58c8d8ef2', '4c466070e40048f49cc7aa960778a55c', '017035c31a594e94b2dff4428dfab06a'],
	"yinping": ["f288399309e34af096b186addb59736c", "65948dadbc674299bcab9adb6ae9ce21", "7e59a4e64e3a40949b763ced76400471", "d71fa3d861604c05b0e52fb822b7b3c3", "b77e3dad9f564d52bdfd7ac92d0424f3", "4865a6d9ee274debaa602ffeaa9610a6"],
	// 广播统一用上面的yinping!!!!!不用单独新建对象!!!!!gis打点系统不打不需要的点就行！！！
	// 建德单独的音响组
	// 天台山
	"wifi": ["281fdd83ab354cc4a0a75c3a1ff13ff9", "822405e90c0046c1900c3fb88660492a"],
	"huanjing": ["f9e38aac16ec4da69eb6e5694c96e435", "0dbfb8b31baa4fb285a0de7d862792df", "2cfdc9d8ee4f4eefa3913a42b2ec223d", "6612977ed7ed4039bc80fa3f28eab892"],
	"shuizha": ["f9e38aac16ec4da6912345694c96e435"],
	"parking": ["7ebbf4d081f14cdab4fc2ba4addf9614"],
	"piaowu": ["20e13124ffa74847be72ba18254784f2"],
	"carflow": ["d805715b77244d53813a5265440b788c"],
	"tourflow": ["55a3b7f8ec3048d78fa308e9b9c28ffb"],
	"diaodu": ["237c5e7878a54932aea91cb0b80e6f02", "c29dab3d084e4d7b8eee87148056513f"],
	"ludeng": ["5d85338e5c754263ba5f9e781785b53e", "0b108615dd9844b586b13589a1eb26dd"],
	"shebei": [],
	"screen": ["e077943a9fb044b8bf3336cfd2563cc8"],
	"baojingt": ["14db93e03c394b6fafe66c305ea9559f"],
	"none": [],
	"hot": ["77b5af80b7cd475cb089e3a95d199471"],
	"quanjing": ["351ea160666c488e838b6fc91f5117d9"],
	"hotel": ['0f96a62fc0b945468045d7d384e4d5ce'], // 酒店
	"shop": ['1ab6ac1278b94424bab1dd7b3b11b6d7'], // 商店
	"car": ["5e34fc5561a14ee696208d89f1c1651e"], // 观光车
	"ticketM": ['9502715cec154367a3921deadf3c13d1'], // 售票口
	"wc": ['b7c0cdac80af4e5da904b261b4640835'],
	"ticketS": ['dc1f8675306d457db27e5497bc84566d'], // 售票处
	"serviceC": ['e078e964e6c049918848440fd61a75e5'], // 服务中心
	"tea": ['f0e99f3b525f4f4981d0717d0e5b4657'], // 茶馆
	"chezhan":['5f6f30dc1d3349f09bf24cf6ee7c2259']
};
var _labarr = [];//所有设施的地理信息
$.each(labelTypeList, function(i, t) {

	$.each(t, function(ii, tt) {
		//console.log(tt);
		_labarr.push(tt);
	});
});

var baseMap;//可以在网页上显示的map
var initXY = [];
var maxZoom = 0;
var mapdataAll = {};
console.log(22222222);
//请求地图json数据
$.ajax({
	type: "get",
	url: "/static/xxsd_mapData.json",
	async: false,
	success: function(data) {
		console.log(data);
		var obj = data.data;
		var mapdata = {
			"olTileX": obj.olTileX,
			"olTileY": obj.olTileY,
			"centerX": obj.sceinitx,//120.07951802513782
			"centerY": obj.sceinity,//30.267776483960148
			"path": "../map_xxsd/map{z}/{x},{y}.jpg",
			"curZoom": obj.scefit + obj.initlevel,
			"minZoom": obj.scefit,
			"maxZoom": obj.scefit + obj.zoom - 1
		}
		console.log(mapdata);
		maxZoom = mapdata.maxZoom;//设置最大缩放层级
		initialMap(mapdata);//初始化地图

		BaseSet.map.centerX = obj.sceinitx;
		BaseSet.map.centerY = obj.sceinity;
		BaseSet.map.zoom = obj.scefit + obj.initlevel;
		BaseSet.map.info = data.data;
		initXY = [obj.initMercatorX, obj.initMercatorY];
		setTimeout(function() {
			droreMap.panTo(obj.sceinitx, obj.sceinity);
			transGoogle.initData(obj);
			mapdataAll.InitData = mapdata;
		}, 0);
	},
	error: function(e) {
		console.log(333333);
	}
});

setTimeout(function() {

	//setLayer();
}, 0);

function setLayer() {
	if(store.get('labelList') == undefined) {
		$.ajax({//Ajax
			type: "post",
			url:"../xxsd_map.json",
			async: false,
			data: {},
			success: function(d) {
				//console.log(d);
				var arr = [];
				$.each(d.data, function(i, t) {
					arr.push({
						id: t.id,
						name: t.name,
						src: t.src
					})
				});
				store.set('labelList', arr)
			}
		})
	}
	if(store.get("labelMain") == undefined) {

		$.ajax({//Ajax
			type: "post",
			url: "/drore/API/xxsd_icon.json",
			data: {
				subtype: _labarr.join(","),
				mapId: BaseSet.mapId
			},
			async: false,
			success: function(d) {
				//console.log(d);
				$.each(d.data, function(i, tt) {
					tt["3d_lng"] = transFromPixToLayer(parseFloat(tt.x), parseFloat(tt.y))[0];
					tt["3d_lat"] = transFromPixToLayer(parseFloat(tt.x), parseFloat(tt.y))[1];
				});
				store.set("labelMain", d);
				d = store.get("labelMain");
				// 转换坐标

				getLayerFromLabelInfo(d, SMALLSIZE);
				// getLayerFromLabelInfo(d, MEDIUMSIZE);
				// getLayerFromLabelInfo(d, LARGESIZE);

			}
		})

	} else {
		var d = store.get("labelMain")
		getLayerFromLabelInfo(d, SMALLSIZE);
		// getLayerFromLabelInfo(d, MEDIUMSIZE);
		// getLayerFromLabelInfo(d, LARGESIZE);

	}
}

//坐标计算转换
function transFromPixToLayer(x, y) {
	// [120.03112548235556, 30.28753081039261]
	var initPoi = ol.proj.transform(initXY, 'EPSG:4326', 'EPSG:3857');
	// var initPoi = [11530984.338988548, 3635345.3638251238];
	var lat = (x / Math.pow(2, maxZoom - (baseMap.getView().getZoom()))) + baseMap.getPixelFromCoordinate(initPoi)[0];
	var lng = (y / Math.pow(2, maxZoom - (baseMap.getView().getZoom()))) + baseMap.getPixelFromCoordinate(initPoi)[1];
	return new ol.proj.transform(baseMap.getCoordinateFromPixel([lat, lng]), "EPSG:3857", "EPSG:4326");
}


function transFromLayerToPixel(val) {
	// val[0] = parseFloat(val[0]);
	// val[1] = parseFloat(val[1]);
	val = ol.proj.transform([parseFloat(val[0]), parseFloat(val[1])], 'EPSG:4326', 'EPSG:3857')
	var temporaryIconObj = {};

	var initMercator = initXY;
	temporaryIconObj.x = parseFloat(baseMap.getPixelFromCoordinate(val)[0] - baseMap.getPixelFromCoordinate(ol.proj.transform(initMercator, 'EPSG:4326', 'EPSG:3857'))[0]) * Math.pow(2, mapdataAll.InitData.maxZoom - (baseMap.getView().getZoom()));
	temporaryIconObj.y = parseFloat(baseMap.getPixelFromCoordinate(val)[1] - baseMap.getPixelFromCoordinate(ol.proj.transform(initMercator, 'EPSG:4326', 'EPSG:3857'))[1]) * Math.pow(2, mapdataAll.InitData.maxZoom - (baseMap.getView().getZoom()));
	return [temporaryIconObj.x, temporaryIconObj.y];
}

//添加小图标
var pool = {
		layers: {},
		setSeedLayer: function(id, layer) {
			this.layers[id] = layer;
		},
		getLayerById: function(id) {
			for(var p in this.layers) {
				if(p == id) {
					return this.layers[p];
				}
			}
		},
		jointStore: {},
		seedStore: function(id, u) {
			this.jointStore[id] = u;
		},
		getStore: function(id) {
			for(var p in this.jointStore) {
				if(p == id) {
					return this.jointStore[p];
				}
			}
		},
		deleteStore: function(id) {
			for(var p in this.jointStore) {
				if(p == id) {
					delete this.jointStore[p];
				}
			}
		},
		getStoreIdList: function() {
			var list = [];
			for(var p in this.jointStore) {
				list.push(p);
			}
			return list;
		},
		iconList: {},
		setSeedIcon: function(id, feature) {
			this.iconList[id] = feature;
		},
		getIconById: function(id) {
			for(var p in this.iconList) {
				if(p == id) {
					return this.iconList[p];
				}
			}
		},
		removeIcon: function(id) {
			for(var p in this.iconList) {
				if(p == id) {
					delete this.iconList[p];
				}
			}
		}
	};

function getLayerFromLabelInfo(d, z) {
	$.each(d.data, function(i, tt) {
		var vectorSource = new ol.source.Vector({});

		var _lablist = store.get('labelList');
		var _thisSub, labelArr = [];

		if(tt["3d_lng"] == undefined) return;
		_thisSub = _.find(_lablist, function(item) {
			return item.id == tt["subtype"]
		});
		var x,y;
		var geo;
		if(tt["olX"]&&tt["olY"]){
			x = parseFloat(tt["olX"]);
			y = parseFloat(tt["olY"]);
			var dl = new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:3857', 'EPSG:4326'));
			tt["3d_lng"] = dl.getCoordinates()[0];
			tt["3d_lat"] = dl.getCoordinates()[1];
			geo = new ol.geom.Point([x,y]);
		}
		else{
			var x = parseFloat(tt["3d_lng"]);
		    var y = parseFloat(tt["3d_lat"]);
		    geo = new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
		}
		if (!_thisSub) {
		  console.warn('未匹配到值！' + _thisSub)
		  return
		}
		var iconFeature = new ol.Feature({
			geometry: geo,
			name: _thisSub.name,
			zIndex: i + z,
			// id:tt["id"],
			data: {
				id: tt["id"],
				type: tt["subtype"],
				name: tt["name"],
				deviceInfo: tt["deviceInfo"],
				extend: tt
			}
		});
		iconFeature.setId(tt["id"])
		vectorSource.addFeature(iconFeature);
		pool.setSeedIcon(tt["id"], iconFeature); // TODO存入标签对象
		labelArr.push(new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'))
		}));
		if(_thisSub != undefined) {
			// var imgurl="";
			// if(z==SMALLSIZE){
			// imgurl="img/icon_24x24/"+_thisSub.src.substr(58,20)
			// }
			// if(z==MEDIUMSIZE){
			// imgurl="img/icon_48x48/"+_thisSub.src.substr(58,20)
			// }
			// if(z==LARGESIZE){
			// imgurl="img/icon_48x48/"+_thisSub.src.substr(58,20)
			// }
			var vectorLayer = new ol.layer.Vector({
				source: vectorSource,
				style: new ol.style.Style({
					image: new ol.style.Icon(({
						anchor: [12, 12],
						anchorXUnits: 'pixels',
						anchorYUnits: 'pixels',
						opacity: 0.95,
						src: _thisSub.src // lablist[i].src
					}))
				})
			});
			vectorLayer.set("subtype", tt.subtype);
			var label_i = 0;
			$.each(labelTypeList, function(i, ttt) {
				label_i++;
				if(_.lastIndexOf(ttt, _thisSub.id) > -1) {
					vectorLayer.setZIndex(label_i + z);
				}
			});
			baseMap.addLayer(vectorLayer);
			// TODO:生成标签文字
			/* 生成对应的文字* */
// if(mapset.labelNameShow) {
// var labelLayer = new ol.layer.Vector({
// source: new ol.source.Vector({
// features: labelArr
// }),
// style: new ol.style.Style({
// text: new ol.style.Text({
// text: "擦擦擦擦",
// fill: new ol.style.Fill({
// color: '#fff'
// }),
// font: "10px sans-serif"
// })
// })
// });
// label_i=0;
// // $.each(labelTypeList, function(i, t) {
// // label_i++;
// // if(_.lastIndexOf(t, _thisSub.id) > -1) {
// labelLayer.setZIndex(1);
// // }
// // });
// baseMap.addLayer(labelLayer);
//			
// }

		}

	});
}

//初始化地图
function initialMap(obj) {

	var attribution = new ol.Attribution({
		html: ''
	});
	var projection = ol.proj.get('EPSG:3857');
	var urlTemplate = obj.path;

	var baseMapSource = setSource(obj.minZoom, obj.olTileX, obj.olTileY, projection, urlTemplate, attribution);
	var centerX = obj.centerX; // 103.6047;BaseSet.map.centerX", 3d_lat:
								// "BaseSet.map.centerY"
	var centerY = obj.centerY; // 31.0127;
	// 103.6141848564148, 31.00069470136539
	var curZoom = obj.curZoom;
	var minZoom = obj.minZoom;
	var maxZoom = obj.maxZoom;
	baseMap = addBaseMap(baseMapSource, centerX, centerY, curZoom, minZoom, maxZoom, projection);
	baseMap.renderSync();
}

//加载瓦片图源
function setSource(baseZoom, leftTopX, leftTopY, projection, urlTemplate, attribution) {
	var source = new ol.source.XYZ({
		attributions: [attribution],
		projection: projection,
		tileUrlFunction: function(tileCoord) {
			var diff = tileCoord[0] - baseZoom + 1;
			var url = urlTemplate.replace('{z}', (diff).toString())
				.replace('{x}', (tileCoord[1] - (leftTopX * Math.pow(2, diff - 1))).toString())
				.replace('{y}', (-tileCoord[2] - ((leftTopY - 1) * Math.pow(2, diff - 1)) - 1).toString());
			return url;
		},
		tileLoadFunction: function(imageTile, src) {
			imageTile.getImage().src = src;
		},
		wrapX: true
	});
	return source;
}

//在网页上添加地图
function addBaseMap(source, centerX, centerY, curZoom, minZoom, maxZoom, projection) {
	var select = new ol.interaction.Select({//设置交互式方式 ，选择覆盖层水平包裹世界
		wrapX: false
	});
	var modify = new ol.interaction.Modify({
		features: select.getFeatures()
	});
	var start = [11533867.448149178, 3633959.6441053133];
	var end = [11535897.806713006, 3633135.5573941134];
	var extent1 = [start[0], end[1], end[0], start[1]];//设置固定的显示区域
	var mousePositionControl = new ol.control.MousePosition({//设置组件属性
		coordinateFormat: ol.coordinate.createStringXY(4),
		projection: 'EPSG:4326',
		className: 'custom-mouse-position',
		target: document.getElementById('mouse-position'),
		undefinedHTML: '&nbsp;'
	});
	var map = new ol.Map({//创建地图对象
		controls: ol.control.defaults({//地图组件
			attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
				collapsible: false
			})
		}).extend([mousePositionControl]),
		//overlays: [overlay],
		target: 'map',//地图在页面显示的div
		layers: [
			new ol.layer.Tile({
				source: source
			})
		],
		view: new ol.View({
			// extent: extent1,
			center: ol.proj.fromLonLat([centerX, centerY]),
			projection: projection,
			zoom: curZoom,
			minZoom: minZoom,
			maxZoom: maxZoom,

		})
	});
	
    
	// $("#J_map").css("background","url("+store.get("webset").data.logo+")")

	return map;
}

//showLayer
function showLayer(name, x, y, z) {
	if(labelTypeList[name] != undefined) {
		showLayers([Object.keys(labelTypeList).indexOf(name) + 1]);
	} else if(name == "none") {
		showLayers([-1]);
	} else {
		console.warn("该类型没有图层！")
	}
	if(x != undefined && y != undefined) {
		droreMap.panTo(x, y)
	}
};

Cache.overlay = [];
console.log(Cache.overlay);
Cache.labelList = [];


function showLayers(_arr) {
	Cache.labelList = _arr;
	/*for(var j = 0; j < Cache.overlay.length; j++) {
		baseMap.removeOverlay(Cache.overlay[j]);
	}*/
	var zoom = baseMap.getView().getZoom();
	var zoomIndex = {
		11: SMALLSIZE,
		12: SMALLSIZE,
		13: SMALLSIZE,
		14: SMALLSIZE,
		15: SMALLSIZE,
		16: SMALLSIZE,
		17: MEDIUMSIZE,
		18: LARGESIZE,
		19: LARGESIZE,
		20: LARGESIZE
	}
	var _arr = $.map(_arr, function(t) {
		return t + zoomIndex[zoom];
	});

	// 获取到zoom 对应的zoom和对应的图标
	console.log(baseMap.getLayers());
	baseMap.getLayers().forEach(function(layer, i) {
		var index = layer.get("zIndex");
		//console.log(layer.get("zIndex"));
		console.log(_.indexOf(_arr, layer.get("zIndex")));
		if(_.indexOf(_arr, layer.get("zIndex")) > -1 || index == 0) {
			console.log(124111113);
			layer.setVisible(true);
		} else {
			layer.setVisible(false);
		}
	});
}

function getLabelStore(name) {
	var _indexArr = $.map(labelTypeList[name], function(t, i) {
		return _.indexOf(_labarr, t)
	});

	var d = store.get("labelMain"); // 存储了标签的缓存
	return _.flatten($.map(_indexArr, function(t, i) {
		return d.data[t];
	}));
}

//droreMap
var droreMap = (function($) {
	var searchCache = {};
	var sos = {},
		jt = {},
		protector = {},
		camera = {},
		broadcast = {};

	function showLayer() {

	}

	function getPointByXY(x, y, x1, y1) {
		var wgs84Sphere = new ol.Sphere(6378137);
		return wgs84Sphere.haversineDistance([x, y], [x1, y1]);
	}

	function distance(a, b) {
		var lat1 = a.x,
			lon1 = a.y,
			lat2 = b.x,
			lon2 = b.y;
		var rad = Math.PI / 180;

		var dLat = (lat2 - lat1) * rad;
		var dLon = (lon2 - lon1) * rad;
		var lat1 = lat1 * rad;
		var lat2 = lat2 * rad;

		var x = Math.sin(dLat / 2);
		var y = Math.sin(dLon / 2);

		var a = x * x + y * y * Math.cos(lat1) * Math.cos(lat2);
		return Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}

	function getNearList(point, list, max) {
		var tree = new kdTree(list, distance, ["x", "y"]);
		if(max > list.length) {
			max = list.length;
		}
		var nearest = tree.nearest(point, max || 1);
		return nearest;
	}

	var _layer = [];
	var points, draw, pointsList = [],
		sosAll = {};

	function addFeatureGroup(id, urlList, coordinate, layer0, type, data) {
		var featureList = [];

		urlList.forEach(function(url, i) {
			if(i == 1) {
				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(coordinate),
					name: type,
					data: data
				});
			} else {
				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(coordinate),
					name: type,
					data: data
				});
			}
			iconFeature.setStyle(new ol.style.Style({
				image: new ol.style.Icon({
					src: url,
					rotation: 0
				})
			}));
			layer0.getSource().addFeature(iconFeature);
			featureList.push(iconFeature);
		});
		return featureList;
	}
	var pointCache = {};

	var geom = { // TODO 线条绘制
		cache: {},
		LineBoard: function(obj) {
			var self = this
			this.lineFeatures = new ol.Collection()
			this.lineLayer = new ol.layer.Vector({
				selectable: true,
				source: new ol.source.Vector({
					features: self.lineFeatures
				})
			})
			baseMap.addLayer(this.lineLayer)

			this.addLine = function(obj) {

				var defaultData = {
					'color': 'rgb(255, 255, 0)',
					'width': 5,
					'coords': [],
					name: "暂无"
					// "id": "axxxxx",
					// "name":"XX"
				}
				// var option = $.extend(true, defaultData, obj);
				var option = {
					'color': obj.color ? obj.color : defaultData.color,
					'width': obj.width ? obj.width : defaultData.width,
					'coords': obj.coords ? obj.coords : defaultData.coords,
					name: obj.name ? obj.name : defaultData.name
				}

				var points = new ol.geom.LineString(option.coords)
				var feature = new ol.Feature({
					geometry: points,
					name: option.name,
					data: option
				})
				var lineStyle = new ol.style.Style({
					stroke: new ol.style.Stroke({ // 区域线条
						color: option.color,
						width: option.width
					})
				})
				feature.setStyle(lineStyle)
				var mb = self.lineLayer.getSource()
				// feature.setId(option.id);
				mb.addFeature(feature);
				geom.cache = this.lineLayer;
			}
			/*
			 * this.removeLineById = function(id){
			 * this.lineFeatures.forEach(function(t,i){ if(t.getId()== id){
			 * self.lineLayer.getSource().removeFeature(t); } }) };
			 */
			this.clear = function() {

				if(!_.isEmpty(geom.cache))
					geom.cache.getSource().clear();
				// baseMap.removeLayer(self.lineLayer)
			}
		}
	}

	return {
		geom: {
			LineBoard: geom.LineBoard
		},
		icon: {
			getIconById: function(id) { // ***********
				var feature = pool.getIconById(id);
				if(feature) {
					var attrs = feature.getProperties();
					return attrs;
				}
			},
			setIconStyleById: function(id, url) { // *******
				var feature = pool.getIconById(id);
				if(feature) {
					feature.setStyle(new ol.style.Style({
						image: new ol.style.Icon({
							src: url
						})
					}));
				}
			},
			setJoint: function(id, list) {
				pool.seedStore(id, list);
			},
			getJoint: function(id) {
				var list = pool.getStore(id);
				if(list) {
					pool.deleteStore(id);
					return list;
				}
				return null;
			},
			getJointList: function() {
				return pool.getStoreIdList();
			},
			chearJoint: function() {
				pool.jointStore = {};
			}
		},
		location: function(x, y, z) {
			baseMap.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
			baseMap.getView().setZoom(z);
		},
		panTo: function(x, y) {
			if(!droreMap.isInMap(x, y)) {
				toastr.warning("该坐标超出地图边界！")
				return
			} else {
				// 如果在边缘位置，则缩放到一个合适的层级

				var extent = baseMap.getView().calculateExtent(baseMap.getSize());

				var topLeft = ol.proj.transform(ol.extent.getTopLeft(extent),
					'EPSG:3857', 'EPSG:4326');
				var bottomRight = ol.proj.transform(ol.extent.getBottomRight(extent),
					'EPSG:3857', 'EPSG:4326');
				var maxTopleft = transFromPixToLayer(0, 0);
				var maxBottomright = transFromPixToLayer(BaseSet.map.info.width, BaseSet.map.info.height);
				var diffWidth = (topLeft[0] - bottomRight[0]) / 2;
				diffHeight = (topLeft[1] - bottomRight[1]) / 2;

				console.log(maxTopleft, maxBottomright, diffWidth, diffHeight)
				maxTopleft[0]=maxTopleft[0]-diffWidth;
				maxTopleft[1]=maxTopleft[1]-diffHeight;
				
				
				maxBottomright[0]=maxBottomright[0]+diffWidth;
				maxBottomright[1]=maxBottomright[1]+diffHeight;
				if(!(x > maxTopleft[0] && y < maxTopleft[1] && x < maxBottomright[0] && y > maxBottomright[1])){
					console.log("你在边缘拉")
						baseMap.getView().setZoom(BaseSet.map.info.scefit+BaseSet.map.info.zoom-1);
				}
			

			}

			baseMap.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
		},
		panToWgs: function(lat, lng) {
			var pixel = transGoogle.transWgToPixelInside(lat, lng);
			var mkt = transFromPixToLayer(pixel[0], pixel[1]);
			baseMap.getView().setCenter(ol.proj.transform(mkt, 'EPSG:4326', 'EPSG:3857'));
		},
		setZoom: function() {

		},
		showCoordinate: {
			on: function() {
				$("#mouse-position").show();
			},
			off: function() {
				$("#mouse-position").hide();
			}
		},
		line: {
			draw: function() {
				var features = new ol.Collection();
				var featureOverlay = new ol.layer.Vector({
					source: new ol.source.Vector({
						features: features
					}),
					style: new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(255, 255, 255, 0.2)'
						}),
						stroke: new ol.style.Stroke({
							color: '#ffcc33',
							width: 2
						}),
						image: new ol.style.Circle({
							radius: 7,
							fill: new ol.style.Fill({
								color: '#ffcc33'
							})
						})
					})
				});
				draw = new ol.interaction.Draw({
					features: features,
					type: "LineString"
				});
				baseMap.addInteraction(draw);
			},
			clear: function() {},
			getData: function(obj) {
				pointsList.push(obj);
				console.log(pointsList);
				console.log(JSON.stringify(pointsList))
			}

		},
		setPoint: function(obj, type, imgsrc, grid_is) {
			this.clearPoint();
			var vectorSource = new ol.source.Vector({});

			$.each(obj, function(i, t) {
				// 需要跳过坐标转换的话
				if (grid_is) {
					var mkt = [parseFloat(t.x), parseFloat(t.y)]
				} else {
					var pixel = transGoogle.transWgToPixelInside(parseFloat(t.x), parseFloat(t.y));
					var mkt = transFromPixToLayer(pixel[0], pixel[1]);
				}
				t.type = type || "巡更人员";
				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.transform(mkt, 'EPSG:4326', 'EPSG:3857')),
					name: type,
					zIndex: 151,
					data: t
				});
				vectorSource.addFeature(iconFeature);

			});
			var vectorLayer = new ol.layer.Vector({
				source: vectorSource,
				style: new ol.style.Style({
					image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
						anchor: [12, 12],
						anchorXUnits: 'pixels',
						anchorYUnits: 'pixels',
						opacity: 0.95,
						src: imgsrc // lablist[i].src
					}))
				})
			});
			vectorLayer.setZIndex(151);
			points = vectorLayer;
			baseMap.addLayer(vectorLayer);
			return points
		},
		addDirectionGroup: function(idList, urlList, coordinateList, type, data) {
			var layer = new ol.layer.Vector({
				source: new ol.source.Vector({})
			});
			points = layer;
			baseMap.addLayer(layer); // 添加一个标签图层组

			var list = [];
			idList.forEach(function(id, i) {
				var iconGroup = addFeatureGroup(id, urlList, coordinateList[i], layer, type, data[i]);
				list.push(iconGroup);
			})
			return list;

		},
		removeDirectionGroup: function() {
			baseMap.removeLayer(points);
		},
		removeLayer: function (points) {
			baseMap.removeLayer(points);
		},
		setRotation: function(list, num, rotation) {
			list.forEach(function(feature, i) {
				if(i == num) {
					var style = feature.getStyle();
					var image = style.getImage();
					image.setRotation(rotation);
					feature.setStyle(style);
				}
			});
		},
		clearPoint: function() {
			if(points != undefined) {
				baseMap.removeLayer(points);
			}
		},
		sosClear: function() {
			if(sos != undefined) {
				baseMap.removeLayer(sos);
			}
		},

		jingting: {
			clear: function() {
				if(jt != undefined) {
					baseMap.removeLayer(jt);
				}
			},
			off: function(obj) {
				this.clear();
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {

					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([t.x, t.y], 'EPSG:4326', 'EPSG:3857')),
						name: "sos1",
						zIndex: 101,
						data: {
							sosid: t.sosid
						}
					});
					vectorSource.addFeature(iconFeature);

				});

				var vectorLayer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
							anchor: [12, 12],
							anchorXUnits: 'pixels',
							anchorYUnits: 'pixels',
							opacity: 0.95,
							src: "img/icon/js_normal.png" // lablist[i].src
						}))
					})
				});
				vectorLayer.setZIndex(10000);
				jt = vectorLayer;
				baseMap.addLayer(vectorLayer);
			},
			on: function(obj) {
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {

					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([t.x, t.y], 'EPSG:4326', 'EPSG:3857')),
						name: "sos",
						zIndex: 101,
						data: {
							xy: [t.x, t.y],
							sosid: t.sosid
						}
					});
					vectorSource.addFeature(iconFeature);

				});

				var vectorLayer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
							anchor: [12, 12],
							anchorXUnits: 'pixels',
							anchorYUnits: 'pixels',
							opacity: 0.95,
							// src: "img/icon/jt_sos.png" //lablist[i].src
							src: _.isEmpty(obj[0].icon) ? "img/icon/baojingting2.png" : obj[0].icon
						}))
					})
				});
				vectorLayer.setZIndex(9999);
				jt = vectorLayer;
				baseMap.addLayer(vectorLayer);
			}
		},
		escapeRoute: function() {
			var flightsSource;
			var flightsLayer;
			var start = [11530984.483614273, 3635344.939278641];
			var end = [11538328.26534676, 3631672.504899593];

			function coordinateTransformation(_x, _y) {
				var _xy = ol.proj.transform(
					[_x, _y], 'EPSG:4326', 'EPSG:3857');
				console.log(baseMap.getPixelFromCoordinate(_xy)[0]);
				_x = parseFloat(baseMap.getPixelFromCoordinate(_xy)[0] - baseMap.getPixelFromCoordinate(start)[0]) * Math.pow(2, 19 - (baseMap.getView().getZoom()));
				_y = parseFloat(baseMap.getPixelFromCoordinate(_xy)[1] - baseMap.getPixelFromCoordinate(start)[1]) * Math.pow(2, 19 - (baseMap.getView().getZoom()));
				return [_x, _y];
			}

			function transformArr(list) {
				var datalist = new Array();
				for(var i = 0; i < list.length; i++) {
					var obj = list[i];
					var arr = [parseFloat(obj.x), parseFloat(obj.y)];
					datalist.push(arr);
				}
				return datalist;
			}

			function addFlight(flightsData) {
				flightsSource = new ol.source.Vector({
					wrapX: false,
					attributions: 'Flight data by ' +
						'<a href="http://openflights.org/data.html">OpenFlights</a>,',
					loader: function() {
						var coords = transformArr(flightsData)
						var line = new ol.geom.LineString(coords);
						line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

						var feature = new ol.Feature({
							geometry: line,
							finished: false
						});
						// for all features does not start at the same time
						addLater(feature, 50);
						baseMap.on('postcompose', animateFlights);
					}
				});
				flightsLayer = new ol.layer.Vector({
					source: flightsSource,
					style: function(feature) {
						// if the animation is still active for a feature, do
						// not
						// render the feature with the layer style
						if(feature.get('finished')) {
							return style;
						} else {
							return null;
						}
					}
				});
				Cache.map["addFlight"] = flightsLayer;
				baseMap.addLayer(flightsLayer);
			}

			var addLater = function(feature, timeout) {
				window.setTimeout(function() {
					feature.set('start', new Date().getTime());
					flightsSource.addFeature(feature);
				}, timeout);
			};
			var style = new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 8
				})
			});

			var pointsPerMs = 0.1;
			var animateFlights = function(event) {
				var vectorContext = event.vectorContext;
				var frameState = event.frameState;
				vectorContext.setStyle(style);

				var features = flightsSource.getFeatures();
				for(var i = 0; i < features.length; i++) {
					var feature = features[i];
					if(!feature.get('finished')) {
						var coords = feature.getGeometry().getCoordinates();
						var elapsedTime = frameState.time - feature.get('start');
						var elapsedPoints = elapsedTime * pointsPerMs;

						if(elapsedPoints >= coords.length) {
							feature.set('finished', true);
						}
						var maxIndex = Math.min(elapsedPoints, coords.length);
						var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));

						// directly draw the line with the vector context
						vectorContext.drawGeometry(currentLine);
					}
				}
				baseMap.render();
			};

			var xy = [{
				"x": 103.62583637237547,
				"y": 30.99856112651311
			}, {
				"x": 103.63326072692868,
				"y": 31.001356835578505
			}];
			// Ajax({
			// url:
			// "http://121.199.5.95:10010//cms/patrolRoad/getNetRoadByPoints.json",
			// data: {
			// "points": [{
			// "x": coordinateTransformation(xy[0].x, xy[0].y)[0],
			// "y": coordinateTransformation(xy[0].x, xy[0].y)[1]
			// }, {
			// "x": coordinateTransformation(xy[1].x, xy[1].y)[0],
			// "y": coordinateTransformation(xy[1].x, xy[1].y)[1]
			// }],
			// "mapId": "c9404793a2d940e5afd95e5224489d6a"
			// },
			// success: function(d) {
			// console.log(d);
			// addFlight(d.data[0]);
			// }
			// })
		},
		sosAll: {
			set: function(obj) {
				var iconType = {
					"c7c641f8e93140b58b2fb90f03035a13": "img/icon/SOS.png",
					"85d7c9a2713a4028a250f0db5de1eceb": "img/icon/mtsfull.png",
					"a140ea46f7144549b55e831c95c55ae2": "img/icon/cx.png",
					"2d66afeca5a74dc08dc3e6541bab18e2": "img/icon/ws.png",
					"jt": "img/icon/jt.png"
				}
				var vectorSource = {};
				$.each(iconType, function(i, t) {
					vectorSource[i] = new ol.source.Vector({})
				});

				$.each(obj, function(i, t) {

					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([t.x, t.y], 'EPSG:4326', 'EPSG:3857')),
						name: "sos",
						zIndex: 101,
						data: {
							sosid: t.sosid
						}
					});
					vectorSource[t.type].addFeature(iconFeature);
				});

				$.each(iconType, function(i, t) {
					var vectorLayer = new ol.layer.Vector({
						source: vectorSource[i],
						style: new ol.style.Style({
							image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
								anchor: [12, 12],
								anchorXUnits: 'pixels',
								anchorYUnits: 'pixels',
								opacity: 0.95,
								src: iconType[i] || "img/icon/SOS.png" // lablist[i].src
							}))
						})
					});
					vectorLayer.setZIndex(100);
					sosAll = vectorLayer[i];
					baseMap.addLayer(vectorLayer);
				});

			},
			clear: function() {
				if(sosAll != undefined) {
					$.each(sosAll, function(i, t) {
						baseMap.removeLayer(t);
					});
					sosAll = {};
				}
			}
		},
		point: {
			add: function(obj) {
				var vectorSource = new ol.source.Vector({});
				var pixel = transGoogle.transWgToPixelInside(obj.x, obj.y);
				var mkt = transFromPixToLayer(pixel[0], pixel[1]);

				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.transform(mkt, 'EPSG:4326', 'EPSG:3857')),
					name: obj.type,
					zIndex: 101,
					data: obj.data
				});
				vectorSource.addFeature(iconFeature);
				var vectorLayer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						image: new ol.style.Icon(({
							anchor: [12, 12],
							anchorXUnits: 'pixels',
							anchorYUnits: 'pixels',
							opacity: 0.95,
							src: obj.src
						}))
					})
				});

				vectorLayer.setZIndex(101);
				pointCache[obj.id] = vectorLayer;
				baseMap.addLayer(vectorLayer);
			},
			edit: function() {

			},
			delete1: function(id) {
				droreMap.clearOverlay();
				if(pointCache[id] != undefined) {
					baseMap.removeLayer(pointCache[id]);
				}
			},
			find: function(id) {
				var obj = droreMap.searchLabel({
					"id": id
				})
				if (!obj) {
					console.log('droreMap.searchLabel里obj为：' + obj)
					return
				}
				droreMap.panTo(obj["3d_lng"], obj["3d_lat"])
			},
			addList: function() {

			},
			removeAll: function() {
				_.each(pointCache, function(t, i) {
					baseMap.removeLayer(t);
				});
			}
		},
		sosSet: function(obj, type) {
			var iconType = {
				"c7c641f8e93140b58b2fb90f03035a13": "img/icon/SOS.png",
				"85d7c9a2713a4028a250f0db5de1eceb": "img/icon/mtsfull.png",
				"a140ea46f7144549b55e831c95c55ae2": "img/icon/cx.png",
				"2d66afeca5a74dc08dc3e6541bab18e2": "img/icon/ws.png"
			}
			var vectorSource = new ol.source.Vector({});
			$.each(obj, function(i, t) {
				var pixel = transGoogle.transWgToPixelInside(t.x, t.y);
				var mkt = transFromPixToLayer(pixel[0], pixel[1]);

				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.transform(mkt, 'EPSG:4326', 'EPSG:3857')),
					name: "sos",
					zIndex: 101,
					data: {
						sosid: t.sosid
					}
				});
				vectorSource.addFeature(iconFeature);

			});
			var vectorLayer = new ol.layer.Vector({
				source: vectorSource,
				style: new ol.style.Style({
					image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
						anchor: [12, 12],
						anchorXUnits: 'pixels',
						anchorYUnits: 'pixels',
						opacity: 0.95,
						src: iconType[type] || "img/icon/SOS.png" // lablist[i].src
					}))
				})
			});

			vectorLayer.setZIndex(101);
			sos = vectorLayer;
			baseMap.addLayer(vectorLayer);
		},
		layer: {
			clear: function() {
				droreMap.clearOverlay();
				if(_layer.length > 0) {
					$.each(_layer, function(i, t) {
						baseMap.removeLayer(t);
					})

				}
			},
			clearProtector: function() {
				if(protector != undefined) {
					baseMap.removeLayer(protector);
				}
			},
			clearCamera: function() {
				if(camera != undefined) {
					baseMap.removeLayer(camera);
				}
			},
			clearBroadcast: function() {
				if(broadcast != undefined) {
					baseMap.removeLayer(broadcast);
				}
			},
			people: function(obj, range, max) {
				if(obj.length == 0) return [];
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {
					var pixel = transGoogle.transWgToPixelInside(parseFloat(t.x), parseFloat(t.y));
					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([parseFloat(transFromPixToLayer(pixel[0], pixel[1])[0]), parseFloat(transFromPixToLayer(pixel[0], pixel[1])[1])], 'EPSG:4326', 'EPSG:3857')),
						name: "SOS人员",
						zIndex: 101,
						data: {
							sosid: t.sosid,
							sostype: t.sostype,
							head_pic: t.head_pic,
							phone: t.phone,
							name: t.name || "工作人员",
							distance: t.distance
						}
					});
					vectorSource.addFeature(iconFeature);

					var mkt = transFromPixToLayer(pixel[0], pixel[1]);
					t["3d_lng"] = mkt[0];
					t["3d_lat"] = mkt[1];
					droreMap.showOverlay(t, "<div style='background: rgba(0,0,0,.5); color: white; text-align: center; border-radius: 3px;width: 60px;height:" + (t.name.length > 5 ? 40 : 20) + "px'>" + t.name + "</div>", -30, (t.name.length > 5 ? -55 : -35));
				});
				var vectorLayer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
							anchor: [12, 12],
							anchorXUnits: 'pixels',
							anchorYUnits: 'pixels',
							opacity: 0.95,
							src: "img/icon/ab.png" // lablist[i].src
						}))
					})
				});
				protector = vectorLayer;
				vectorLayer.setZIndex(101);
				_layer.push(vectorLayer);
				baseMap.addLayer(vectorLayer);

			},
			video: function(obj, range, max) {
				if(obj.length == 0) return [];
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {
					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([parseFloat(transFromPixToLayer(t.x, t.y)[0]), parseFloat(transFromPixToLayer(t.x, t.y)[1])], 'EPSG:4326', 'EPSG:3857')),
						name: "sos监控",
						zIndex: 101,
						data: {
							sosid: t.sosid,
							sostype: t.sostype,
							id: t.id,
							name: t.name,
							extend: t
						}
					});
					vectorSource.addFeature(iconFeature);
					var vectorLayer = new ol.layer.Vector({
						source: vectorSource,
						style: new ol.style.Style({
							image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
								anchor: [12, 12],
								anchorXUnits: 'pixels',
								anchorYUnits: 'pixels',
								opacity: 0.95,
								src: t.src // lablist[i].src
							}))
						})
					});
					camera = vectorLayer;
					vectorLayer.setZIndex(101);
					_layer.push(vectorLayer);
					baseMap.addLayer(vectorLayer);
					var mkt = transFromPixToLayer(t.x, t.y);
					t["3d_lng"] = mkt[0];
					t["3d_lat"] = mkt[1];
					droreMap.showOverlay(t, "<div style='background: rgba(0,0,0,.5); color: white; text-align: center; border-radius: 3px;width: 80px;height:" + (t.name.length > 6 ? 40 : 20) + "px'>" + t.name + "</div>", -30, (t.name.length > 6 ? -55 : -35));
				});

			},
			broadcast: function(obj, range, max) {
				if(obj.length == 0) return [];
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {
					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([parseFloat(transFromPixToLayer(t.x, t.y)[0]), parseFloat(transFromPixToLayer(t.x, t.y)[1])], 'EPSG:4326', 'EPSG:3857')),
						name: "sos广播",
						zIndex: 101,
						data: {
							sosid: t.sosid,
							sostype: t.sostype,
							id: t.id,
							name: t.name,
							extend: t
						}
					});
					vectorSource.addFeature(iconFeature);
					var vectorLayer = new ol.layer.Vector({
						source: vectorSource,
						style: new ol.style.Style({
							image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
								anchor: [12, 12],
								anchorXUnits: 'pixels',
								anchorYUnits: 'pixels',
								opacity: 0.95,
								src: t.src // lablist[i].src
							}))
						})
					});
					broadcast = vectorLayer;
					vectorLayer.setZIndex(101);
					_layer.push(vectorLayer);
					baseMap.addLayer(vectorLayer);
					var mkt = transFromPixToLayer(t.x, t.y);
					t["3d_lng"] = mkt[0];
					t["3d_lat"] = mkt[1];
					droreMap.showOverlay(t, "<div style='background: rgba(0,0,0,.5); color: white; text-align: center; border-radius: 3px;width: 80px;height:" + (t.name.length > 6 ? 40 : 20) + "px'>" + t.name + "</div>", -30, (t.name.length > 6 ? -55 : -35));
				});

			},
			music: function(point, range, max) {
				var obj = droreMap.jsonto.music(point, range, max);
				console.log(obj);
				var vectorSource = new ol.source.Vector({});
				$.each(obj, function(i, t) {
					var _tem = droreMap.singleSearch(t.id, "music");
					_tem.type = "音箱";
					var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([t.x, t.y], 'EPSG:4326', 'EPSG:3857')),
						name: "音箱",
						zIndex: 101,
						data: t
					});
					vectorSource.addFeature(iconFeature);

				});

				var vectorLayer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
							anchor: [12, 12],
							anchorXUnits: 'pixels',
							anchorYUnits: 'pixels',
							opacity: 0.95,
							src: "img/icon/ptyx.png" // lablist[i].src
						}))
					})
				});
				vectorLayer.setZIndex(101);
				_layer.push(vectorLayer);
				baseMap.addLayer(vectorLayer);
			}

		},
		jsonto: {
			people: function(point, range, max) {
				var _arr = [];
				Ajax({
					url: BaseSet.url + "/cms/protector/getCurrentTimeProtectors.json",
					data: {
						mapId: BaseSet.mapId
					},
					async: false,
					success: function(d) {
						_arr = $.map(d.data, function(t, i) {
							return {
								y: parseFloat(t.y),
								x: parseFloat(t.x),
								id: t.id
							}
						});

					}
				})
				if(_arr.length == 0) {
					return [];
				}
				if(range == undefined) {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						return i[0]
					});
				} else {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						if(getPointByXY(point.x, point.y, i[0].x, i[0].y) < range)
							return i[0]
					});
				}
			},
			video: function(point, range, max) {
				var _arr = $.map(store.get("labelMain").data[5], function(t, i) {
					return {
						y: parseFloat(t["3d_lat"]),
						x: parseFloat(t["3d_lng"]),
						id: t.id
					}
				});
				if(range == undefined) {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						return i[0]
					});
				} else {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						if(getPointByXY(point.x, point.y, i[0].x, i[0].y) < range)
							return i[0]
					});
				}
			},
			music: function(point, range, max) {
				var _arr = $.map(store.get("labelMain").data[1], function(t, i) {
					return {
						y: parseFloat(t["3d_lat"]),
						x: parseFloat(t["3d_lng"]),
						id: t.id
					}
				});
				if(range == undefined) {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						return i[0]
					});
				} else {
					return $.map(getNearList(point, _arr, max), function(i, t) {
						if(getPointByXY(point.x, point.y, i[0].x, i[0].y) < range)
							return i[0]
					});
				}
			}
		},
		singleSearch: function(id, type) {
			var obj = {};

			if(type == "people") {
				Ajax({
					url: BaseSet.url + API.Map.getCurrentTimeProtectors,
					data: {
						mapId: BaseSet.mapId
					},
					async: false,
					success: function(d) {
						obj = d.data;
					}
				})
			} else {
				if(store.get("labelMain_") == undefined) {
					store.set("labelMain_", _.flatten(store.get("labelMain").data));
				}
				obj = store.get("labelMain_");
			}

			return _.find(obj, function(t) {
				return t.id == id;
			})
		},
		searchLabel: function(opt) {
			var obj = {};
			if(store.get("labelMain_") == undefined) {
				store.set("labelMain_", _.flatten(store.get("labelMain").data));
			}
			obj = store.get("labelMain_");

			return _.find(obj, opt);
		},
		searchLabelInLudeng: function(opt) {
			if(_.isEmpty(searchCache)) {
				var _index = _.findIndex(_labarr, function(o) {
					return o == "5d85338e5c754263ba5f9e781785b53e"
				});
				searchCache = store.get("labelMain").data[_index]
			}
			return _.find(searchCache, opt);
		},

		clearOverlay: function() {
			// /baseMap.getOverlays().clear()
						for(var j = 0; j < Cache.overlay.length; j++) {
							baseMap.removeOverlay(Cache.overlay[j]);
						}
		},
		showOverlay: function(t, html, px, py, callback) {
			$("#J_popup").append('<div id="J_P' + t.id + '" >' + html + '</div>')
			var overlay = new ol.Overlay(({
				element: $("#J_P" + t.id)[0],
				offset: [px || 0, py || 0],
				stopEvent: false
			}));
			baseMap.addOverlay(overlay);
			Cache.overlay.push(overlay);
			overlay.setPosition(ol.proj.transform([parseFloat(t["3d_lng"]), parseFloat(t["3d_lat"])], 'EPSG:4326', 'EPSG:3857'));
			if(callback != undefined)
				callback();
			$("#J_P" + t.id)[0].onclick = function() {
// $(".map-tips").css("z-index", "999")
// $(this).find(".map-tips").css("z-index", "9999");
				$(".map-tips").css("z-index", "1")
				$(this).find(".map-tips").css("z-index", "1");
			};
		},
		dontMove: function() {
			var _center = ol.proj.transform(baseMap.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
			droreMap.panTo(_center[0], _center[1]);
		}
	}
})(jQuery)

var mapClickCallBack = {
	"巡更": function(evt, feature, layer, attrs) {
		var overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
			element: $("#popup0")[0],
			autoPan: true,
			autoPanAnimation: {
				duration: 250
			}
		}));
		baseMap.addOverlay(overlay);
		Cache.singleOverlay = overlay;
		var feature = baseMap.forEachFeatureAtPixel(evt.pixel, function(feature) {
			return feature;
		});
		if(feature) {
			var coordinate = evt.coordinate;

			var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
				coordinate, 'EPSG:3857', 'EPSG:4326'));
			overlay.setPosition(coordinate);
			var html = "";
			if(attrs.data.type == "巡更") {
				// 天台山演示完后删掉if
				if(BaseSet.mapId == '37832b45ddd64ac8b2cc8b09ea22e0ec'){
					html = template("xungeng/1.1/coplist", attrs.data)
				}else{
					html = template("xungeng/coplist", attrs.data)
				}
			}

			$("#popup0 .popup-content")[0].innerHTML = html;
			$("#popup-closer")[0].onclick = function() {
				overlay.setPosition(undefined);
// closer.blur()
				$(this).blur();
				return false;
			};
			$(".J-start-say").mousedown(function() {
				$(".J-start-say").css({
					"background": "rgb(51, 122, 183)",
					"color": "#fff"
				}).html("喊话中...");
				$(this).parent().find("img:first").attr("src", "img/mkf.gif")
				self.sayData = {
					cid: $(this).data("id") || $(".J-shouted-at").data("id"),
					type: $(".client-list li:first-child input").data("type") || 1
				}
				self.recorder.clear();
				self.recorder.start();
			}).mouseup(function() {
				$(".J-start-say").css({
					"background": "#ccc",
					"color": "#333"
				}).html("开始喊话");
				$(this).parent().find("img:first").attr("src", "img/micro-big.png")
				self.recorder.stop();
				self.recorder.send(self.sayData);

			})

		}
	},
	"SOS人员": function(evt, feature, layer, attrs) {
		SOS.protectorDetail(attrs.data)
	},
	"音箱": function(evt, feature, layer, attrs) {
		Music.playAll(attrs.data.id, attrs.data.name);

	},
	"sos监控": function(evt, feature, layer, attrs) {
		Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
		SOS.handleVideoEvent(attrs.data.sosid, attrs.data.sostype);
	},
	"sos广播": function(evt, feature, layer, attrs) {
		SOS.handleBroadcastEvent(attrs.data.sosid, attrs.data.sostype, attrs.data.name);
	},
	"摄像头": function(evt, feature, layer, attrs) {
		console.log("摄像头", attrs.data);
		Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"危险区域摄像头": function(evt, feature, layer, attrs) {
    console.log("危险区域摄像头", attrs.data);
    Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
  },
  "火警摄像头": function(evt, feature, layer, attrs) {
    console.log("火警摄像头", attrs.data);
    Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
  },
	"预安装摄像头": function(evt, feature, layer, attrs) {
    console.log("预安装摄像头", attrs.data);
// Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name,
// attrs.data.id, attrs.data.extend);
  },
  "预安装全景摄像头": function(evt, feature, layer, attrs) {
    console.log("预安装摄像头", attrs.data);
// Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name,
// attrs.data.id, attrs.data.extend);
  },
  "预安装枪机摄像头": function(evt, feature, layer, attrs) {
    console.log("预安装摄像头", attrs.data);
// Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name,
// attrs.data.id, attrs.data.extend);
  },
	"全景摄像头": function(evt, feature, layer, attrs) {
		/*
		 * toastr["error"]("路线受损，异常摄像头编号" + attrs.data.id.substring(0, 5) +
		 * parseInt(Math.random() * 10));
		 */
		// Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo,
		// attrs.data.extend.name);
		// Video.getIndexCodeByGIS(attrs.data.id,attrs.data.deviceInfo);
		Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"监控": function(evt, feature, layer, attrs) {
		Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"枪机摄像机": function(evt, feature, layer, attrs) {
		/*
		 * toastr["error"]("路线受损，异常摄像头编号" + attrs.data.id.substring(0, 5) +
		 * parseInt(Math.random() * 10));
		 */
		// Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo,
		// attrs.data.extend.name);
		Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend); // Video.getIndexCodeByGIS(attrs.data.id,attrs.data.deviceInfo);
	},
	"客流量统计摄像机": function(evt, feature, layer, attrs) {
    Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
  },
	"激光人流监测": function(evt, feature, layer, attrs) {
		// 当前是建德的视频信息，返回的接口有差异,address 为摄像头IP值
		Video.getIndexCodeByGIS(attrs.data.extend.address, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"sos": function(evt, feature, layer, attrs) {
		console.log(attrs.data.sosid);
		SOS.spotEvent(attrs.data.sosid)
	},
	"车": function(evt, feature, layer, attrs) {
		console.log("车", attrs.data)
		Dispatch.info(attrs.data);
	},
	"船": function(evt, feature, layer, attrs) {
		console.log("船", attrs.data)
		Dispatch.info(attrs.data);
	},
	"真实车": function(evt, feature, layer, attrs) {
		console.log("真实车", attrs.data)
		Vehicles.info(attrs.data);
	},
	"真实船": function(evt, feature, layer, attrs) {
		console.log("真实船", attrs.data)
		Vehicles.info(attrs.data);
	},
	"实际车": function(evt, feature, layer, attrs) {
		attrs.data.speed = Math.round(attrs.data.speed * 100) / 100;
		Vehiclevessel.info(attrs.data);
		// 为太湖--为入口图--则进另一个版本
		// attrs.data.mapId === '3f714f1a313747f78494093468111700' ?
		// ship.info(attrs.data) : Vehiclevessel.info(attrs.data)
	},
	"实际船": function(evt, feature, layer, attrs) {
		attrs.data.speed = Math.round(attrs.data.speed * 100) / 100;
		// 为太湖--为入口图--则进另一个版本
		attrs.data.mapId === '3f714f1a313747f78494093468111700' ? ship.info(attrs.data) : Vehiclevessel.info(attrs.data)
	},
	"大屏": function(evt, feature, layer, attrs) {
		console.log(attrs.data);
	},
	"人流": function(evt, feature, layer, attrs) {
		console.log("人流", attrs.data)
		qdhVideo.showLineChart(attrs.data.name + '趋势');
	},
	"站点": function(evt, feature, layer, attrs) {
		Dispatch.stationInfo(attrs.data);
	},
	"广播": function(evt, feature, layer, attrs) {
		// toastr["error"]("路线受损，异常广播编号" + attrs.data.id.substring(0, 5) +
		// parseInt(Math.random() * 10));
	},
	"路灯破损": function(evt, feature, layer, attrs) {
		toastr["error"]("路线受损，异常路灯编号" + attrs.data.id.substring(0, 5) + parseInt(Math.random() * 10));
	},
	"环境监测": function(evt, feature, layer, attrs) {
		
	},
	"水闸": function(evt, feature, layer, attrs) {

		/*
		 * mapEnvironment.initVDialog(attrs.data.deviceInfo);
		 * mapEnvironment.bindShuizha(attrs.data.deviceInfo);
		 */
	},
	"停车场": function(evt, feature1, layer, attrs) {
		// TODO 其他图标联动
		console.log("点击到停车场了", attrs.data);
		Parking3.getIndexCodeByGIS(attrs.data)
	},
	"车站": function(evt, feature, layer, attrs) {
		alert("这是车站");
		//Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"室外全景": function(evt, feature, layer, attrs) {
		alert("这是室外全景");
		//Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"空中全景": function(evt, feature, layer, attrs) {
		alert("这是空中全景");
		//Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
	"环境监测": function(evt, feature, layer, attrs) {
		alert("这是环境监测");
		//Video.getIndexCodeByGIS(attrs.data.extend.deviceInfo, attrs.data.extend.name, attrs.data.id, attrs.data.extend);
	},
}

var Events = function() {
	var listen, log, obj, one, remove, trigger, __this;
	obj = {};
	__this = this;
	listen = function(key, eventfn) { // 把简历扔盒子, key就是联系方式.
		var stack, _ref; // stack是盒子
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		return stack.push(eventfn);
	};

	one = function(key, eventfn) {
		remove(key);
		return listen(key, eventfn);
	};

	remove = function(key) {
		var _ref;
		return(_ref = obj[key]) != null ? _ref.length = 0 : void 0;
	};

	trigger = function() { // 面试官打电话通知面试者
		var fn, stack, _i, _len, _ref, key;
		key = Array.prototype.shift.call(arguments);
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

		for(_i = 0, _len = stack.length; _i < _len; _i++) {

			fn = stack[_i];

			if(fn.apply(__this, arguments) === false) {

				return false;

			}

		}

	}
	return {
		listen: listen,
		one: one,
		remove: remove,
		trigger: trigger
	}
};
var mapEvents = Events();
baseMap.on('click', function(evt) {
	var flag = true;
	baseMap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
		if(flag) {
			var attrs = feature.getProperties();
			console.warn("图标详情", attrs)
			if(typeof mapClickCallBack[attrs.name] == "function") {
				mapClickCallBack[attrs.name](evt, feature, layer, attrs);
			} else if(true) { // 判断是否委托
				mapEvents.trigger(attrs.name, {
					evt: evt,
					feature: feature,
					layer: layer,
					attrs: attrs
				})
			} else {
				console.warn("该图标暂时没有事件！", attrs);
			}
			flag = false;
		}

	});
});