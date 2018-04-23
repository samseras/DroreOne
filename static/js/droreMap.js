//显示小图标：droreMap.showLayer()-->pool.getLayerById【拿到要显示的layerId】-【layers】->setSeedLayer-->addlayer-->droreMap.addLayer-->ulDisplay()
 define(function(require, exports, module) {
    // 你也可以引入自己的函数依赖
     var ol = require('./ol');
     var Event = require('./static');
     var droreMap = (function($, ol) {
         ///////****************地图初始化**********************///////
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
                 //初始化Map
                 var map = new ol.Map({
                     interactions: ol.interaction.defaults({
                         doubleClickZoom: false,
                         pinchRotate: false
                     }),
                     layers: [
                         new ol.layer.Tile({
                             source: source
                         })
                     ],
                     view: new ol.View({
                         center: ol.proj.fromLonLat([centerX, centerY]),
                         projection: projection,
                         zoom: curZoom,
                         minZoom: minZoom,
                         maxZoom: maxZoom,
                     }),
                     controls:[],
                     logo: false,
                     target: 'map'
                 });
                 return map;
             },
             setSource: function(baseZoom, leftTopX, leftTopY, projection, urlTemplate) {
                 var source = new ol.source.XYZ({
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
         /////////////////////地图图层操作///////////////////////////////
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

         function getIconStyle(url) {
             var iconStyle = new ol.style.Style({
                 image: new ol.style.Icon({
                     anchor: [0.5, 0.5],
                     anchorXUnits: 'fraction',
                     anchorYUnits: 'fraction',
                     opacity: 0.8,
                     src: url
                 })
             });
             return iconStyle;
         };
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

         function viewChange(evt) {
             var initMercator = ol.proj.transform([dataManager.transGoogle.mapData.initMercatorX, dataManager.transGoogle.mapData.initMercatorY], "EPSG:4326", "EPSG:3857");
             var extent = mapData._mapView.calculateExtent(mapData._baseMap.getSize());
             var lat = (dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[0];
             var lng = (dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))) + mapData._baseMap.getPixelFromCoordinate(initMercator)[1];
             var endMercator = mapData._baseMap.getCoordinateFromPixel([lat, lng]);
             var centerMercator = ol.proj.transform([mapData.InitData.centerX, mapData.InitData.centerY], 'EPSG:4326', 'EPSG:3857');
             var mapRange = [dataManager.transGoogle.mapData.width / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom())), dataManager.transGoogle.mapData.height / Math.pow(2, mapData.InitData.maxZoom - (mapData._baseMap.getView().getZoom()))];
             if((extent[0] <= initMercator[0] && extent[2] >= endMercator[0]) || (extent[1] <= endMercator[1] && extent[3] >= initMercator[1])) {
                 //			mapData._mapView.setCenter(centerMercator);
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
                     //				console.log("on--moveend",mapData._mapView.getAnimating())
                     mapData._mapView.animate({
                         zoom: this.getZoom()
                     }, {
                         center: centerMercator
                     });
                     //				mapData._mapView.setCenter(centerMercator);
                     //				mapData._mapView.updateAnimations_ ();
                     //				console.log(mapData._mapView.getAnimating())
                     //				              mapData._mapView.fit([initMercator[0],endMercator[1], endMercator[0], initMercator[1]])
                     //				mapData._mapView.centerOn(centerMercator, mapRange, [mapRange[0]/ 2, mapRange[1]/ 2])

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
                     //					console.log(this.mapData.mapType)
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
                     return mapData._baseMap.getPixelFromCoordinate(val)
                 }
             }
         }
         ///////////////////绘图操作
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
                             color: (fillColor == undefined) ? 'rgba(255, 255, 255, 1)' : fillColor //区域填充
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
                 this.moveLayer = new ol.layer.Vector({
                     source: new ol.source.Vector(),
                     style: new ol.style.Style({
                         fill: new ol.style.Fill({
                             color: 'rgba(212,222,222,0)' //区域填充
                         }),
                         stroke: new ol.style.Stroke({ //区域线条
                             color: 'rgba(255, 0, 0, 0.8)',
                             width: 3,
                             lineDash: [4, 10]
                         }),
                     })
                 });
                 this.setStyle = function(fillColor, strokeColor) {
                     self.Layer.setStyle(function(feature, resolution) {
                         return [new ol.style.Style({
                             fill: new ol.style.Fill({
                                 color: (fillColor == undefined) ? 'rgba(222, 222, 222, 0.2)' : fillColor //区域填充
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
                     console.log(selected_features.length)
                     if(selected_features.getLength() > 0) {
                         selected_features.forEach(function(selected_feature) {
                             selected_features.remove(selected_feature);
                             self.Layer.getSource().removeFeature(selected_feature)
                         });
                     } else {
                         self.Layer.getSource().getFeatures().forEach(function(feature) {
                             if(feature.getId() == undefined) {
                                 self.Layer.getSource().removeFeature(feature);
                             }
                         });
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
                 var modify = this.modify_interaction.on(Event.MODIFY_EVENT, function(e) {
                     console.log("asdasd")
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
                                 //this.ifModify = false;
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
                                 //this.ifDraw = false;
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
                                 this._ifSelect = false;
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
         /*****************************路网****路线绘制及编辑****************************************************************/
         var roadNet = {}; //TODO 路网模块
         roadNet = {
             roadPoint: function(lineFeature, parent) { //单条点线模块
                 var self = this;
                 this.parent = parent ? parent : null;
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
                                 console.log("当前移动的是关键点")
                                 self.selectPoint = feature;
                             } else {
                                 self.selectPoint = null;
                                 console.log("不是")
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
                         iconFeature.set("lineId", self.LineFeature.getId());
                         iconFeature.set("data", data);
                         iconFeature.set("index", i);
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
                                 }),
                                 zIndex: 999
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
                             color: pointStyle || 'yellow'
                         }),
                         stroke: new ol.style.Stroke({
                             color: 'gray',
                             width: 2
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
                     },
                     hitTolerance: 5
                 });
                 this.modify_interaction = new ol.interaction.Modify({
                     features: self.select_interaction.getFeatures(),
                     pixelTolerance: 6,
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
                                 self.select_interaction.getFeatures().clear()
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
                     console.log(e)
                     // var keyPoint = self.groupList[e.features.getArray()[0].getId()].selectPoint;
                     // if(keyPoint) {
                     //     CustomEvent.fireEvent("modify", {
                     //         id: keyPoint.getId(),
                     //         coord: keyPoint.getGeometry().getCoordinates()
                     //     })
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
                         data: data
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
                             if(selected_feature.getId()) {
                                 var group = self.groupList[selected_feature.getId()]
                                 self.lineLayer.getSource().removeFeature(group.LineFeature);
                                 group.clear();
                             } else {
                                 self.lineLayer.getSource().removeFeature(selected_feature);
                             }

                         });
                     } else {
                         self.lineLayer.getSource().getFeatures().forEach(function(feature) {
                             if(feature.getId() == undefined) {
                                 self.lineLayer.getSource().removeFeature(feature);
                             }
                         });
                     }
                 };
                 this.deleteRoad = function(id) {
                     var group = self.groupList[id]
                     self.lineLayer.getSource().removeFeature(group.LineFeature);
                     group.clear();
                 };
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
                                     "index": sfeature.get("index"),
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
                 this.cancelSelect = function() {
                     self.select_interaction.getFeatures().clear();
                 }
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
                             lineDash: [4, 10],
                             color: color1,
                             width: 5
                         })
                     });
                     self.PointStyle = new ol.style.Style({
                         image: new ol.style.Circle({
                             radius: 5,
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
             Point: function() {

             }
         }
         //****************************//
         var flightCartoon;

         function flight() {};
         var flightStyle = new ol.style.Style({
             stroke: new ol.style.Stroke({
                 color: '#EAE911',
                 width: 8
             }),
             zIndex: 1
         });
         var pointsPerMs = 0.1;
         flight.prototype.flightsSource = {};
         flight.prototype.flightsLayer = new ol.layer.Vector({
             source: flight.flightsSource,
             style: function(feature) {
                 if(feature.get('finished')) {
                     return flightStyle;
                 } else {
                     return null;
                 }
             }
         });
         flight.prototype.transformArr = function(list) {
             var datalist = new Array();
             for(var i = 0; i < list.length; i++) {
                 var obj = list[i];
                 var arr = [parseFloat(obj.x), parseFloat(obj.y)];
                 datalist.push(arr);
             }
             return datalist;
         };
         flight.prototype.addFlight = function(flightsData) {
             var self = this;
             this.flightsSource = new ol.source.Vector({
                 wrapX: false,
                 loader: function() {
                     for(var i = 0; i < flightsData.length; i++) {
                         //					self.transformArr(flightsData[i]);
                         //var coords = self.transformArr(flightsData[i])
                         var coords = flightsData[i];
                         var line = new ol.geom.LineString(coords);
                         //					line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
                         var feature = new ol.Feature({
                             geometry: line,
                             finished: false
                         });
                         self.addLater(feature, 50);
                     }
                     mapData._baseMap.on('postcompose', function(event) { /********回调函数this则为openlayer的东西**********/
                     var vectorContext = event.vectorContext;
                         var frameState = event.frameState;
                         vectorContext.setStyle(flightStyle);
                         var features = self.flightsSource.getFeatures();
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
         /***********************************交互事件******注册拖动事件***************************************************************/
         var DragMediator;

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
             condition: ol.events.condition.click
             //		filter: function(fea) {
             //			CustomEvent.fireEvent("click", {
             //				feature: fea,
             //			})
             //		}
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
                             if(featureType == "Point"&&this.feature_.constructor == cover.Marker) { //在手型状态非同一poi点显示
                                 var icon = pool.getIconById(feature.getId());
                                 console.log(icon.name,this.feature_.name)
                                 this.feature_.showName = false;
                                 var prevLayer = pool.getLayerById(this.feature_.subtype);
                                 prevLayer.setZIndex(1);
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
                 if(DragMediator.feature_.constructor == cover.Marker) {
                     var geometry = DragMediator.feature_.feature.getGeometry();
                     geometry.translate(deltaX, deltaY);
                     DragMediator.coordinate_[0] = geometry.getCoordinates()[0];
                     DragMediator.coordinate_[1] = geometry.getCoordinates()[1];
                 }
             },
             //		handleMoveEvent: function(event) {
             //			if(DragMediator.cursor_) {
             //				var map = event.map;
             //				var feature = map.forEachFeatureAtPixel(event.pixel,
             //					function(feature) {
             //						return feature;
             //					});
             //				var element = event.map.getTargetElement();
             //				if(feature) {
             //					if(element.style.cursor != DragMediator.cursor_) {
             //						DragMediator.previousCursor_ = element.style.cursor;
             //						element.style.cursor = DragMediator.cursor_;
             //					}
             //				} else if(DragMediator.previousCursor_ !== undefined) {
             //					element.style.cursor = DragMediator.previousCursor_;
             //					DragMediator.previousCursor_ = undefined;
             //				}
             //			}
             //		},
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

                 //this.style = pool.getStyleById(self.subtype).clone();
                 this.style = pool.getStyleById(self.subtype) ? pool.getStyleById(self.subtype).clone() : new ol.style.Style({
                     image: new ol.style.Icon({
                         src: self.data.url
                     }),
                     zIndex:22
                 });

                 function showName(val,name) {
                     var width = self.data.url.match(/[0-9]+/g);
                     width = width ? width[0] : 1;
                     var text = new ol.style.Text({
                         text: name || self.name,
                         fill: new ol.style.Fill({
                             color: "#fff"
                         }),
                         font: _size + "px Microsoft Yahei",
                         offsetX: '0',
                         offsetY: -width / 2 - _size / 2 - 5,
                         stroke: new ol.style.Stroke({
                             color: 'black',
                             width: 8
                         })
                     });
                     if(val) {
                         self.style.setText(text);
                         self.feature.setStyle(self.style);
                     } else {
                         self.feature.setStyle(null);
                     }
                 };
                 var selectFun;
                 this.onclick = function(fn) {
                     selectFun = function(e) {
                         if(e.data.feature.getId() == self.id) {
                             fn(self)
                         }
                     }
                     CustomEvent.addEvent("click", selectFun);
                 };

                 /**
                  * 移除事件
                  */
                 this.unclick = function() {
                     CustomEvent.removeEvent("click", selectFun);
                 };
                 this.setRotation = function(rotation) {
                     var style = pool.getStyleById(self.subtype);
                     var image = style.getImage();
                     image.setRotation(rotation);
                     self.feature.setStyle(style);
                 };
                 this.setUrl = function(url) {
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
                 this.setName = function(name){
                     self.name = name
                     showName(true,name)
                 }
                 this.clear = function() {
                     pool.removeIcon(self.id);
                     CustomEvent.removeEvent("click", selectFun);
                 }
             },
             popList: [],
             Popup: function(container, coord, id0) {
                 var self = this;
                 this.overlay = new ol.Overlay({
                     id: id0,
                     element: container,
                     stopEvent: true, //当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false
                     autoPan: false,
                     position: coord,
                     positioning: 'bottom-center',
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
         /**************覆盖物--标签重构******************/
         var _markerLayer;
         var testIcon;
         var iconTestFeatureX;

         function addTestLayer() {
             var layer = pool.getLayerById(testIcon.subtype);
             if(layer != null) {
                 if(layer.getSource().getFeatureById(testIcon.id) == null) {
                     layer.getSource().addFeature(testIcon.feature);
                 }
             } else {
                 layer = mapLayer.creatLayer(testIcon.data.url, testIcon.subtype);
                 mapData._baseMap.addLayer(layer);
                 pool.setSeedLayer(testIcon.subtype, layer);
                 layer.getSource().addFeature(testIcon.feature);
             }
             pool.setSeedIcon(testIcon.id, testIcon);
         }
         testIcon = new cover.Marker({
             coordinate: [0, 0],
             name: "测试点位",
             subtype: "098lk",
             id: "12214_",
             url: "http://oss.drore.com/material/6fad1079fc794de6a6c309a1bfba685a/201701/19/8e8996f2455c46e6a0d5bf96fa37a31b.png",
         });
         function addTestMarker(arr) {
             testIcon.setPosition(arr);
         }

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
                 if(CustomEvent.eventList[key] != undefined) {
                     return;
                 }
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
         /**
          * 单类别显示组
          */
         function IconGroup(subType, url, idlist) {
             this.subType = subType;
             this.url = url;
             this.idlist = idlist;
         };

         function selectfun(e) {
             CustomEvent.fireEvent("click", {
                 feature: e.selected[0],
             })
             DragMediator.selectInteraction.getFeatures().clear();
         }

         return { //返回一个对象
             init: function(opt, rectifyData) { //初始化地图//***
                 /*			var projection = ol.proj.get('EPSG:3857'); //墨卡托投影
                             var urlTemplate = obj.path; //"./map_sec_sichuan0003/map{z}/{x},{y}.jpg";
                             var baseMapSource = mapData.setSource(obj.minZoom, obj.olTileX, obj.olTileY, projection, urlTemplate); //19, 413000, 214585
                             var centerX = obj.centerX;
                             var centerY = obj.centerY;

                             var curZoom = obj.curZoom;
                             var minZoom = obj.minZoom;
                             var maxZoom = obj.maxZoom;
                             mapData.InitData = obj;
                             //添加底图
                             _baseMap = mapData.addBaseMap(baseMapSource, centerX, centerY, curZoom, minZoom, maxZoom, projection);
                             _baseMap.renderSync();*/

/*                 var defaultData = {
                     "olTileX": 54874,
                     "olTileY": 27040,
                     "centerX": 121.43497144063807,
                     "centerY": 29.995888023356642,
                     "path": "http://img.weyoo.cn/map/map_sec_zhejiang0131/map{z}/{x},{y}.jpg",
                     "curZoom": 16,
                     "minZoom": 16,
                     "maxZoom": 19
                 }
                 var option = $.extend(true, defaultData, opt);
                 //opt和default要深拷贝后合并一次
                 mapData.initMap(option);
                 mapData.initRectify(rectifyData);*/

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
                             "path": "/static/map_xxsd/map{z}/{x},{y}.jpg",
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


             }, ////////////鼠标事件部分
             addMouseEvent: function(type, key, fun) { //添加一个鼠标事件 此处包括单击和双击你事件//***
                 if(type == "singleclick") {
                     mapData._baseMap.on('singleclick', fun);
                 } else if(type == "dblclick") {
                     mapData._baseMap.on('dblclick', fun);
                 }
                 pool.eventList[key] = fun;
                 return fun;
             },
             removeMouseEvent: function(type, key, param) { //移除事件//***
                 pool.removeFunByKey(type, key, param);
             },
             DragEvent: function(backfun) { //标签拖动事件，放开时返回函数//***
                 if(typeof(backfun) != "function") {
                     throw new Error("the type of parameter is wrong!")
                 } else {
                     CustomEvent.addEvent("dragup", function(e) {
                         backfun(e);
                     });
                 }
             },
             removeDragEvent: function() { //***
                 this.ifDrag = false;
                 CustomEvent.removeEvent("dragup");
             },
             setFeatureGeo: function(feature, geo) { //设定标签坐标，传入值：当前对象，坐标 ****
                 if(!(geo instanceof Array)) {
                     throw new Error("the type of parameter is wrong!")
                     return;
                 }
                 feature.setGeometry(new ol.geom.Point(geo));
             }, /////////视图操作部分
             panTo: function(lat, lng) { //地图视图切换到目标位置  ol经纬度
                 var view = mapData._baseMap.getView();
                 view.setCenter(ol.proj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857'));
                 mapData._baseMap.render();
             },
             panToWgs: function(lat, lng) { //地图视图切换到目标位置  标准经纬度
                 var pixel = dataManager.transGoogle.transWgToPixelInside(lat, lng);
                 var val = this.transFromPixToLayer(pixel[0], pixel[1])
                 var view = mapData._baseMap.getView();
                 view.setCenter(val);
                 addTestMarker(ol.proj.transform(val, 'EPSG:4326', 'EPSG:3857'));
                 mapData._baseMap.render();
             },
             zoomIn: function() { //地图放大一级
                 var view = mapData._baseMap.getView();
                 view.setZoom(view.getZoom() + 1)
             },
             zoomOut: function() { //地图缩小一级
                 var view = mapData._baseMap.getView();
                 view.setZoom(view.getZoom() - 1)
             },
             setZoom: function(zoom) { //设定地图层级
                 var view = mapData._baseMap.getView();
                 view.setZoom(zoom)
             },
             getZoom: function() { //获取当前地图层级//***
                 var view = mapData._baseMap.getView();
                 return view.getZoom() - mapData.InitData.minZoom + 1;
             },
             addZoomChange: function(key, fun) { //注册地图缩放事件 返回当前地图层级//***
                 var callBack = function(e) {
                     if(this.getZoom() === Math.floor(this.getZoom())) {
                         fun(this.getZoom() - mapData.InitData.minZoom + 1);
                     }
                 }
                 if(pool.eventList[key]) {
                     this.removeZoomChange(key)
                 }
                 mapData._baseMap.getView().on('change:resolution', callBack);
                 pool.eventList[key] = callBack;
             },
             removeZoomChange: function(key) { //移除地图缩放侦听事件//***
                 if(pool.eventList[key] == undefined) {
                     return;
                 }
                 mapData._baseMap.getView().un('change:resolution', pool.eventList[key]);
             }, ///////图层部分
             addLayer: function(id, url) { //添加一个图层//***
                 var iconlayer;
                 iconlayer = pool.getLayerById(id);
                 if(iconlayer == undefined) {
                     iconlayer = mapLayer.addLayer(url);
                     mapData._baseMap.addLayer(iconlayer);
                     iconlayer.set('id', id);
                     iconlayer.setVisible(false);
                     pool.setSeedLayer(id, iconlayer);
                 }
             },
             removeLayer: function(id) { //移除一个图层//***
                 var lay = pool.getLayerById(id);
                 if(lay != undefined) {
                     mapData._baseMap.removeLayer(lay);
                     lay.getSource().clear();
                     pool.deleteLayerById(id);
                 }
             },
             removeAllLayer: function() { //*********
                 for(var p in pool.layers) {
                     var lay = pool.layers[p];
                     if(lay != undefined) {
                         mapData._baseMap.removeLayer(lay);
                         lay.getSource().clear();
                         pool.deleteLayerById(p);
                     }
                 };
             },
             showLayer: function(id, visibility) { //显示/隐藏相应图层//***
                 var layer = pool.getLayerById(id);
                 layer.setVisible(visibility);
             },
             unShowAllLayer: function() { //隐藏全部标签图层//***
                 for(var i in pool.layers) {
                     pool.layers[i].setVisible(false);
                 }
             },
             showAllLayer: function() { //显示全部标签图层//***
                 for(var i in pool.layers) {
                     pool.layers[i].setVisible(true);
                 }
             },
             refreshLayer: function(list) { //修改多个图层，显示需要显示的标签，隐藏未传入的id//***
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
                             } else if(!(group.idlist.filter(function(id) {
                                     id == feature.getId()
                                 }))) {
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
             getIconNumByLayerId: function(id) { //通过当前图层id获取该图层标签数量//***
                 var layer = pool.getLayerById(id);
                 if(layer == undefined) {
                     return 0;
                 }
                 var features = layer.getSource().getFeatures();
                 return features.length;
             }, //添加标签
             addIcon: function(obj) { //subType标签所属图标类型id，url标签图标的url地址 ，obj标签包含的数据对象//***
                 var layer = pool.getLayerById(obj.subType);
                 if(layer != null) {
                     if(layer.getSource().getFeatureById(obj.data.id) == null) {
                         layer.getSource().addFeature(mapLayer.addIcon(obj.coordinate, obj));
                     }
                 } else {
                     layer = mapLayer.addLayer(obj.url);
                     layer.set('id', obj.subType);
                     mapData._baseMap.addLayer(layer);
                     pool.setSeedLayer(obj.subType, layer);
                     layer.getSource().addFeature(mapLayer.addIcon(obj.coordinate, obj));
                 }
             },
             removeIcon: function(subType, id) { //移除一个标签//***
                 var layer = pool.getLayerById(subType);
                 if(layer != null) {
                     if(layer.getSource().getFeatureById(id) != null) {
                         layer.getSource().removeFeature(layer.getSource().getFeatureById(id));
                     }
                 }
             },
             _ifDrag: false, //是否开启标签拖动功能
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
                         if(DragMediator) {
                             mapData._baseMap.removeInteraction(DragMediator.dragInteraction);
                         }
                     }
                 }
             },
             getIconData: function(evt) { //根据传入的点击事件，获取点击对象的数据//***
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
             transFromPixToLayer: function(x, y) { //像素坐标转墨卡托坐标//***
                 return dataManager.trandata.transFromPixToLayer(x, y);
             },
             transFromLayerToPixel: function(val) { //传入墨卡托坐标  //***
                 return dataManager.trandata.transFromLayerToPixel(val);
             },
             transFromWgsToLayer: function(val) { //传入标准经纬度，转ol坐标//***
                 return dataManager.trandata.transFromWgsToLayer(val);
             },
             transLayerToWgs: function(val) { //***
                 return dataManager.trandata.transLayerToWgs(val);
             },
             transWindowPixel: function(val) {
                 return dataManager.trandata.transWindowPixel(val);
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
                 },
                 removeChild: function(icon) { //删除标签
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
                 removeAll: function() {
                     for(var p in pool.iconList) {
                         var icon = pool.iconList[p]
                         this.removeChild(icon)
                     };
                 }
             },
             area: {
                 DrawLayer: drawClass.DrawLayer,
                 addChild: function(drawLayer) {
                     if(drawLayer.constructor === drawClass.DrawLayer) {
                         drawClass.drawList.push(drawLayer);
                         mapData._baseMap.addLayer(drawLayer.Layer);
                         mapData._baseMap.addLayer(drawLayer.moveLayer);
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
                 }
             },
             road: {
                 RoadLayer: roadNet.Road,
                 addRoadLayer: function(roadLayer) {
                     if(roadLayer.constructor === roadNet.Road) {
                         roadNet.roadList.push(roadLayer);
                         mapData._baseMap.addLayer(roadLayer.lineLayer);
                         mapData._baseMap.addLayer(roadLayer.pointLayer);
                     }
                 },
                 removeAll: function() {
                     roadNet.roadList.forEach(function(t, i) {
                         mapData._baseMap.removeLayer(t.lineLayer);
                         mapData._baseMap.removeLayer(t.pointLayer);
                     });
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
                 addPopup: function(container, coord, id0) {
                     var pop = new cover.Popup(container, coord, id0);
                     cover.popList.push(pop);
                     mapData._baseMap.addOverlay(pop.overlay);
                     pop.overlay.setPositioning("bottom-center")
                 },
                 removePopId: function(id) {
                     for(var i = 0, flag = true, len = cover.popList.length; i < len; flag ? i++ : i) {
                         var t = cover.popList[i];
                         if(t != undefined && t.overlay.getId() === id) {
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
                 },
                 getPopList: function() {
                     if(cover.popList) {
                         return cover.popList.length
                     }
                 }
             },
             cartoon: {
                 addFlight: function(list) {
                     if(!flightCartoon) {
                         flightCartoon = new flight();
                     }
                     flightCartoon.addFlight(list);
                 },
                 removeFlight: function() {
                     if(flightCartoon) {
                         flightCartoon.removeFlights();
                     }
                 },
                 outMoveFunction: function(callBack) {
                     outMoveFunction = function(boo, feature, name) {
                         callBack(boo, feature, name);
                     }
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
                 removeShowRemove: function() {
                     if(!DragMediator) {
                         DragMediator = new Mediator();
                     }
                     mapData._baseMap.removeInteraction(DragMediator.moveInteraction);
                 },
                 _ifClick: false,
                 set enableMapClick(val) {
                     if(typeof(val) != "boolean") {
                         throw new Error("the type of parameter is not boolean!")
                     } else {
                         if(this._ifClick == val) {
                             return;
                         }
                         this._ifClick = val;
                         if(!DragMediator) {
                             DragMediator = new Mediator();
                         }
                         if(val) {
                             mapData._baseMap.addInteraction(DragMediator.selectInteraction);
                             DragMediator.selectInteraction.on("select", selectfun);
                         } else {
                             mapData._baseMap.removeInteraction(DragMediator.selectInteraction);
                             DragMediator.selectInteraction.un("select", selectfun);
                         }
                     }
                 },
             },
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
                 clear: function() {
                     pool.clearLayers();
                 }
             },
             getMap: function() {
                 return mapData._baseMap;
             },
             clearMap: function() {
                 if(flightCartoon) {
                     flightCartoon.removeFlights();
                 }
             },
             test: {
                 testWgs: function(lat, lng) {
                     addTestLayer()
                     var pixel = dataManager.transGoogle.transWgToPixelInside(lat, lng);
                     var val = dataManager.trandata.transFromPixToLayer(pixel[0], pixel[1])
                     var view = mapData._baseMap.getView();
                     view.setCenter(val);
                     addTestMarker(val);
                 },
                 testCoord: function(arr) {
                     addTestLayer()
                     var view = mapData._baseMap.getView();
                     view.setCenter(arr);
                     addTestMarker(arr);
                 }
             }
         }

     })($, ol)
  module.exports = droreMap;

 })

