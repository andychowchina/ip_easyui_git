//layui模块的定义
layui.define([ 'utilExt', 'tablePage','form','laytpl'],function(exports){
	 var $ = layui.jquery, utilExt = layui.utilExt, tablePage = layui.tablePage, form = layui.form();
     var laytpl = layui.laytpl;
     var djxx={"01":"★",
    		 "02":"★★",
    		 "03":"★★★",
    		 "04":"★★★★",
    		 "05":"★★★★★",
    		 "06":"★★★★★★",
    		 "07":"★★★★★★★",
    		 "08":"★★★★★★★★",
    		 "09":"★★★★★★★★★",
    		 "10":"★★★★★★★★★★"};
     var fksj={};
     fksj.init=function(v_box){
     $('#js_query_box').delegate(v_box+' tr td', 'click', function(evt) {
       var e=evt||window.event;
       if (!$(e.currentTarget).parent().hasClass('mouseover')||$(this).find("input").length>0)
         return;
       var $this = $(this).parent();
       if ($this.attr('data-rTag')) {
         $('.rTag').remove();
         $this.attr('data-rTag', '');
         return;
       }
       var fpdm = $this.attr('data-fpdm'), fphm = $this.attr('data-fphm'), fkxh = $this.attr('data-fkxh');
       var bz=$this.attr('data-bz');
       if (fpdm && fphm && fkxh) {
         $('.rTag').remove();
         utilExt.commAJAX({
           url : 'fksjMx/queryFkmxByFjxh.do',
           data : {
             fkxh : fkxh,
             noCount : 1
           },
           ajaxFunc : function(res) {
             if (res.errcode == '0') {
               var data = {
                 fkmx : res.result,
                 noCount : 1
               };
               utilExt.commAJAX({
                 url : 'dzdzHwxxPtfp/queryListByJson.do',
                 data : {
                   sorting : 'id,asc',
                   noCount : 1,
                   entityJSON : JSON.stringify({
                     pk : {
                       fpdm : fpdm,
                       fphm : fphm
                     }
                   })
                 },
                 async : false,
                 ajaxFunc : function(json) {
                   if (json.errcode == '0') {
                     data.fpmx = json.result;
                     data.djxx=djxx;
                     data.bz=bz;
                     laytpl($('#tpl_fxsj_details').html()).render(data, function(html) {
                       $this.siblings().attr('data-rTag', '');
                       $this.attr('data-rTag', new Date().getTime()).after(html);
                       $('.rTag').width($(v_box).width())
                     });

                   } else {
                     utilExt.errorMsg(json.msg);
                   }
                 }
               });

             } else {
               utilExt.errorMsg(res.msg);
             }
           }
         });
       }
     });}
  exports('fksj', fksj);
}); 
