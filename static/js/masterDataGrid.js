function masterDataGrid(opt) {
	var mapid, defaultData, popPanel, lineLastIndex;
	var panelData, keyPointId, keyPointData, keyPointIndex;

	var btns = {
			plus: {
				extraClass: ['fa', 'fa-plus-square', 'font-warning', 'fa-2x'],
				events: {
					click: function(opt) {
						opt.panel.addItem({
							xtype: 'masterDataForm'
						});
					},
					mouseenter: function(opt) {
						opt.btn.tips = layer.tips('新增', opt.btn, {
							tips: [1, '#f0ad4e']
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
						opt.panel.clearAllItem();
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
		//ul的显示
	var mapFileBtnGroup = [{
		text: '标识',
		event: function(opt) {
			var self = opt.ower;
			var mapid0 = opt.ower.ajaxData.url.split('/')
			mapid0 = mapid0[mapid0.length - 1].split('?')[0];
			mapid = mapid0
			var selectAllClick = false
			self.shuju = {
				data: []
			}
			selectAllClick = false
			self.saveId = []
			self.container.find('.' + self.rightNav.containerClass).prepend('<ul>加载中...</ul>');
			//ul列表显示
			function ulDisplay(response) {
				droreMap.unShowAllLayer()
				self.container.find('.' + self.rightNav.containerClass + ' ul').html('');
				$.each(response, function(ii, tt) {
					var name = tt.name.substr(0, 4)
					self.container.find('.' + self.rightNav.containerClass + ' ul').append($('<li>', {
						html: '<a><p><img src=' + tt.pageSrc + ' /></p><div class="countSmall"><span>' + name +
							'</span><small class="countSmalls none"></small></div><input type="checkbox" class="js-switch" checked/></div></a>',
						uid: tt.id,
						title: tt.name
					}).on({
						'click': function() {
							if(!selectAllClick) {
								layer.msg('数据还未加载完成，请稍后', {
									time: 2000,
									shade: 0.3
								})
								$(this).siblings('span').removeAttr('style').find('small').css({
									'left': 0,
									'transition': 'left 0.2s'
								})
								return false;
							} else {
								$(this).attr('title', tt.name)
								if($(this).attr('class')) {
									$(this).removeClass('active');
								} else {
									$(this).addClass('active').siblings().removeClass('active');
								}
								var num = droreMap.getIconNumByLayerId(tt.id)
								$('[uid=' + tt.id + ']').find('.countSmall').attr('nums', num)
								num = '(' + num + ')';
								$('[uid=' + tt.id + ']').find('.countSmalls.none').removeClass('none').text(num)
							}

						}
					}));
					var switchery = new Switchery(document.querySelectorAll('.js-switch')[ii], {
						size: 'small'
					});
					$(switchery.element).change(function() {
						droreMap.showLayer(tt.id, this.checked); //绑定标签显示隐藏						
					});
					droreMap.addLayer(tt.id, tt.src); //加载创建对应标签图层					
					//					droreMap.showLayer(tt.id, true); //显示对应标签图层
				});
				//全选按钮默认是开的
				$('.addLogo .js-switch').prop('checked', false)
					//				$('.addLogo .switchery').css({
					//					'borderColor': 'rgb(100, 189, 99)',
					//					'boxShadow': 'rgb(100, 189, 99) 0 px 0 px 0 px 0 px inset',
					//					'transition': 'border 0.4s, box-shadow 0.4s, background-color 1.2s;',
					//					'backgroundColor': 'rgb(100, 189, 99)'
					//				}).find('small').css({
					//					'left': 20,
					//					'transition': 'left 0.2s'
					//				})
				$('.switchery').removeAttr('style').find('small').css({
					'left': 0,
					'transition': 'left 0.2s'
				})

			}
			//编辑页面，显示所有的标识信息
			Ajax({
				url: gisConfig.urlIp + gisConfig.path.labelTab + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
				async: false,
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
					self.container.find('.' + self.rightNav.containerClass).append("<div class='addLogo'><span id='" +
							"" +
							"" +
							"" +
							"-logo'>编辑</span><span>全选</span><input type='checkbox' class='js-switch' checked/></div>")
					var allSelect = new Switchery(document.querySelector('.addLogo .js-switch'), {
							size: 'small'
						})
						//编辑按钮的页面
					$("#edit-logo").click(function() {
							layer.open({
								title: '添加标识',
								content: "<div id='search' style='margin-bottom:5px'></div><form id='formEdit'></form>",
								area: ['600px', '500px'],
								btn: ['确认', '取消'],
								success: function() {
									function subtypeAppend() {
										$.each(response.data, function(ii, tt) {
											$('#formEdit').append($('<div>', {
												html: '<input type="checkbox"/><span>' + tt.name + '</span>',
												uid: tt.id,
												class: ['edit-logo-li']
											}).on({
												'click': function() {
													var uid = $(this).attr('uid')
													var ins = $(this).children('input').prop('checked')
													self.saveId = $.grep(self.saveId, function(n) {
														return n == uid
													}, true)
													if(ins) {
														self.saveId.push(uid)
													}
												}
											}));
										});
									}
									subtypeAppend()
										//添加搜索框
										//									$('#search').append('<div class="search-box" style="float:left"><label for="label-search" style="padding-right:10px">搜索标签</label><input id="label-search" type="text" style="display:inline" class="form-control page-total-input" name="sub" autocomplete="off" placeholder="标签名称" /></div>')
									$('#search').append('<div class="search-box"><label for="label-search" style="padding-right:10px">搜索标签</label><input id="label-search" type="text" style="display:inline" class="form-control page-total-input" name="sub" autocomplete="off" placeholder="标签名称" /></div>')
										//已经添加的标识前打钩
									$.each(self.shuju.data, function(i, t) {
										$('#formEdit div[uid=' + t.id + ']').find('input').prop('checked', 'true')
									});
									$('#label-search').bind('input propertychange', function() {
										$("#formEdit").empty().append('<hr style="display:block;clear:both;border-top: 1px solid #ddd;"/>')
										subtypeAppend()
										$.each(self.shuju.data, function(i, t) {
											$('#formEdit div[uid=' + t.id + ']').find('input').prop('checked', 'true')
										});
										if(this.value) {
											var span = $('#formEdit').find('span:contains(' + this.value + ')')
											if(span) {
												//												span.parents('div[uid]').css('margin-bottom', '5px').prependTo($("#formEdit"))
												span.parents('div[uid]').prependTo($("#formEdit"))
											}
										} else {
											$('hr').remove()
										}
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
										url: gisConfig.urlIp + gisConfig.path.commonTab + gisConfig.type.findByMapId + gisConfig.token + sessionStorage['token'],
										data: {
											"pageNo": "1",
											"pageSize": "10",
											"fields": {
												"mapId": mapid
											}
										},
										success: function(res) {
											//把添加的的数据存储到self.shuju	
											self.shuju.data = datas
											var bb = '"["' + self.saveId.join('","') + ']"'
											if(res.id) {
												//更新													
												Ajax({
													url: gisConfig.urlIp + gisConfig.common + gisConfig.path.commonTab + gisConfig.type.updata + gisConfig.token + sessionStorage['token'],
													type: 'put',
													data: {
														'id': res.id,
														'subtype': '["' + self.saveId.join('","') + '"]',
														'mapId': mapid
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
																		ulDisplay(self.shuju.data)
																	} else {
																		ulDisplay(defaultData.data)
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
														mapId: mapid,
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
																ulDisplay(self.shuju.data)
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
						if(!selectAllClick) {
							layer.msg('数据还未加载完成，请稍后', {
								time: 2000,
								shade: 0.3
							})
							$(this).siblings('span').removeAttr('style').find('small').css({
								'left': 0,
								'transition': 'left 0.2s'
							})
							return false;
						}
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
			//获取当前地图标签信息
			droreMap.removeIconClick()
			var labelInfo = Ajax({
				url: "/xubin/xxsd_icon.json",
				data: {
					pageSize: 10000,
					pageNo: 1,
					fields: {
						mapId: mapid
					}
				},
				success: function(response) {
					if(response.success) {
						selectAllClick = true;
						if(response.data && response.data.length) {
							//droreMap.interaction.enableMapClick = true
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
									droreMap.icon.addChild(icon)
									gisConfig.iconMarker[t.id] = icon;
									icon.onclick(function(e) {
										//鼠标点击图标的回调函数
										mapLabelInformationChildrenForm(e.data);
									})
								}
							});
							droreMap.unShowAllLayer()
						}
					} else {
						layer.msg(response.errMsg || '获取标签失败，请刷新重试！')
					}
				}
			});
			gisConfig.ajaxnames.push(labelInfo)
				//获取当前的标签信息
			Ajax({
				url:"/xubin/xxsd_map.json",
				async: false,
				data: {
					fields: {
						mapId: mapid
					},
					pageSize: 9999,
					pageNo: 1
				},
				success: function(response) {
					if(response.data && response.data.length) {
						self.shuju.data = response.data
						$.each(response.data, function(i, t) {
							self.saveId.push(t.id)
						});
						ulDisplay(response.data)
					} else {
						self.shuju.data = defaultData.data;
						ulDisplay(defaultData.data)
					}

				}
			});

			droreMap.addMouseEvent("dblclick", 'dblclick', function(e) {
				var m = droreMap.transFromLayerToPixel(e.coordinate);

				if(self.container.find('.' + self.rightNav.containerClass + ' li.active').length > 0) {
					var subtype = self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid'),
						src;
					$.map(self.shuju.data, function(t) {
						if(t.id == subtype) {
							src = t.src
						}
					})
					mapLabelInformationChildrenForm({
						mapId: mapid,
						src: src,
						olX: e.coordinate[0],
						olY: e.coordinate[1],
						x: droreMap.transFromLayerToPixel(e.coordinate)[0],
						y: droreMap.transFromLayerToPixel(e.coordinate)[1],
						subtype: subtype
					});
				} else {
					layer.msg('请选择标签类型', {
						time: 2000
					});
				}
			});
			//显示地图缩放的比例
			droreMap.addZoomChange("zoomNow", function(zoom) {
					var precent = zoom / opt.ower.ajaxData.zooms * 100;
					layer.msg(precent + '%', {
						time: 500
					})
				})
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
						});
					},
					btn2: function() {
						droreMap.setFeatureGeo(data.marker.feature, data.start)
					}
				});

			})
		}
	}, {
		text: '区域',
		event: function(opt) {
			//			var mapid0 = opt.ower.ajaxData.url.split('/')
			//			mapid0 = mapid0[mapid0.length - 1].split('?')[0];
			//			mapid = mapid0
			var self = opt.ower,
				events = [],
				areaIds = '';

			self.container.find('.' + opt.ower.rightNav.containerClass).append($('<div>', {
				class: 'region-btn',
			}));
			self.container.find('.' + opt.ower.rightNav.containerClass).append($('<ul>', {
				html: '<li>区域展示列表</li>'
			}));
			//区域类别展示
			Ajax({
				url: gisConfig.urlIp + gisConfig.path.dict + gisConfig.type.findByCode + gisConfig.token + sessionStorage['token'],
				data: {
					"code": "AREA_TYPE"
				},
				success: function(res) {
					self.container.find('.' + self.rightNav.containerClass + ' ul').html('');
					self.container.find('.' + self.rightNav.containerClass).append("<div class='addArea'><span>全选</span><input type='checkbox' class='js-switch' checked/></div>")

					//列表展示
					$.each(res.data, function(ii, tt) {
						//						var color = '#' + Math.floor(Math.random() * 16777215).toString(16)
						var color = gisConfig.selectColor[ii]
						var areaEvt = new droreMap.area.DrawLayer(tt.dicCode, 'rgba(212,222,222,0.4)', color)
						droreMap.area.addChild(areaEvt)
						events.push(areaEvt)
						areaIds += '#' + tt.dicCode + ','
						self.container.find('.' + self.rightNav.containerClass + ' ul').append($('<li>', {
							html: '<a><p><input value=' + color + ' id="' + tt.dicCode + '" name="' + tt.name + '"/></p><small>' + tt.name +
								'</small><input type="checkbox" class="js-switch" checked/></div></a>',
							uid: tt.dicCode,
							title: tt.name
						}).on({
							'click': function() {
								if(gisConfig.areaEventObj) {
									var areas = gisConfig.areaEventObj
										//移除之前的事件
									areas.ifDraw = false;
									areas.ifModify = false;
									areas.ifSelect = false;
									areas.removeEventListener('drawend', "drawend");
									areas.removeEventListener('select', "select")
								}
								if($(this).attr('class')) {
									$(this).removeClass('active');
									gisConfig.areaEventObj = ''
								} else {
									$(this).addClass('active').siblings().removeClass('active');
									//添加现在的事件
									$.map(events, function(e) {
										if(e.layerName == tt.dicCode) {
											gisConfig.areaEventObj = e
											gisConfig.areaEventObj.ifSelect = true;
										}
									})

								}
							}
						}));

						var switchery = new Switchery(document.querySelectorAll('.js-switch')[ii], {
							size: 'small'
						});
						$(switchery.element).change(function() {
							events[ii].setVisible(this.checked) //绑定标签显示隐藏						
						});

						//全选按钮默认是开的
						$('.addArea .js-switch').prop('checked', 1)
						$('.addArea .switchery').css({
							'borderColor': 'rgb(100, 189, 99)',
							'boxShadow': 'rgb(100, 189, 99) 0 px 0 px 0 px 0 px inset',
							'transition': 'border 0.4s, box-shadow 0.4s, background-color 1.2s;',
							'backgroundColor': 'rgb(100, 189, 99)'
						}).find('small').css({
							'left': 20,
							'transition': 'left 0.2s'
						})
					});

					self.container.find('.' + self.rightNav.containerClass + ' ul li:first').addClass('active')
					gisConfig.areaEventObj = events[0]
					gisConfig.areaEventObj.ifSelect = true;

					//区域颜色
					areaIds = areaIds.substr(0, areaIds.length - 1)
					$(areaIds).spectrum({
						change: function(color) {
							var name = $(this).parents('li').attr('uid')
							$.map(events, function(t, i) {
								if(t.layerName == name) {
									t.setStyle('rgba(212,222,222,0.4)', color.toHexString());
									gisConfig.selectColor[i] = color.toHexString()
								}
							});
						}
					});

					//全选按钮开/关效果实现
					var allSelect = new Switchery(document.querySelector('.addArea .js-switch'), {
						size: 'small'
					})
					$(allSelect.element).change(function() {
						var ddd = this.checked
						$('.js-switch:not(.addArea .js-switch)').each(function(index, item) {
							events[index].setVisible(ddd)
							if(ddd == false) {
								//区域显示
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
			})

			//区域添加
			var areaInfo = Ajax({
				url: gisConfig.urlIp + gisConfig.postgre + gisConfig.path.deck + gisConfig.type.findByType + gisConfig.token + sessionStorage['token'],
				data: {
					mapId: mapid
				},
				success: function(response) {
					if(response.data && response.data.length) {
						$.each(response.data, function(i, t) {
							$.map(events, function(e) {
								if(e.layerName == t.type) {
									var areaMercator = [JSON.parse(t.areaMercator)];
									e.addArea(areaMercator, t)
								}
							})
						});
					}
				}
			});
			gisConfig.ajaxnames.push(areaInfo)
				//监听事件--绘制和编辑-删除
			function drawed(areaSpot) {
				areaSpot.ifDraw = true;
				areaSpot.ifModify = false;
				areaSpot.addEventListener('drawend', "drawend", function(m, t) {
					areaSpot.ifDraw = false;
					mapRegionForm({
						data: {
							mapId: mapid,
							areaMercator: t[0],
							type: self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid'),
							areaSetIdAndName: m
						}
					});
				})
			}

			function edits(areaSpot) {
				areaSpot.ifDraw = false;
				areaSpot.ifModify = true;
				areaSpot.addEventListener('select', "select", function(e) {

					if(e.unSelect) {
						//更新前一个区域数据
						var areaPixel = [],
							areaLat = []
						$.map(e.unSelect.area[0], function(t) {
							areaPixel.push(droreMap.transFromLayerToPixel(t));
							areaLat.push(droreMap.transLayerToWgs(t))
						})

						Ajax({
							url: gisConfig.urlIp + gisConfig.postgre + gisConfig.path.deck + gisConfig.type.updateDeck + gisConfig.token + sessionStorage['token'],
							type: 'put',
							data: {
								mapId: mapid,
								areaMercator: e.unSelect.area[0],
								areaPixel: areaPixel,
								areaLat: areaLat,
								id: e.unSelect.id,
								name: e.unSelect.name,
								type: self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid')
							},
							success: function(response) {
								areaSpot.ifModify = true;
								layer.msg('[' + e.unSelect.name + ']编辑成功!');
							}
						});
					}
					if(e.select) {
						mapRegionForm({
							data: {
								mapId: mapid,
								areaMercator: e.select.area[0],
								type: self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid'),
								areaSetIdAndName: e.select.self,
								name: e.select.name,
								id: e.select.id
							}
						});
						localStorage.setItem('regionAreaSelectId', e.select.id);
						localStorage.setItem('regionAreaSelectName', e.select.name);
					}
				})
			}

			function deletes(areaSpot) {
				areaSpot.ifDraw = false;
				areaSpot.ifModify = false;
				areaSpot.deleteAreaById(localStorage.getItem('regionAreaSelectId'))
			}
			var btnGroup = [{
					html: '绘制',
					class: 'btn-primary',
					event: function() {
						drawed(gisConfig.areaEventObj)
					}
				}, {
					html: '编辑',
					class: 'btn-primary',
					event: function() {
						edits(gisConfig.areaEventObj)
					}
				}
				//			, {
				//				html: '删除',
				//				class: 'btn-primary',
				//				event: function() {
				//					layer.confirm('确定要删除[' + localStorage.getItem('regionAreaSelectName') + ']？', {
				//						btn: ['确定', '取消'] //按钮
				//					}, function() {
				//						Ajax({
				//							url: gisConfig.urlIp + gisConfig.postgre + gisConfig.path.deck + '/' + localStorage.getItem('regionAreaSelectId') + gisConfig.token + sessionStorage['token'],
				//							type: 'delete',
				//							success: function(response) {
				//								layer.msg('删除成功');
				//								//删除区域	
				//								deletes(gisConfig.areaEventObj)
				//							}
				//						});
				//					}, function(index) {
				//						layer.close(index);
				//					});
				//				}
				//			}
			];
			$.each(btnGroup, function(i, t) {
				$('.region-btn').append($('<div>', {
					class: 'btn  ' + t.class,
					html: t.html,
					style: 'margin-right:83px'
				}).on({
					'click': function() {
						if(t.event && gisConfig.areaEventObj) {
							t.event();
						} else {
							layer.msg('请选择区域类型')
						}
					}
				}));
			});

		}
	}, {
		text: '路网',
		event: function(opt) {
			/**********************
			添加一个功能：首先判断当前的地图的路网数据表是否已经创建
			是：直接展示路网编辑页面
			否：1.弹出窗口，添加该地图的路网数据的表的名称
			2.展示路网编辑页面
			**********************/
			Ajax({
					url: gisConfig.urlIp + gisConfig.path.pgrouting + gisConfig.type.tableExistJudge + gisConfig.token + sessionStorage['token'],
					type: 'post',
					data: {
						mapId: mapid
					},
					success: function(roadName) {
						//判断有木有路网数据表名：
						if(roadName.success) {
							gisConfig.roadTabelName = true;
						} else {
							addRoadSourceTabNameForm({
								data: {
									mapId: mapid
								}
							})
						}
					}
				})
				//			var mapid0 = opt.ower.ajaxData.url.split('/')
				//			mapid0 = mapid0[mapid0.length - 1].split('?')[0];
				//			mapid = mapid0
			var self = opt.ower,
				events = [],
				areaIds = '';

			self.container.find('.' + opt.ower.rightNav.containerClass).append($('<div>', {
				class: 'region-btn',
			}));
			self.container.find('.' + opt.ower.rightNav.containerClass).append($('<ul>', {
				html: '<li>路网展示列表</li>'
			}));
			//添加面板
			if(!$('#roadPointPanel').length) {
				$('body').append($('<div>', {
					html: '<span titles="延长">延长</span><span titles="拆分">拆分</span><span titles="关键点">关键点</span>',
					id: 'roadPointPanel',
					class: "roadP",
					style: 'display:none'
				}))
			};
			$('#roadPointPanel span').click(function() {
				var sort = $(this).attr('titles')
				$('#roadPointPanel').css('display', 'none')
				var title = sort.match('关键点') ? ('是否' + (!keyPointId ? '添加' : '更改') + '关键点？？') : ('是否' + sort + "路网")
				layer.confirm(title, function(index) {
					layer.close(index)
					var lineIds = localStorage.getItem('regionRoadSelectId')
					if(sort.match('延长')) {
						//延长：就是点击某一点之后，再关闭编辑然后进行绘制，并把当前点添加到新建路网中				
						drawedss(gisConfig.routeEventobj)
					}
					if(sort.match('拆分')) {
						//拆分：就是把一条路网从某个点分为两个路网，【0，目标】更新，【目标，结束】新建
						if(keyPointIndex == 0 || keyPointIndex == lineLastIndex) {
							layer.msg('拆分点不能为起点或者是终点');
							$('#roadPointPanel').css('display', 'block')
						} else {
							Ajax({
								url: gisConfig.splitUrl(keyPointIndex, lineIds),
								type: 'get',
								success: function(resp) {
									if(resp.success) {
										gisConfig.routeEventobj.deleteRoad(lineIds)
										$.map(resp.data, function(tt) {
											var xyz = [],
												datas = JSON.parse(tt.xyz)
											$.map(datas, function(data) {
												xyz.push(droreMap.transFromWgsToLayer(data))
											});
											gisConfig.routeEventobj.addRoad(xyz, tt)
										});
										gisConfig.routeEventobj.cancelSelect();
										layer.msg(resp.message);
									} else {
										var mess = resp.errMsg ? resp.errMsg : resp.message;
										layer.msg(mess)
									}
								}
							})
						}
					}
					if(sort.match('关键点')) {
						//关键点					
						//layer.confirm('是否' + (!keyPointId ? '添加' : '更改') + '关键点？？', function(index) {						
						roadPointForm({
								data: {
									mapId: mapid,
									lineId: lineIds,
									xyz: keyPointData,
									pointType: gisConfig.routeEventobj.roadName,
									id: keyPointId
								}
							})
							//						})
					}
				}, function(index) {
					layer.close(index);
					$('#roadPointPanel').css('display', 'block')
				})

			})
			var div = document.getElementById('roadPointPanel')
			popPanel = new droreMap.pop.Popup(div, [0, 0], 'roadPanel')
			droreMap.pop.addChild(popPanel);

			//路网类型展示
			Ajax({
					url: gisConfig.urlIp + gisConfig.path.dict + gisConfig.type.findByCode + gisConfig.token + sessionStorage['token'],
					data: {
						"code": "ROUTE_TYPE"
					},
					async: false,
					success: function(res) {
						self.container.find('.' + self.rightNav.containerClass + ' ul').html('');
						self.container.find('.' + self.rightNav.containerClass).append("<div class='addArea'><span>全选</span><input type='checkbox' class='js-switch' checked/></div>")
							//列表展示
						$.each(res.data, function(ii, tt) {
							//						var color = '#' + Math.floor(Math.random() * 16777215).toString(16)
							var color = gisConfig.selectColor[ii]
							var areaEvt = new droreMap.road.RoadLayer(tt.dicCode, color, color)
							droreMap.road.addRoadLayer(areaEvt)
							events.push(areaEvt)
							areaIds += '#' + tt.dicCode + ','
							self.container.find('.' + self.rightNav.containerClass + ' ul').append($('<li>', {
								html: '<a><p><input value=' + color + ' id="' + tt.dicCode + '" name="' + tt.name.substring(0, 4) + '"/></p><small>' + tt.name +
									'</small><input type="checkbox" class="js-switch" checked/></div></a>',
								uid: tt.dicCode,
								title: tt.name
							}).on({
								'click': function() {
									if(gisConfig.routeEventobj) {
										var areas = gisConfig.routeEventobj
											//移除之前的事件
										areas.ifDraw = false;
										areas.ifModify = false;
										areas.ifSelect = false;
										areas.removeEventListener('drawend', "drawend")
										areas.removeEventListener('select', "select");
										gisConfig.routeEventobj = ''
									}
									if($(this).attr('class')) {
										$(this).removeClass('active');
										gisConfig.routeEventobj = ''
									} else {
										$(this).addClass('active').siblings().removeClass('active');
										//添加现在的事件
										$.map(events, function(e) {
											if(e.roadName == tt.dicCode) {
												gisConfig.routeEventobj = e
												gisConfig.routeEventobj.ifSelect = true;
											}
										})
									}
								}
							}));

							var switchery = new Switchery(document.querySelectorAll('.js-switch')[ii], {
								size: 'small'
							});
							$(switchery.element).change(function() {
								events[ii].setVisible(this.checked) //绑定标签显示隐藏						
							});

							//全选按钮默认是开的
							$('.addArea .js-switch').prop('checked', 1)
							$('.addArea .switchery').css({
								'borderColor': 'rgb(100, 189, 99)',
								'boxShadow': 'rgb(100, 189, 99) 0 px 0 px 0 px 0 px inset',
								'transition': 'border 0.4s, box-shadow 0.4s, background-color 1.2s;',
								'backgroundColor': 'rgb(100, 189, 99)'
							}).find('small').css({
								'left': 20,
								'transition': 'left 0.2s'
							})
						});

						self.container.find('.' + self.rightNav.containerClass + ' ul li:first').addClass('active')
						gisConfig.routeEventobj = events[0]
						gisConfig.routeEventobj.ifSelect = true

						//颜色
						areaIds = areaIds.substr(0, areaIds.length - 1)
						$(areaIds).spectrum({
							change: function(color) {
								var name = this.id
								$.map(events, function(t, i) {
									if(t.roadName == name) {
										t.setStyle(color.toHexString());
										gisConfig.selectColor[i] = color.toHexString()
									}
								});
							}
						});
						//全选按钮开/关效果实现
						var allSelect = new Switchery(document.querySelector('.addArea .js-switch'), {
							size: 'small'
						})
						$(allSelect.element).change(function() {
							var ddd = this.checked
							$('.js-switch:not(.addArea .js-switch)').each(function(index, item) {
								events[index].setVisible(ddd)
								if(ddd == false) {
									//区域显示
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
						})
					}
				})
				//监听事件--绘制和编辑-删除
			function drawedss(areaSpot) {
				areaSpot.ifSelect = false;
				areaSpot.ifDraw = true;
				areaSpot.ifModify = false;
				areaSpot.addEventListener('drawend', "drawend", function(m, t) {
					areaSpot.ifDraw = false;
					if(panelData) {
						t.unshift(panelData)
					}
					var len = t.length - 1
					if(t[0][0] == t[len][0] && t[0][1] == t[len][1]) {
						layer.msg('路网不能绘制成圆环')
					} else {
						roadIntForm({
							data: {
								mapId: mapid,
								xyz: t,
								roadSetIdAndName: m,
								routeType: self.container.find('.' + self.rightNav.containerClass + ' li.active').attr('uid')
							}
						});
						panelData = null;
					}
				});
			}

			function edit(areaSpot) {
				areaSpot.ifDraw = false;
				areaSpot.ifModify = true;
				areaSpot.addEventListener('select', "select", function(e) {
						if(e.unSelect) {
							$('#roadPointPanel').css('display', 'none')
								//更新前一个路网数据
							if(e.unSelect.type == 'LineString') {
								var areaLat = []
								$.map(e.unSelect.area, function(t) {
									areaLat.push(droreMap.transLayerToWgs(t))
								})
								Ajax({
									url: gisConfig.urlIp + gisConfig.path.pgrouting + gisConfig.type.updata + gisConfig.token + sessionStorage['token'],
									type: 'put',
									data: {
										mapId: mapid,
										xyz: JSON.stringify(areaLat),
										id: e.unSelect.id,
										name: e.unSelect.name,
										routeType: gisConfig.routeEventobj.roadName
									},
									success: function(response) {
										if(response.success) {
											areaSpot.ifModify = true;
											layer.msg('[' + e.unSelect.name + ']路网编辑成功!');
										} else {
											layer.msg(response.message)
										}
									}
								});
							}

						}
						if(e.select) {
							localStorage.setItem('regionRoadSelectId', e.select.id);
							if(e.select.type == 'LineString') {
								roadIntForm({
									data: {
										mapId: mapid,
										xyz: e.select.area,
										routeType: gisConfig.routeEventobj.roadName,
										name: e.select.name,
										id: e.select.id
									}
								});
								//localStorage.setItem('regionRoadSelectId', e.select.id);
								localStorage.setItem('regionRoadSelectName', e.select.name);
							} else if(e.select.type == 'Point') {
								//点击路网中的点，出现面板，包括延长、拆分和关键点
								var div = document.getElementById('roadPointPanel')
								div.style.display = 'block';
								panelData = e.select.area
								popPanel.setPosition(panelData)
								localStorage.setItem('regionRoadSelectId', e.select.lineData.id);
								keyPointId = e.select.id
								keyPointData = e.select.area
								keyPointIndex = e.select.index;
								lineLastIndex = e.select.lineData.coords.length - 1
							}
						}
					})
					//路网编辑时候关键点移动了
				areaSpot.addEventListener('modifyKeyPoint', 'keychange', function(e) {
					var xyz = droreMap.transLayerToWgs(e.data.coord)
						//更新关键点
					Ajax({
						url: gisConfig.urlIp + gisConfig.path.keyPoint + gisConfig.type.updata + gisConfig.token + sessionStorage['token'],
						type: 'put',
						data: {
							id: e.data.id,
							xyz: JSON.stringify(xyz)
						}
					})
				})
			}
			var btnGroup = [{
				html: '绘制',
				class: 'btn-primary',
				event: function() {
					drawedss(gisConfig.routeEventobj)
				}
			}, {
				html: '编辑',
				class: 'btn-primary',
				event: function() {
					edit(gisConfig.routeEventobj)
				}
			}];
			$.each(btnGroup, function(i, t) {
				$('.region-btn').append($('<div>', {
					class: 'btn  ' + t.class,
					html: t.html,
					style: 'margin-right:83px'
				}).on({
					'click': function() {
						if(gisConfig.roadTabelName) {
							if(t.event && gisConfig.routeEventobj) {
								t.event();
							} else {
								layer.msg('请选择路网类型')
							}
						} else {
							layer.msg('路网数据表名没有添加，请先添加！！', {
								shade: 0.3,
								time: 2000
							}, function() {
								addRoadSourceTabNameForm({
									data: {
										mapId: mapid
									}
								})
							})
						}

					}
				}));
			});

			//路网展示
			var routerInfo = Ajax({
				url: gisConfig.urlIp + gisConfig.path.pgrouting + gisConfig.type.findAll + gisConfig.token + sessionStorage['token'],
				data: {
					fields: {
						mapId: mapid
					},
					pageSize: 9999,
					pageNo: 1
				},
				success: function(response) {
					if(response.data && response.data.length) {
						$.each(response.data, function(i, t) {
							var xyz = JSON.parse(t.xyz),
								data = []
							$.map(xyz, function(it) {
								data.push(droreMap.transFromWgsToLayer(it))
							})
							$.map(events, function(obj) {
								if(obj.roadName == t.routeType) {
									obj.addRoad(data, t)
								}
							});
						});
					}
				}
			});
			gisConfig.ajaxnames.push(routerInfo)
				//关键点展示
			var keyPointInfo = Ajax({
				url: gisConfig.urlIp + gisConfig.path.keyPoint + gisConfig.type.findByParam + gisConfig.token + sessionStorage['token'],
				data: {
					fields: {
						mapId: mapid
					}
				},
				success: function(res) {
					//根据返回的路网的type挑选events中对应的事件，进行添加关键点的
					//event[i].addKeyPoint(lineId,data)
					if(res.data && res.data.length) {
						$.map(res.data, function(t) {
							$.map(events, function(obj) {
								if(obj.roadName == t.routeType) {
									t.xyz = droreMap.transFromWgsToLayer(JSON.parse(t.xyz));
									obj.addKeyPoint(t.lineId, t)
								}
							});
						})
					}
				}
			});
			gisConfig.ajaxnames.push(keyPointInfo)
		}
	}, {
		text: '测试路网',
		event: function(opt) {
			var self = opt.ower,
				pointLayerArr = [],
				pointLatArr = []

			self.container.find('.' + opt.ower.rightNav.containerClass).append($('<div>', {
				class: 'region-btn',
			}));
			var btnGroup = [{
				html: '取点',
				class: 'btn-success',
				event: function() {
					droreMap.addMouseEvent("dblclick", 'road', function(e) {
						var icon = new droreMap.icon.Marker({
							coordinate: e.coordinate,
							name: 'mmm',
							subtype: '1111',
							id: (Math.random() * 100).toString(),
							url: "http://oss.drore.com/material/gis/newlabels/public/defaults/24*24/quanjingshexiangtou.png"
						});
						droreMap.icon.addChild(icon)
						pointLayerArr.push(e.coordinate);
						pointLatArr.push(droreMap.transLayerToWgs(e.coordinate))
					});
				}
			}, {
				html: '绘制',
				class: 'btn-primary',
				event: function() {
					//获取当前地图的路网数据表名，实现路网测试的功能
					Ajax({
						url: gisConfig.urlIp + gisConfig.path.pgrouting + gisConfig.type.tableExistJudge + gisConfig.token + sessionStorage['token'],
						type: 'post',
						data: {
							mapId: mapid
						},
						success: function(resp) {
							if(resp.success && resp.data) {
								var list = [],
									allPoint = [];
								for(var i = 1; i < pointLatArr.length; i++) {
									var item = pointLatArr[i - 1],
										next = pointLatArr[i]
									var data = {
										'mapId': mapid,
										"epsg": "4326",
										"roadTable": resp.data,
										"method": "a2b",
										"startY": item[1],
										"startX": item[0],
										"stopX": next[0],
										"stopY": next[1],
										"tolerance": "10"
									}
									Ajax({
										url: gisConfig.urlIp + 'route' + gisConfig.type.find,
										data: data,
										async: false,
										success: function(res) {
											if(res.coordinates && res.coordinates.length > 0) {
												//测试的时候多条线一起绘制
												var datas = []
													//									if(res.coordinates[0] instanceof Array) {
													//										$.map(res.coordinates, function(t) {
													//											if(t[0] instanceof Array) {
													//												var arr = []
													//												$.map(t, function(tt) {
													//													arr.push(droreMap.transFromWgsToLayer(tt))
													//												});
													//												console.log(arr.length)
													//												list.push(arr)
													//											} else {
													//												datas.push(droreMap.transFromWgsToLayer(t))
													//											}
													//										})
													//									} else {
													//										datas.push(droreMap.transFromWgsToLayer(res.coordinates))
													//										console.log(datas.length)
													//									}
													//测试时多条线路依次绘制
												if(res.coordinates[0] instanceof Array) {
													$.map(res.coordinates, function(t) {
														if(t[0] instanceof Array) {
															$.map(t, function(tt) {
																allPoint.push(droreMap.transFromWgsToLayer(tt))
															});
														} else {
															allPoint.push(droreMap.transFromWgsToLayer(t))
														}
													})
												} else {
													allPoint.push(droreMap.transFromWgsToLayer(res.coordinates))
												}
												//多条路网一起绘制
												if(datas.length) list.push(datas)
											}
										}
									})
								}
								//多条路网依次绘制
								if(allPoint.length) list.push(allPoint)
								droreMap.cartoon.removeFlight();
								droreMap.cartoon.addFlight(list)
							} else {
								layer.msg(resp.message || res.errMsg)
							}
						}
					})

				}
			}, {
				html: '清空',
				class: 'btn-warning',
				event: function() {
					droreMap.cartoon.removeFlight();
					droreMap.removeLayer("1111");
					pointLayerArr = [];
					pointLatArr = [];
					list = [];
				}
			}];
			$.each(btnGroup, function(i, t) {
				$('.region-btn').css('background-color', 'transparent').append($('<div>', {
					class: 'btn  ' + t.class,
					html: t.html,
					style: 'margin-right:20px'
				}).on({
					'click': function() {
						if(t.event) {
							t.event();
						}
					}
				}));
			});
		}
	}];

	var operationBtns = {
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
					layer.confirm('你真的要删除“' + opt.tr.cells[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML + '”', {
						btn: ['确定', '取消'] //按钮
					}, function() {
						Ajax({
							url: gisConfig.urlIp + gisConfig.common + gisConfig.path.mapMain + '/' + opt.tr.getAttribute('uid') + gisConfig.token + sessionStorage['token'],
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
		scenicSpot: {
			extraClass: ['fa', 'fa-image', 'btn', 'btn-sm', 'btn-success', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('查看景区列表', opt.btn, {
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
						xtype: 'scenicSpotManagementGrid',
						config: {
							data: {
								mapId: opt.tr.getAttribute('uid'),
								innerHtml: opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML
							}
						}
					});
				}
			}
		},
		labelInformation: {
			extraClass: ['fa', 'fa-tags', 'btn', 'btn-sm', 'btn-info', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('查看标签列表', opt.btn, {
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
					opt.panel.clearAllItem();
					opt.panel.addItem({
						xtype: 'labelInformationGrid',
						config: {
							data: {
								mapId: opt.tr.getAttribute('uid'),
								innerHtml: opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML
							}
						}
					});
				}
			}
		},
		eDitmap: {
			extraClass: ['fa', 'fa-map-o', 'btn', 'btn-sm', 'btn-primary', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('编辑地图', opt.btn, {
						tips: [1, '#337ab7']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					$('.map-box').remove();
					$('body').append($('<div>', {
						class: 'map-box',
						html: '<div id="map" class="map"></div>'
					}));
					layer.open({
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
									url: gisConfig.urlIp + gisConfig.common + gisConfig.path.mapMain + '/' + opt.tr.getAttribute('uid') + gisConfig.token + sessionStorage['token'],
									zooms: opt.tr.children[opt.panel.table.tHead.querySelector('[name="zoom"]').getAttribute('index')].innerHTML
								},
								rightNav: {
									containerClass: 'map-tab-right-nav'
								},
								model: {
									containerClass: 'map-model'
								},
								mapTab: {
									containerClass: 'map-tab',
									btnGroup: mapFileBtnGroup
								}
							});
						},
						cancel: function() {
							droreMap.interaction.enableMapClick = false
						}
					})

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
						xtype: 'masterDataForm',
						config: {
							data: {
								id: opt.tr.getAttribute('uid')
							}
						}
					});
				}
			}
		},
		applicateManage: {
			extraClass: ['fa', 'fa-cloud', 'btn', 'btn-sm', 'btn-info', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('应用管理', opt.btn, {
						tips: [1, '#46b8da']
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
						xtype: 'applicateManagementGrid',
						config: {
							data: {
								mapId: opt.tr.getAttribute('uid'),
								innerHtml: opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML,
								zoom: opt.tr.children[opt.panel.table.tHead.querySelector('[name="zoom"]').getAttribute('index')].innerHTML
							}
						}
					});
				}
			}
		},
		mainMap: {
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
					window.open('mainMap.html?mapId=' + opt.tr.getAttribute('uid') + '&name=' + opt.tr.children[opt.panel.table.tHead.querySelector('[name="name"]').getAttribute('index')].innerHTML)
				}
			}
		},
		newMap: {
			extraClass: ['fa', 'fa-image', 'btn', 'btn-sm', 'btn-success', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('新路网页面', opt.btn, {
						tips: [1, '#449d44']
					});
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips);
				},
				click: function(opt) {
					window.open('newMap/newmap.html?mapId=' + opt.tr.getAttribute('uid'))
				}
			}
		}
	}
	var fields = [{
		text: '序号',
		type: 'increment',
		style: 'width:45px;'
	}, {
		text: '地图名称',
		name: 'name'
	}, {
		text: '地图高度',
		name: 'height'
	}, {
		text: '地图宽度',
		name: 'width'
	}, {
		text: '地图层级',
		name: 'zoom'
	}, {
		type: 'operations',
		text: '操作',
		style: 'width:400px;'
	}];
	return new GridPanel(setConfig({
		opt: opt,
		fnName: arguments.callee,
		btns: btns,
		operationBtns: operationBtns,
		classGroup: 'GridPanel',
		config: {
			url: gisConfig.urlIp + gisConfig.path.mapMain + gisConfig.type.find + gisConfig.token + sessionStorage['token'],
			fields: fields,
			pageSize: 7,
			pageNo: 1,
			title: {
				innerHTML: '地图列表',
			},
			search: {
				fields: [{
					name: 'name',
					text: '地图名称'
				}]
			}
		}
	}));
}
