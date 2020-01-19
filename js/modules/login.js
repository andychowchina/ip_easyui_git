layui.use([ 'layer', 'form' ], function() {
	var $ = layui.jquery, layer = layui.layer, form = layui.form();
	var login = {};
	login.init = function() {
		login.events();
		login.logOut();
	};
	login.events = function() {
		$("body").keyup(function(e) {
			if (e.keyCode == 13) {
				$('#btn_login').click();
			}
		});
	};
	login.submit = function(data) {
		var loadIdx = layer.load();
		$.ajax({
			type : "post",
			url : "qxDlzhxx/login.do",
			data : data,
			async : true,
			success : function(res) {
				layer.close(loadIdx);
				if (res.errcode == 0) {
					layer.msg('登录成功！', {
						icon : 6,
						time : 1000
					}, function() {
						location.href = 'main.shtml';
					});
				} else {
					layer.alert(res.msg, {
						icon : 5
					});
				}
			}
		});
	};
	login.logOut = function() {
		$.ajax({
			type : "post",
			url : "qxDlzhxx/loginOut.do"
		});
		$('input').val('');
	};
	form.verify({
		lgName : function(value) {
			if (value.length < 2) {
				return '用户名至少2位';
			}
		},
		lgPwd : [ /(.+){5,30}$/, '密码必须5位以上' ]
	});
	form.on('submit(formLogin)', function(data) {
		login.submit(data.field);
		return false;
	});
	login.init();
});
