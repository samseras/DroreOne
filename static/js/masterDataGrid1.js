define(function(require, exports, module) {
	var droreMap = require('./droreMap');
	var mapLabelInformationChildrenForm = require('./mapLabelInformationChildrenForm');
	
 setTimeout(function(){
	
	$.ajax({
		url:"/static/xxsd_map.json",
		type: "get",
		async: false,
		data: {
			/*fields: {
				mapId: mapid
			},*/
			pageSize: 9999,
			pageNo: 1
		},
		success: function(response) {
			if(response.data && response.data.length) {
				ulDisplay(response.data);
				
			} 
		}
	});
	function ulDisplay(response) {
		//droreMap.unShowAllLayer();
		$.each(response, function(ii, tt) {
			droreMap.addLayer(tt.id, tt.src); //加载创建对应标签图层					
			//					droreMap.showLayer(tt.id, true); //显示对应标签图层
		});
	}
	setTimeout(function(){
		$.ajax({
			/*url: "http://192.168.0.123/msf/camera/getAll",*/
			url: "/static/xxsd_icon.json",
			data: {
				pageSize: 10000,
				pageNo: 1,
				/*fields: {
					mapId: mapid
				}*/
			},
			type: "get",
			async: false,
			success: function(response) {
				if(response.success) {
					//selectAllClick = true;
					if(response.data && response.data.length) {
						droreMap.interaction.enableMapClick = true
						$.each(response.data, function(i, t) {
							var val;
							if(t.olX && t.olY) {
								val = [parseFloat(t.olX), parseFloat(t.olY)];
							} else {
								val = droreMap.transFromPixToLayer(t.x, t.y);
							}
							if(t.src != undefined && t.src != "") {
								var icon = new droreMap.icon.Marker({
									coordinate: val,
									name: t.name,
									subtype: t.subtype,
									id: t.id,
									url: t.src
								});
								droreMap.icon.addChild(icon);
								//gisConfig.iconMarker[t.id] = icon;
								icon.onclick(function(e) {
									//鼠标点击图标的回调函数
									mapLabelInformationChildrenForm(e.data);
								})
							}
						});
						//droreMap.unShowAllLayer();
					}
				} else {
					layer.msg(response.errMsg || '获取标签失败，请刷新重试！')
				}
			}
		});
	},1000)
},1000);
})
