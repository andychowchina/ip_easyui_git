layui.define([ 'layer', 'utilExt' ], function(exports) {
  var $ = layui.jquery, utilExt = layui.utilExt;

  var mObj = {};
  mObj.moduleName = 'taskTool';

  mObj.showTaskSteps = function(rwid, stepId) {
    utilExt.openLayer({
      url : 'jsp/BasicFlowTask/taskSteps.jspx?rwid=' + $.trim(rwid) + '&stepId=' + stepId,
      area : [ '90%', '80%' ],
      title : '任务流转明细'
    });
  };

  exports(mObj.moduleName, mObj);
});
