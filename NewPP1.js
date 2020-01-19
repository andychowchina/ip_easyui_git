var randomNu = (new Date().getTime()) ^ Math.random();window.selectedTR;
//手机、邮箱、数字验证
var mobile = /^1(3|4|5|7|8)[0-9]{9}$/;
var email = /^[a-zA-Z0-9_.·•-]+@[a-zA-Z0-9_.·•-]+(\.[a-zA-Z0-9_.·•-]+)+$/;
layui.config({
	base : '../../../resources/jspRes/js/modules/'
});
function kccx(){ //发票库存查询
	$.ajax({
		type:'post',
		url : '../../../dzfpptInvoiceFpxx/queryFpkc.do?type='+randomNu,
		cache:false,
		async: false ,//同步请求
		data:{},
		success:function(result){
			if(result.errcode!=0){
				 layer.msg(result.msg);
			}else{
				document.getElementById("fpfs").innerText=result.msg;
			}
		},
		error:function(result){
			//$.messager.alert('提示',"获取商品编码失败！",'warning');
		}
	});
};

function queryDjxx(){ //开票人的基础信息查询
	$.ajax({
		type:'post',
		url : '../../../dzfpptInvoiceFpxx/queryDjxx.do?type='+randomNu,
		cache:false,
		async: false ,//同步请求
		data:{},
		success:function(result){
			$("#kpr").val(result.result.kpr);
			$("#xfkhyhjzh").val(result.result.khyhjzh);
			$("#xfnsrmc").val(result.result.nsrmc);
			$("#xfnsrsbh").val(result.result.nsrsbh);
			$("#xflxdz").val(result.result.jydzjdh);
		},
		error:function(result){
			 layer.msg(result.msg);
		}
	});
};

	var  ymdrq = function(timestamp, formatStr) {
	    var date = timestamp ? (new Date(timestamp)) : (new Date());
	    if (!formatStr) {
	      formatStr = 'yyyy年mm月dd日';
	    }
	    reg = /[Yy]{4}/g;
	    formatStr = formatStr.replace(reg, date.getFullYear());
	    reg = /[Mm]{2}/g;
	    formatStr = formatStr.replace(reg, digit(date.getMonth() + 1));
	    reg = /[Dd]{2}/g;
	    formatStr = formatStr.replace(reg, digit(date.getDate()));
	    return formatStr;
	  };
	  // 补齐数位
	var digit = function(num) {
	return num < 10 ? '0' + (num | 0) : num;
	};
