function applicateManagementGrid(opt) {
	var zooms = opt.data.zoom
	var mapid = opt.data.mapId
	var disData, defaultData, imgLevelData, zoomsImage;
	var groupList = [];
	var btns = {
			plus: {
				extraClass: ['fa', 'fa-plus-square', 'font-primary', 'fa-2x'],
				events: {
					click: function(opt) {
						opt.panel.addItem({
							xtype: 'applicateManagementAddAllForm',
							config: {
								data: {
									mapId: opt.panel.searchBox.querySelector('[name="mapId"]').value,
									zoom: zooms
								}
							}
						});
					},
					mouseenter: function(opt) {
						opt.btn.tips = layer.tips('新增', opt.btn, {
							tips: [1, '#286090']
						});
					},
					mouseleave: function(opt) {
						layer.close(opt.btn.tips);
					}
				}
			},
			reload: {
				extraClass: ['fa', 'fa-refresh', 'font-success', 'fa-2x'],
				events: {
					click: function(opt) {
						opt.panel.refresh();
					},
					mouseenter: function(opt) {
						$(opt.btn).addClass('fa-spin');
					},
					mouseleave: function(opt) {
						$(opt.btn).removeClass('fa-spin');
					}
				}
			}
		}
		//地图显示
	var mapFileBtn = [{
		text: '标识',
		event: function(opt) {
			var self = opt.ower
			self.shuju = {
				data: []
			}
			self.saveId = []
			self.container.find('.' + self.rightNav.containerClass).prepend('<ul>加载中...</ul>');

			function ulDisplay(response) {
				droreMap.unShowAllLayer();
				self.container.find('.' + self.rightNav.containerClass + ' ul').empty();
				$.each(response.data, function(ii, tt) {
					if(tt.name) {
						var name = tt.name
						var subtype = tt.id
					} else {
						var name = tt.tabName
						var subtype = tt.subtype
					}
					self.container.find('.' + self.rightNav.containerClass + ' ul').append($('<li>', {
						html: '<a><p><img src=' + tt.pageSrc + ' /></p><div class="countSmall"><span>' + name.substr(0, 3) +
							'</span><small class="countSmalls none"></small></div><input type="checkbox" class="js-switch" checked/></div></a>',
						uid: subtype,
						title: name
					}).on({
						'click': function() {
							$(this).attr('title', name);
							if($(this).attr('class')) {
								$(this).removeClass('active');
							} else {
								$(this).addClass('active').siblings().removeClass('active');
							}
							var num = droreMap.getIconNumByLayerId(tt.id);
							num = '(' + num + ')';
							$('[uid=' + subtype + ']').find('.countSmalls.none').removeClass('none').text(num);
						}
					}));
					var switchery = new Switchery(document.querySelectorAll('.js-switch')[ii], {
						size: 'small'
					});
					$(switchery.element).change(function() {
						droreMap.showLayer(subtype, this.checked); //绑定标签显示隐藏
					});
					droreMap.addLayer(subtype, tt.src); //加载创建对应标签图层					
					droreMap.showLayer(subtype, true); //显示对应标签图层
				});
				//全选按钮默认是开的
				$('.addLogo .js-switch').prop('checked', 1)
				$('.addLogo .switchery').css({
					'borderColor': 'rgb(100, 189, 99)',
					'boxShadow': 'rgb(100, 189, 99) 0 px 0 px 0 px 0 px inset',
					'transition': 'border 0.4s, box-shadow 0.4s, background-color 1.2s;',
					'backgroundColor': 'rgb(100, 189, 99)'
				}).find('small').css({
					'left': 20,
					'transition': 'left 0.2s'
				})
			}
			//编辑页面，显示所有的选项框标识信息
			Ajax({
				url: gisConfig.urlIp + gisConfig.path.labelTab + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
				aysnc: false,
				data: {
					fields: {
						mapId: mapid
					},
					pageSize: 9999,
					pageNo: 1
				},
				success: function(response) {

					defaultData = response
						//添加的编辑、全选按钮
					self.container.find('.' + self.rightNav.containerClass).append($("<div>", {
						html: "<span id='edit-logo'>编辑</span><span>全选</span><input type='checkbox' class='js-switch' checked/>",
						class: 'addLogo'
					}))
					var allSelect = new Switchery(document.querySelector('.addLogo .js-switch'), {
							size: 'small'
						})
						//编辑页面
					$("#edit-logo").click(function() {
							layer.open({
								title: '添加标识',
								content: "<form id='formEdit'></form>",
								area: ['600px', '500px'],
								btn: ['确认', '取消'],
								success: function() {
									$.each(response.data, function(ii, tt) {
										$('#formEdit').append($('<div>', {
											html: '<input type="checkbox"/><span>' + tt.name + '</span>',
											uid: tt.id,
											class: ['edit-logo-li']
										}).on({
											'click': function() {
												var uid = $(this).attr('uid')
												var ins = $(this).children('input').prop('checked')
												if(ins) {
													self.saveId.push(uid)
												} else {
													self.saveId = $.grep(self.saveId, function(n) {
														return n == uid
													}, true)
												}
											}
										}));
									});
									//已经添加的标识前打钩
									$.each(self.shuju.data, function(i, t) {
										$('#formEdit div[uid=' + t.id + ']').find('input').prop('checked', 'true')
									});
									//添加全选按钮
									$('.layui-layer-btn').append($('<span>', {
										html: '<button id="checkAll">全选</button>',
										class: 'app-label-click'
									}))

									//全选按钮实现
									if(self.shuju.data.length == response.data.length) {
										var count = 1;
										$('#checkAll').text('不选')
									} else {
										var count = 0
									}
									$("#checkAll").click(function() {
										count++
										if(count % 2 == 0) {
											$('#formEdit').find('input').prop('checked', 0)
											$(this).text('全选');
											self.saveId = []
										} else {
											$('#formEdit').find('input').prop('checked', 1)
											$(this).text('不选')
											self.saveId = []
											$.each(response.data, function(i, t) {
												self.saveId.push(t.id)
											})

										}
									})
								},
								yes: function() {
									var datas = []
										//获取saveId中对应标识的信息
									$.each(response.data, function(ii, tt) {
										$.each(self.saveId, function(i, t) {
											if(tt.id == t) {
												datas.push(tt)
											}
										});
									});
									//判断是否添加过
									Ajax({
										url: gisConfig.urlIp + gisConfig.common + gisConfig.path.commonTab +
											gisConfig.type.find + gisConfig.token + sessionStorage['token'],
										data: {
											"fields": {
												"appId": opt.ower.ajaxData.appid
											}
										},
										success: function(res) {
											//把添加的的数据存储到self.shuju	
											self.shuju.data = datas
											var bb = '"["' + self.saveId.join('","') + ']"'
											if(res.id) {
												//更新													
												Ajax({
													url: gisConfig.urlIp + gisConfig.common +
														gisConfig.path.commonTab +
														gisConfig.type.updata + gisConfig.token + sessionStorage['token'],
													type: 'put',
													data: {
														'id': res.id,
														'subtype': '["' + self.saveId.join('","') + '"]',
														'appId': opt.ower.ajaxData.appid
													},
													success: function(respone) {
														if(res.success) {
															var inde = layer.msg('保存成功', {
																	icon: 6,
																	time: 2000
																},
																function() {
																	layer.close(inde)
																		//把保存的标识添加到ul中																	
																	if(self.saveId.length) {
																		ulDisplay(self.shuju)
																	} else {
																		ulDisplay(defaultData)
																	}
																})

														}
													}
												})
											} else {
												//保存
												Ajax({
													url: gisConfig.urlIp + gisConfig.common +
														gisConfig.path.commonTab +
														gisConfig.type.save + gisConfig.token + sessionStorage['token'],
													data: {
														appId: opt.ower.ajaxData.appid,
														subtype: self.saveId
													},
													success: function(res) {
														//判断是否成功
														if(res.success) {
															var inde = layer.msg('保存成功', {
																icon: 6,
																time: 2000
															}, function() {
																layer.close(inde);
																ulDisplay(self.shuju)
															})
														}
													}
												})
											}
										}
									})
								}
							});
						})
						//全选按钮开/关效果实现
					$(allSelect.element).change(function() {
						var ddd = this.checked
						$('.js-switch:not(.addLogo .js-switch)').each(function(index, item) {
							droreMap.showLayer($(item).parents('li').attr('uid'), ddd); //绑定标签显示隐藏
							if(ddd == false) {
								$(item).siblings('span').removeAttr('style').find('small').css({
									'left': 0,
									'transition': 'left 0.2s'
								})
							} else {
								$(item).siblings('span').css({
									'borderColor': 'rgb(100, 189, 99)',
									'boxShadow': 'rgb(100, 189, 99) 0 px 0 px 0 px 0 px inset',
									'transition': 'border 0.4s, box-shadow 0.4s, background-color 1.2s;',
									'backgroundColor': 'rgb(100, 189, 99)'
								}).find('small').css({
									'left': 20,
									'transition': 'left 0.2s'
								})
							}
						})

					});
				}
			});
			//获取当前地图的标签信息
			Ajax({
				url: gisConfig.urlIp + gisConfig.path.labelInfo + gisConfig.type.findAndSrc + gisConfig.token + sessionStorage['token'],
				aysnc: false,
				data: {
					fields: {
						'mapId': mapid,
						'appId': opt.ower.ajaxData.appid
					},
					pageSize: 9999,
					pageNo: 1
				},
				success: function(response) {
					if(response.data && response.data.length) {
						imgLevelData = response.data
						droreMap.interaction.enableMapClick = true
						$.each(response.data, function(i, t) {
							var val;
							if(t.olX && t.olY) {
								val = [parseFloat(t.olX), parseFloat(t.olY)];
							} else {
								val = droreMap.transFromPixToLayer(t.x, t.y);
							}
							var icon = new droreMap.icon.Marker({
								coordinate: val,
								name: t.name,
								subtype: t.subtype,
								id: t.id,
								url: t.src
							});
							droreMap.icon.addChild(icon)
							gisConfig.iconMarker[t.id] = icon
							icon.onclick(function(e) {
								console.log(e)
								var obj = $.extend(e.data, {
									appId: opt.ower.ajaxData.appid,
									zoom: zooms
								})
								mapLabelInformationChildrenForm(obj);
							})
						});
						droreMap.unShowAllLayer();
						//获取当前appid下的imgLeve
						Ajax({
							url: gisConfig.urlIp + gisConfig.path.imageLevel + gisConfig.type.findByAppId + gisConfig.token + sessionStorage['token'],
							data: {
								"pageNo": "1",
								"pageSize": "10",
								"fields": {
									"appId": opt.ower.ajaxData.appid
								}
							},
							aysnc: false,
							success: function(res) {
								//要求当前添加一个当前的style下的图片路径
								if(res.data && res.data.length && res.data[0].imgLevel) {
									var data = JSON.parse(res.data[0].imgLevel)

									var fileUrl = res.data[0].fileUrl

									function changeImgSize(zoom) {
										if(gisConfig.addIconData) {
											$.each(imgLevelData, function(index, item) {
												if(item.id == gisConfig.addIconData.id) {
													imgLevelData.splice(index, 1)
												}
											})
											imgLevelData.push(gisConfig.addIconData);
											gisConfig.addIconData = null
										}
										//单个应用标签的层级显示
										var zoomsUrl = '',
											obj = {};
										groupList = []
										if(zoom <= parseInt(zooms) && data[zoom]) {
											zoomsImage = fileUrl + data[zoom]
											$.map(imgLevelData, function(t) {
												var idlist = []
												var nameSrc = t.src.split('/')
												zoomsUrl = fileUrl + data[zoom] + '/' + nameSrc[nameSrc.length - 1]
												if(!obj[t.subtype]) {
													$.map(imgLevelData, function(m) {
														if(t.subtype == m.subtype) {
															if(m.showLevel) {
																if(JSON.parse(m.showLevel)[zoom]) {
																	idlist.push(m.id)
																}
															} else {
																idlist.push(m.id)
															}
														}
													})
													var group = new droreMap.IconGroup(t.subtype, zoomsUrl, idlist)
													obj[t.subtype] = t.subtype;
													groupList.push(group)
												}
											});
											droreMap.refreshLayer(groupList)
										} else {
											droreMap.unShowAllLayer();
										}
									}
									changeImgSize(droreMap.getZoom())
									droreMap.addZoomChange("zoomChange", function(zoom) {
										var precent = zoom / zooms * 100
										layer.msg(precent + '%', {
											time: 500
										});
										changeImgSize(zoom)
									})
								} else {
									droreMap.showAllLayer();
								}
							}
						})
					}
				}
			});
			//获取当前地图的标签
			Ajax({
				url: gisConfig.urlIp + gisConfig.path.labelsApplication + gisConfig.type.findTabsByAppId + gisConfig.token + sessionStorage['token'],
				aysnc: false,
				data: {
					fields: {
						'appId': opt.ower.ajaxData.appid
					},
					pageSize: 9999,
					pageNo: 1
				},
				success: function(response) {
					if(response.data && response.data.length) {
						self.shuju.data = response.data
						$.each(response.data, function(i, t) {
							self.saveId.push(t.subtype);
							t.id = t.subtype
						});
						ulDisplay(response)
					} else {
						self.shuju.data = defaultData.data;
						ulDisplay(defaultData)
					}
				}
			});
			droreMap.addMouseEvent("dblclick", 'dblclick', function(e) {
				if(self.container.find('.' + self.rightNav.containerClass + ' li.active').length > 0) {
					var subtype = self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid')
					var src, url;
					//标签保存的时候src 小图标
					$.map(self.shuju.data, function(t) {
						if(t.id == subtype) {
							src = t.src;
								//地图拼接的url
							url = zoomsImage + '/' + src.split('/')[src.split('/').length - 1]
						}
					})

					mapLabelInformationChildrenForm({
						data: {
							mapId: mapid,
							zoom: zooms,
							appId: opt.ower.ajaxData.appid,
							src: src,
							olX: e.coordinate[0],
							olY: e.coordinate[1],
							x: droreMap.transFromLayerToPixel(e.coordinate)[0],
							y: droreMap.transFromLayerToPixel(e.coordinate)[1],
							subtype: subtype,
							url: url
						}
					});
				} else {
					layer.msg('请选择标签类型', function() {});
				}
			});
			//			droreMap.addMouseEvent("singleclick", 'singleclick', function(e) {
			//				var iconData = droreMap.getIconData(e);
			//
			//				if(iconData) {
			//					iconData.data.appId = opt.ower.ajaxData.appid
			//					iconData.data.zoom = zooms
			//					mapLabelInformationChildrenForm({
			//						iconData[data],
			//						appId:opt.ower.ajaxData.appid,
			//						zoom:zooms
			//					});
			//				}
			//			});
			//地图上标签拖动
			droreMap.ifDrag = true;
			droreMap.DragEvent(function(tabInfor) {
				var data = tabInfor.data
				var obj = {
					id: tabInfor.data.data.id
				}
				layer.open({
					title: '移动',
					content: '确定移动标签？？',
					btn: ['确认', '取消'],
					yes: function(index) {
						//墨卡托坐标转换
						var val = droreMap.transFromLayerToPixel(data.end)
						obj.x = val[0]
						obj.y = val[1]
						obj.olX = data.end[0]
						obj.olY = data.end[1]
						var vals = droreMap.transLayerToWgs(data.end)
						obj.threeLng = vals[0]
						obj.threeLat = vals[1]
							//保存移动后的数据
						Ajax({
							url: gisConfig.urlIp + gisConfig.path.labelInfo + gisConfig.type.updateLabel + gisConfig.token + sessionStorage['token'],
							type: 'put',
							data: obj,
							success: function(response) {
								if(response.success) {
									if(response.success) {
										//用标签的setPosition方法
										data.marker.setPosition(data.end)
										layer.msg('移动成功!');
										layer.close(index);
									} else {
										layer.msg(response.message || '标签拖动后的数据保存失败')
										droreMap.setFeatureGeo(data.marker.feature, data.start)
										layer.close(index);
									}
								}
							}
						});
					},
					btn2: function() {
						droreMap.setFeatureGeo(data.marker.feature, data.start)
					}
				});
			})
		}
	}];
	var operationBtns = {
		applicaMapInfo: {
			extraClass: ['fa', 'fa-image', 'btn', 'btn-sm', 'btn-info',
				'btn-space'
			],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('地图标签维护', opt.btn, {
						tips: [1, '#31b0d5']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					opt.panel.checkActive = {
						methodname: opt.btn.getAttribute('methodname'),
						uid: opt.tr.getAttribute('uid')
					};
					checkActive({
						table: opt.panel.table,
						tr: opt.tr,
						backgroundColor: '#d9534f'
					});
					$('.map-box').remove();
					$('body').append($('<div>', {
						class: 'map-box',
						html: '<div id="map" class="map"></div>'
					}));
					var inde = layer.open({
						type: 1,
						title: '编辑地图[' + opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML + ']',
						shadeClose: true,
						shade: 0.8,
						//maxmin: true,
						area: ['100%', '100%'],
						content: $('.map-box'),
						success: function() {
							new mapFile({
								container: $('#map'),
								ajaxData: {
									url: gisConfig.urlIp + gisConfig.common + gisConfig.path.mapMain + '/' + opt.panel.searchBox.querySelector('[name="mapId"]').value + gisConfig.token + sessionStorage['token'],
									appid: opt.tr.getAttribute('uid')
								},
								rightNav: {
									containerClass: 'map-tab-right-nav'
								},
								model: {
									containerClass: 'map-model'
								},
								mapTab: {
									containerClass: 'map-tab',
									btnGroup: mapFileBtn
								}
							});
							$(".map-tab").addClass('none')
						}
					});
					layer.full(inde);
				}
			}
		},
		applicaMapLogo: {
			extraClass: ['fa', 'fa-tags', 'btn', 'btn-sm', 'btn-success',
				'btn-space'
			],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('查看标签', opt.btn, {
						tips: [1, '#449d44']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					opt.panel.checkActive = {
						methodname: opt.btn.getAttribute('methodname'),
						uid: opt.tr.getAttribute('uid')
					};
					checkActive({
						table: opt.panel.table,
						tr: opt.tr,
						backgroundColor: '#d9534f'
					});
					opt.panel.clearAllItem();
					opt.panel.addItem({
						xtype: 'applicationLabelInforGrid',
						config: {
							boxExtraClass: ['col-sm-12'],
							data: {
								appId: opt.tr.getAttribute('uid'),
								mapId: opt.panel.searchBox.querySelector('[name="mapId"]').value,
								innerHtml: opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML
							}
						}
					});
				}
			}
		},
		edit: {
			extraClass: ['fa', 'fa-edit', 'btn', 'btn-sm', 'btn-warning', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('编辑', opt.btn, {
						tips: [1, '#ec971f']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					opt.panel.addItem({
						xtype: 'applicateManagementForm',
						config: {
							data: {
								id: opt.tr.getAttribute('uid'),
								mapId: opt.panel.searchBox.querySelector('[name="mapId"]').value
							}
						}
					});
				}
			}
		},
		//标签等级
		labelLeve: {
			extraClass: ['fa', 'fa-tags', 'btn', 'btn-sm', 'btn-info', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('标签等级', opt.btn, {
						tips: [1, '#5bc0de']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					var imgLevelId = ''
					layer.open({
						title: '标签等级',
						content: '<form id="labelLevel"></form>',
						btn: ['确认', '取消'],
						area: ['800px', '500px'],
						success: function() {
							//显示标签的风格
							Ajax({
								url: gisConfig.urlIp + gisConfig.path.labelStyles + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
								data: {
									"pageNo": "1",
									"pageSize": "10",
									"fields": {}
								},
								success: function(response) {
									$("#labelLevel").append($("<div>", {
										html: "<label>标签风格</label><div></div>",
										class: 'col-sm-8 form-group labelLevel'
									}))
									$('.labelLevel').find('label').addClass('col-sm-4 form-label')
									$('.labelLevel').find('div').addClass('col-sm-8')
									$('.labelLevel div').append($("<select>", {
										html: "<option value>请选择</option>",
										name: 'styleId',
										class: 'form-control'
									}))
									if(response.data && response.data.length) {
										$.each(response.data, function(ii, tt) {
											$('.labelLevel [name="styleId"]').append('<option value=' + tt.id + '>' + tt.name + '</option>')
										});
									}
									$('#labelLevel').append('<div class="col-sm-12 title form-group">层级尺寸选择</div>')
									$('#labelLevel').append('<div id="imgLevelSize"></div>')
									for(var i = 0; i < zooms; i++) {
										var ddd = $('.labelLevel').clone().removeClass('labelLevel')
										$('#imgLevelSize').append(ddd)
										$('#imgLevelSize').find('select').attr('name', 'size')
										var level = i + 1
										$('#imgLevelSize').find('label').eq(i).text('地图的第' + level + '层级');
										$('[name="size"]').find('option:not(:first)').remove()
									}

									function styleIdFindImgLeval(styleIds) {
										Ajax({
											//											url: gisConfig.urlIp4 + gisConfig.path.labelTab + gisConfig.type.getImagesSizeInStyle+gisConfig.token+sessionStorage['token'],
											url: gisConfig.urlIp + gisConfig.path.labelTab + gisConfig.type.getImagesSizeInStyle,
											data: {
												"styleId": styleIds
											},
											success: function(res) {
												if(res.success) {

													$.each(res.data, function(ii, tt) {
														$('[name="size"]').append('<option value=' + tt + '>' + tt + '</option>')
													});
													if(disData) {
														for(var i = 0; i < zooms; i++) {
															var sizeIndex = i + 1;

															$('#imgLevelSize [name="size"]').eq(i).val(disData[sizeIndex])
														}
													} else {
														$('[name="size"]:selected').text('请选择')
													}
												} else {

													$('[name="size"]:selected').text('请选择');
													$('[name="size"]:selected').text()
												}
											}
										})
									}
									Ajax({
										url: gisConfig.urlIp + gisConfig.path.imageLevel + gisConfig.type.findByAppId + gisConfig.token + sessionStorage['token'],
										data: {
											"pageNo": "1",
											"pageSize": "10",
											"fields": {
												"appId": opt.tr.getAttribute('uid')
											}
										},
										success: function(res) {
											if(res.data && res.data.length && res.data[0].imgLevel) {
												imgLevelId = res.data[0].id
												disData = JSON.parse(res.data[0].imgLevel)
												$.map(response.data, function(t) {
													if(t.styleCode == res.data[0].styleCode) {
														styleIdFindImgLeval(t.id);
														$("[name='styleId']").val(t.id)
													}
												});
											}
										}
									})
									$("#labelLevel [name='styleId']").on('change', function() {
										disData = null
										$('[name="size"]').find('option:not(:first)').remove();
										styleIdFindImgLeval($("#labelLevel [name='styleId']").val())
									})
								}
							})
						},
						yes: function() {
							//更新
							var imgLevels = {},
								imgNull = parseInt(zooms),
								imgLevel = ''
							$('[name="size"]').each(function(i) {
								i++
								imgLevels[i] = $(this).val()
								if($(this).val()) {
									imgNull -= 1
								}
							})

							imgLevel = JSON.stringify(imgLevels)
							var obj = {
								'appId': opt.tr.getAttribute('uid'),
								'imgLevel': imgLevel,
								'styleId': $("#labelLevel select").val()
							}
							if(imgLevelId) {
								obj.id = imgLevelId
							}
							if(obj.styleId && imgNull < parseInt(zooms)) {
								Ajax({
									url: gisConfig.urlIp + gisConfig.common + gisConfig.path.imageLevel + (imgLevelId ? gisConfig.type.updata : gisConfig.type.save) +
										gisConfig.token + sessionStorage['token'],
									type: imgLevelId ? 'put' : 'post',
									data: obj,
									success: function(res) {
										layer.closeAll();
										layer.msg('编辑成功!');
										opt.panel.owner.refresh();
									}
								})
							} else {
								layer.msg('请选择图层的样式和对应图层的尺寸')
							}

						}
					})
				}
			}
		},
		delete1: {
			extraClass: ['fa', 'fa-trash', 'btn', 'btn-sm', 'btn-danger', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('删除', opt.btn, {
						tips: [1, '#c9302c']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					var delText = opt.tr.cells[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML
					layer.confirm('你真的要删除“' + delText + '”', {
						btn: ['确定', '取消']
					}, function() {
						Ajax({
							url: gisConfig.urlIp + gisConfig.common + gisConfig.path.gisApplication + '/' + opt.tr.getAttribute('uid') + gisConfig.token + sessionStorage['token'],
							type: 'delete',
							success: function(response) {
								layer.msg('删除成功');
								if(opt.panel.checkActive == opt.tr.getAttribute('uid') && opt.panel.checkActive == opt.panel.childGalleryGrid.searchBox.querySelector('[name="parentId"]').value) {
									$(opt.panel.childGalleryGrid.component).remove();
								}
								opt.panel.refresh();
							}
						});
						layer.closeAll(); //关闭所有层
					}, function() {
						layer.closeAll(); //关闭所有层
					});
				}
			}
		},
		//预览地图
		previewMap: {
			extraClass: ['fa', 'fa-image', 'btn', 'btn-sm', 'btn-primary', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('预览地图', opt.btn, {
						tips: [1, '#337ab7']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					window.open('previewMap.html?appId=' + opt.tr.getAttribute('uid') + '&mapId=' + opt.panel.searchBox.querySelector('[name="mapId"]').value + '&zoom=' + zooms + '&name=' + opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML)
				}
			}
		}

	}
	var fields = [{
		text: '序号',
		type: 'increment'
	}, {
		text: '景区名称',
		name: 'name'
	}, {
		text: '应用编码',
		name: 'code'
	}, {
		name: 'port',
		text: '端口号'

	}, {
		name: 'deployUrl',
		text: '部署路径'

	}, {
		type: 'operations',
		text: '操作'
	}];
	return new GridPanel(setConfig({
		opt: opt,
		fnName: arguments.callee,
		btns: btns,
		operationBtns: operationBtns,
		classGroup: 'GridPanel',
		config: {
			url: gisConfig.urlIp + gisConfig.common + gisConfig.path.gisApplication + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
			fields: fields,
			pageSize: 5,
			pageNo: 1,
			title: {
				innerHTML: opt.data.innerHtml + '[应用管理]',
			},
			search: {
				fields: [{
					name: 'name',
					text: '应用管理'
				}, {
					name: 'mapId',
					value: opt.data.mapId,
					hidden: true
				}, {
					name: 'appId',
					value: opt.data.appId,
					hidden: true
				}]
			}
		}
	}));
}