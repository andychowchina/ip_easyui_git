layui.define([ 'layer', 'utilExt' ],
		function(exports) {
			var $ = layui.jquery, layer = layui.layer;

			var utilExt = layui.utilExt;
			var mytool = {};
			/**
			 * btnArr应许的值 = [ 'add', 'update', 'del','enable','disable','reset' ];
			 */
			mytool.init = function(options) {
				mytool.setBtn(options);
			};
			mytool.setBtn = function(options) {
				var btnArr = options['btns'], elem = options['elem'];
				var defaults = [ 'add', 'update', 'del', 'enable', 'disable','reset','addqx'];
				var btnStr = '';
				for ( var k in btnArr) {
					var btn = btnArr[k];
					if (defaults.join(',').indexOf(btn.type) > -1) {
						btnStr += mytool.getBtnStr(btn.type, btn.title, btn.icon);
					}
				}
				$(elem).html(btnStr).find('button').on('click', function() {
					var type = $(this).data('type');
					options[type] ? options[type].call(this) : '';
				});
			};
			mytool.getBtnStr = function(type, title, icon) {
				icon = icon || '';
				var tempStr = [ '<button data-type="' + type + '" class="layui-btn layui-btn-small ' + icon + '">', 0,
						'</button>' ];
				switch (type) {
				case 'add':
					title = title || '添加';
					tempStr[1] = ('<i class="layui-icon">&#xe608;</i>' + title);
					break;
				case 'update':
					title = title || '修改';
					tempStr[1] = ('<i class="layui-icon">&#xe642;</i>' + title);
					break;
				case 'del':
					title = title || '删除';
					tempStr[1] = ('<i class="layui-icon">&#xe640;</i>' + title);
					break;
				case 'enable':
					title = title || '启用';
					tempStr[1] = ('<i class="layui-icon">&#xe610;</i>' + title);
					break;
				case 'disable':
					title = title || '禁用';
					tempStr[1] = ('<i class="layui-icon">&#x1007;</i>' + title);
					break;
				case 'reset':
					title = title || '重置';
					tempStr[1] = ('<i class="layui-icon">&#xe614;</i>' + title);
					break;
				default:
					break;
				}
				return tempStr.join('');
			};
			
			exports('toolbar', mytool);
		});