layui.define([ 'layer', 'utilExt' ], function(exports) {
  var $ = layui.jquery, layer = layui.layer, utilExt = layui.utilExt;
  var obj = {};
  /*
   * params { ocx : _scanOcx, scanEl : '.scanFile', viewEl : '.showScanFile' }
   * ocx：控件Object 对应的ID值
   * 
   * scanEl：扫描的元素
   */
  obj.init = function(params) {
    return false;
    var _ocx = params['ocx'];
    if (!_ocx) {
      utilExt.errorMsg('扫描控件加载错误!');
      return false;
    }
    obj.ocx = _ocx;
    obj.params = params;
    obj.evets();
    return obj;
  }
  obj.evets = function() {
    var scanEl = obj.params['scanEl'] || '.scanFile';
    $(scanEl).click(function() {
      obj.scan();
    });
  };
  // 控件扫描方法
  obj.scan = function() {
    obj.ocx.abc();
  };
  // 获取扫描文件JSON数据
  obj.getFileJson = function() {
    return obj.ocx.getUploadFileJson();
  };
  // 根据任务ID获取资源文件
  obj.getOldFileJson = function(rwid) {
    utilExt.commAJAX({
      url : 'basicEfileStore/queryFileStore.do',
      data : {
        rwid : rwid
      },
      ajaxFunc : function(json) {
        if (json.errcode == '0') {
       //   alert("查看扫描结果数据"+JSON.stringify(json));
         obj.setOldFileJson(JSON.stringify(json));
        }
      }
    });
  };
  // 给控件设置资源JSON 数据，控件需支持 设置后自动show()
  obj.setOldFileJson = function(json) {
    obj.ocx.setOldFileJson(json);
  //  alert(obj.ocx.setOldFileJson(json));
    
  };

  exports('scanOcx', obj);
});