layui.define([ 'layer' ], function(exports) {

  var mObj = {};

  mObj.getQxdw = function(qxdw) {
    var str = "";
    switch (qxdw) {
    case "Y":
      str = '年'
      break;
    case "M":
      str = '月'
      break;
    case "W":
      str = '周'
      break;
    case "D":
      str = '天'
      break;
    case "H":
      str = '小时'
      break;
    default:
      break;
    }
    return str;
  };
  /**
   * 状态代码(0000待接收/0100执行中/0200已办结/0300驳回/0400被驳回/0500任务挂起)
   */
  mObj.getFlowStepZtdm = function(ztdm) {
    var str = "";

    switch (ztdm) {
    case "0000":
      str = '待接收'
      break;
    case "0100":
      str = '待办'
      break;
    case "0200":
      str = '已办结'
      break;
    case "0300":
      str = '驳回'
      break;
    case "0400":
      str = '被驳回'
      break;
    case "0500":
      str = '任务挂起'
      break;
    case "0502":
        str = '待办结'
        break;
    }
    return str;
  }
  /**
   * 廉政任务角色组
   */
  mObj.getFlowJSZ = function(ztdm) {
    var str = "";

    switch (ztdm) {
    case "1000000103":
      str = '全省监察业务组'
      break;
    case "1000000104":
      str = '全省监察负责人组'
      break;
    case "1000000105":
      str = '全省监察纪检组长组'
    }
    return str;
  }
  exports('dicUtil', mObj);
});
