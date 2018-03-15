
var mapLabelInformationChildrenForm = function(opt){
	alert("this is station");
}
module.exports = mapLabelInformationChildrenForm;

/*function setConfig(opt){
	var json={};
	for(var attr in opt.opt){
		json[attr]=opt.opt[attr];
	}
	if(opt.id){
		json.id=json.className=opt.id;
	}else if(opt.fnName){
		json.id=json.className=(opt.fnName.toString().replace(/function\s?/i,"").split("("))[0];
	}
	if(opt.config){
		for(var i in opt.config){
			json[i]=opt.config[i];
		}
	}
	if(window.loginUser&&window.loginUser.allMethod){
		//loginUser.allMethod[json.id];
		if(opt.btns){
			json.btns={};
			if(loginUser.allMethod[json.id])
				for(var btn in loginUser.allMethod[json.id]){
					json.btns[btn]=loginUser.allMethod[json.id][btn];
				}
			for(var btn in json.btns){
				if(opt.btns[btn])
					json.btns[btn]=opt.btns[btn];
			}
			if(opt.btns['edit']&&loginUser.allMethod[json.id]&&loginUser.allMethod[json.id]['plus'])
				json.btns['edit']=opt.btns['edit'];
		}
		if(opt.operationBtns){
			json.operationBtns={};
			for(var btn in loginUser.allMethod[json.id]){
				if(loginUser.allMethod[json.id][btn]&&opt.operationBtns[btn])
					json.operationBtns[btn]=opt.operationBtns[btn];
			}
		}
	}else if(!window.loginUser){	
		if(opt.btns){
			json.btns={};
			for(var btn in opt.btns){
				json.btns[btn]=opt.btns[btn];
			}
		}
		if(opt.operationBtns){
			json.operationBtns={};
			for(var btn in opt.operationBtns[btn]){
				json.operationBtns[btn]=opt.operationBtns[btn];
			}
		}
	}else{
		if(opt&&opt.btns){
			json.btns={};
			for(var btn in opt.btns){
				json.btns[btn]=opt.btns[btn];
			}
			for(var btn in json.btns){
				if(opt.btns[btn])
					json.btns[btn]=opt.btns[btn];
			}
			if(opt.btns['edit']&&opt.btns&&opt.btns['plus'])
				json.btns['edit']=opt.btns['edit'];
		}
		if(opt&&opt.operationBtns){
			json.operationBtns={};
			for(var btn in opt.operationBtns){
				if(opt.operationBtns[btn]&&opt.operationBtns[btn])
					json.operationBtns[btn]=opt.operationBtns[btn];
			}
		}
	}
	var classGroup=opt.classGroup||opt.config.xtype;
	if(classGroup){
		eval('set'+classGroup+'Class')({
			opt:opt,
			json:json
		});
	}
	if(json.title)
		json.title.extraClass=['ibox-title'];
	return json;
}

function mapLabelInformationChildrenForm(opt) {
	alert("sssssssssssss");
	var appId = opt.appId || false
	var zoom = opt.zoom || 0
	var _opt = opt;
	var selfArgumentsName = arguments.callee.name;
	var fields = [{
		column: [{
			label: '地图id',
			name: 'mapId',
			hidden: true
		}, {
			label: '图片地址',
			name: 'imgPath',
			type: 'img'
		}, {
			label: '中文音频',
			name: 'cnVideoUrl',
			type: 'audio'
		}, {
			label: '英文音频',
			name: 'enVideoUrl',
			type: 'audio'
		}, {
			label: '视频',
			name: 'movieUrl',
			type: 'video'
		}, {
			label: '名称',
			name: 'name'
		}, {
			label: '地址',
			name: 'address'
		}, {
			label: '纬度坐标',
			name: 'threeLat',
			//			hidden: true
		}, {
			label: '经度坐标',
			name: 'threeLng',
			//			hidden: true
		}, {
			label: '标签图片地址',
			name: 'src',
			hidden: true
		}, {
			label: 'google地图纬度-X',
			name: 'gx',
			hidden: true
		}, {
			label: 'google地图纬度-Y',
			name: 'gy',
			hidden: true
		}, {
			label: 'ol-x',
			name: 'olX',
			hidden: true
		}, {
			label: 'ol-y',
			name: 'olY',
			hidden: true
		}, {
			label: '设备信息',
			name: 'deviceInfo'
		}, {
			label: '设备编号',
			name: 'deviceId'
		}, {
			label: '全景地址',
			name: 'panoramaUrl'
		}, {
			label: '介绍',
			tagName: 'textarea',
			name: 'info'
		}, {
			label: '子标签类型',
			name: 'subtype',
			hidden: true
		}, {
			label: 'y轴',
			name: 'y',
			hidden: true
		}, {
			label: 'x轴',
			name: 'x',
			hidden: true
		}],
		extraClass: {
			boxDiv: ['col-sm-12']
		}
	}, {
		column: [{
			label: '显示层级',
			type: 'checkbox'
		}],
		extraClass: {
			boxDiv: ['col-sm-12 singleLabel none']
		}
	}, {
		column: [{
			label: '设备'
		}],
		extraClass: {
			boxDiv: ['col-sm-12 title']
		}
	}, {
		column: [{
			label: '厂家',
			name: 'deviceFactory'
		}, {
			label: '型号',
			name: 'deviceModel'
		}, {
			label: '安装时间',
			name: 'deviceInstallation'
		}, {
			label: '硬件版本号',
			name: 'deviceVersion'
		}, {
			label: '软件版本号',
			name: 'softwareVersion'
		}, {
			label: '厂家联系电话',
			name: 'factoryPhone'
		}],
		extraClass: {
			boxDiv: ['col-sm-12']
		}
	}, {
		column: [{
			label: '绿植'
		}],
		extraClass: {
			boxDiv: ['col-sm-12 title']
		}
	}, {
		column: [{
			label: '科',
			name: 'plantsSection'
		}, {
			label: '属',
			name: 'plantsGenus'
		}, {
			label: '品类',
			name: 'plantsCategory'
		}],
		extraClass: {
			boxDiv: ['col-sm-12']
		}
	}, {
		column: [{
			label: '建筑'
		}],
		extraClass: {
			boxDiv: ['col-sm-12 title']
		}
	}, {
		column: [{
			label: '结构',
			name: 'buildingStructure'
		}, {
			label: '承建方',
			name: 'buildingContractor'
		}, {
			label: '建筑年代',
			name: 'buildingTime'
		}],
		extraClass: {
			boxDiv: ['col-sm-12']
		}
	}, {
		column: [{
			label: '设施'
		}],
		extraClass: {
			boxDiv: ['col-sm-12 title']
		}
	}, {
		column: [{
			label: '类型',
			name: 'facilitiesType'
		}],
		extraClass: {
			boxDiv: ['col-sm-12']
		}
	}];
	var btns = {
		edit: {
			html: '确认',
			extraClass: ['layui-layer-btn0'],
			events: {
				click: function(opt) {
					if(opt.panel.items[selfArgumentsName].validatesFn({
							windowBtn: opt.btn
						})) {
						var loading = layer.load(1, {
							shade: [0.1, '#fff']
						});
						var save = opt.panel.items[selfArgumentsName].formContainer.querySelector('[name="id"]');
						var data = $('.' + opt.panel.component.className.split(' ')[0]).find('form').serializeArray();
						var obj = {},
							val;
						$.map(data, function(t) {
							obj[t.name] = t.value
						});
						//验证输入的数据的合理性
						var reg = /^\d+.(\d+)+[0-9]$/g
						if(obj.threeLat && obj.threeLng) {
							if(obj.threeLat.match(reg) && obj.threeLng.match(reg)) {
								obj.olX = droreMap.transFromWgsToLayer([obj.threeLng, obj.threeLat])[0]
								obj.olY = droreMap.transFromWgsToLayer([obj.threeLng, obj.threeLat])[1]
								obj.x = droreMap.transFromLayerToPixel([obj.olX, obj.olY])[0]
								obj.y = droreMap.transFromLayerToPixel([obj.olX, obj.olY])[1]
								if(obj.olX < 0 || obj.olY < 0 || obj.x < 0 || obj.y < 0) {
									layer.msg('请输入正确的经纬度', {
										time: 2000
									})
									layer.close(loading);
									return false
								}
							} else {
								layer.msg('请输入正确的经纬度数据格式', {
									time: 2000
								})
								layer.close(loading);
								return false
							}

						} else {
							if(obj.olX && obj.olY) {
								val = [parseFloat(obj.olX), parseFloat(obj.olY)];
								val = droreMap.transLayerToWgs([obj.olX, obj.olY])
							} else if(obj.x && obj.y) {
								var olData = droreMap.transFromPixToLayer(obj.x, obj.y);
								val = droreMap.transLayerToWgs(olData)
							}
							obj.threeLng = val[0]
							obj.threeLat = val[1]
						}
						if(obj.name) {
							Ajax({
								url: gisConfig.urlIp + gisConfig.path.labelInfo + (save ? gisConfig.type.updateLabel : gisConfig.type.insertLabel) + gisConfig.token + sessionStorage['token'],
								type: save ? 'put' : 'post',
								data: obj,
								success: function(response) {
									layer.close(loading);
									if(response.success) {
										obj.id = response.id ? response.id : obj.id
										if(save) {
											if(gisConfig.iconMarker[_opt.id]) {
												droreMap.icon.removeChild(gisConfig.iconMarker[_opt.id])
											}
										}
										var icon = new droreMap.icon.Marker({
											coordinate: [parseFloat(obj.olX), parseFloat(obj.olY)],
											name: obj.name,
											subtype: obj.subtype,
											id: obj.id,
											url: obj.src
										});
										droreMap.icon.addChild(icon)
										gisConfig.iconMarker[obj.id] = icon
										icon.onclick(function(e) {
											mapLabelInformationChildrenForm(e.data);
										})

										//根据图标类型当前显隐状态判断是否展示图标
										var dis = $('ul').find('[uid="' + obj.subtype + '"] input').prop('checked')
										droreMap.showLayer(obj.subtype, dis)
											//更改点击图标类别当前地图上展示的个数  加1
										var divNuM = $('ul').find('[uid="' + obj.subtype + '"] input').siblings('.countSmall')
										var num = parseInt(divNuM.attr('nums')) + 1
										divNuM.attr('nums', num)
										divNuM.find('.countSmalls').text('(' + num + ')')
											//应用标签中的单个标签的层级隐藏
										if(_opt.appId) {
											_opt.labelInfoId = response.id ? response.id : obj.id
											var showLevel = {},
												isNull = parseInt(zoom);
											$('.singleLabel').find('input:not(:first-child)').each(function(i) {
												var singleLevl = i + 1
												if(this.checked) {
													showLevel[singleLevl] = 1
												} else {
													isNull -= 1
													showLevel[singleLevl] = 0
												}
											})
											gisConfig.addIconData = {
													id: response.id ? response.id : obj.id,
													subtype: obj.subtype,
													name: obj.name,
													src: obj.src,
												}
												//如果选择了标签的层级显示，保存到数据库中
											if(isNull > 0) {
												var datas = {
													'appId': _opt.appId,
													'tagInfoId': _opt.labelInfoId,
													'subtype': _opt.data.subtype,
													'showLevel': JSON.stringify(showLevel)
												}
												if(_opt.singleLabelShowLevelId) {
													datas.id = _opt.singleLabelShowLevelId
												}

												Ajax({
													url: gisConfig.urlIp + gisConfig.common + gisConfig.path.singleLabelShowLevel + (_opt.singleLabelShowLevelId ? gisConfig.type.updata : gisConfig.type.save) + gisConfig.token + sessionStorage['token'],
													data: datas,
													type: _opt.singleLabelShowLevelId ? 'put' : 'post',
													success: function(res) {
														if(res.success) {
															gisConfig.addIconData.showLevel = JSON.stringify(showLevel)
															$(opt.btn).parents('.layui-layer').remove();
															layer.msg('编辑成功!');
														} else {
															layer.msg(res.errMsg || res.message)
														}
													}
												})
											} else {
												$(opt.btn).parents('.layui-layer').remove();
												layer.msg('编辑成功!');
											}
										}
										$('.layui-layer-shade[times=' + $(opt.btn).parents('.layui-layer').attr('times') + ']').remove();
										$(opt.btn).parents('.layui-layer').remove();
									} else {
										layer.msg(response.errMsg);
									}
									$('.layui-layer-shade[times=' + $(opt.btn).parents('.layui-layer').attr('times') + ']').remove();
									$(opt.btn).parents('.layui-layer').remove();
								}
							});

						} else {
							layer.msg('name为空')
							layer.close(loading);
						}
					}
				}
			}
		},
		closeBtn: {
			html: '删除',
			extraClass: ['layui-layer-btn1'],
			events: {
				click: function(opt) {
					layer.confirm('确定要删除[' + _opt.name + ']？', {
						btn: ['确定', '取消'] //按钮
					}, function() {
						Ajax({
							url: gisConfig.urlIp + gisConfig.path.labelInfo + gisConfig.path.deleteLabel + (_opt && _opt.id ? '/' + _opt.id : '') + gisConfig.token + sessionStorage['token'],
							type: 'delete',
							success: function(response) {
								var divNuM = $('ul').find('[uid="' + _opt.subtype + '"] input').siblings('.countSmall')
								var num = parseInt(divNuM.attr('nums')) - 1
								divNuM.attr('nums', num)
								divNuM.find('.countSmalls').text('(' + num + ')')
								$('.layui-layer-shade[times=' + $(opt.btn).parents('.layui-layer').attr('times') + ']').remove();
								$(opt.btn).parents('.layui-layer').remove();
								if(gisConfig.iconMarker[_opt.id]) {
									droreMap.icon.removeChild(gisConfig.iconMarker[_opt.id])
								}
								layer.msg('删除成功', {
									time: 2000
								});
							}
						});
					}, function(index) {

						layer.close(index);
					});

				}
			}
		},
		reload: {
			html: '重置',
			extraClass: ['layui-layer-btn2'],
			events: {
				click: function(opt) {
					for(var i in opt.panel.items) {
						if(opt.panel.items[i].refresh)
							opt.panel.items[i].refresh();
					};
					$('.layui-layer-max').click();
				}
			}
		}
	};

	return new WindowPanel({
		owner: opt.owner,
		layerConfig: {
			area: '600px',
			title: opt.data ? '编辑信息' : '新建信息',
		},
		btns: btns,
		items: [
			setConfig({
				opt: opt,
				fnName: arguments.callee,
				config: {
					xtype: 'FormPanel',
					render: function() {
						$('#mapLabelInformationChildrenForm').parents('#layerWindowWin').siblings('.defineBtns:not(:eq(0))').remove()
						$('.singleLabel').addClass('none')
						$('#mapLabelInformationChildrenForm .formContainer').css({
								'height': 470,
								'overflow': 'auto'
							}).find('.col-sm-12.title')
							.find('div').remove('.col-sm-8')
						$('#mapLabelInformationChildrenForm .col-sm-12.title').find('label').css('text-align', 'left')

						if(appId) {
							var div = $('.singleLabel.none').removeClass('none').find('div')
							var inputC = div.find('input').removeAttr('class').css('marginTop', 10)
							opt.lableInforId = $(".mapLabelInformationChildrenForm").attr('uid')
							for(var i = 0; i < parseInt(zoom); i++) {
								var mapLevel = i + 1
								var cc = inputC.clone().attr('id', 'zoom' + i)
								div.append(cc)
								div.append($('<label>', {
									html: '第' + mapLevel + '层级',
									for: 'zoom' + i,
									style: "margin-right:15px"
								}))
							}
							inputC.addClass('none')
							//console.log("i am coning");
							Ajax({
								url: gisConfig.urlIp + gisConfig.common + gisConfig.path.singleLabelShowLevel + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
								data: {
									"fields": {
										"appId": opt.appId,
										"tagInfoId": opt.lableInforId
									}
								},
								success: function(res) {
									if(res.data.length && res.data) {
										opt.singleLabelShowLevelId = res.data[0].id
										$.map(JSON.parse(res.data[0].showLevel), function(t, i) {
											$('.singleLabel').find('input:not(.none)').eq(i - 1).prop('checked', t)
										});
									}
								}
							})
						}
					},
					data: opt,
					fields: fields,
					queryUrl: gisConfig.urlIp + gisConfig.path.labelInfo + gisConfig.path.selectLabel + (opt && opt.id ? '/' + opt.id : '') + gisConfig.token + sessionStorage['token']

				}
			})
		]
	})
}*/