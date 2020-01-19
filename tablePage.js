layui.define([ 'layer', 'element', 'laytpl', 'laypage', 'utilExt','form' ],
				function(exports) {
					var $ = layui.jquery, element = layui.element(), laytpl = layui.laytpl, laypage = layui.laypage, utilExt = layui.utilExt;
var form = layui.form();
					/**
					 * 带分页表格模块
					 * 
					 * @param {Object}
					 *          options
					 */
					function tablePage(options) {
						this.options = options;
					}

					var tablePro = tablePage.prototype;
					tablePro.description = {
						url : '请求地址',
						data : '请求参数',
						tbody : '表数据容器',
						tbTpl : '模板容器',
						pageId : '分页容器',
						queryBtn : "自定义点击触发元素id",
						queryBefore : "触前操作",
						isLoadData : false,
						renderAfter : '表格渲染结束回调'
					};
					tablePro.init = function(options) {
						var _this = this;
						options['data'] = options['data'] || {};
						var defaults = {
							page : 0,
							size : options['data']['size'] ? options['data']['size'] : 10
						};
						options['data'] = $.extend({}, defaults, options['data']);
						if (options['isLoadData'] == true)
							_this.getTableData();
						var queryBefore = options['queryBefore'], $queryBtn = $(options['queryBtn']);
						if ((typeof queryBefore == 'function') && ($queryBtn.length > 0)) {
							$queryBtn.click(function() {
								var queryData = queryBefore(options['data']);
								if (false == queryData)
									return false;
								options['data'] = $.extend({}, defaults, queryData);
								_this.getTableData();
							});
						}
					};

					tablePro.getTableData = function(curr) {
						var _this = this, options = _this.options;
						options['data']['page'] = (curr || 1) - 1;
						utilExt.commAJAX({
							url : options['url'],
							data : options['data'],
							method : options['method'] || 'post',
							ajaxFunc : function(json) {
								if (json.errcode != 0) {
									layer.alert(json.msg);
									$(options['tbody']).html('<tr><td colspan="2">' + json.msg + '</td></tr>');
									return false;
								}
								var res = json.result;
								var hasContent = res['content'] ? res['content'] : false;
								var tableData = hasContent ? res['content'] : json.result;
								// 传入日期格式
								tableData.dateFormat = utilExt.dateFormat;

								laytpl($(options['tbTpl']).html()).render(tableData, function(html) {
									$(options['tbody']).html(html);
									var renderAfter = options['renderAfter'];
									typeof renderAfter == 'function' ? renderAfter() : '';
									
									form.render();
									
								});
								var loadedFun=options["loaded"];
								if(typeof loadedFun == 'function')
									loadedFun(hasContent&&res['content'].length>0);
								if (hasContent)
									laypage({
										cont : options['pageId'],
										pages : res['totalPages'],
										curr : curr || 1,
										skip : true,last:res['totalPages'],
										jump : function(obj, first) {
											if (!first) {
												_this.getTableData(obj.curr);
											}
										}
									});
							}
						});
					};

					exports('tablePage', function(options) {
						var tabel = new tablePage(options);
						tabel.init(options);
					});
				});