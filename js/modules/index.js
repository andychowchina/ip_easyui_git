layui.define([ 'layer', 'element', 'form', 'utilExt' ], function(exports) {
  var $ = layui.jquery, layer = layui.layer, form = layui.form();
  var pageObj = {};

  pageObj.init = function() {
    pageObj.resize();
    pageObj.events();
  };
  pageObj.resize = function() {
    // iframe自适应
    $(window).on('resize', function() {
      var $content = $('#admin-body'), wH = $(this).height();
      $content.height(wH - 80);
      $content.find('iframe').each(function() {
        $(this).height($content.height() - 41);
      });
    }).resize();
  };
  pageObj.events = function() {
    $('#js-logout').click(function() {
      location.href = layui.utilExt.basePath
    });

    $subm = $("#admin-menu");
    form.on("switch(mswitch)", function(data) {
      if (!data.elem.checked) {
        $subm.addClass("upElem").hide();
        $("#admin-body").css("left", "70px");
        $("#js-menu-main,#admin-menu").hover(function() {
          $subm.show();
        }, function() {
          $subm.hide();
        });
      } else {
        $subm.removeClass("upElem").show();
        $("#admin-body").css("left", "250px");
        $("#js-menu-main,#admin-menu").unbind('mouseenter mouseleave');
      }
    });
  };

  exports('index', pageObj);
});