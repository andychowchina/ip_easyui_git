//系统定义静态信息
layui.define([ 'form', 'laytpl' ], function(exports) {
  var $ = layui.jquery, form = layui.form();
  var laytpl = layui.laytpl;
  var config = {
    title :  "贵州省增值税发票云服务平台",//系统名称
    footer : "技术支持:贵州爱信诺航天信息有限公司&nbsp;&nbsp;&nbsp;服务热线:95113",
    xtjs : {// 系统介绍信息
      title : "平台介绍",
      context : [ {
        subject : "",//一、平台建设背景与意义
        context : [ "为深入贯彻中央八项规定精神，将反”四风“的要求落到实处，推动全面从严治党向基层延伸，贵州国税系统充分运用税收大数据，借助现代化信息技术手段，开发平台。主要提取增值税电子抵账系统增值税普通发票信息和金三期中的有关登记信息，设置疑点数据条件，对国税系统各单位在全省范围内取得的发票信息相关要素进行筛选，确定风险数据，推送风险任务，反馈核查结果，进行数据统计分析。通过平台主动发现问题，着力发现各级税务机关、税务人员涉嫌违反中央八项规定精神、涉及”四风“问题的有关行为，抓早抓小，用好”四种形态“对照处理，建立风险防控防护网、让纪律成为带电的高压线，最大限度将涉及“四风”的违法违纪行为揭制在萌芽阶段。" ]
      }/*, {
        subject : "二、平台功能",
        context : [ "提取增值税电子底账系统中增值税发票信息，根据设置条件对全市国税系统各单位在全省范围内消费发票信息的相关要素进行筛选、比对， 确定风险数据，进行等级排序，推送风险任务，反馈核查结果，处置问题线索。根据设置条件对除全市国税系统外的全市行政机关、企事业单位、群团组织、院校、医院、科研、文化、卫生机构等单位在全省范围内消费发票信息的相关要素进行筛选、比对，查询并导出在规定时间相关单位重大节日期间发生且符合条件的消费发票信息" ]
      } */]
    }
  };
  config.init = function(tpl, name) {
    if (tpl) {
      laytpl($(tpl).html()).render(config.xtjs, function(html) {
        $('#content').html(html);
      });
    } else {
      $("[name^='cfg_']").each(function(idx, elem) {
        var $elem = $(elem), name = $elem.attr("name").replace('cfg_', '');
        if (typeof elem.value == 'undefined')
          $elem.html(config[name]);
        else
          $elem.val(config[name]);
      });
    }
  };
  exports('config', config);
});
