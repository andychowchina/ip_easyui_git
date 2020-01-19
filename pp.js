var randomNu = (new Date().getTime()) ^ Math.random();window.selectedTR;
var zxqz=true;
//$("#slv").val(zslv);
layui.config({
	base : '../../../resources/jspRes/js/modules/'
});

function kccx(){
	$.ajax({
		type:'post',
		url : '../../../dzfpptInvoiceFpxx/zxkpkc.do?type='+randomNu,
		cache:false,
		async: false ,//同步请求
		data:{},
		success:function(result){
			if(result.errcode!=0){
				 layer.msg(result.msg);
			}else{
				document.getElementById("fpfs").innerText=result.msg+"份";
			}
		},
		error:function(result){
			//$.messager.alert('提示',"获取商品编码失败！",'warning');
		}
	});
}

 function addTr(data){
	$tr = window.selectedTR;
	$tr.find('.spmc').val(data.name);
	$tr.find('.spbm').val(data.spbm);
	$tr.find('.ggxh').val(data.ggxh);
	$tr.find('.jldw').val(data.jldw);
    $tr.find('.dj').val(data.hsdj);
    $tr.find('.slv').find("option[value='"+data.slv+"']").attr("selected","selected").parent().next(".layui-form-select")
    .find("dd[lay-value='"+data.slv+"']").click();
    
 }

