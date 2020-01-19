layui.define([ 'layer', 'utilExt' ], function(exports) {
	var $ = layui.jquery, layer = layui.layer;
	var utilExt = layui.utilExt;
	var pageObj = {};

	pageObj.init = function(elem, checkVal,url,tpl) {
		pageObj.getUserOrg({"elem":elem, "checkVal":checkVal,"url":url,"tpl":tpl});
	};
	pageObj.initObj = function(params) {
		pageObj.getUserOrg(params);
	};
	pageObj.getUserOrg = function(params) {
		params.data=params.data||{};
		params.data["noCount"]=1;
		params.data["size"]=10000;
		utilExt.commAJAX({
			url : params.url||'basicAuthOrg/queryUserOrg.do',
			data :params.data,
			ajaxFunc : function(res) {
				if (res.errcode == '0') {
					var data = {
						data : res.result,
						checkVal : params.checkVal,
						def:params.def
					};
					utilExt.renderTpl(params.tpl||'#tpl_user_org', params.elem, data);
				} else {
					utilExt.errorMsg(res.msg);
				}
			}
		});
	},

	exports('userOrg', pageObj);
});