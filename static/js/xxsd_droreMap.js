var Ajax = function(opt) {
	var defaultOpt = {
		type: 'post',
		contentType: 'application/json'
	}
}

var baseMap;

var droreMap={
		init:function(opt, rectifyData){
			/*var defaultData = {
					"olTileX": 54874,
					"olTileY": 27040,
					"centerX": 121.43497144063807,
					"centerY": 29.995888023356642,
					"path": "/xubin/map_xxsd/map{z}/{x},{y}.jpg",
					"curZoom": 16,
					"minZoom": 16,
					"maxZoom": 19
				}
				var option = $.extend(true, defaultData, opt);
				//opt和default要深拷贝后合并一次
				mapData.initMap(defaultData);
				//console.log(option);
				//mapData.initRectify(rectifyData);*/
			$.ajax({
				type: "get",
				url: "/xubin/xxsd_mapData.json",
				async: false,
				success: function(data) {
					console.log(data);
					var obj = data.data;
					var mapdata = {
						"olTileX": obj.olTileX,
						"olTileY": obj.olTileY,
						"centerX": obj.sceinitx,//120.07951802513782
						"centerY": obj.sceinity,//30.267776483960148
						"path": "/xubin/map_xxsd/map{z}/{x},{y}.jpg",
						"curZoom": obj.scefit + obj.initlevel,
						"minZoom": obj.scefit,
						"maxZoom": obj.scefit + obj.zoom - 1
					}
					console.log(mapdata);
					maxZoom = mapdata.maxZoom;//设置最大缩放层级
					mapData.initMap(mapdata);//初始化地图
					mapData.initRectify(obj);
				},
				error: function(e) {
					console.log(333333);
				}
			});

		},
		showLayer: function(id) { //显示/隐藏相应图层//***
			var layer = pool.getLayerById(id);
			//console.log(id+visibility);
			layer.setVisible(true);
		},
		unShowAllLayer: function() { //隐藏全部标签图层//***
			for(var i in pool.layers) {
				pool.layers[i].setVisible(false);
			}
		},
		addLayer: function(id, url) { //添加一个图层//***
			var iconlayer;
			iconlayer = pool.getLayerById(id);
			if(iconlayer == undefined) {
				console.log(url);
				iconlayer = mapLayer.addLayer(url);
				console.log(iconlayer);
				mapData._baseMap.addLayer(iconlayer);
				iconlayer.set('id', id);
				iconlayer.setVisible(false);
				pool.setSeedLayer(id, iconlayer);
			}
			console.log(pool.layers);
		},
		getIconNumByLayerId: function(id) { //通过当前图层id获取该图层标签数量//***
			var layer = pool.getLayerById(id);
			if(layer == undefined) {
				return 0;
			}
			var features = layer.getSource().getFeatures();
			return features.length;
		},
		transFromPixToLayer: function(x, y) { //像素坐标转墨卡托坐标//***
			return dataManager.trandata.transFromPixToLayer(x, y);
		},
		icon: {
			Marker: cover.Marker,
			addChild: function(icon) { //TODO 添加标签新入口
				if(icon.constructor != cover.Marker) {
					throw new Error("the type of parameter is wrong!");
					return;
				}
				var layer = pool.getLayerById(icon.subtype);
				if(layer != null) {
					if(layer.getSource().getFeatureById(icon.id) == null) {
						layer.getSource().addFeature(icon.feature);
					}
				} else {
					layer = mapLayer.creatLayer(icon.data.url, icon.subtype);
					mapData._baseMap.addLayer(layer);
					pool.setSeedLayer(icon.subtype, layer);
					layer.getSource().addFeature(icon.feature);
				}
				pool.setSeedIcon(icon.id, icon);
				console.log(iconList);
			},
		},
		getMap: function() {
			return mapData._baseMap;
		}
};


