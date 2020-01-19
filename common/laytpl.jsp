<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<script type="text/html" id="tpl_user_org">
<option value="">直接选择或搜索选择</option>
<option value="{{d.def||''}}">全选</option>
{{# layui.each(d.data, function(index, item){ }}
	<option value="{{item.bm}}" data-xzqh='{{item.xzqh}}' {{d.checkVal==item.pk?'selected':''}}>{{item.mc}}</option>
{{# }); }}
</script>
<script type="text/html" id="tpl_role_group">
<option value="">直接选择或搜索选择</option>
{{# layui.each(d.data, function(index, item){ }}
	<option value="{{item.pk}}" {{d.checkVal==item.pk?'selected':''}}>{{item.mc}}</option>
{{# }); }}
</script>
<script type="text/html" id="tpl_fxsj">
<blockquote class="layui-elem-quote">疑点数据列表</blockquote>
<table class="layui-table">
      <tbody>
        <tr>
          <td colspan="2" class="self-inner-table">
            <table class="layui-table">
              <colgroup>
                <col width="60">
                <col>
                <col>
                <col>
                <col width="100">
              </colgroup>
              <thead>
              <tr>
                <th>操作</th>
                <th>序号</th>
                <th>发票代码</th>
                <th>发票号码</th>
                <th>开票日期</th>
                <th>购买方</th>
                <th>销售方</th>
                <th>金额</th>
                <th>税额</th>
                <th>价税合计</th>
                <th>作废标志</th></tr>
              </thead>
              <tbody id="js_fxsj">
{{# layui.each(d, function(index, item){ }}
<tr data-fpdm="{{item.fpdm}}" data-bz="{{item.bz}}" data-fphm="{{item.fphm}}" data-fkxh="{{item.fkxh}}" class="mouseover">
<td class="center"><input data-id="{{item.pk}}" type="checkbox" {{item.bjrDm=="0000"?'':'checked'}} lay-skin="primary"></td>
<td class="center">{{index+1}}</td>
  <td>{{item.fpdm}}</td>
  <td>{{item.fphm}}</td>
  <td>{{layui.utilExt.dateFormat(item.kprq)}}</td>
  <td>{{item.gfmc}}</td>
  <td>{{item.xfmc}}</td>
  <td>{{item.je}}</td>
  <td>{{item.se}}</td>
  <td>{{item.jshj}}</td>
  <td>{{item.zfbz=='N'?'正常':'作废'}}</td>
</tr>
{{# }); }} </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
</script>

  <script type="text/html" id="tpl_fxsj_details">
<tr class="rTag">
<td colspan="11" style="background: red;">
<table class="layui-table">
	<caption></caption>
	<colgroup>
	<col width="80">
	</colgroup>
	<thead>
<tr>
<th colspan="9">【明细】发票明细</th>
</tr>
<tr>
		<th>序号</th>
		<th>货物名称</th>
		<th>规格型号</th>
		<th>单位</th>
		<th>数量</th>
		<th>单价</th>
		<th>税率</th>
		<th>金额</th>
		<th>税额</th>
</tr>	
	</thead>
	<tbody>
{{# layui.each(d.fpmx, function(index, item){ }}
<tr>
<td class="center">{{item.pk.id}}</td>
<td>{{item.hwmc||''}}</td>
<td>{{item.ggxh||''}}</td>
<td>{{item.dw||''}}</td>
<td>{{item.sl||''}}</td>
<td>{{item.dj||''}}</td>
<td>{{item.slv||''}}</td>
<td>{{item.je||''}}</td>
<td>{{item.se||''}}</td>
</tr>
{{# }); }} 
</tbody>
<tfoot>
 <tr>
<td class="center" colspan="2">发票备注</td>
<td colspan="7">{{d.bz||""}}</td>
</tr>
</tfoot>
</table>
<!--<table class="layui-table">
	<colgroup>
	<col width="80">
	</colgroup>
	<thead>
<tr><th colspan="6">【明细】风控数据明细</th></tr>
<tr>
		<th>序号</th>
		<th>指标代码</th>
		<th>风控行业序号</th>
		<th>产出日期</th>
		<th>风险等级</th>
        <th>疑点类别</th>	
		<th>风险描述</th>	
</tr>	
</thead>
	<tbody>
{{# layui.each(d.fkmx, function(index, item){ }}
<tr>
<td class="center">{{index+1}}</td>
<td>{{item.zbDm}}</td>
<td>{{item.fkhyxh}}</td>
<td>{{layui.utilExt.dateFormat(item.csrq)||''}}</td>
<td>{{d.djxx[item.fxdjDm]||item.fxdjDm}}</td>
<td>{{item.ydlx}}</td>
<td>{{item.ydms}}</td>
</tr>
{{# }); }} 
</tbody>
</table>-->

</td>
</tr>
</script>