layui.use([ 'layer', 'laytpl','utilExt' ], function() {
		var layer = layui.layer,utilExt=layui.utilExt;
		var $ = layui.$;
		laytpl = layui.laytpl;
		kccx();
		queryDjxx();
		var a=ymdrq();
		$("#kprq").html(a);
		
		
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
		
		//进行发票开具
		$("#btnSaveAll").on("click",function(){
			var tssjhm=$("#tssjhm").val();
			var mailv=$("#tsyx").val();
			var gfmc=$("#gfmc").val();
			if(gfmc=='' || gfmc==null){
				layer.msg("购方名称不能为空！");
				return;
			}
			if(tssjhm=='' || tssjhm==null){
				layer.msg("手机号码不能为空！");
				return;
			}
			if (tssjhm !== '' && !mobile.test(tssjhm)) {
				layer.msg("请输入正确格式手机号！");
				$("#tssjhm").val('');
				return ;
			} 
			
			if (mailv !== '' && !email.test(mailv)) {
				layer.msg("请输入正确邮箱！");
				$("#tsyx").val('');
				return ;
			} 
			
			var tsxx={};
			tsxx={
					phone:tssjhm,
					mail:mailv
					
			};
			
			var fpmx=getFpmx();
			var fpxx={};
			fpxx={
					fplx:"51",
					gfsh:$("#gfsh").val(),
					gfmc:$("#gfmc").val(),
					gfdzdh:$("#gfdzdh").val(),
					gfyhzh:$("#gfyhzh").val(),
					kpr:$("#kpr").val(),
					skr:$("#skr").val(),
					fhr:$("#fhr").val(),
					bz:$("#bz").val()
					
			};
			var saveData = {
			FPXXJSON : JSON.stringify(fpxx),
			FPMXJSON : JSON.stringify(fpmx),
			    FPTS :JSON.stringify(tsxx)
			};
			if(fpmx.length>0){
				var loadIdx = layer.load(2, {shade: [0.1,'#ffe',true]});
				utilExt.commAJAX({
					url : 'dzfpptInvoiceFpxx/fpkjNew.do',
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
			}
			return false;
		});
		
		// 获取发票货物信息
	  function getFpmx() {
				var fpmx = [];
				var addTrs = $('.addTrs');
				$('#js_tbody').find('tr').each(function(i, item) {
				var tr = $(item);
				var spbm=tr.find('.spbm').val();
				if(addTrs.length ==1 &&  spbm ==''){
					layer.msg("请选择商品！");
					return;
				}
				if(spbm!=null && spbm!=''){
					 var slv=tr.find('.slv').val()-0;
					 var lslbs="0",yhzcbs="",zzstsgl="";
					 if(slv=='0'){
						 lslbs="1";
						 yhzcbs="1";
						 zzstsgl="免税";
					 }
					var fpdj = tr.find('.dj').val(),ggxh = tr.find('.ggxh').val(), sl = tr.find('.sl').val();//, slv = 0.03
					var bhsdj = (fpdj / (1 + slv)).toFixed(8);
					 if (!utilExt.isMoney(sl)) {
							layer.msg('请正确输入数量，小数位最多两位！');
							tr.find('.sl').val('');
							return;
					}
					if (!utilExt.isMoney(fpdj)) {
							layer.msg('请正确输入单价，小数位最多两位！');
							tr.find('.dj').val('');
							return;
					}
					if (!sl || !fpdj){
						layer.msg('请输入数量和单价！');
						return;
					}
					// 税额
					var se = (((sl-0) * bhsdj) * slv - 0 + 0.00001).toFixed(2) - 0;
					var tempObj = {
						spmc : tr.find('.spmc').val(),
						spbm : tr.find('.spbm').val(),
						jldw : tr.find('.jldw').val(),
						dj : bhsdj,
						sl : sl,
						je : (bhsdj * sl + 0.00001).toFixed(2),
						slv : slv,
						ggxh:ggxh,
						se : se,
						lslbs:lslbs,
						yhzcbs:yhzcbs,
						zzstsgl:zzstsgl
					};
					fpmx.push(tempObj);
				}
			});
			return fpmx;
		};
		
		$("#js_thead").delegate('tr button i', "click", function() {
			var addTrs = $('.addTrs');
			var last_tr=$('#js_tbody').children()[$('#js_tbody').children().length-1];
			var num_td=$(last_tr).children()[4];
			var num_input=$(num_td).children()[0];
			if( $(num_input).val() == "" ){
				utilExt.alert("请先选择商品，再添加数量");
			}else if(addTrs.length <8){
				var rowtpl = $('#rowTpl').html();
				$('#js_tbody').append(rowtpl);
				
				//固定表格高度
				var kongTr = $('.kongTr');
				var newHeight = kongTr.height() - 26;
				$('.kongTr').css("height",newHeight +"px");				
			}else{       
				layer.open({
					title: "系统提示",
					content:"<h1>最多可以添加8个商品</h1>",
					type: 0,
					area:['300px','165px'],
					anim: 1, //动画效果
					btnAlign: 'c', //弹出框方向
					btn: ['确定'], //按钮值
					shade: 0, //不显示遮罩
				});
			}	
					
		});
									
		$("#js_tbody").delegate("tr td button.del_row","click", function() {
			var _row = $(this).parent().parent();
			 $(_row).remove();
				//固定表格高度				
			var kongTr = $('.kongTr');
			var newHeight = kongTr.height() + 26;
			$('.kongTr').css("height",newHeight +"px");
			 
		})
		$("#js_tbody").delegate('tr td i.goodsInfo', "click", function() {
			var _row = $(this).parent().parent();
		 	
		/* @param num1被乘数 | num2乘数 */			
		function numMulti(num1, num2) {
		   var baseNum = 0;
		   try {
		       baseNum += num1.toString().split(".")[1].length;
		   } catch (e) {
		   }
		   try {
		       baseNum += num2.toString().split(".")[1].length;
		   } catch (e) {
		   }
		   return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
		};
		function numDiv(num1, num2) {
			   var baseNum1 = 0, baseNum2 = 0;
			   var baseNum3, baseNum4;
			   try {
			       baseNum1 = num1.toString().split(".")[1].length;
			   } catch (e) {
			       baseNum1 = 0;
			   }
			   try {
			       baseNum2 = num2.toString().split(".")[1].length;
			   } catch (e) {
			       baseNum2 = 0;
			   }
			   with (Math) {
			       baseNum3 = Number(num1.toString().replace(".", ""));
			       baseNum4 = Number(num2.toString().replace(".", ""));
			       return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
			   }
			};
						
			 /* @param v要转换的值 | num2保留的位数 */			
			function round(v,e){
				var t=1;
				for(;e>0;t*=10,e--);
				for(;e<0;t/=10,e++);
				return Math.round(v*t)/t;
			};
			
			
			/*  含税时   含税金额。 @param num数量 | unitPrT含税单价 */			
			function funTPriceT (num,unitPrT) {
				return round(numMulti(num,unitPrT),2)
			} 
			
			function NoToChinese(n,type) {
				n = type == 1 ? Math.abs(n) : n;
				var absnum = type == 1 ? "（负数）" : "";
			    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
			        return "数据非法";
			    var unit = "仟佰拾万仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
			        n += "00";
			    var p = n.indexOf('.');
			    if (p >= 0)
			        n = n.substring(0, p) + n.substr(p+1, 2);
			        unit = unit.substr(unit.length - n.length);
			    for (var i=0; i < n.length; i++)
			        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
			    str = absnum + str;
			    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/零圆/g, "圆").replace(/圆$/g, "圆整").replace(/佰拾圆整$/g, "壹拾圆整");
			}
									
			/*  含税时   税额。 @param num数量 | unitPrT含税单价 | imbalance差额 | taxrate税率 */			
			/* var imbalance = 0; */
			function funTTax (num,unitPrT,taxrate) {
				return round(numDiv(numMulti(numMulti(num,unitPrT),taxrate),1+parseFloat(taxrate)),2)
			}	
			
			
			//业务处理
			
			utilExt.openLayer({
				title:'开票货物信息选择',				
				url:'listNew.jsp',
				area:['80%', '65%'],
				end:function(){
				   if(window.goodsInfo){//商品信息赋值
					   	var num = $($(_row.children()[4]).children()[0]);//商品数量
				   		var tol_xx = $('.tol_xx');
				   		var tol_dx = $('.tol_dx');
				   		var allprices = $('.allprices');
				   		var allshuis = $('.allshuis');
						$($(_row.children()[1]).children()[0]).val(window.goodsInfo.name);//服务名称
						$($(_row.children()[2]).children()[0]).val(window.goodsInfo.ggxh);//规格型号
						$($(_row.children()[3]).children()[0]).val(window.goodsInfo.jldw);//单位
						$($(_row.children()[4]).children()[0]).val();//数量
						$($(_row.children()[5]).children()[0]).val(window.goodsInfo.hsdj);//单价
						$($(_row.children()[6]).children()[0]).val();//金额												
						$($(_row.children()[7]).children()[0]).val(window.goodsInfo.slv);//税率	
						$($(_row.children()[7]).children()[1]).val(window.goodsInfo.spbm);//税收分类编码	
						//计算方法
						var newNum = $($(_row.children()[4]).children()[0]),//输入商品数量
							newPrice = $($(_row.children()[5]).children()[0]),//价格
							newTax = $($(_row.children()[7]).children()[0]);//选择税率	
						function anb(){													
							$($(_row.children()[6]).children()[0]).val(funTPriceT(newNum.val(), newPrice.val()).toFixed(2));//含税时   含税金额
							$($(_row.children()[8]).children()[0]).val(funTTax(newNum.val(),newPrice.val(),newTax.val()).toFixed(2));//税额 
							var jes = $($(_row.children()[6]).children()[0]);
							var ses = $($(_row.children()[8]).children()[0]);
							/* var num1 = jes.val();	 */						
							var newAllPr = 0,newAllTax = 0;	
							$(".addTrs").each(function () {
								newAllPr += parseFloat($(this).find(".shop-price").val()) ? parseFloat($(this).find(".shop-price").val()) : 0 ;
								newAllTax += parseFloat($(this).find(".shop-tax").val() == "" ? 0 : $(this).find(".shop-tax").val());
								allprices.html(newAllPr.toFixed(2));
								allshuis.html(newAllTax.toFixed(2));
								tol_xx.html( "￥" +  newAllPr.toFixed(2));
								tol_dx.html(NoToChinese(newAllPr.toFixed(2)));
																								
								//删除行的计算
								$('.del_row').on('click',function(){
									var delVal3 = $(this).parent().parent().find(".shop-price").val();
									var delVal4 = $(this).parent().parent().find(".shop-tax").val();										
									var delVal = parseFloat(delVal3==""?0:delVal3);//删除行的价格值
									var delVal2 = parseFloat(delVal4==""?0:delVal4);
								/* 	 console.log("删除行的值"+delVal)  */
									var delTr1Num =parseFloat($('.delTr1Num').val());//第一行的数量
									if($(".addTrs").length == 1){
										allprices.html(numMulti(delTr1Num,newPrice.val()).toFixed(2));//判断行数为1的时候  值为该行的数量*单价
										allshuis.html(funTTax(delTr1Num,newPrice.val(),0,newTax.val()).toFixed(2));
									}else{
										//再次获取减去以后的值
										var newAllPr1 = 0,newAllTax1 = 0;
										var hj = 0,hj2 = 0;
										$(".addTrs").each(function(){																							
											newAllPr1 += parseFloat($(this).find(".shop-price").val()) ? parseFloat($(this).find(".shop-price").val()) : 0 ;
											newAllTax1 += parseFloat($(this).find(".shop-tax").val() == "" ? 0 : $(this).find(".shop-tax").val());												
											/* console.log("加法后的结果" + newAllPr1) */	
											hj =  parseFloat(newAllPr1.toFixed(2)) - parseFloat(delVal);//减去后的结果
											hj2 =  parseFloat(newAllTax1.toFixed(2)) - parseFloat(delVal2)											
										})														
										allprices.html(hj.toFixed(2));
										allshuis.html(hj2.toFixed(2));
										tol_xx.html( "￥" +  hj.toFixed(2));
										tol_dx.html(NoToChinese(hj.toFixed(2)));											
									}									
								});															
							});							 															
						//判断数量不为空时 添加新的行							
							var addTrs = $('.addTrs');
							var last_tr=$('#js_tbody').children()[$('#js_tbody').children().length-1];
							var num_td=$(last_tr).children()[4];
							var num_input=$(num_td).children()[0];
							if( $(num_input).val() == "" ){
								
							}else if(addTrs.length <8){
								var rowtpl = $('#rowTpl').html();
								$('#js_tbody').append(rowtpl);
								
								//固定表格高度
								var kongTr = $('.kongTr');
								var newHeight = kongTr.height() - 26;
								$('.kongTr').css("height",newHeight +"px");								
							}else{       
								layer.open({
									title: "系统提示",
									content:"<h1>最多可以添加8个商品</h1>",
									type: 0,
									area:['300px','165px'],
									anim: 1, //动画效果
									btnAlign: 'c', //弹出框方向
									btn: ['确定'], //按钮值
									shade: 0, //不显示遮罩
								});
							}
						}
						//税率						
						$(".tax").change(function(){
						  anb();						    
						});
						//数量、单价
						$(".addTrs").on('input propertychange',function(){																			
							 anb();						
						});											
				   } 
				},
			    isFull : false
			});
			
		});
		

	});
