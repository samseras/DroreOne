//显示小图标：droreMap.showLayer()-->pool.getLayerById【拿到要显示的layerId】-【layers】->setSeedLayer-->addlayer-->droreMap.addLayer-->ulDisplay()
define(function(require, exports, module) {
    // 你也可以引入自己的函数依赖
     var ol = require('./ol');
    var Event = (function() {
        var SINGLECLICK_EVENT = "singleclick"; //定义了常量;
        var DOUBLECLICK_EVENT = "dblclick";
        var CLICK_EVENT = "click";
        var MOUSE_OVER_EVENT = "pointermove";
        var DRAW_EVENT = "drawend";
        var SELECT_EVENT = "select";
        var MODIFY_EVENT = "modifyend";
        var MOVE_EVENT = "moveend";
        return {
            SINGLECLICK_EVENT: SINGLECLICK_EVENT,
            DOUBLECLICK_EVENT: DOUBLECLICK_EVENT,
            CLICK_EVENT: CLICK_EVENT,
            DRAW_EVENT: DRAW_EVENT,
            SELECT_EVENT: SELECT_EVENT,
            MOUSE_OVER_EVENT: MOUSE_OVER_EVENT,
            MODIFY_EVENT: MODIFY_EVENT,
            MOVE_EVENT: MOVE_EVENT
        }
    })();

    var droreMap = (function($, ol) {
        var mapData = {
            _baseMap: {},
            _mapView: {},
            InitData: {},
            addBaseMap: function(source, centerX, centerY, curZoom, minZoom, maxZoom, projection) {
                var select = new ol.interaction.Select({
                    condition: ol.events.condition.click
                });
                var modify = new ol.interaction.Modify({
                    features: select.getFeatures()
                });
                var map = new ol.Map({
                    interactions: ol.interaction.defaults({
                        doubleClickZoom: false,
                        pinchRotate: false,
                    }),
                    layers: [
                        //					new ol.layer.Tile({
                        //						title: "仅卫星图",
                        //						source: new ol.source.XYZ({
                        //							url: 'https://mt3.google.cn/maps/vt?lyrs=s%40721&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}'
                        //						})
                        //					}),
                        new ol.layer.Tile({
                            name: "wp",
                            source: source
                        }),
                        new ol.layer.Tile({
                            source: new ol.source.TileDebug({
                                projection: 'EPSG:3857',
                                tileGrid: (new ol.source.OSM()).getTileGrid()
                            })
                        })
                        /*new ol.layer.Tile({
						title: "卫星图带文字",
						source: new ol.source.XYZ({
							url: ' http://mt3.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G'
						})
					}),
					new ol.layer.Tile({
						title: "仅文字",
						source: new ol.source.XYZ({
							urls: [
								"https://mt0.google.cn/vt/imgtp=png32&lyrs=h@365000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
								"https://mt1.google.cn/vt/imgtp=png32&lyrs=h@365000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
								"https://mt2.google.cn/vt/imgtp=png32&lyrs=h@365000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
								"https://mt3.google.cn/vt/imgtp=png32&lyrs=h@365000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"
							]
						})
					}),
					*/
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([centerX, centerY]),
                        projection: projection,
                        zoom: curZoom,
                        minZoom: minZoom,
                        maxZoom: maxZoom,
                    }),
                    //				controls:[overviewMapControl],
                    logo: false,
                    target: 'map'
                });
                return map;
            },
            setSource: function(baseZoom, leftTopX, leftTopY, projection, urlTemplate, attribution) {
                var source = new ol.source.XYZ({
                    projection: projection,
                    tileUrlFunction: function(tileCoord) {
                        var diff = tileCoord[0] - baseZoom + 1;
                        var url = urlTemplate.replace('{z}', (diff).toString())
                            .replace('{x}', (tileCoord[1] - (leftTopX * Math.pow(2, diff - 1))).toString())
                            .replace('{y}', (-tileCoord[2] - ((leftTopY - 1) * Math.pow(2, diff - 1)) - 1).toString());
                        return url;
                    },
                    wrapX: true
                });
                return source;
            },
            initMap: function(option) {
                var attribution = new ol.Attribution({
                    html: 'Copyright:© 2016 Rico'
                });
                var projection = ol.proj.get('EPSG:3857'); //墨卡托投影
                var urlTemplate = option.path; //"./map_sec_sichuan0003/map{z}/{x},{y}.jpg";
                var baseMapSource = this.setSource(option.minZoom, option.olTileX, option.olTileY, projection, urlTemplate, attribution); //19, 413000, 214585
                var centerX = option.centerX;
                var centerY = option.centerY;

                var curZoom = option.curZoom;
                var minZoom = option.minZoom;
                var maxZoom = option.maxZoom;
                //添加底图
                this._baseMap = this.addBaseMap(baseMapSource, centerX, centerY, curZoom, minZoom, maxZoom, projection);
                this._baseMap.renderSync();
                this._mapView = this._baseMap.getView();
                this._mapView.changed();
                this.InitData = option;
            },
            initRectify: function(obj) {
                dataManager.transGoogle.initData(obj);
                dataManager.transGoogle.mapData.endMercatorX = dataManager.trandata.transFromPixToLayer(obj.width, obj.height);
            }
        };
        /**
         * 地图图层操作
         */
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
            addLayers: function() {
                for(var p in pool.layers) {
                    mapData._baseMap.addLayer(pool.layers[p]);
                }
            },
            addIcon: function(coordinate, obj) {
                var geo = new ol.geom.Point(coordinate);
                var iconFeatureX = new ol.Feature({
                    geometry: geo,
                    name: obj.name,
                    data: obj,
                });
                iconFeatureX.setId(obj.data.id);
                pool.setSeedIcon(obj.data.id, iconFeatureX);
                return iconFeatureX;
            },
            getLayerStyle: function(id, url) {
                if(pool.getStyleById(id)) {
                    return pool.getStyleById(id);
                }
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        opacity: 1,
                        src: url
                    })
                });
                pool.setDefaultStyle(id, iconStyle);
                return iconStyle;
            }
        };
        var stateVal = {
            _showName: false, //名称
            _showGesture: false, //手势
            _updataIconUrl: false,
            _showScale: false,
            _limitExtent: false,
            get limitExtent() {
                return this._ifadded;
            },
            set limitExtent(val) {
                if(typeof val != "boolean") {
                    throw new Error("invalid value")
                } else {
                    setExtent(val);
                    this._limitExtent = val;
                }
            }
        };
        /*
	 *  底层重写，，，忘了是否在用了，，然后  我还是先留着吧
	 *
	 *  ol.View.prototype.centerOn = function(coordinate, size, position) {
			// calculate rotated position
			var rotation = this.getRotation();
			var cosAngle = Math.cos(-rotation);
			var sinAngle = Math.sin(-rotation);
			var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
			var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
			var resolution = this.getResolution();
			rotX += (size[0] / 2 - position[0]) * resolution;
			rotY += (position[1] - size[1] / 2) * resolution;

			// go back to original angle
			sinAngle = -sinAngle; // go back to original rotation
			var centerX = rotX * cosAngle - rotY * sinAngle;
			var centerY = rotY * cosAngle + rotX * sinAngle;

			this.setCenter([centerX, centerY]);
			//				this.animate({center:[centerX, centerY]});
		};*/

        function viewChange(evt) {
            var initMercator = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857");
            var extent = mapData._mapView.calculateExtent(mapData._baseMap.getSize());
            var lat = (dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[0];
            var lng = (dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[1];
            var endMercator = mapData._baseMap.getCoordinateFromPixel([lat, lng]);
            var centerMercator = ol.proj.transform([mapData.InitData.centerX, mapData.InitData.centerY], 'EPSG:4326', 'EPSG:3857');
            var mapRange = [dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom())), dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))];
            if((extent[0] <= initMercator[0] && extent[2] >= endMercator[0]) || (extent[1] <= endMercator[1] && extent[3] >= initMercator[1])) {
                mapData._mapView.animate({
                    center: centerMercator,
                    duration: 0.5,
                    easing: ol.easing.inAndOut
                });
                return;
            }
            if(mapData._mapView.getAnimating()) {
                if(extent[0] < initMercator[0]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([initMercator[0], mapData._mapView.getCenter()[1]], mapData._baseMap.getSize(), [0, mapData._baseMap.getSize()[1] / 2]);
                }
                if(extent[3] > initMercator[1]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([mapData._mapView.getCenter()[0], initMercator[1]], mapData._baseMap.getSize(), [(mapData._baseMap.getSize()[0]) / 2, 0]);
                }
                if(extent[2] > endMercator[0]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([endMercator[0], mapData._mapView.getCenter()[1]], mapData._baseMap.getSize(), [mapData._baseMap.getSize()[0], mapData._baseMap.getSize()[1] / 2])
                }
                if(extent[1] < endMercator[1]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([mapData._mapView.getCenter()[0], endMercator[1]], mapData._baseMap.getSize(), [(mapData._baseMap.getSize()[0]) / 2, mapData._baseMap.getSize()[1]])
                }
            } else if(mapData._mapView.getAnimating() == false) {
                if(extent[0] < initMercator[0]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([initMercator[0], mapData._mapView.getCenter()[1]], mapData._baseMap.getSize(), [0, mapData._baseMap.getSize()[1] / 2]);
                }
                if(extent[3] > initMercator[1]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([mapData._mapView.getCenter()[0], initMercator[1]], mapData._baseMap.getSize(), [(mapData._baseMap.getSize()[0]) / 2, 0]);
                }
                if(extent[2] > endMercator[0]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([endMercator[0], mapData._mapView.getCenter()[1]], mapData._baseMap.getSize(), [mapData._baseMap.getSize()[0], mapData._baseMap.getSize()[1] / 2])
                }
                if(extent[1] < endMercator[1]) {
                    mapData._mapView.cancelAnimations();
                    mapData._mapView.centerOn([mapData._mapView.getCenter()[0], endMercator[1]], mapData._baseMap.getSize(), [(mapData._baseMap.getSize()[0]) / 2, mapData._baseMap.getSize()[1]])
                }
            }
        }

        function resolutionChange(e) {
            mapData._baseMap.un("moveend", viewChange);
            if(this.getZoom() === Math.floor(this.getZoom())) {
                mapData._baseMap.on("moveend", viewChange)
                var initMercator = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857");
                var extent = mapData._mapView.calculateExtent(mapData._baseMap.getSize());
                var lat = (dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[0];
                var lng = (dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[1];
                var endMercator = mapData._baseMap.getCoordinateFromPixel([lat, lng]);
                var centerMercator = ol.proj.transform([mapData.InitData.centerX, mapData.InitData.centerY], 'EPSG:4326', 'EPSG:3857');
                var mapRange = [dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom())), dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))];

                if((extent[0] <= initMercator[0] && extent[2] >= endMercator[0]) || (extent[1] <= endMercator[1] && extent[3] >= initMercator[1])) {
                    mapData._mapView.animate({
                        zoom: this.getZoom()
                    }, {
                        center: centerMercator
                    });
                }
            }
        }

        function setExtent(val) {
            if(val) {
                mapData._baseMap.on("moveend", viewChange)
                mapData._mapView.on('change:resolution', resolutionChange);
            } else {
                mapData._baseMap.un("moveend", viewChange);
                mapData._mapView.un('change:resolution', resolutionChange);
            }
        }
        /**
         * 地图控件
         */
        var mapControls = {
            positionControl: new ol.control.MousePosition({
                projection: 'EPSG:3857'
            }),
            OverviewMap: function(data) {
                var initMercator = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857");
                var lat = (dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[0];
                var lng = (dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[1];
                var endMercator = mapData._baseMap.getCoordinateFromPixel([lat, lng]);
                var center = ol.proj.fromLonLat([mapData.InitData.centerX, mapData.InitData.centerY]);
                var extent = [initMercator[0], endMercator[1], endMercator[0], initMercator[1]];

                this.data = data;

                var lay = data.url ? new ol.layer.Image({
                    source: new ol.source.ImageStatic({
                        url: this.data.url, // 熊猫基地地图
                        imageExtent: extent
                    })
                }) : new ol.layer.Tile({
                    source: new ol.source.OSM({
                        'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
                    })
                });

                this.overviewMap = new ol.control.OverviewMap({
                    className: 'ol-overviewmap ol-custom-overviewmap',
                    layers: [lay],
                    collapseLabel: '\u00BB',
                    label: '\u00AB',
                    collapsed: false,
                    view: new ol.View({
                        center: center,
                        zoom: 10,
                        minZoom: 10,
                        maxZoom: 14,
                    })
                })
                this.overviewMap.getOverviewMap().on("click", function(e) {
                    mapData._baseMap.getView().animate({
                        center: e.coordinate
                    });
                });
                this.setBoxColor = function(color) {
                    $(".ol-overviewmap-box").css("border-color", color)
                };
                this.setRect = function(width, height) {
                    // $(".ol-overviewmap").css("width", width)
                    $(".ol-overviewmap-map").css("width", width)
                    // $(".ol-overviewmap").css("height", height)
                    $(".ol-overviewmap-map").css("height", height)
                };
                this.getElement = function() {
                    return this.overviewMap.element;
                }
            },
            Custom: function() {
                var vue = document.createElement("div");
                vue.className = 'rotate-north ol-unselectable ol-control';
                var button = document.createElement('button');
                button.innerHTML = "隐藏";
                vue.appendChild(button);
                document.getElementById("addPop").appendChild(vue)
                var myControl = new ol.control.Control({
                    element: vue
                });
                return myControl;
            }
        }
        /**
         * 数据管理
         */
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
                    if(this.mapData.mapType == "2D") {
                        var y = this.latToPixel(lat, 0);
                        var x = this.lngToPixel(lng, 0);
                        var numX = x - this.mapData.scegooglex; //所求点与基准点坐标的差值向量
                        var numY = y - this.mapData.scegoogley;
                        var x1 = this.mapData.spinx + numX / parseFloat(this.mapData.spinzoomx);
                        var y1 = this.mapData.spiny + numY / parseFloat(this.mapData.spinzoomy); //对应293 294 google像素坐标
                        var zoo = this.mapData.zoom - 1;
                        var ff = x1 * Math.pow(2, (this.mapData.scefit + zoo));
                        var ff1 = this.mapData.googlecenterx * Math.pow(2, zoo) * 256;
                        var x2 = ff - ff1;
                        var ffy = y1 * Math.pow(2, (this.mapData.scefit + zoo));
                        var ffy1 = this.mapData.googlecentery * Math.pow(2, zoo) * 256;
                        var y2 = ffy - ffy1;
                    } else {
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
                    }
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
                    var initPoi = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857")
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
                    return mapData._baseMap.getPixelFromCoordinate(val);
                }
            }
        }
        /**
         * 绘图操作
         */
        var drawClass = {};
        drawClass = {
            drawList: [],
            DrawLayer: function(layerName, fillColor, strokeColor) {
                var self = this;
                this.fillColor = fillColor;
                this.strokeColor = strokeColor;
                this.layerName = layerName;
                this.drawFeatures = new ol.Collection();
                this.Layer = new ol.layer.Vector({
                    name: layerName,
                    source: new ol.source.Vector({
                        features: self.drawFeatures
                    }),
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: (fillColor == undefined) ? 'rgba(255, 255, 255, 0.2)' : fillColor //区域填充
                        }),
                        stroke: new ol.style.Stroke({ //区域线条
                            color: (strokeColor == undefined) ? '#ffcc33' : strokeColor,
                            width: 3,
                            lineDash: [4, 10]
                        }),
                        image: new ol.style.Circle({ //点位图片
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: '#ffcc33'
                            })
                        })
                    })
                });
                this.setStyle = function(fillColor, strokeColor) {
                    self.Layer.setStyle(function(feature, resolution) {
                        return [new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: (fillColor == undefined) ? 'rgba(255, 255, 255, 0.2)' : fillColor //区域填充
                            }),
                            stroke: new ol.style.Stroke({ //区域线条
                                color: (strokeColor == undefined) ? '#ffcc33' : strokeColor,
                                width: 2
                            }),
                        })];
                    });
                };
                this.setVisible = function(boo) {
                    if(typeof(boo) == "boolean") {
                        this.Layer.setVisible(boo);
                    }
                };
                this.addArea = function(area, data) {
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Polygon(area),
                        name: data.name,
                        data: data
                    });
                    var mb = self.Layer.getSource()
                    feature.setId(data.id);
                    mb.addFeature(feature);
                };
                this.deleteAreaById = function(id) {
                    var selected_features = self.select_interaction.getFeatures()
                    if(id) {
                        if(self.Layer.getSource().getFeatureById(id)) {
                            self.Layer.getSource().removeFeature(self.Layer.getSource().getFeatureById(id))
                        }
                        return;
                    } else {
                        var feats = self.Layer.getSource().getFeatures();
                        selected_features.forEach(function(selected_feature) {
                            selected_features.remove(selected_feature);
                            self.Layer.getSource().removeFeature(selected_feature)
                        });
                        return;
                    }
                };
                this.refreshFeature = function(feature, data) {
                    feature.setId(data.id);
                    feature.data = data;
                    feature.set("name", data.name);
                };
                this.clear = function() {
                    self.drawFeatures.clear();
                    self.Layer.getSource().clear();
                    self.ifDraw = false;
                    self.ifModify = false;
                    self.ifSelect = false;
                };
                this.draw_interaction = new ol.interaction.Draw({
                    features: self.drawFeatures,
                    type: "Polygon"
                });
                this.select_interaction = new ol.interaction.Select({
                    layers: function(vector_layer) {
                        return vector_layer.get('name') === self.layerName;
                    }
                });
                this.modify_interaction = new ol.interaction.Modify({
                    features: self.select_interaction.getFeatures(),
                    deleteCondition: function(event) {
                        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
                    }
                });
                var _ifDraw = false;
                Object.defineProperty(this, "ifDraw", {
                    get: function() {
                        return _ifDraw;
                    },
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            _ifDraw = val;
                            if(val) {
                                mapData._baseMap.addInteraction(this.draw_interaction);
                            } else {
                                mapData._baseMap.removeInteraction(this.draw_interaction);
                            }
                        }
                    }
                });
                var _ifModify = false;
                Object.defineProperty(this, "ifModify", {
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            if(_ifModify == val) {
                                return;
                            }
                            _ifModify = val;
                            if(val) {
                                //							this.ifDraw = false;
                                mapData._baseMap.addInteraction(this.modify_interaction);
                            } else {
                                mapData._baseMap.removeInteraction(this.modify_interaction);
                            }
                        }
                    }
                });
                var _ifSelect = false;
                Object.defineProperty(this, "ifSelect", {
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            if(_ifSelect == val) {
                                return;
                            }
                            _ifSelect = val;
                            if(val) {
                                mapData._baseMap.addInteraction(this.select_interaction);
                            } else {
                                mapData._baseMap.removeInteraction(this.select_interaction);
                            }
                        }
                    }
                });
                var _areaList;
                Object.defineProperty(this, "areaList", {
                    get: function() {
                        var list = [];
                        for(var i = 0; i < self.drawFeatures.getArray().length; i++) {
                            list.push(self.drawFeatures.getArray()[i].getGeometry().getCoordinates())
                        }
                        return list;
                    }
                });
                this.addEventListener = function(type, key, fn) {
                    var areaObj = {};
                    var interaction;
                    if(type == Event.DRAW_EVENT) {
                        var drawend = function(e) {
                            var areaList = e.feature.getGeometry().getCoordinates();
                            if(fn) {
                                fn(e.feature, areaList);
                            }
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, self.draw_interaction, type, key, drawend);
                    } else if(type == Event.SELECT_EVENT) {
                        var selected = function(e) {
                            var feature = e.deselected[0];
                            var sfeature = e.selected[0];
                            var areaObj = {};
                            if(e.deselected.length > 0) {
                                var obj = {
                                    "area": feature.getGeometry().getCoordinates(),
                                    "name": feature.get("name"),
                                    "id": feature.getId(),
                                    "self": feature
                                }
                                areaObj.unSelect = obj;
                            }
                            if(e.selected.length > 0) {
                                var obj = {
                                    "area": sfeature.getGeometry().getCoordinates(),
                                    "name": sfeature.get("name"),
                                    "id": sfeature.getId(),
                                    "self": sfeature
                                }
                                areaObj.select = obj;
                            }
                            fn(areaObj);
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, getInteraction(type), type, key, selected);
                    } else if(type == Event.MODIFY_EVENT) {
                        var modified = function(e) {
                            fn(e.features);
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, getInteraction(type), type, key, modified);
                    }
                };
                /**
                 * 移除事件
                 */
                this.removeEventListener = function(type, key) {
                    CustomEvent.removeEventListener.call(self.removeEventListener, getInteraction(type), type, key);
                };

                function getInteraction(type) {
                    var interaction;
                    if(type == Event.DRAW_EVENT) {
                        interaction = self.draw_interaction;
                    } else if(type == Event.SELECT_EVENT) {
                        interaction = self.select_interaction;
                    } else if(type == Event.MODIFY_EVENT) {
                        interaction = self.modify_interaction;
                    }
                    return interaction;
                };
            },
        };
        /**
         * 路网****路线绘制及编辑
         */
        var roadNet = {}; //TODO 路网模块
        roadNet = {
            roadPoint: function(lineFeature, parent) { //单条点线模块
                var self = this;
                this.parent = parent;
                this.LineFeature = lineFeature; //当前线条对象
                this.id = lineFeature.getId();
                this.selectPoint = null;
                var areaList = this.LineFeature.getGeometry().getCoordinates(); //当前线路点集合
                var points = new ol.Collection(); //当前点对象集合
                var keyPoints = {};
                var length = this.LineFeature.getGeometry().getCoordinates().length;
                refreshPoint();
                this.LineFeature.getGeometry().on("change", function(e) {
                    areaList = e.target.getCoordinates();
                    if(length == e.target.getCoordinates().length) { //假如相同，更改关键点坐标
                        if(self.parent.mouseXY) {
                            var closestFeature = self.parent.pointLayer.getSource().getClosestFeatureToCoordinate(self.parent.mouseXY);
                            setPoint(closestFeature, self.parent.mouseXY);
                        }
                    } else {
                        removePoint();
                        refreshPoint();
                        length = e.target.getCoordinates().length;
                    }
                });
                var setPoint = function(feature, coord) {
                    if(feature) {
                        if(self.LineFeature.getId() == feature.get("lineId")) {
                            feature.getGeometry().setCoordinates(coord);
                            if(feature.get("data") != undefined) {
                                //							console.log("当前移动的是关键点")
                                self.selectPoint = feature;
                            } else {
                                self.selectPoint = null;
                            }
                        }
                    }
                };
                var removePoint = function() {
                    points.forEach(function(t, i) {
                        self.parent.pointLayer.getSource().removeFeature(t);
                    });
                    points.clear();
                };

                function refreshPoint() {
                    areaList.forEach(function(t, i) {
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(t),
                        });
                        var data = {
                            "lineId": self.LineFeature.getId(),
                            "coord": t
                        };
                        iconFeature.set("index", i);
                        iconFeature.set("lineId", self.LineFeature.getId());
                        iconFeature.set("data", data);
                        points.push(iconFeature);
                        self.parent.pointLayer.getSource().addFeature(iconFeature);
                    });
                    for(var p in keyPoints) {
                        self.setKeyPoint(keyPoints[p]);
                    }
                };
                this.clear = function() {
                    removePoint();
                    keyPoints = {};
                    this.parent = null;
                    this.LineFeature = null;
                }
                this.setKeyPoint = function(data) {
                    points.forEach(function(t, i) {
                        if(t.getGeometry().getCoordinates()[0] == data.xyz[0] && t.getGeometry().getCoordinates()[1] == data.xyz[1]) {
                            t.setStyle(new ol.style.Style({
                                image: new ol.style.Circle({
                                    radius: 8,
                                    fill: new ol.style.Fill({
                                        color: 'red'
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'black',
                                        width: 2
                                    })
                                })
                            }));
                            t.set("data", data);
                            t.set("name", data.name);
                            t.setId(data.id);
                        };
                    });
                    keyPoints[data.id] = data;
                }
                this.removeKeyPoint = function(data) {
                    points.forEach(function(t, i) {
                        if(t.getGeometry().getCoordinates()[0] == data.xyz[0] && t.getGeometry().getCoordinates()[1] == data.xyz[1]) {
                            t.setStyle(null);
                            var obj = {
                                "lineId": self.LineFeature.getId(),
                                "coord": t.getGeometry().getCoordinates()
                            };
                            t.set("lineId", self.LineFeature.getId());
                            t.set("data", obj);
                            t.setId(undefined);
                            t.unset("name");
                        }
                    });
                    delete keyPoints[data.id];
                }
            },
            roadList: [],
            Road: function(roadName, lineStyle, pointStyle) {
                var self = this;
                this.roadName = roadName;
                this.lineFeatures = new ol.Collection();
                this.pointFeatures = new ol.Collection();
                this.groupList = {};
                this.mouseXY = null;
                this.LineStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({ //区域线条
                        lineDash: [4, 10],
                        color: lineStyle || 'red',
                        width: 5
                    })
                });
                this.PointStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: pointStyle || 'yellow',
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'white',
                            width: 1
                        })
                    })
                });
                this.lineLayer = new ol.layer.Vector({
                    name: roadName,
                    selectable: true,
                    source: new ol.source.Vector({
                        features: self.lineFeatures
                    }),
                    style: self.LineStyle
                });
                this.pointLayer = new ol.layer.Vector({
                    name: roadName,
                    selectable: false,
                    source: new ol.source.Vector({
                        features: self.pointFeatures
                    }),
                    style: self.PointStyle
                });
                this.pointLayer.on("singleclick", function(e) {
                    console.log(e)
                })
                this.draw_interaction = new ol.interaction.Draw({
                    features: self.lineFeatures,
                    type: "LineString"
                });
                this.select_interaction = new ol.interaction.Select({
                    layers: function(vector_layer) {
                        if(self.ifModify == true) {
                            if(vector_layer.get('selectable') === true) {
                                mapData._baseMap.addInteraction(self.modify_interaction);
                                addModify();

                            } else if(vector_layer.get('selectable') === false) {
                                mapData._baseMap.removeInteraction(self.modify_interaction);
                                removeModify();
                            }
                        }
                        return vector_layer && vector_layer.get('name') === self.roadName;
                    },
                    style: function(feature) {
                        var sty = self.selectStyle(feature);
                        return sty;
                    }
                });
                this.modify_interaction = new ol.interaction.Modify({
                    features: self.select_interaction.getFeatures(),
                    pixelTolerance: 5,
                    deleteCondition: function(event) {
                        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
                    }
                });
                var _ifDraw = false;
                Object.defineProperty(this, "ifDraw", {
                    get: function() {
                        return _ifDraw;
                    },
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            _ifDraw = val;
                            if(val) {
                                self.select_interaction.getFeatures().clear();
                                mapData._baseMap.addInteraction(this.draw_interaction);
                            } else {
                                mapData._baseMap.removeInteraction(this.draw_interaction);
                            }
                        }
                    }
                });
                var _ifModify = false;
                Object.defineProperty(this, "ifModify", { //控制整个路网的编辑功能
                    get: function() {
                        return _ifModify;
                    },
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            if(_ifModify == val) {
                                return;
                            }
                            _ifModify = val;
                            if(val) {
                                mapData._baseMap.addInteraction(this.modify_interaction);
                                addModify();
                            } else {
                                mapData._baseMap.removeInteraction(this.modify_interaction);
                                removeModify();
                            }
                        }
                    }
                });
                var _ifSelect = false;
                Object.defineProperty(this, "ifSelect", {
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            if(_ifSelect == val) {
                                return;
                            }
                            _ifSelect = val;
                            if(val) {
                                mapData._baseMap.addInteraction(this.select_interaction);
                            } else {
                                mapData._baseMap.removeInteraction(this.select_interaction);
                            }
                        }
                    }
                });
                var modify = this.modify_interaction.on(Event.MODIFY_EVENT, function(e) { //TODO
                    // var keyPoint = self.groupList[e.features.getArray()[0].getId()].selectPoint;
                    // if(keyPoint) {
                    // 	CustomEvent.fireEvent("modify", {
                    // 		id: keyPoint.getId(),
                    // 		coord: keyPoint.getGeometry().getCoordinates()
                    // 	})
                    // }
                });
                this.addRoad = function(road, data) { //添加单挑路线
                    //				var feature = (new ol.format.GeoJSON()).readFeature(road, {
                    //				    featureProjection: 'EPSG:3857'
                    //			    });
                    //             feature.set("data",data);
                    var points = new ol.geom.LineString(road);
                    var feature = new ol.Feature({
                        geometry: points,
                        name: data.name,
                        data: data,
                        id:data.id
                    });
                    var mb = self.lineLayer.getSource();
                    feature.setId(data.id);
                    mb.addFeature(feature);
                    var group = new roadNet.roadPoint(feature, self);
                    self.groupList[data.id] = group;
                };
                this.addKeyPoint = function(id, obj) {
                    var group = self.groupList[id]
                    if(group != undefined) {
                        group.setKeyPoint(obj);
                    }
                };
                this.removeKeyPoint = function(id, obj) {
                    var group = self.groupList[id]
                    if(group != undefined) {
                        group.removeKeyPoint(obj);
                    }
                };
                this.refreshFeature = function(feature, data) {
                    feature.setId(data.id);
                    feature.data = data;
                    feature.set("name", data.name);
                    var group = new roadNet.roadPoint(feature, self);
                    self.groupList[data.id] = group;
                };
                this.deleteRoadById = function(id) {
                    var selected_features = self.select_interaction.getFeatures()
                    if(selected_features.getLength() > 0) {
                        selected_features.forEach(function(selected_feature) {
                            selected_features.remove(selected_feature);
                            var group = self.groupList[selected_feature.getId()]
                            self.lineLayer.getSource().removeFeature(group.LineFeature);
                            group.clear();
                        });
                    } else {
                        self.lineLayer.getSource().getFeatures().forEach(function(feature) {
                            if(feature.getId() == undefined) {
                                self.lineLayer.getSource().removeFeature(feature);
                            }
                        });
                    }
                };
                this.addEventListener = function(type, key, fn) {
                    var areaObj = {};
                    var interaction;
                    if(type == Event.DRAW_EVENT) {
                        var drawend = function(e) {
                            self.select_interaction.getFeatures().push(e.feature);
                            var areaList = e.feature.getGeometry().getCoordinates();
                            if(fn) {
                                fn(e.feature, areaList);
                            }
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, self.draw_interaction, type, key, drawend);
                    } else if(type == Event.SELECT_EVENT) {
                        var selected = function(e) {
                            var feature = e.deselected[0];
                            var sfeature = e.selected[0];
                            var areaObj = {};
                            if(e.deselected.length > 0) {
                                var obj = {
                                    "type": feature.getGeometry().getType(),
                                    "area": feature.getGeometry().getCoordinates(),
                                    "name": feature.get("name"),
                                    "id": feature.getId(),
                                    "self": feature,
                                    "data": feature.get("data")
                                }
                                areaObj.unSelect = obj;
                            }
                            if(e.selected.length > 0) {
                                var obj = {
                                    "type": sfeature.getGeometry().getType(),
                                    "area": sfeature.getGeometry().getCoordinates(),
                                    "name": sfeature.get("name"),
                                    "id": sfeature.getId(),
                                    "self": sfeature,
                                    "data": sfeature.get("data"),
                                    "lineData": (sfeature.getGeometry().getType() == "Point") ? {
                                        "id": sfeature.get("lineId"),
                                        "name": self.groupList[sfeature.get("lineId")].LineFeature.get("name"),
                                        "coords": self.groupList[sfeature.get("lineId")].LineFeature.getGeometry().getCoordinates()
                                    } : null
                                }
                                areaObj.select = obj;
                            }
                            fn(areaObj);
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, getInteraction(type), type, key, selected);
                    } else if(type == Event.MODIFY_EVENT) {
                        var modified = function(e) {
                            fn(self, e.features);
                        }
                        CustomEvent.addEventListener.call(self.addEventListener, self.modify_interaction, type, key, modified);
                    } else if(type == "modifyKeyPoint") {
                        CustomEvent.addEvent("modify", fn);
                    }
                };
                this.removeEventListener = function(type, key) {
                    if(getInteraction(type)) {
                        CustomEvent.removeEventListener.call(self.removeEventListener, getInteraction(type), type, key);
                    } else {
                        CustomEvent.removeEvent(type);
                    }

                };
                this.selectStyle = function(feature) {
                    var type = feature.getGeometry().getType();
                    var fill = new ol.style.Fill({
                        color: 'rgba(255,255,255,0.4)'
                    });
                    var stroke = new ol.style.Stroke({
                        color: '#3399CC',
                        width: 5
                    });
                    var styles = [
                        new ol.style.Style({
                            image: new ol.style.Circle({
                                fill: fill,
                                stroke: stroke,
                                radius: 5
                            }),
                            fill: fill,
                            stroke: stroke
                        })
                    ];
                    if(type == "Point") {
                        styles[0] = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 8,
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 0, 0.5)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'black',
                                    width: 2
                                })
                            })
                        });
                    }
                    return styles[0];
                };
                var addModify = function() {
                    self.modify_interaction.on("modifystart", modifyStart);
                    self.modify_interaction.on("modifyend", modified);
                }
                var removeModify = function() {
                    self.modify_interaction.un("modifystart", modifyStart);
                    self.modify_interaction.un("modifyend", modified);
                }
                var modifyStart = function(e) {
                    mapData._baseMap.on('pointermove', pointMove);
                };
                var modified = function(e) {
                    mapData._baseMap.un('pointermove', pointMove);
                    self.mouseXY = null;
                };
                var pointMove = function(e) {
                    self.mouseXY = e.coordinate;
                };
                this.clear = function() {
                    self.lineFeatures.clear();
                    self.pointFeatures.clear();
                    self.lineLayer.getSource().clear();
                    self.pointLayer.getSource().clear();
                    self.ifDraw = false;
                    self.ifModify = false;
                    self.ifSelect = false;
                };

                function getInteraction(type) {
                    var interaction;
                    if(type == Event.DRAW_EVENT) {
                        interaction = self.draw_interaction;
                    } else if(type == Event.SELECT_EVENT) {
                        interaction = self.select_interaction;
                    } else if(type == Event.MODIFY_EVENT) {
                        interaction = self.modify_interaction;
                    }
                    return interaction;
                };
                this.setStyle = function(color1) {
                    self.LineStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: color1,
                            width: 5
                        })
                    });
                    self.PointStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 8,
                            fill: new ol.style.Fill({
                                color: color1 || 'yellow'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'gray',
                                width: 2
                            })
                        })
                    });
                    self.lineLayer.setStyle(self.LineStyle);
                    self.pointLayer.setStyle(self.PointStyle);
                };
                this.setVisible = function(boo) {
                    if(typeof(boo) == "boolean") {
                        self.lineLayer.setVisible(boo);
                        self.pointLayer.setVisible(boo);
                    }
                };
            },
        }
        /************************样式*************************************/
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
        /***********************************弹窗******覆盖物模块及事件***************************************************************/
        var cover = {};
        cover = {
            Marker: function(data) {
                var self = this;
                this.coordinate = data.coordinate; //标签坐标
                this.subtype = data.subtype; //类别id
                this.id = data.id; //标签id
                this.data = data;
                this.name = data.name;
                this.feature = new ol.Feature({
                    geometry: new ol.geom.Point(data.coordinate),
                });
                this.feature.setId(this.id);

                /*			this.select_interaction = new ol.interaction.Select({
							condition: ol.events.condition.click,
							style: function(feature) {
								console.log("--")
								return pool.getStyleById(self.subtype);
							}
						});
						var _ifSelect = false;
						Object.defineProperty(this, "ifSelect", {
							set: function(val) {
								if(typeof val != "boolean") {
									throw new Error("invalid value")
								} else {
									if(_ifSelect == val) {
										return;
									}
									_ifSelect = val;
									if(val) {
										mapData._baseMap.addInteraction(this.select_interaction);
									} else {
										mapData._baseMap.removeInteraction(this.select_interaction);
									}
								}
							}
						});*/
                /**
                 * 名称字体大小
                 */
                var _size = 12;
                    Object.defineProperty(this, "size", {
                    set: function(val) {
                        if(typeof val != "number") {
                            throw new Error("invalid value")
                        } else {
                            _size = val;
                            if(val) {
                                showName(true)
                            }
                        }
                    }
                });
                var _ifShowName = false;
                Object.defineProperty(this, "showName", {
                    get: function() {
                        return _ifShowName;
                    },
                    set: function(val) {
                        if(typeof val != "boolean") {
                            throw new Error("invalid value")
                        } else {
                            _ifShowName = val;
                            if(val) {
                                showName(true);
                            } else {
                                showName(false);
                            }
                        }
                    }
                });
                var _scale = data.scale;
                Object.defineProperty(this, "scale", {
                    get: function() {
                        return _scale;
                    },
                    set: function(val) {
                        if(typeof val != "number") {
                            throw new Error("invalid value")
                        } else {
                            _scale = val;
                            var style = this.style;
                            var image = style.getImage();
                            image.setScale(_scale);
                            self.feature.setStyle(style);
                        }
                    }
                });
                this.style = pool.getStyleById(self.subtype) ? pool.getStyleById(self.subtype).clone() : new ol.style.Style({
                    image: new ol.style.Icon({
                        src: self.data.url
                    })
                });
                this.moveEvent = function(callBack, evt) {
                    callBack(evt)
                };
                this.mouseOver = function(callBack) {
                    MapEvent.initMove()
                    CustomEvent.addEvent("iconOver", function(data){
                        callBack(data);
                    });
                }

                function showName(val) {
                    var width = self.data.url.match(/[0-9]+/g);
                    width = width ? width[0] : 1;
                    var text = new ol.style.Text({
                        text: self.name,
                        fill: new ol.style.Fill({
                            color: "#fff"
                        }),
                        font: _size + "px sans-serif",
                        offsetX: '0',
                        offsetY: -width / 2 - _size / 2 + 37,
                        stroke: new ol.style.Stroke({
                            color: '#000',
                            width: 5
                        })
                    });
                    if(val) {
                        self.style.setText(text);
                        self.feature.setStyle(self.style);
                        self.style.setZIndex(9999)
                    } else {
                        //					self.feature.setStyle(null);
                        self.style.setText(null);
                        self.feature.setStyle(self.style);
                    }
                };
                this.onclick = function(fn) {
                    var areaObj = {};
                    var interaction;
                    type = Event.SELECT_EVENT;
                    if(type == Event.SELECT_EVENT) {
                        var selected = function(e) {
                            if(e.data.feature.getId() == self.id) {
                                fn(self)
                            }
                        }
                        CustomEvent.addEvent("click", selected);
                    }
                };
                /**
                 * 移除事件
                 */
                this.unclick = function() {
                    CustomEvent.removeEvent("click");
                };
                this.setRotation = function(rotation) {
                    var style = pool.getStyleById(self.subtype);
                    var image = style.getImage();
                    image.setRotation(rotation);
                    self.feature.setStyle(style);
                };
                this.setUrl = function(url) { //*******
                    this.data.url = url;
                    if(self.feature) {
                        self.feature.getStyle().setImage(new ol.style.Icon({
                            src: url
                        }))
                    };
                    if(_ifShowName) {
                        showName(true);
                    }
                }
                this.setPosition = function(geo) {
                    if(!(geo instanceof Array)) {
                        throw new Error("the type of parameter is wrong!")
                        return;
                    }
                    self.feature.setGeometry(new ol.geom.Point(geo));
                };
                this.setStyle = function(iconStyle) {
                    this.feature.setStyle(iconStyle);
                };
                this.clear = function() {
                    pool.removeIcon(self.id);
                    CustomEvent.removeEvent("click");
                };
                if(this.scale) {
                    this.scale = data.scale;
                }
            },
            popList: [],
            Popup: function(container, coord, id0) {
                var self = this;
                this.overlay = new ol.Overlay({
                    id: id0,
                    element: container,
                    offset: [-60, -72],
                    stopEvent: true, //当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false
                    autoPan: false,
                    position: coord,
                    autoPanAnimation: {
                        duration: 0.1,
                    }
                });
                this.getElement = function() {
                    return self.overlay.getElement();
                };
                this.getPosition = function() {
                    return self.overlay.getPosition();
                };
                this.setElement = function(item) {
                    self.overlay.setElement(item);
                };
                this.setPosition = function(coord) {
                    self.overlay.setPosition(coord);
                };
            },
            PopupNew: function(obj) {
                if(obj.container == undefined || obj.coord == undefined || obj.id == undefined) {
                    throw new Error("未定义的Element元素、坐标或ID")
                }
                var popData = {
                    "container": obj.container, //element对象
                    "coord": obj.coord, //墨卡托坐标
                    "id": obj.id, //覆盖物id
                    "positioning": obj.positioning ? obj.positioning : 'top-left', //设置偏移位置
                    "offset": (obj.offset) ? obj.offset : [0, 0], //偏移量，第一个元素是水平偏移，第二个垂直偏移
                    "stopEvent": obj.stopEvent ? obj.stopEvent : false, //当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false
                    "autoPan": obj.autoPan ? obj.autoPan : false
                }
                var self = this;
                this.overlay = new ol.Overlay({
                    id: popData.id,
                    element: popData.container,
                    offset: popData.offset,
                    stopEvent: popData.stopEvent, //当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false
                    autoPan: popData.autoPan,
                    position: popData.coord,
                    positioning: popData.positioning,
                    autoPanAnimation: {
                        duration: 0.1,
                    }
                });
                this.getElement = function() {
                    return self.overlay.getElement();
                };
                this.getPosition = function() {
                    return self.overlay.getPosition();
                };
                this.setElement = function(item) {
                    self.overlay.setElement(item);
                };
                this.setPosition = function(coord) {
                    self.overlay.setPosition(coord);
                };
            }
        };
        /***********************************交互事件******注册拖动事件***************************************************************/
        var DragMediator;

        var MapEvent = {
            initMove: function() {
                mapData._baseMap.on('pointermove', mouseOver);
            }
        }

        function mouseOver(e) {
            var feature = e.map.forEachFeatureAtPixel(e.pixel, function(feature) {
                return feature;
            });
            if(feature) {
                var featureType = feature.getGeometry().getType();
                if(featureType == "Point") { //poi点
                    var icon = pool.getIconById(feature.getId());
                    if(icon) {
                        this.feature_ = icon;
                        icon.showName = true;
                        var iconLayer = pool.getLayerById(icon.subtype);
                        iconLayer.setZIndex(2);
                        CustomEvent.fireEvent("iconOver", {
                            icon: icon,
                            evt:e
                        })
                    }
                }
            }
        }

        function outMoveFunction(str) {

        }

        function Mediator() {
            this.coordinate_ = null;
            this.startCoordinate_ = new Array();
            this.cursor_ = 'pointer';
            this.feature_ = null;
            this.previousCursor_ = undefined;
        };
        Mediator.prototype.selectInteraction = new ol.interaction.Select({
            condition: ol.events.condition.click,
            filter: function(fea) {
                CustomEvent.fireEvent("click", {
                    feature: fea,
                })
            }
        });
        Mediator.prototype.moveInteraction = new ol.interaction.Pointer({ //TODO
            handleMoveEvent: function(event) {
                if(DragMediator.cursor_) {
                    var map = event.map;
                    var feature = map.forEachFeatureAtPixel(event.pixel,
                        function(feature) {
                            return feature;
                        });
                    var element = event.map.getTargetElement();
                    if(feature) {
                        var featureType = feature.getGeometry().getType();
                        if(element.style.cursor != DragMediator.cursor_) {
                            DragMediator.previousCursor_ = element.style.cursor;
                            element.style.cursor = DragMediator.cursor_;
                            if(featureType == "Point") { //poi点
                                var icon = pool.getIconById(feature.getId());
                                if(icon) {
                                    this.feature_ = icon;
                                    icon.showName = true;
                                    var iconLayer = pool.getLayerById(icon.subtype);
                                    iconLayer.setZIndex(2);
                                }
                            } else if(featureType == "Polygon") { //区域
                                outMoveFunction(true, feature, feature.get("name"));
                                this.feature_ = feature;
                            }
                        } else {
                            if(featureType == "Point" && this.feature_) { //在手型状态非同一poi点显示
                                var icon = pool.getIconById(feature.getId());
                                this.feature_.showName = false;
                                // var prevLayer = pool.getLayerById(this.feature_.subtype);
                                // prevLayer.setZIndex(1);
                                this.feature_ = icon;
                                icon.showName = true;
                                var iconLayer = pool.getLayerById(icon.subtype);
                                iconLayer.setZIndex(2);
                            }
                        }
                    } else if(DragMediator.previousCursor_ !== undefined) {
                        element.style.cursor = DragMediator.previousCursor_;
                        DragMediator.previousCursor_ = undefined;
                        if(this.feature_) {
                            if(this.feature_.constructor == cover.Marker) {
                                var icon = pool.getIconById(this.feature_.id);
                                var iconLayer = pool.getLayerById(icon.subtype);
                                iconLayer.setZIndex(1);
                                this.feature_.showName = false;
                            } else if(this.feature_.getGeometry().getType() == "Polygon") {
                                outMoveFunction(false, this.feature_)
                            }
                        }
                        this.feature_ = null;
                    }
                }
            }
        });
        Mediator.prototype.dragInteraction = new ol.interaction.Pointer({
            handleDownEvent: function(event) {
                var feature = mapData._baseMap.forEachFeatureAtPixel(event.pixel,
                    function(feature, layer) {
                        return feature;
                    });
                if(feature) {
                    var featureType = feature.getGeometry().getType();
                    if(featureType == "Point") {
                        var icon = pool.getIconById(feature.getId());
                        DragMediator.feature_ = icon;
                    }
                    DragMediator.coordinate_ = event.coordinate;
                    DragMediator.startCoordinate_[0] = event.coordinate[0];
                    DragMediator.startCoordinate_[1] = event.coordinate[1];
                    //				DragMediator.feature_ = feature;
                }
                return !!feature;
            },
            handleDragEvent: function(event) {
                var deltaX = event.coordinate[0] - DragMediator.coordinate_[0];
                var deltaY = event.coordinate[1] - DragMediator.coordinate_[1];
                if(DragMediator.feature_!= null){
                    if(DragMediator.feature_.constructor == cover.Marker) {
                        var geometry = DragMediator.feature_.feature.getGeometry();
                        geometry.translate(deltaX, deltaY);
                        DragMediator.coordinate_[0] = geometry.getCoordinates()[0];
                        DragMediator.coordinate_[1] = geometry.getCoordinates()[1];
                    }
                }
            },
            handleMoveEvent: function(event) {
                if(DragMediator.cursor_) {
                    var map = event.map;
                    var feature = map.forEachFeatureAtPixel(event.pixel,
                        function(feature) {
                            return feature;
                        });
                    var element = event.map.getTargetElement();
                    if(feature) {
                        if(element.style.cursor != DragMediator.cursor_) {
                            DragMediator.previousCursor_ = element.style.cursor;
                            element.style.cursor = DragMediator.cursor_;
                        }
                    } else if(DragMediator.previousCursor_ !== undefined) {
                        element.style.cursor = DragMediator.previousCursor_;
                        DragMediator.previousCursor_ = undefined;
                    }
                }
            },
            handleUpEvent: function(event) {
                if(Math.abs(parseFloat(DragMediator.startCoordinate_[0]) - parseFloat(DragMediator.coordinate_[0])) > 0 || Math.abs(parseFloat(DragMediator.startCoordinate_[1]) - parseFloat(DragMediator.coordinate_[1])) > 0) {
                    if(DragMediator.feature_.constructor == cover.Marker) {
                        CustomEvent.fireEvent("dragup", {
                            marker: DragMediator.feature_,
                            data: DragMediator.feature_.data,
                            start: DragMediator.startCoordinate_,
                            end: DragMediator.coordinate_
                        })
                    }
                }
                DragMediator.coordinate_ = null;
                DragMediator.feature_ = null;
                return false;
            }
        });
        //****************************//
        function flight(obj) {
            var defaultData = {
                "color": "rgb(255, 255, 0)",
                "width": 5,
                "zIndex": 1,
                "coords": [
                    [
                        [13364145.820212746, 3538938.2661540206],
                        [13364157.166334132, 3539224.9050100897],
                        [13363895.011213686, 3539177.1318674115]
                    ]
                ],
                "id": "axxxxx",
                "timeout": 50,
                "pointsPerMs": 0.001
            }
            this.option = $.extend(true, defaultData, obj);
            var self = this;
            this.flightStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: this.option.color,
                    width: this.option.width
                }),
                zIndex: this.option.zIndex
            });
            this.pointsPerMs = this.option.pointsPerMs;
            this.flightsLayer = new ol.layer.Vector({});
            this.flightsLayer.setStyle(function(feature) {
                if(feature.get('finished')) {
                    return self.flightStyle;
                } else {
                    return null;
                }
            });
        };
        //	flight.prototype.flightsSource = {};
        flight.prototype.transformArr = function(list) {
            var datalist = new Array();
            for(var i = 0; i < list.length; i++) {
                var obj = list[i];
                var arr = [parseFloat(obj.x), parseFloat(obj.y)];
                datalist.push(arr);
            }
            return datalist;
        };
        flight.prototype.addFlight = function() {
            var self = this;
            var flightsData = this.option.coords;
            this.flightsSource = new ol.source.Vector({
                wrapX: false,
                loader: function() {
                    for(var i = 0; i < flightsData.length; i++) {
                        var coords = flightsData[i];
                        var line = new ol.geom.LineString(coords);
                        var feature = new ol.Feature({
                            geometry: line,
                            finished: false
                        });
                        self.addLater(feature, 50);
                    }
                    mapData._baseMap.on('postcompose', function(event) { /********回调函数this则为openlayer的东西**********/
                    var vectorContext = event.vectorContext;
                        var frameState = event.frameState;
                        vectorContext.setStyle(self.flightStyle);
                        var features = self.flightsSource.getFeatures();
                        for(var i = 0; i < features.length; i++) {
                            var feature = features[i];
                            if(!feature.get('finished')) {
                                var coords = feature.getGeometry().getCoordinates();
                                var elapsedTime = frameState.time - feature.get('start');
                                var elapsedPoints = elapsedTime * self.pointsPerMs;

                                if(elapsedPoints >= coords.length) {
                                    feature.set('finished', true);
                                }
                                var maxIndex = Math.min(elapsedPoints, coords.length);
                                var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
                                vectorContext.drawGeometry(currentLine);
                            }
                        }
                        mapData._baseMap.render();
                    });
                }
            });
            this.flightsLayer.setSource(this.flightsSource);
            mapData._baseMap.addLayer(this.flightsLayer);
        };
        flight.prototype.addLater = function(feature, timeout) {
            var self = this;
            window.setTimeout(function() {
                feature.set('start', new Date().getTime());
                self.flightsSource.addFeature(feature);
            }, timeout);
        };
        flight.prototype.removeFlights = function() {
            this.flightsSource.clear();
            mapData._baseMap.removeLayer(this.flightsLayer);
        };
        /**************************************************/
        var Anime = {
            GuideLine: function(obj) {
                var defaultData = {
                    "id": obj.id, //覆盖物id
                    "repeat": obj.repeat ? obj.repeat : 0,
                    "number": obj.number || 1, //个数
                    "coords": obj.coords ? obj.coords : [], //设置偏移位置
                    "speed": obj.speed || 1,
                    "num": obj.num ? obj.num : 1,
                    "src": obj ? obj.src : 'https://openlayers.org/en/v4.6.5/examples/data/arrow.png'
                }
                if(defaultData.number >= defaultData.coords.length) {
                    throw new Error("个数值错误！")
                }
                var self = this;
                this.data = defaultData;
                this.source = new ol.source.Vector();

                this.guideLayer = new ol.layer.Vector({
                    source: this.source,
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            src: self.data.src,
                            anchor: [0.25, 0.5],
                        })
                    })
                });
                this.ctList = [];
                init();

                function init() {
                    for(var i = 0; i < self.data["number"]; i++) {
                        var geoMarker = new ol.Feature({
                            type: 'geoMarker',
                            name: "aaaaa" + i,
                            geometry: new ol.geom.Point(this.data["coords"][i])
                        });
                        self.source.addFeature(geoMarker);
                        var ct = new Ct(geoMarker);
                        self.ctList.push(ct);
                    }
                }
                var routeLength = obj.coords.length;

                function Ct(g) { //单个动画对象
                    this.feature = g;
                    this.speed = self.data["speed"];
                    this.animating = false;
                }
                Ct.prototype.startAnimation = function(num) { //方法 执行动画开始
                    var ct = this;
                    if(this.animating) {
                        stopAnimation(false);
                    } else {
                        this.animating = true;
                        now = new Date().getTime();
                        speed = self.data["speed"];
                        this.feature.setStyle(null);
                        mapData._baseMap.on('postcompose', function(event) {
                            var vectorContext = event.vectorContext;
                            var frameState = event.frameState;
                            if(ct.animating) {
                                var elapsedTime = frameState.time - now;
                                var index = (Math.round(self.data.speed * elapsedTime / 1000) % routeLength + num) % routeLength;
                                var currentPoint = new ol.geom.Point(self.data["coords"][index]);
                                if(index > 0 && index < routeLength - 1) {
                                    var start = self.data["coords"][index];
                                    var end = self.data["coords"][index + 1];
                                    var dx = end[0] - start[0];
                                    var dy = end[1] - start[1];
                                    var rotation = Math.atan2(dy, dx);

                                    var jiaodu = rotation ? -rotation : 0;
                                    var iconStyle = self.guideLayer.getStyle().clone();
                                    iconStyle.getImage().setRotation(jiaodu);
                                    ct.feature.setStyle(iconStyle);
                                    ct.feature.setGeometry(currentPoint);
                                }
                            }
                            mapData._baseMap.render();
                        });
                        mapData._baseMap.render();
                    }
                }
                Ct.prototype.stopAnimation = function() {
                    self.animating = false;
                    mapData._baseMap.un('postcompose', moveFeature);
                };
                Ct.prototype.clear = function() {
                    self.source.removeFeature(this.feature)
                };
                this.runMove = function() {
                    mapData._baseMap.addLayer(this.guideLayer)
                    for(var i = 0; i <= this.ctList.length - 1; i++) {
                        self.ctList[i].startAnimation(i * parseInt(self.data.num));
                    }
                };
                this.clear = function() {
                    for(var i = 0; i <= this.ctList.length - 1; i++) {
                        self.ctList[i].clear();
                    }
                    mapData._baseMap.removeLayer(this.guideLayer)
                }
            },
            spread: function(obj) { //波纹动画
                var defaultData = {
                    "style": "rgb(255, 0, 0)",
                    "speed": 3000,
                    "minSize": 5,
                    "maxSize": 25,
                    "coords": [13364044.449170806, 3539107.447381932],
                    "id": "axxxxx",
                    "repeat": 1,
                    "number": 3,
                    "loop": true ///是否循环
                }
                var option = $.extend(true, defaultData, obj);
                this.id = defaultData.id;
                var duration = option.speed;
                var coord = new ol.geom.Point(defaultData.coords)
                flash(coord);

                function flash(g) {
                    var start = new Date().getTime();
                    var listenerKey;

                    function animate(event) {
                        var vectorContext = event.vectorContext;
                        var frameState = event.frameState;
                        var flashGeom = g.clone();
                        var elapsed = frameState.time - start;
                        var elapsedRatio = elapsed / duration;
                        // radius will be 5 at start and 30 at end.
                        var radius = ol.easing.easeOut(elapsedRatio) * defaultData.maxSize + defaultData.minSize;
                        var opacity = ol.easing.easeOut(1 - elapsedRatio);

                        var style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: radius,
                                snapToPixel: false,
                                stroke: new ol.style.Stroke({
                                    color: 'rgba(255, 0, 0, ' + opacity + ')',
                                    width: 0.25 + opacity
                                })
                            })
                        });

                        vectorContext.setStyle(style);
                        vectorContext.drawGeometry(flashGeom);
                        if(elapsed > duration) {
                            ol.Observable.unByKey(listenerKey);
                            repeat();
                            return;
                        }
                        // tell OpenLayers to continue postcompose animation
                        mapData._baseMap.render();
                    }
                    listenerKey = mapData._baseMap.on('postcompose', animate);
                };

                function repeat() {
                    flash(coord);
                }
                mapData._baseMap.render();
            }
        };
        var geom = { //TODO 线条绘制
            LineBoard: function(obj) {
                var self = this;
                this.lineFeatures = new ol.Collection();
                this.glow = new ol.Collection();
                this.lineLayer = new ol.layer.Vector({
                    selectable: true,
                    source: new ol.source.Vector({
                        features: self.lineFeatures
                    })
                });
                mapData._baseMap.addLayer(this.lineLayer);

                this.addLine = function(obj) {
                    var defaultData = {
                        "color": "rgb(255, 255, 0)",
                        "width": 5,
                        "coords": []
                    };
                    //				var option = $.extend(true, defaultData, obj);
                    var option = {
                        "color": obj.color ? obj.color : defaultData.color,
                        "width": obj.width ? obj.width : defaultData.width,
                        "coords": obj.coords ? obj.coords : defaultData.coords
                    };
                    var points = new ol.geom.LineString(option.coords);
                    var feature = new ol.Feature({
                        geometry: points,
                        name: option.name,
                        data: option
                    });
                    var lineStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({ //区域线条
                            color: option.color,
                            width: option.width,
                            //						lineDash: [10, 10]
                        })
                    });
                    feature.setStyle(lineStyle);
                    var mb = self.lineLayer.getSource();
                    mb.addFeature(feature);
                };

                this.clear = function() {
                    self.lineLayer.getSource().clear();
                    mapData._baseMap.removeLayer(self.lineLayer);
                }
            }
        }
        //////////////*********************************************////////////////
        /**
         * 对象池
         */
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
            deleteLayerById: function(id) {
                for(var p in this.layers) {
                    if(p == id) {
                        delete this.layers[p];
                    }
                }
            },
            clearLayers: function() {
                for(var p in this.layers) {
                    this.layers[p].getSource().clear();
                    delete this.layers[p];
                }
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
            },
            eventList: {},
            getFunByKey: function(key) {
                for(var p in this.eventList) {
                    if(p == key) {
                        return this.eventList[p];
                    }
                }
            },
            removeFunByKey: function(type, key) {
                for(var p in this.eventList) {
                    if(p == key) {
                        if(type == Event.SINGLECLICK_EVENT || type == Event.DOUBLECLICK_EVENT) {
                            mapData._baseMap.un(type, this.eventList[p]);
                        } else if(type == Event.DRAW_EVENT) {
                            interaction.draw_interaction.un(type, this.eventList[p]);
                        } else if(type == Event.SELECT_EVENT) {
                            interaction.select_interaction.un(type, this.eventList[p]);
                        }
                        delete this.eventList[p];
                    }
                }
            },
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
            areaEvtList: {}, //Marker片区对象数组
            setSeedArea: function(id, marker) {
                this.areaEvtList[id] = marker;
            },
            getAreaById: function(id) {
                for(var p in this.areaEvtList) {
                    if(p == id) {
                        return this.areaEvtList[p];
                    }
                }
            },
            roadEvtList: {}, //Marker路网对象数组
            setSeedRoad: function(id, marker) {
                this.roadEvtList[id] = marker;
            },
            getRoadById: function(id) {
                for(var p in this.roadEvtList) {
                    if(p == id) {
                        return this.roadEvtList[p];
                    }
                }
            },
        };
        /**
         * 自定义事件对象
         */
        var CustomEvent = {
            _listeners: {},
            // 添加
            addEvent: function(type, fn) {
                if(typeof this._listeners[type] === "undefined") {
                    this._listeners[type] = [];
                }
                if(typeof fn === "function") {
                    this._listeners[type].push(fn);
                }
                return this;
            },
            // 触发
            fireEvent: function(type) {
                var arrayEvent = this._listeners[type];
                if(arrayEvent instanceof Array) {
                    for(var i = 0, length = arrayEvent.length; i < length; i += 1) {
                        if(typeof arrayEvent[i] === "function") {
                            arrayEvent[i]({
                                type: type,
                                data: arguments[1]
                            });
                        }
                    }
                }
                return this;
            },
            // 删除
            removeEvent: function(type, fn) {
                var arrayEvent = this._listeners[type];
                if(typeof type === "string" && arrayEvent instanceof Array) {
                    if(typeof fn === "function") {
                        // 清除当前type类型事件下对应fn方法
                        for(var i = 0, length = arrayEvent.length; i < length; i += 1) {
                            if(arrayEvent[i] === fn) {
                                this._listeners[type].splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                        delete this._listeners[type];
                    }
                }
                return this;
            },
            eventList: {},
            addEventListener: function(obj, type, key, fn) {
                // if(CustomEvent.eventList[key] != undefined) {
                //     return;
                // }
                this.obj = obj;
                this.type = type;
                this.fn = fn;
                this.key = key;
                this.obj.on(this.type, this.fn);
                CustomEvent.eventList[key] = this.fn;
            },
            removeEventListener: function(obj, type, key) {
                for(var p in CustomEvent.eventList) {
                    if(p == key) {
                        obj.un(type, CustomEvent.eventList[p]);
                        delete CustomEvent.eventList[p];
                    }
                }
            }
        };

        function Signature(obj) { //TODO组合标签
            var option = {
                "id": obj.id ? obj.id : undefined,
                "urlList": obj.urlList ? obj.urlList : [],
                "coordinate": obj.coordinate ? obj.coordinate : []
            };
            var featureList = [];
            var source = new ol.source.Vector({});

            option.urlList.forEach(function(url, i) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(option.coordinate),
                });
                iconFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: url,
                        rotation: 0
                    })
                }));
                source.addFeature(iconFeature);
                featureList.push(iconFeature);
            });

            function clickFunction() {

            }
            /**
             * 移除事件
             */
            this.removeEventListener = function(type, key) {
                CustomEvent.removeEventListener.call(self.removeEventListener, getInteraction(type), type, key);
            };

        }

        function setRotation(list, num, rotation) {
            list.forEach(function(feature, i) {
                if(i == num) {
                    var style = feature.getStyle();
                    var image = style.getImage();
                    image.setRotation(rotation);
                    feature.setStyle(style);
                }
            });
        }
        /**
         * 同类型批量标签操作对象
         */
        function IconGroup(subType, url, idlist) {
            this.subType = subType;
            this.url = url;
            this.idlist = idlist;
        };

        return { //返回一个对象
            init: function(opt, rectifyData) {
                var defaultData = {
                    "olTileX": 54874,
                    "olTileY": 27040,
                    "centerX": 121.43497144063807,
                    "centerY": 29.995888023356642,
                    "path": "http://img.weyoo.cn/map/map_sec_zhejiang0131/map{z}/{x},{y}.jpg",
                    "webpPath": "http://img.weyoo.cn/map/map_sec_zhejiang0027ys/map{z}/{x},{y}.webp",
                    "curZoom": 16,
                    "minZoom": 16,
                    "maxZoom": 19
                }
                var option = $.extend(true, defaultData, opt);
                //opt和default要深拷贝后合并一次
                mapData.initMap(option);
                mapData.initRectify(rectifyData);
                CustomEvent.removeEvent("click");
                CustomEvent.removeEvent("dragup");
                CustomEvent.removeEvent("modify");
                CustomEvent.removeEvent("iconOver");
            },
            // init: function(opt, rectifyData) {
            //     $.ajax({
            //         type: "get",
            //         url: "/static/xxsd_mapData.json",
            //         async: false,
            //         success: function(data) {
            //             console.log(data);
            //             var obj = data.data;
            //             var mapdata = {
            //                 "olTileX": obj.olTileX,
            //                 "olTileY": obj.olTileY,
            //                 "centerX": obj.sceinitx,//120.07951802513782
            //                 "centerY": obj.sceinity,//30.267776483960148
            //                 "path": "/static/map_xxsd/map{z}/{x},{y}.jpg",
            //                 "curZoom": obj.scefit + obj.initlevel,
            //                 "minZoom": obj.scefit,
            //                 "maxZoom": obj.scefit + obj.zoom - 1
            //             }
            //             console.log(mapdata);
            //             maxZoom = mapdata.maxZoom;//设置最大缩放层级
            //             mapData.initMap(mapdata);//初始化地图
            //             mapData.initRectify(obj);
            //         },
            //         error: function(e) {
            //             console.log(333333);
            //         }
            //     });
            //     CustomEvent.removeEvent("click");
            //     CustomEvent.removeEvent("dragup");
            //     CustomEvent.removeEvent("modify");
            //     CustomEvent.removeEvent("iconOver");
            // },
            status: {
                _limitExtent: false,
                get limitExtent() {
                    return this._ifadded;
                },
                set limitExtent(val) {
                    if(typeof val != "boolean") {
                        throw new Error("invalid value")
                    } else {
                        stateVal.limitExtent = val;
                        this._limitExtent = val;
                    }
                }
            },
            map: {
                panTo: function(lat, lng) {
                    var view = mapData._mapView;
                    //				view.setCenter(ol.proj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857'));
                    view.animate({
                        center: ol.proj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857')
                    });
                    mapData._baseMap.render();
                },
                panToCoord: function(coord) {
                    var view = mapData._mapView;
                    //				view.setCenter(coord);
                    view.animate({
                        center: coord
                    });
                    mapData._baseMap.render();
                },
                zoomIn: function() {
                    var view = mapData._mapView;
                    //				view.setZoom(view.getZoom() + 1)
                    view.animate({
                        zoom: view.getZoom() + 1
                    });
                },
                zoomOut: function() {
                    var view = mapData._mapView;
                    //				view.setZoom(view.getZoom() - 1)
                    view.animate({
                        zoom: view.getZoom() - 1
                    });
                },
                setZoom: function(zoom) {
                    var view = mapData._mapView;
                    var num = mapData.InitData.minZoom + zoom - 1
                    //				view.setZoom(num)
                    view.animate({
                        zoom: num
                    });
                },
                getZoom: function() { //获取当前地图层级
                    var view = mapData._mapView;
                    return view.getZoom() - mapData.InitData.minZoom + 1;
                },
                panToWgs: function(lat, lng) { //地图视图切换到目标位置  标准经纬度
                    var pixel = dataManager.transGoogle.transWgToPixelInside(lat, lng);
                    var val = dataManager.trandata.transFromPixToLayer(pixel[0], pixel[1])
                    var view = mapData._baseMap.getView();
                    view.setCenter(val);
                    mapData._baseMap.render();
                },
                clear: function() {
                    pool.clearLayers();
//				mapData._baseMap.getLayers().clear();//清除所有图层
                }
            },
            interaction: {
                _ifShowFloat: false,
                set ifShowFloat(val) {
                    if(typeof val instanceof Boolean) {
                        throw new Error("invalid value")
                    } else {

                    }
                },
                _ifDrag: false,
                get ifDrag() {
                    return this._ifDrag;
                },
                set ifDrag(val) {
                    if(typeof(val) != "boolean") {
                        throw new Error("the type of parameter is not boolean!")
                    } else {
                        this._ifDrag = val;
                        if(val) {
                            if(!DragMediator) {
                                DragMediator = new Mediator();
                            }
                            mapData._baseMap.addInteraction(DragMediator.dragInteraction);
                        } else {
                            mapData._baseMap.removeInteraction(DragMediator.dragInteraction);
                        }
                    }
                },
                showMove: function() {
                    if(!DragMediator) {
                        DragMediator = new Mediator();
                    }
                    mapData._baseMap.addInteraction(DragMediator.moveInteraction);
                },
                _ifClick: false,
                set enableMapClick(val) {
                    if(typeof(val) != "boolean") {
                        throw new Error("the type of parameter is not boolean!")
                    } else {
                        this._ifClick = val;
                        if(val) {
                            if(!DragMediator) {
                                DragMediator = new Mediator();
                            }
                            mapData._baseMap.addInteraction(DragMediator.selectInteraction);
                        } else {
                            mapData._baseMap.removeInteraction(DragMediator.selectInteraction);
                        }
                    }
                },
            },
            layers: {
                addLayer: function(id, url) {
                    var iconlayer;
                    iconlayer = pool.getLayerById(id);
                    if(iconlayer == undefined) {
                        iconlayer = mapLayer.creatLayer(url, id);
                        mapData._baseMap.addLayer(iconlayer);
                        iconlayer.set('id', id);
                        iconlayer.setVisible(false);
                        pool.setSeedLayer(id, iconlayer);
                    }
                },
                removeLayer: function(id) {
                    var lay = pool.getLayerById(id);
                    if(lay != undefined) {
                        mapData._baseMap.removeLayer(lay);
                        lay.getSource().clear();
                        pool.deleteLayerById(id);
                    }
                },
                showLayer: function(id, visibility) {
                    var layer = pool.getLayerById(id);
                    if(layer) {
                        layer.setVisible(visibility);
                    }
                },
                getLayerById: function(id) {
                    var layer = pool.getLayerById(id);
                    return layer;
                },
                refreshLayer: function(obj) { //修改一个标签的url样式
                    this.unShowAllLayer();
                    for(var i in obj) {
                        pool.getLayerById(i).setVisible(true);
                        var layer = pool.getLayerById(i);
                        var features = layer.getSource().getFeatures();
                        features.forEach(function(feature, j) {
                            var style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: obj[i]
                                })
                            })
                            feature.setStyle(style);
                        });
                    }
                },
                unShowAllLayer: function() {
                    for(var i in pool.layers) {
                        pool.layers[i].setVisible(false);
                    }
                },
                showAllLayer: function() {
                    for(var i in pool.layers) {
                        pool.layers[i].setVisible(true);
                    }
                },
                addTestLayer: function(val) { //测试专用
                    var textLayer = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [new ol.Feature({
                                geometry: new ol.geom.Point(val)
                            })]
                        }),
                        style: new ol.style.Style({
                            text: new ol.style.Text({
                                text: feature.getProperties().data.name,
                                fill: new ol.style.Fill({
                                    color: '#fff'
                                }),
                                font: "12px"
                            })
                        })
                    });
                    textLayer.setZIndex(999);
                    mapData._baseMap.addLayer(textLayer);
                }
            },
            event: {
                on: function(type, fun) {
                    mapData._baseMap.on(type, fun);
                },
                addMouseEvent: function(type, key, mapClickCallBack) {
                    var fun;
                    // if(pool.eventList[key]) {
                    //     throw new Error("repeat value!")
                    //     return;
                    // }
                    if(type == "singleclick") {
                        if(typeof(mapClickCallBack) == "object") {
                            fun = function(evt) {
                                mapData._baseMap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                                    var attrs = feature.getProperties();
                                    if(typeof mapClickCallBack[attrs.name] == "function") {
                                        mapClickCallBack[attrs.name](evt, feature, layer, attrs);
                                    } else {
                                        console.warn("该图标暂时没有事件！");
                                    }
                                });
                            }
                            mapData._baseMap.on('singleclick', fun);
                        } else if(typeof(mapClickCallBack) == "function") {
                            fun = mapClickCallBack;
                            mapData._baseMap.on('singleclick', fun);
                        }
                    } else if(type == "dblclick") {
                        if(typeof(mapClickCallBack) == "function") {
                            fun = mapClickCallBack;
                            mapData._baseMap.on('dblclick', fun);
                        }
                    } else if(type == "pointermove") {
                        if(typeof(mapClickCallBack) == "function") {
                            fun = mapClickCallBack;
                            mapData._baseMap.on('pointermove', fun);
                        }
                    }
                    pool.eventList[key] = fun;
                    return fun;
                },
                removeEvent: function(type, key) {
                    pool.removeFunByKey(type, key);
                },
                addDrawEvent: function(type, key, fun) { //添加绘制完成事件
                    var areaObj = {};
                    if(pool.eventList[key] != undefined) {
                        return;
                    }
                    if(type == Event.DRAW_EVENT) {
                        var drawend = function(e) {
                            areaObj.areaList = e.feature.getGeometry().getCoordinates();
                            areaObj.id = "default";
                            e.feature.setId("default");
                            e.feature.data = areaObj;
                            if(fun) {
                                fun(areaObj);
                            }
                        }
                        interaction.draw_interaction.on(Event.DRAW_EVENT, drawend);
                        pool.eventList[key] = drawend;
                    } else if(type == Event.SELECT_EVENT) {
                        var selected = function(e) {
                            var feature = e.deselected[0];
                            var sfeature = e.selected[0];
                            var areaObj = {};
                            if(e.deselected.length > 0) {
                                var obj = {
                                    "area": feature.getGeometry().getCoordinates(),
                                    "name": feature.get("name"),
                                    "id": feature.getId()
                                }
                                areaObj.unSelect = obj;
                            }
                            if(e.selected.length > 0) {
                                var obj = {
                                    "area": sfeature.getGeometry().getCoordinates(),
                                    "name": sfeature.get("name"),
                                    "id": sfeature.getId()
                                }
                                areaObj.select = obj;
                            }
                            fun(areaObj);
                        }
                        select_interaction.on(Event.SELECT_EVENT, selected);
                        pool.eventList[key] = selected;
                    }
                },
                addZoomChange: function(key, fun, type) {
                    type = type ? type : "end";
                    if(pool.eventList[key]) {
                        return;
                    }
                    var first = true;
                    var callBack = function(e) {
                        if(this.getZoom() === Math.floor(this.getZoom())) {
                            first = true;
                            if(type == "end") {
                                fun(this.getZoom() - mapData.InitData.minZoom + 1);
                            }
                        } else {
                            if(type == "start") {
                                if(first) {
                                    fun();
                                    first = false;
                                }
                            }
                        }
                    }
                    mapData._baseMap.getView().on('change:resolution', callBack);
                    pool.eventList[key] = callBack;
                },
                removeZoomChange: function(key) {
                    if(pool.eventList[key] == undefined) {
                        return;
                    }
                    mapData._baseMap.getView().un('change:resolution', pool.eventList[key]);
                    delete pool.eventList[key];
                },
                DragEvent: function(backfun) {
                    if(typeof(backfun) != "function") {
                        throw new Error("the type of parameter is wrong!")
                    } else {
                        CustomEvent.addEvent("dragup", function(e) {
                            backfun(e);
                        });
                    }
                }
            },
            icon: {
                Marker: cover.Marker,
                addChild: function(icon) { //TODO 添加标签新入口
                    if(icon.constructor != cover.Marker) {
                        throw new Error("the type of parameter is wrong!");
                        return;
                    }
                    var layer = pool.getLayerById(icon.subtype);
                    // if(layer != null) {
                    //     if(layer.getSource().getFeatureById(icon.id) == null) {
                    //         layer.getSource().addFeature(icon.feature);
                    //     }
                    // } else {
                    //     layer = mapLayer.creatLayer(icon.data.url, icon.subtype);
                    //     mapData._baseMap.addLayer(layer);
                    //     pool.setSeedLayer(icon.subtype, layer);
                    //     layer.getSource().addFeature(icon.feature);
                    // }
                    layer = mapLayer.creatLayer(icon.data.url, icon.subtype);
                    mapData._baseMap.addLayer(layer);
                    pool.setSeedLayer(icon.subtype, layer);
                    layer.getSource().addFeature(icon.feature);
                    pool.setSeedIcon(icon.id, icon);
                    var iconLayer = pool.getLayerById(icon.subtype);
                    iconLayer.setZIndex(999);
                },
                removeChild: function(icon) //删除标签
                {
                    if(icon.constructor != cover.Marker) {
                        throw new Error("the type of parameter is wrong!");
                        return;
                    }
                    var layer = pool.getLayerById(icon.subtype);
                    if(layer) {
                        layer.getSource().removeFeature(icon.feature);
                        icon.clear();
                        icon = null;
                    }
                },

                /********************/
                addIcon: function(obj) { //subType标签所属图标类型id，url标签图标的url地址 ，obj标签包含的数据对象
                    var layer = pool.getLayerById(obj.subType);
                    var feature = mapLayer.addIcon(obj.coordinate, obj);
                    if(layer != null) {
                        if(layer.getSource().getFeatureById(obj.data.id) == null) {
                            layer.getSource().addFeature(feature);
                        }
                    } else {
                        layer = mapLayer.creatLayer(obj.url, obj.subType);
                        mapData._baseMap.addLayer(layer);
                        pool.setSeedLayer(obj.subType, layer);
                        layer.getSource().addFeature(feature);
                    }
                },
                addIconList: function(list) {
                    list.forEach(function(t, i) {
                        var layer = pool.getLayerById(t.subtype);
                        var feature = mapLayer.addIcon(t.coordinate, t);
                        if(layer != null) {
                            if(layer.getSource().getFeatureById(t.data.id) == null) {
                                layer.getSource().addFeature(feature);
                            }
                        } else {
                            layer = mapLayer.creatLayer(t.url, t.subtype);
                            pool.setSeedLayer(t.subtype, layer);
                            layer.getSource().addFeature(feature);
                        }
                    });
                    mapLayer.addLayers();
                },
                removeIcon: function(subtype, id) {
                    var layer = pool.getLayerById(subtype);
                    var feature = pool.getIconById(id);
                    if(layer != null) {
                        if(feature.feature != null) {
                            pool.removeIcon(id);
                            layer.getSource().removeFeature(feature.feature);
                            // layer.getSource().removeFeature(layer.getSource().getFeatureById(id));
                        }
                    }
                },
                showLayer: function(id, visibility) {
                    var layer = pool.getLayerById(id);
                    if(layer) {
                        layer.setVisible(visibility);
                    }
                },
                getIconDataByEvt: function(evt) {
                    var data = mapData._baseMap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                        var feature = mapData._baseMap.forEachFeatureAtPixel(evt.pixel, function(feature) {
                            return feature;
                        });
                        if(feature) {
                            var attrs = feature.getProperties();
                            return attrs;
                        }
                    });
                    return data;
                },
                getIconById: function(id) { //***********
                    var feature = pool.getIconById(id);
                    if(feature) {
                        var attrs = feature.getProperties();
                        return attrs;
                    }
                },
                IconStyleById: function(id,visibility) { //*******
                    var feature = pool.getIconById(id);
                    var url =feature.data.url
                    if(feature) {
                        if(visibility){
                            feature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [0.5, 0.5],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'fraction',
                                    opacity: 1,
                                    src: url
                                })
                            }));
                        }else {
                            feature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [0.5, 0.5],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'fraction',
                                    opacity: 0,
                                    src: url
                                })
                            }));
                        }
                    }
                },
                setIconStyleById: function(id, url) { //*******
                    var feature = pool.getIconById(id);
                    if(feature) {
                        feature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                src: url
                            })
                        }));
                    }
                },
                setIconStyleById1: function(id, url) { //*******更新标签样式
                    var feature = pool.getIconById(id);
                    if(feature) {
                        var style = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: url
                            })
                        })
                        var textStyle = new ol.style.Text({ //文本样式
                            font: '12px Calibri,sans-serif',
                            fill: new ol.style.Fill({
                                color: '#000'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#fff',
                                width: 3
                            }),
                            text: "哈哈哈 测试专用",
                            offsetY: 22
                        });
                        style.setText(textStyle);
                        feature.setStyle(style);
                    }
                },
                setFeatureGeo: function(feature, geo) {
                    if(!(geo instanceof Array)) {
                        throw new Error("the type of parameter is wrong!")
                        return;
                    }
                    feature.setGeometry(new ol.geom.Point(geo));
                },
                addFeatureGroup: function(id, urlList, coordinate) {
                    var layer = new ol.layer.Vector({
                        source: new ol.source.Vector({})
                    });
                    mapData._baseMap.addLayer(layer); //添加一个标签图层组

                    var featureList = [];

                    urlList.forEach(function(url, i) {
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(coordinate),
                        });
                        iconFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                src: url,
                                rotation: 0
                            })
                        }));
                        layer.getSource().addFeature(iconFeature);
                        featureList.push(iconFeature);
                    });
                    return featureList;
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
                refreshLayer: function(list) { //修改多个图层，显示需要显示的标签，隐藏未传入的id
                    if(!(list instanceof Array)) {
                        throw new Error("invalid value")
                    }
                    this.unShowAllLayer();
                    list.forEach(function(group, j) {
                        if(group.constructor != IconGroup || group.idlist.length == 0) {
                            return;
                        }
                        pool.getLayerById(group.subType).setVisible(true);
                        var layer = pool.getLayerById(group.subType);
                        var features = layer.getSource().getFeatures();
                        features.forEach(function(feature, j) {
                            group.idlist.forEach(function(id, j) {
                                var img;
                                if(feature.getId() == id) {
                                    img = new ol.style.Icon({
                                        src: group.url
                                    })
                                    var style = new ol.style.Style({
                                        image: img
                                    });
                                    feature.setStyle(style);
                                } else if(!(group.idlist.includes(id))) {
                                    img = new ol.style.Icon({
                                        opacity: 0,
                                        src: group.url
                                    })
                                    var style = new ol.style.Style({
                                        image: img
                                    });
                                    feature.setStyle(style);
                                }
                            });
                        });
                    });
                },
                refreshIconInLayer: function(list) { //对单个图层所有标签进行修改,只针对双状态标签
                    if(!(list instanceof Array)) {
                        throw new Error("invalid value")
                    }
                    list.forEach(function(group, j) {
                        if(group.constructor != IconGroup || group.idlist.length == 0) {
                            return;
                        }
                        pool.getLayerById(group.subType).setVisible(true);
                        var layer = pool.getLayerById(group.subType);
                        var features = layer.getSource().getFeatures();
                        features.forEach(function(feature, j) {
                            group.idlist.forEach(function(id, j) {
                                var img;
                                if(feature.getId() == id) {
                                    img = new ol.style.Icon({
                                        src: group.url
                                    })
                                    var style = new ol.style.Style({
                                        image: img
                                    });
                                    feature.setStyle(style);
                                }
                            });
                        });
                    });
                },
                IconGroup: IconGroup,
            },
            trans: {
                transPoint: function(xy, epsg1, epsg2) { //提供数据转换接口 3857到4326的互相转换
                    try {
                        if((xy instanceof Array) && (epsg1 == 'EPSG:3857' || epsg1 == 'EPSG:4326') && (epsg2 == 'EPSG:3857' || epsg2 == 'EPSG:4326')) {
                            var geo = new ol.proj.transform(xy, epsg1, epsg2);
                            return geo;
                        } else {
                            throw new Error("typeWrong!");
                        }
                    } catch(e) {
                        throw new Error(e);
                    }
                },
                transFromPixToLayer: function(x, y) {
                    return dataManager.trandata.transFromPixToLayer(x, y);
                },
                transFromWgsToLayer: function(val) {
                    return dataManager.trandata.transFromWgsToLayer(val);
                },
                transFromLayerToPixel: function(val) {
                    return dataManager.trandata.transFromLayerToPixel(val);
                },
                transLayerToWgs: function(val) {
                    return dataManager.trandata.transLayerToWgs(val);
                },
                transWindowPixel: function(val) {
                    return dataManager.trandata.transWindowPixel(val);
                }
            },
            pop: {
                Popup: cover.Popup,
                addChild: function(lay) {
                    if(lay.constructor === cover.Popup) {
                        cover.popList.push(lay);
                        mapData._baseMap.addOverlay(lay.overlay);
                    }
                },
                removeChild: function(lay) {
                    if(lay.constructor === cover.Popup) {
                        mapData._baseMap.removeOverlay(lay.overlay);
                    }
                },
                addPopup: function(obj) {
                    var pop = new cover.PopupNew(obj);
                    cover.popList.push(pop);
                    mapData._baseMap.addOverlay(pop.overlay);
                    //				pop.overlay.setPositioning("bottom-center");
                },
                getPopById: function(id) {
                    var el;
                    for(var i = 0, flag = true, len = cover.popList.length; i < len; flag ? i++ : i) {
                        var t = cover.popList[i];
                        if(t != undefined && t.overlay.getId() === id) {
                            el = t.overlay.getElement();
                        } else {
                            el = null;
                        }
                    }
                    return el
                },
                removePopId: function(id) {
                    for(var i = 0, flag = true, len = cover.popList.length; i < len; flag ? i++ : i) {
                        var t = cover.popList[i];
                        if(t != undefined && t.overlay.getId() === id) {
                            t.overlay.getElement().innerHTML = "";
                            mapData._baseMap.removeOverlay(t.overlay);
                            cover.popList.splice(i, 1);
                            flag = false;
                            len = cover.popList.length;
                        } else {
                            flag = true;
                        }
                    }
                },
                removeAll: function() {
                    mapData._baseMap.getOverlays().clear();
                    cover.popList.splice(0, cover.popList.length)
                }
            },
            cartoon: {
                Flight: flight,
                //			ripple: {
                //				add: function({
                //					style,
                //					speed,
                //					size,
                //					coords,
                //					id
                //				}) {},
                //				stop: function() {},
                //				stopAll: function() {}
                //			},
                spread: function(obj) {
                    Anime.spread(obj);
                },
                GuideLine: Anime.GuideLine
            },
            area: {
                DrawLayer: drawClass.DrawLayer,
                 addChild: function(drawLayer,id) {
                    if(drawLayer.constructor === drawClass.DrawLayer) {
                        drawClass.drawList.push(drawLayer);
                        mapData._baseMap.addLayer(drawLayer.Layer);
                        pool.setSeedArea(id, drawLayer);
                    }
                },
                removeChild: function(drawLayer) {
                    if(drawLayer.constructor === drawClass.DrawLayer) {
                        drawClass.drawList.forEach(function(t, i) {
                            if(drawLayer.layerName == t.layerName) {
                                drawClass.drawList.splice(i, 1);
                            }
                        })
                        drawLayer.clear();
                        mapData._baseMap.removeLayer(drawLayer.Layer);
                    }
                },
                removeAll: function() {
                    drawClass.drawList.forEach(function(t, i) {
                        mapData._baseMap.removeLayer(t.Layer);
                        t.clear();
                    });
                    drawClass.drawList.splice(0, drawClass.drawList.length);
                },
                removeStyleById: function(id,visibility) { //*******
                    var areaShow = pool.getAreaById(id)
                    if(areaShow) {
                        areaShow.setVisible(visibility);
                    }
                },
            },
            road: {
                RoadLayer: roadNet.Road,
                addRoadLayer: function(roadLayer,id) {
                    // if(roadLayer.constructor === roadNet.Road) {
                    //     roadNet.roadList.push(roadLayer);
                    //     mapData._baseMap.addLayer(roadLayer.lineLayer);
                    //     mapData._baseMap.addLayer(roadLayer.pointLayer);
                    // }
                    roadNet.roadList.push(roadLayer);
                    mapData._baseMap.addLayer(roadLayer.lineLayer);
                    pool.setSeedRoad(id, roadLayer);
                    // mapData._baseMap.addLayer(roadLayer.pointLayer);
                },
                removeAll: function() {
                    roadNet.roadList.forEach(function(t, i) {
                        mapData._baseMap.removeLayer(t.lineLayer);
                        mapData._baseMap.removeLayer(t.pointLayer);
                    });
                },
                removeStyleById: function(id,visibility) { //*******
                    var roadShow = pool.getRoadById(id)
                    if(roadShow) {
                        roadShow.setVisible(visibility);
                    }
                },
            },
            geom: {
                LineBoard: geom.LineBoard
            },
            object: {
                getMap: function() {
                    return mapData._baseMap;
                },
                renderMap: function() {
                    mapData._baseMap.renderSync();
                },
                getView: function() {
                    return mapData._mapView;
                }
            },
            style: {
                LineStyle: Style.LineStyle,
                PointStyle: Style.PointStyle
            },
            control: {
                OverviewMap: mapControls.OverviewMap,
                addControl: function(lay) {
                    if(lay.constructor === mapControls.OverviewMap) {
                        mapData._baseMap.addControl(lay.overviewMap);
                    }
                    //				mapData._baseMap.addControl(new mapControls.Custom())
                    //				var test = new mapControls.Custom()
                },
                removeControl: function(lay) {
                    mapData._baseMap.removeControl(lay.overviewMap);
                }
            }
        }
    })($, ol)
     module.exports = droreMap;
 })

