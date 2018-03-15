var Ajax = function(opt) {
	var defaultOpt = {
		type: 'post',
		contentType: 'application/json'
	}
};

setTimeout(function(){
	
	$.ajax({
		url:"/xubin/xxsd_map.json",
		type: "get",
		async: false,
		success: function(response) {
			if(response.data && response.data.length) {
				ulDisplay(response.data);
			} 
		}
	});

	$.ajax({
		url: "/xubin/xxsd_icon.json",
		type: "get",
		async: false,
		success: function(response) {
			if(response.success) {
				if(response.data && response.data.length) {
					//droreMap.interaction.enableMapClick = true
					//console.log(response.data);
					$.each(response.data, function(i, t) {
						//console.log(t);
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
					droreMap.unShowAllLayer();
				}
			} else {
				layer.msg(response.errMsg || '获取标签失败，请刷新重试！')
			}
		}
	});
},1000);



function ulDisplay(response) {
	droreMap.unShowAllLayer();
	//console.log(response);
	$.each(response, function(ii, tt) {
		//console.log(tt);
		droreMap.addLayer(tt.id, tt.src); //加载创建对应标签图层					
		//					droreMap.showLayer(tt.id, true); //显示对应标签图层
	});
}