layui.use([ 'form', 'layer', 'laytpl', 'utilExt'], function() {
	var layer = layui.layer, laytpl = layui.laytpl;
	var form = layui.form;
	var  utilExt = layui.utilExt;
	window.saveData = {};
	utilExt.addTips();
	kccx();
	$.ajax({
		type:'get',
		url : '../../../dzfpptInvoiceFpxx/kpyz.do?type='+randomNu,
		cache:false ,
		async: false ,//同步请求
		data:{},
		success:function(result){
			if(result.errcode!=0){
				 layer.msg(result.msg);
			}
		},
		error:function(result){
			//$.messager.alert('提示',"获取商品编码失败！",'warning');
		}
	});
	
	
	var zpPage = {};
	zpPage.init = function() {
		//zpPage.pageInit();
		zpPage.pageEvent();

		// 获取登录类型
		//zpPage.getLoginType();
		$("#js_fpxx_list").delegate('tr button',"click",function(){
			window.selectedTR=$($(this).parents("tr").get(0));
			layer.open({
				type: 2, 
				title : '开票货物信息选择',
				area : [ '90%', '70%' ],
				content : 'list.jsp',
				isFull : false,
				sucess:function(){
					
				}
			});
		});
	};
	zpPage.setDefValues = function(item, val) {
		if (val)
			$(item).val(val);
		$(item).attr('readonly', 'readonly').addClass('disabled');
	};
	// 查询缓存
	zpPage.setHcValues = function(item, val) {
		if (val) {
			$(item).val(val);
		} else {
			$(item).val('');
		}
	}
	zpPage.setEmptyValue = function(item) {
		$(item).val('').removeAttr('readonly').removeClass('disabled');
	};
	// 页面初始化
	zpPage.pageInit = function() {
		// 开票日期
		zpPage.setDefValues('#fpxx_kprq', utilExt.dateFormat());
		
	};
	
	zpPage.pageEvent = function() {
		var $fpxx_list = $('#js_fpxx_list');
		var $list_count = $('#js_fpxx_list_count');
			
		// 统计金额，税额
		var countJeSe = function(item) {

			var $this = $(item), $tr = $this.parent().parent();

			var fpsl = $tr.find('.sl').val(), fpdj = $tr.find('.dj').val();

			if (!utilExt.isMoney(fpsl)) {
				utilExt.alert('请正确输入数量，小数位最多两位！');
				$tr.find('.sl').val('');
				return;
			}
			if (!utilExt.isMoney(fpdj)) {
				utilExt.alert('请正确输入单价，小数位最多两位！');
				$tr.find('.dj').val('');
				return;
			}

			if (!fpsl || !fpdj)
				return;
            var slv=$tr.find('.slv').val()-0;
			var $fpje = $tr.find('.je'), $fpse = $tr.find('.fpse'), $fpjshj = $tr.find('.fpjshj');
			// 含税金额
			console.log((fpsl * fpdj).toFixed(2));
			$fpje.val((fpsl * fpdj).toFixed(2));
			$fpjshj.val((fpsl * fpdj).toFixed(2));
			/*var slv = 0.03;//$("#slv").val()
*/			// 不含税单价
			var lsl=$tr.find('.lsl').is(':checked');
			if(lsl){
				slv=0;
			}
			var bhsdj = (fpdj-0) / (1.0 + slv);
			// 税额
			var se = (((fpsl-0) * bhsdj) * slv - 0 + 0.00001).toFixed(2) - 0;
			$fpse.val(se);

			countAll();
		};
		var countAll = function() {
			var countFp = {
				count_je : 0,
				count_jshj : 0,
				count_se : 0
			};
			$fpxx_list.find('tr').each(function(i, itr) {
				var $itr = $(itr);
				countFp.count_je += ($itr.find('.je').val() - 0);
				countFp.count_jshj += ($itr.find('.fpjshj').val() - 0);
				countFp.count_se += ($itr.find('.fpse').val() - 0);
			});
			for ( var c in countFp) {
				/* 发票合计行 */
				$('#js_fp_count').find('td.' + c).text((countFp[c] - 0 + 0.00001).toFixed(2));
			}
			//zpPage.calcSfmx();
		}
		$fpxx_list.delegate('.sl,.dj,.lsl', 'change', function(e) {
			if (e.keyCode == 190 || e.keyCode == 189 || e.keyCode == 110) {
				return;
			}
			countJeSe(this);
		});
		form.on("select(slv)",function(data){
			countJeSe(data.elem);
		});

		// 添加一条货物信息
		$('#js_fpxx_add').click(function() {
			if ($fpxx_list.find('tr').length < 8) {
				$fpxx_list.append($('#tpl_fpxx_list').html());
				$list_count.text($fpxx_list.find('tr').length);
				form.render();
			} else {
				utilExt.alert('货物信息最多只能录入8条');
			}
		});
		// 初始化的时候添加一条货物信息
		$('#js_fpxx_add').click();
		// 移除一条货物信息
		$('#js_fpxx_remove').click(function() {
			var $checked = $fpxx_list.find('input:checked');
			if ($checked.length == 1) {
				$fpxx_list.find($checked.parent().parent()).remove();
				$list_count.text($fpxx_list.find('tr').length);
				countAll();
			} else {
				utilExt.alert('请选择一行货物信息进行移除操作')
			}
		});

		$('#fpxx_gfsh').change(function() {
			var sbh = $(this).val();
			if (sbh.length > 10) {
				zpPage.queryNsrKhhxx(sbh, 'gf');
			}
		});
	
	};
	// 获取发票货物信息
	zpPage.getFpmx = function() {
		var fpmx = [];
		$('#js_fpxx_list').find('tr').each(function(i, item) {
			var tr = $(item);
			 var slv=tr.find('.slv').val()-0;
			 var lsl=tr.find('.lsl').is(':checked');
			 if(lsl){
					slv=0;
				}
			var fpdj = tr.find('.dj').val(),ggxh = tr.find('.ggxh').val(), sl = tr.find('.sl').val();//, slv = 0.03
			var bhsdj = (fpdj / (1 + slv)).toFixed(8);
			
			var tempObj = {
				//xh : (i + 1),
				spmc : tr.find('.spmc').val(),
				spbm : tr.find('.spbm').val(),
				jldw : tr.find('.jldw').val(),
				dj : bhsdj,
				sl : sl,
				je : (bhsdj * sl + 0.00001).toFixed(2),
				slv : slv,
				ggxh:ggxh,
				se : tr.find('.fpse').val(),
				//syyhzcbz : 0,
				//yhzcsm : '',
				//kce : 0
			};
			fpmx.push(tempObj);
		});
		return fpmx;
	};
	// 合计金额
	zpPage.countHjje = function() {
		var tempHjje = 0;
		$('#js_fpxx_list').find('tr').each(function(i, itr) {
			var $itr = $(itr), fpdj = $itr.find('.dj').val() - 0, fpsl = $itr.find('.sl').val() - 0;
			var lsl=$itr.find('.lsl').is(':checked');
			var slv=$itr.find('.slv').val()-0;;
			if(lsl){
				slv=0;
			}
			tempHjje += ((((fpdj / 1+slv).toFixed(8)) * fpsl).toFixed(2) - 0);
		});
		return tempHjje.toFixed(2);
	};
	zpPage.getSaveData = function() {
		var fpxx = utilExt.getParamValues('fpxx_', '#js_form_box');
		//fpxx.hjje = zpPage.countHjje();
		//fpxx.hjse = $('.count_se').text();
		fpxx.gfyhzh = $("#fpXx_gfyh").val()+" "+$("#fpXx_gfzh").val();
		// 验证输入的是不是电话号码
		var $fkfPhone = $('#fpXx_gfdh');
		/*var mobileOrTel = /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/;
		if (!mobileOrTel.test($fkfPhone.val())) {
			utilExt.alert("付款方电话号码格式不正确，请重新输入！");
			$fkfPhone.focus();
			return false;
		}*/
		fpxx.gfdzdh = $("#fpXx_gfdz").val()+" "+$("#fpXx_gfdh").val();
		fpxx.bz=$("#bz").val();
		/*
		 * if (!mobileOrTel.test($fkfPhone.val())) {
		 * utilExt.alert("付款方电话号码格式不正确，请重新输入！"); $fkfPhone.focus(); return false; }
		 */
		// 销方主管税务机关
		// 获取征收品目
		//var spxx_dm_zspm = document.getElementById('spxx_dm_zspm').selectedOptions;
		var saveData = {
			FPXXJSON : JSON.stringify(fpxx),
			FPMXJSON : JSON.stringify(zpPage.getFpmx())
		};
		window.saveData = saveData;
		return saveData;
	};
	/**
	 * 获取登录类型 2017年4月19日15:58:57
	 */
	
	// 数据保存
	form.on('submit(btnSaveAll)', function() {
		var saveData = zpPage.getSaveData();

		if (zpPage.LoginType == "USBKEY") {
			if(!window.ActiveXObject){
				utilExt.alert('证书登录请使用IE浏览器');
				return;
			}
			var content = "fpDm=" + fpDm + "&fpHm=" + fpHm;
			content = $.md5(content);
			var signContent = YzdzdkSignOcx.signature(content);
			saveData.content = content;
			saveData.signContent = signContent;

		}
		console.log(saveData);
		var loadIdx = layer.load(2, {shade: [0.1,'#ffe',true]});
		utilExt.commAJAX({
			url : 'dzfpptInvoiceFpxx/fpkj.do',
			data : saveData,
			ajaxFunc : function(res) {
				if (res.errcode == 0 && res.result.code=='0000') {
					layer.close(loadIdx);
					openEwm(res);
				} else if(res.errcode == 0 && res.result.code=='9991'){
					layer.close(loadIdx);
					var fpdm=res.result.fpdm,fphm=res.result.fphm;
						var a=false;
						while (!a&&zxqz)
						  {
							a=cxqzcz(fphm,fpdm);
						  }
				}else {
					utilExt.errorMsg(res.msg);
				}
			}
		});
		return false;
	});
	function cxqzcz(fphm,fpdm){
		zxqz=false;
		layer.confirm('发票开具成功签章失败', {
			  btn: ['重新签章'] //按钮
			}, function(){
				return cxqzqq(fphm,fpdm);
			});
	}
	
	function cxqzqq(fphm,fpdm){
		utilExt.commAJAX({
			url : 'dzfpptInvoiceFpxx/Fpkjcxqz.do',
			data : saveData,
			ajaxFunc : function(res) {
				if (res.errcode == 0 && res.result.code=='0000') {
					openEwm(res);
					return true;
				} else if(res.errcode == 0 && res.result.code=='9991'){
					zxqz=true;
					return false;
				}else {
					layer.alert(res.msg);
					zxqz=true;
					return false;
				}
			}
		});
	}
	function openEwm(res){
	   if(res.result.ewmurl!=''){
		   var qrcode = new QRCode(document.getElementById("code"), {
				width : 250,
				height : 250,
				correctLevel : QRCode.CorrectLevel.L
			  });
			qrcode.makeCode(res.result.ewmurl);
	   }
		parent.layer.open({
			  type: 1
			  ,title: false //不显示标题栏
			  ,closeBtn: false
			  ,area: '300px;'
			  ,shade: 0.8
			  ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
			  ,resize: false
			  ,btn: ['下载发票', '二维码打印']
			  ,btnAlign: 'c'
			  ,moveType: 1 //拖拽模式，0或者1
			  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;font-size: 16px;">'+res.result.tsxx+'</div>'
			  ,success: function(layero){
			    var btn = layero.find('.layui-layer-btn');
			    btn.find('.layui-layer-btn0').click(function(){
			    	location.reload();
			    	window.open(res.result.pdfurl);
			    });
			    btn.find('.layui-layer-btn1').click(function() {
			    	if(res.result.ewmurl!=''){
			    	    layer.close("LAY_layuipro");
			    		var idxEwm = layer.open({
							type : 1,
							title : '微信交付二维码',
							content : $('#inputBoxEwm'),
							end: function(index, layero){ 
								location.reload();
							}
						}); 
			    	}else{
			    		layer.msg("二维码获取失败，请点击下载发票！");
			    		return false;
			    	}
				});
			  }
			});
	}
	$('#btn_Dyewm').click(function() {
		myPrint(document.getElementById("dyewm"));
		layer.closeAll();
		location.reload();
	});
	function myPrint(obj){
	    var newWindow=window.open("打印窗口","_blank");//打印窗口要换成页面的url
	    var docStr = obj.innerHTML;
	    newWindow.document.write(docStr);
	    newWindow.document.close();
	    newWindow.print();
	    newWindow.close();
	}
	$(function() {
		zpPage.init();
		window.ppInput = zpPage;
	});
});