var mapData = {
		_baseMap: {},
		_mapView: {},
		InitData: {},
		addBaseMap: function(source, centerX, centerY, curZoom, minZoom, maxZoom, projection) {
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
			return map;
		},
		setSource: function(baseZoom, leftTopX, leftTopY, projection, urlTemplate, attribution) {
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
		},
		initMap: function(obj) {
			var attribution = new ol.Attribution({
				html: ''
			});
			var projection = ol.proj.get('EPSG:3857');
			var urlTemplate = obj.path;

			var baseMapSource =this.setSource(obj.minZoom, obj.olTileX, obj.olTileY, projection, urlTemplate, attribution);
			var centerX = obj.centerX; // 103.6047;BaseSet.map.centerX", 3d_lat:
										// "BaseSet.map.centerY"
			var centerY = obj.centerY; // 31.0127;
			// 103.6141848564148, 31.00069470136539
			var curZoom = obj.curZoom;
			var minZoom = obj.minZoom;
			var maxZoom = obj.maxZoom;
			this._baseMap = this.addBaseMap(baseMapSource, centerX, centerY, curZoom, minZoom, maxZoom, projection);
			this._baseMap.renderSync();
		},
		initRectify: function(obj) {
			console.log(obj);
			dataManager.transGoogle.initData(obj);
			dataManager.transGoogle.mapData.endMercatorX = dataManager.trandata.transFromPixToLayer(obj.width, obj.height);
		}
};

var mapLayer = {
		creatLayer: function(url, id) {
			var vectorSource = new ol.source.Vector({
				//创建一个空矢量
			});
			var iconStyle = new Style.LayerStyle(url);
			var vectorLayer = new ol.layer.Vector({
				source: vectorSource,
				id: id,
				style: iconStyle
			});
			pool.setDefaultStyle(id, iconStyle);
			return vectorLayer;
		},
		addLayer: function(url) {
			var vectorSource = new ol.source.Vector({
				//创建一个空矢量
			});
			var iconStyle = new Style.LayerStyle(url);
			var vectorLayer = new ol.layer.Vector({
				source: vectorSource,
				style: iconStyle
			});
			//			pool.setDefaultStyle(id, iconStyle);
			return vectorLayer;
		},
		addIcon: function(coordinate, obj) {
			var geo = new ol.geom.Point(coordinate);
			var iconFeatureX = new ol.Feature({
				geometry: geo,
				data: obj,
			});
			iconFeatureX.setId(obj.data.id);
			return iconFeatureX;
		}
};

var Style = { //TODO 样式
		IconStyle: function(url) {
			var style = new ol.style.Style({
				image: new ol.style.Icon({
					src: url
				})
			})
			return style;
		},
		LayerStyle: function(url) {
			var style = new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: 'fraction',
					anchorYUnits: 'fraction',
					opacity: 1,
					src: url
				})
			});
			return style;
		},
		AreaStyle: function(fillColor, strokeColor) {
			var style = new ol.style.Style({
				fill: new ol.style.Fill({
					color: (fillColor == undefined) ? 'rgba(255, 255, 255, 0.2)' : fillColor //区域填充
				}),
				stroke: new ol.style.Stroke({ //区域线条
					color: (strokeColor == undefined) ? '#ffcc33' : strokeColor,
					width: 2
				}),
			});
			return style;
		},
		PointStyle: function(radius, fillColor, lineColor, lineWidth) {
			var style = new ol.style.Style({
				image: new ol.style.Circle({
					radius: radius,
					fill: new ol.style.Fill({
						color: fillColor
					}),
					stroke: new ol.style.Stroke({
						color: lineColor,
						width: lineWidth
					})
				})
			});
			return style;
		},
		LineStyle: function(color, width) {
			var style = new ol.style.Style({
				stroke: new ol.style.Stroke({ //区域线条
					color: color,
					width: width
				})
			})
			return style;
		}
}

