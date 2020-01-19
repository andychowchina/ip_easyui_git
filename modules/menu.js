layui.define([ 'layer', 'element', 'tree', 'laytpl', 'utilExt','index' ], function(exports) {
  var $ = layui.jquery;
  var laytpl = layui.laytpl, tree = layui.tree,index=layui.index,element = layui.element(), utilExt = layui.utilExt;
  function tab(_this){
	  var $a=$(_this).find("a"),durl=$a.attr("data-url");
      if($(".layui-tab-title").find("li[lay-id='"+durl+"']").length==0){ 
      element.tabAdd('userTab', {
       	  title: $a.text()
       	  ,content: ' <iframe src="'+durl+'" width="100%" height="100%" frameborder="no"></iframe>'
       	  ,id: durl
       	});
      }
       element.tabChange('userTab',durl);
  }
  var mymenu = {
    init : function(type) {
      mymenu.getMenuData(type, '000000000000');
      mymenu.events();
    },
    events : function() {
      element.on('nav(mainNav)', function(elem) {
        var cdgzm = elem.find('a').attr('data-cdgzm');
        mymenu.getMenuData('sub', cdgzm);
      });
    },
    getMenuData : function(type, cdgzm) {
      utilExt.commAJAX({
        url : 'basicAuthMenu/queryMenu.do',
        data : {
          vcdgzm : cdgzm,
          js : 1,
          type : 'userMenu',
          yxbz:'Y'
        },
        ajaxFunc : function(data) {
          if (data.errcode == 0) {
            if (type == 'sub') {
              mymenu.setSubMenu(data.result);
            } else if (type = "nav") {
              mymenu.setNavMenu(data.result);
            }
          }
        }
      });
    },
    setNavMenu : function(data) {
      var arrMenuStr = [];
      for ( var d in data) {
        var item = data[d];
        if (item.level == 1) {
          arrMenuStr.push('<li class="layui-nav-item">');
          arrMenuStr.push('<a class="btn-nav" href="javascript:;" data-url="'+item.url+'" data-cdgzm="' + item.cdgzm + '">');
          arrMenuStr.push('<span><i class="fa ' + item.icon + '"></i></span>');
          arrMenuStr.push(item.mc);
          arrMenuStr.push('</a>');
          arrMenuStr.push('</li>');
        }
      }
      $('#js-menu-main').html(arrMenuStr.join(''));
      element.init();
      $('#js-menu-main').find('li:first').addClass('layui-this').click();

    },
    setSubMenu : function(data) {
      var sub = "";
      for ( var m in data) {
        var im = data[m], level = im.level;
        if (level == 1) {
          sub += '<li class="layui-nav-item top"><a href="javascript:;" data-url="'+im.url+'">' + im.mc + '</a></li>';
        } else if (level == 2) {
          sub += '<li class="layui-nav-item sub"><a href="' + (im.url || 'javascript:;') + '" target="main"><span>├</span> ' + im.mc + '</a></li>';
        }
      }
      var $sub = $('#js-menu-sub').html(sub).find('li').click(function(e) {
        $(this).css({"background":"#CB3C1E"},{"color":"#ffffff"}).siblings("li").removeAttr("style");
        tab(this);
      }).first().click();
     
    }
  };
  element.on('tab(userTab)', function(){
   index.resize();
  });
  exports('menu', mymenu);
});