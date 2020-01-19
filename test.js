var randomNu = (new Date().getTime()) ^ Math.random();window.selectedTR;
var zxqz=true;
//$("#slv").val(zslv);
layui.config({
	base : '../../../resources/jspRes/js/modules/'
});





layui.use([ 'form', 'layer', 'laytpl', 'utilExt'], function() {
	var layer = layui.layer, laytpl = layui.laytpl;
	var form = layui.form;
	var  utilExt = layui.utilExt;
	window.saveData = {};
	utilExt.addTips();
	
	
	
	
	// 数据保存
	form.on('submit(btnSaveAll)', function() {
		var res=$("#rwm").val();
		openEwm(res);
	});
	
	

	function openEwm(res){
	   if(res!=''){
		   var qrcode = new QRCode(document.getElementById("code"), {
				width : 250,
				height : 250,
				correctLevel : QRCode.CorrectLevel.L
			  });
			qrcode.makeCode(res);
	   }
		var idxEwm = layer.open({
			type : 1,
			title : '微信交付二维码',
			content : $('#inputBoxEwm'),
			end: function(index, layero){ 
				location.reload();
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