var pool={
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
		deleteLayerById: function(id) {
			for(var p in this.layers) {
				if(p == id) {
					delete this.layers[p];
				}
			}
		},
		clearLayers: function() {
			for(var p in this.layers) {
				delete this.layers[p];
			}
		},
		eventList: {},
		getFunByKey: function(key) {
			for(var p in this.eventList) {
				if(p == key) {
					return this.eventList[p];
				}
			}
		},
		removeFunByKey: function(type, key, param) {
			for(var p in this.eventList) {
				if(p == key) {
					if(param) {
						if(param == "Mouse") {
							mapData._baseMap.un(type, this.eventList[p]);
						} else if(param == "Draw") {
							draw_interaction.un(type, this.eventList[p]);
						} else if(param == "Select") {
							select_interaction.un(type, this.eventList[p]);
						}
						delete this.eventList[p];
					}
				}
			}
		},
		styles: [],
		styleList: {},
		getStyleById: function(id) {
			for(var p in this.styleList) {
				if(p == id) {
					return this.styleList[p];
				}
			}
		},
		setDefaultStyle: function(id, style) {
			this.styleList[id] = style;
		},
		iconList: {}, //Marker对象数组
		setSeedIcon: function(id, marker) {
			this.iconList[id] = marker;
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
/////////////////s数据管理模块//////////////////////
var dataManager = {
		GPS: {
			PI: 3.14159265358979324,
			x_pi: 3.14159265358979324 * 3000.0 / 180.0,
			delta: function(lat, lon) {
				// Krasovsky 1940
				//
				var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
				var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
				var dLat = this.transformLat(lon - 105.0, lat - 35.0);
				var dLon = this.transformLon(lon - 105.0, lat - 35.0);
				var radLat = lat / 180.0 * this.PI;
				var magic = Math.sin(radLat);
				magic = 1 - ee * magic * magic;
				var sqrtMagic = Math.sqrt(magic);
				dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
				dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
				return {
					'lat': dLat,
					'lon': dLon
				};
			},

			//WGS-84 to GCJ-02
			gcj_encrypt: function(wgsLat, wgsLon) {
				if(this.outOfChina(wgsLat, wgsLon))
					return {
						'lat': wgsLat,
						'lon': wgsLon
					};

				var d = this.delta(wgsLat, wgsLon);
				return {
					'lat': wgsLat + d.lat,
					'lon': wgsLon + d.lon
				};
			},
			//GCJ-02 to WGS-84
			gcj_decrypt: function(gcjLat, gcjLon) {
				if(this.outOfChina(gcjLat, gcjLon))
					return {
						'lat': gcjLat,
						'lon': gcjLon
					};

				var d = this.delta(gcjLat, gcjLon);
				return {
					'lat': gcjLat - d.lat,
					'lon': gcjLon - d.lon
				};
			},
			//GCJ-02 to WGS-84 exactly
			gcj_decrypt_exact: function(gcjLat, gcjLon) {
				var initDelta = 0.01;
				var threshold = 0.000000001;
				var dLat = initDelta,
					dLon = initDelta;
				var mLat = gcjLat - dLat,
					mLon = gcjLon - dLon;
				var pLat = gcjLat + dLat,
					pLon = gcjLon + dLon;
				var wgsLat, wgsLon, i = 0;
				while(1) {
					wgsLat = (mLat + pLat) / 2;
					wgsLon = (mLon + pLon) / 2;
					var tmp = this.gcj_encrypt(wgsLat, wgsLon)
					dLat = tmp.lat - gcjLat;
					dLon = tmp.lon - gcjLon;
					if((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
						break;

					if(dLat > 0) pLat = wgsLat;
					else mLat = wgsLat;
					if(dLon > 0) pLon = wgsLon;
					else mLon = wgsLon;

					if(++i > 10000) break;
				}
				//console.log(i);
				return {
					'lat': wgsLat,
					'lon': wgsLon
				};
			},
			//GCJ-02 to BD-09
			bd_encrypt: function(gcjLat, gcjLon) {
				var x = gcjLon,
					y = gcjLat;
				var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
				var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
				bdLon = z * Math.cos(theta) + 0.0065;
				bdLat = z * Math.sin(theta) + 0.006;
				return {
					'lat': bdLat,
					'lon': bdLon
				};
			},
			//BD-09 to GCJ-02
			bd_decrypt: function(bdLat, bdLon) {
				var x = bdLon - 0.0065,
					y = bdLat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
				var gcjLon = z * Math.cos(theta);
				var gcjLat = z * Math.sin(theta);
				return {
					'lat': gcjLat,
					'lon': gcjLon
				};
			},
			//WGS-84 to Web mercator
			//mercatorLat -> y mercatorLon -> x
			mercator_encrypt: function(wgsLat, wgsLon) {
				var x = wgsLon * 20037508.34 / 180.;
				var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
				y = y * 20037508.34 / 180.;
				return {
					'lat': y,
					'lon': x
				};
			},
			// Web mercator to WGS-84
			// mercatorLat -> y mercatorLon -> x
			mercator_decrypt: function(mercatorLat, mercatorLon) {
				var x = mercatorLon / 20037508.34 * 180.;
				var y = mercatorLat / 20037508.34 * 180.;
				y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
				return {
					'lat': y,
					'lon': x
				};
			},
			// two point's distance
			distance: function(latA, lonA, latB, lonB) {
				var earthR = 6371000.;
				var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
				var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
				var s = x + y;
				if(s > 1) s = 1;
				if(s < -1) s = -1;
				var alpha = Math.acos(s);
				var distance = alpha * earthR;
				return distance;
			},
			outOfChina: function(lat, lon) {
				if(lon < 72.004 || lon > 137.8347)
					return true;
				if(lat < 0.8293 || lat > 55.8271)
					return true;
				return false;
			},
			transformLat: function(x, y) {
				var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
				ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
				ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
				ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
				return ret;
			},
			transformLon: function(x, y) {
				var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
				ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
				ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
				ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
				return ret;
			},
			latToTileX: function(lat, zoom) {
				var tileX = Math.floor((lat + 180) / 360 * Math.pow(2, zoom));
				return tileX;
			},
			lngToTileY: function(lng, zoom) {
				var tileY = Math.floor((1 - Math.log(Math.tan(lng * Math.PI / 180) + 1 / Math.cos(lng * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)) + 1;
				return tileY;
			}
		},
		transGoogle: {
			initData: function(obj) {
				this.mapData = obj;
			},
			mapData: {},
			lngToPixel: function(lng, zoom) {
				return(lng + 180) * (256 << zoom) / 360;
			},
			latToPixel: function(lat, zoom) {
				var siny = Math.sin(lat * Math.PI / 180);
				var y = Math.log((1 + siny) / (1 - siny));
				return(128 << zoom) * (1 - y / (2 * Math.PI));
			},
			getRefpoint: function(x, y) {
				var x0 = x - parseFloat(this.mapData.scegooglex);
				var y0 = y - parseFloat(this.mapData.scegoogley);
				var point2 = new google.maps.Point(x0, y0);
				return point2;
			},
			getRatpoint: function(x, y) {
				var x1 = this.mapData.spinx + x / parseFloat(this.mapData.spinzoomx);
				var y1 = this.mapData.spiny + y / parseFloat(this.mapData.spinzoomy);
				var point = new google.maps.Point(x1, y1);
				return point;
			},
			rotate: function(x, y) {
				var a3 = Math.PI / 180 * 31;
				var x3 = x * Math.cos(a3) - y * Math.sin(a3);
				var y3 = y * Math.cos(a3) + x * Math.sin(a3);
				var point1 = new google.maps.Point(x3, y3);
				return point1;
			},
			pixelToLng: function(pixelX, zoom) {
				return pixelX * 360 / (256 << zoom) - 180;
			},
			pixelToLat: function(pixelY, zoom) {
				var y = parseFloat(2 * Math.PI * (1 - pixelY / (128 << zoom)));
				var z = Math.pow(Math.E, y);
				var siny = (z - 1) / (z + 1);
				return Math.asin(siny) * 180 / Math.PI;
			},
			transPoint: function(lg, lt) {
				var point3 = this.getRefpoint(this.lngToPixel(lg, 0), this.latToPixel(lt, 0));
				var x0 = point3.x;
				var y0 = point3.y;
				var point2 = this.rotate(x0, y0);
				var point5 = this.getRatpoint(point2.x, point2.y);
				var latlng1 = goMap.initGoMap("gmap").getProjection().fromPointToLatLng(new google.maps.Point(point5.x, point5.y));
				var lng = this.pixelToLat(point5.y, 0);
				var lat = this.pixelToLng(point5.x, 0);
				var point = {
					"lat": lat,
					"lng": lng
				};
				return point;
			},
			/**
			 *
			 * @param lat 纬度
			 * @param lng  经度
			 * @param scegooglex  Google基准点坐标x
			 * @param scegoogley  Google基准点坐标y
			 * @param spinzoomx   Google地图旋转后x方向缩放比例
			 * @param spinzoomy   Google地图旋转后y方向缩放比例
			 * @param spinx       Google基准点旋转后坐标x
			 * @param spiny       Google基准点旋转后坐标y
			 * @param scefit      地图匹配Google地图需要缩放的值
			 * @param zoom        地图层级
			 * @param googlecenterx 地图原点在Google中的x坐标
			 * @param googlecentery  地图原点在Google中的y坐标
			 * @return
			 * 新
			 * transGoogle.transWgToPixel(121.44541382789612, 29.98648366261509, 214.3635082244873, 105.62489128112793, 0.29184693522053834, 0.4626884844855246, 214.39992332458496, 105.6363468170166, 16, 4, 54876, 27041)
			 */
			transWgToPixel: function(lng, lat, scegooglex, scegoogley, spinzoomx, spinzoomy, spinx, spiny, scefit, zoom, googlecenterx, googlecentery) {

				var y = this.latToPixel(lat, 0);
				var x = this.lngToPixel(lng, 0);
				var numX = x - scegooglex; //所求点与基准点坐标的差值向量
				var numY = y - scegoogley;

				var a3 = Math.PI / 180 * 31;
				var x3 = numX * Math.cos(a3) - numY * Math.sin(a3); //num
				var y3 = numY * Math.cos(a3) + numX * Math.sin(a3); //num2...向量旋转后得值

				var x1 = spinx + x3 / parseFloat(spinzoomx);
				var y1 = spiny + y3 / parseFloat(spinzoomy); //对应293 294 google像素坐标

				--zoom;
				var ff = x1 * Math.pow(2, (scefit + zoom));
				var ff1 = googlecenterx * Math.pow(2, zoom) * 256;
				var x2 = ff - ff1;
				var ffy = y1 * Math.pow(2, (scefit + zoom));
				var ffy1 = googlecentery * Math.pow(2, zoom) * 256;
				var y2 = ffy - ffy1;
				console.log(x2, y2)
				return [x2, y2];
			},
			transWgToPixelInside: function(lng, lat) {

				var y = this.latToPixel(lat, 0);
				var x = this.lngToPixel(lng, 0);
				var numX = x - this.mapData.scegooglex; //所求点与基准点坐标的差值向量
				var numY = y - this.mapData.scegoogley;

				var a3 = Math.PI / 180 * 31;
				var x3 = numX * Math.cos(a3) - numY * Math.sin(a3); //num
				var y3 = numY * Math.cos(a3) + numX * Math.sin(a3); //num2...向量旋转后得值

				var x1 = this.mapData.spinx + x3 / parseFloat(this.mapData.spinzoomx);
				var y1 = this.mapData.spiny + y3 / parseFloat(this.mapData.spinzoomy); //对应293 294 google像素坐标

				//		--this.mapData.zoom;
				var zoo = this.mapData.zoom - 1;
				var ff = x1 * Math.pow(2, (this.mapData.scefit + zoo));
				var ff1 = this.mapData.googlecenterx * Math.pow(2, zoo) * 256;
				var x2 = ff - ff1;
				var ffy = y1 * Math.pow(2, (this.mapData.scefit + zoo));
				var ffy1 = this.mapData.googlecentery * Math.pow(2, zoo) * 256;
				var y2 = ffy - ffy1;
				return [x2, y2];
			},
			transPixelToWgsInside: function(x, y) { //内部数据调用
				var zoo = this.mapData.zoom - 1;
				var num = this.pxTlx(this.mapData.scefit, zoo, this.mapData.googlecenterx, x);
				var num2 = this.pxTlx(this.mapData.scefit, zoo, this.mapData.googlecentery, y);
				num = this.mapData.spinzoomx * (num - this.mapData.spinx);
				num2 = this.mapData.spinzoomy * (num2 - this.mapData.spiny);
				//逆推rotate算法
				var num_n = Math.PI / 180 * 31;
				var crx = num2;
				num2 = crx * Math.cos(num_n) - Math.sin(num_n) * num;
				num = (num + crx * Math.cos(num_n) * Math.sin(num_n) - Math.pow(Math.sin(num_n), 2) * num) / Math.cos(num_n);
				//逆推refpoint算法
				var result_x = num + this.mapData.scegooglex;
				var result_y = num2 + this.mapData.scegoogley;

				var lng = (result_x * 360) / (256 << 0) - 180;
				var n2 = (1 - result_y / (128 << 0)) * 6.283185307179586;
				var n3 = (Math.pow(Math.E, n2) - 1) / (Math.pow(Math.E, n2) + 1);
				var lat = (Math.asin(n3)) / (3.1415926535897931 / 180);
				return [lng, lat];
			}, //外部数据调用
			transPixelToWgsOutside: function(x, y, scegooglex, scegoogley, spinzoomx, spinzoomy, spinx, spiny, scefit, zoom, googlecenterx, googlecentery) {
				var num = this.pxTlx(scefit, --zoom, googlecenterx, x);
				var num2 = this.pxTlx(scefit, zoom, googlecentery, y);
				//逆推Rapoint算法
				num = spinzoomx * (num - spinx);
				num2 = spinzoomy * (num2 - spiny);
				//逆推rotate算法
				var num_n = Math.PI / 180 * 31;
				var crx = num2;
				num2 = crx * Math.cos(num_n) - Math.sin(num_n) * num;
				num = (num + crx * Math.cos(num_n) * Math.sin(num_n) - Math.pow(Math.sin(num_n), 2) * num) / Math.cos(num_n);
				//逆推refpoint算法
				var result_x = num + scegooglex;
				var result_y = num2 + scegoogley;

				var lng = (result_x * 360) / (256 << 0) - 180;
				var n2 = (1 - result_y / (128 << 0)) * 6.283185307179586;
				var n3 = (Math.pow(Math.E, n2) - 1) / (Math.pow(Math.E, n2) + 1);
				var lat = (Math.asin(n3)) / (3.1415926535897931 / 180);
				return [lng, lat]
			},
			pxTlx: function(scefit, zoom, googlecenterx, x) {
				var m = googlecenterx * Math.pow(2, zoom) * 256 + x;
				var n = Math.pow(2, (scefit + zoom));
				var num = m / n;
				return num;
			},
			pyTly: function(scefit, zoom, googlecentery, y) {
				var m = googlecentery * Math.pow(2, zoom) * 256 + y;
				var n = Math.pow(2, (scefit + zoom));
				var num2 = m / n;
				return num2;
			},
			cMathEngine: function(lng, lat) {
				var xy = [];
				var x = lng * 20037508.342789 / 180;
				var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
				y = y * 20037508.34789 / 180;
				xy[0] = x;
				xy[1] = y;
				return xy;
			}
		},
		trandata: {
			transFromPixToLayer: function(x, y) {
				x = parseFloat(x);
				y = parseFloat(y);
				var initPoi = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857");
				var lat = (x / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initPoi)[0];
				var lng = (y / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initPoi)[1];
				return mapData._baseMap.getCoordinateFromPixel([lat, lng]);
			},
			transFromWgsToLayer: function(val) { //传入标准经纬度，转ol坐标
				val[0] = parseFloat(val[0]);
				val[1] = parseFloat(val[1]);
				var pixel = dataManager.transGoogle.transWgToPixelInside(val[0], val[1])
				var coord = this.transFromPixToLayer(pixel[0], pixel[1]);
				return coord;
			},
			transFromLayerToPixel: function(val) {
				val[0] = parseFloat(val[0]);
				val[1] = parseFloat(val[1]);
				var temporaryIconObj = {};
				var initMercator = [dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY];
				temporaryIconObj.x = parseFloat(mapData._baseMap.getPixelFromCoordinate(val)[0] - mapData._baseMap.getPixelFromCoordinate(ol.proj.transform(initMercator, 'EPSG:4326', 'EPSG:3857'))[0]) * Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()));
				temporaryIconObj.y = parseFloat(mapData._baseMap.getPixelFromCoordinate(val)[1] - mapData._baseMap.getPixelFromCoordinate(ol.proj.transform(initMercator, 'EPSG:4326', 'EPSG:3857'))[1]) * Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()));
				return [temporaryIconObj.x, temporaryIconObj.y];
			},
			transLayerToWgs: function(val) {
				val[0] = parseFloat(val[0]);
				val[1] = parseFloat(val[1]);
				var pixel = this.transFromLayerToPixel(val);
				var m = dataManager.transGoogle.transPixelToWgsInside(pixel[0], pixel[1]);
				return m;
			},
			transFromWgsToPixel: function(val) {
				val[0] = parseFloat(val[0]);
				val[1] = parseFloat(val[1]);
				var pixel = dataManager.transGoogle.transWgToPixelInside(val[0], val[1]);
				return pixel;
			},
			transWindowPixel: function(val) {
				val[0] = parseFloat(val[0]);
				val[1] = parseFloat(val[1]);
				return mapData._baseMap.getPixelFromCoordinate(val)
			}
		}
}
function addLayer(map,layer){
	map.addLayer(layer);
}
