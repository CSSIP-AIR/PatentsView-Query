define(["jquery","underscore","backbone","handlebars","text!views/query/templates/stepbystep.html","recaptcha"],function(e,t,n,r,i,s){var o=function(){var s=function(){var e=function(e){var t=null,n=null,r=e.ref,i=e.tab,s=e.hideTab||!1,o=e.hideNav||!1,u=e.pos;return{setPrevious:function(e){return n=e,this},getPrevious:function(){return n},setNext:function(e){return t=e,this},getNext:function(){return t},getView:function(){return r},getTab:function(){return i},getPos:function(){return u},getHideTab:function(){return s},getHideNav:function(){return o}}},t=null,n=null,r=null,i=new Array;return{all:function(){return i},first:function(){return t},last:function(){return n},moveNext:function(){return r!==null?r=r.getNext():null},movePrevious:function(){return r!==null?r=r.getPrevious():null},getCurrent:function(){return r},getByTab:function(e){var n=t;while(n!==undefined&&n!==null){if(n.getTab()===e)return n;n=n.getNext()}return null},insertView:function(s){var o=new e(s);n===null?r=n=t=o:n=n.setNext(o.setPrevious(n)).getNext(),i.push(o)},setCurrentByTab:function(e){var n=t;while(n!==undefined&&n!==null){if(n.getTab()===e){r=n;break}n=n.getNext()}}}},o=n.View.extend({tagName:"div",id:"step-by-step",initialize:function(){t.bindAll(this,"render","insertView","save","routeStep"),e(this.el).append(r.compile(i)),this.stepViewTabs=e(this.el).find("#step-view-progress"),this.stepViewContainer=e(this.el).find("#step-view-container"),this.stepViews=new s},events:{"click #previous":"routeStep","click #next":"routeStep","click .nav-tabs a":"routeStep","click #save":"save"},render:function(){var n=this.stepViews.getCurrent();if(!t.isUndefined(n)&&!t.isNull(n)){if(n.getNext()===null){e("#step-pager",this.el).hide(),e("#previous",this.el).hide(),e("#next",this.el).hide(),e(".form-actions").show(),e("#save").prop("disabled",!0);if(!t.isUndefined(grecaptcha)&&!t.isNull(grecaptcha)){var r=e("#captcha-container");r.data("rendered")?grecaptcha.reset():(grecaptcha.render("captcha-container",{sitekey:"6LcUEgYTAAAAAPXnyayKNTkx4nZsgQoBG52pD9_D",callback:function(n){e("#save").prop("disabled",t.isEmpty(n))},"expired-callback":function(){e("#save").prop("disabled",!0)}}),r.data("rendered",!0))}}else e("#next",this.el).html(this.getNextHtml()),e(".form-actions").hide(),e("#next",this.el).show(),n.getPrevious()===null?e("#previous",this.el).hide():e("#previous",this.el).show(),this.displayPager()?e("#step-pager",this.el).show():e("#step-pager",this.el).hide();n.getHideNav()?this.stepViewTabs.hide():this.stepViewTabs.show();var i=n.getPos(),s=this.stepViewTabs;t.forEach(this.stepViews.all(),function(e){var t=e.getView(),n=e.getPos(),r=s.find("li > a#"+t.id);r.parent().attr("class",""),n<i?(r.parent().addClass("complete"),r.empty().html(t.getNavHtml("complete"))):n==i?(r.parent().addClass("active"),r.empty().html(t.getNavHtml("active"))):r.empty().html(t.getNavHtml())}),this.stepViewContainer.find(".step-view:parent").hide(),e(n.getView().render(!0).el).show()}return this},insertView:function(t){t.tab=t.tab.replace(/\s/g,"-"),!t.hideTab&&!0&&this.stepViewTabs.append('<li><a id="'+t.tab+'" href="#" title="'+t.tabTitle+'"><i class="fa fa-lg fa-square-o"></i> '+t.tabTitle+"</a></li>"),this.stepViewContainer.append(e(t.ref.render().el).hide()),this.stepViews.insertView(t)},movePrevious:function(){return this.updateModel(),this.stepViews.movePrevious(),this.render(),!1},moveNext:function(){return this.updateModel(),this.stepViews.moveNext(),this.render(),!1},moveToTab:function(e){return this.updateModel(),this.stepViews.setCurrentByTab(e),this.render(),!1},isValid:function(){var e=this.stepViews.getCurrent().getView();return t.isUndefined(e.isValid)?!0:e.isValid()},updateModel:function(){this.stepViews.getCurrent().getView().updateModel()},save:function(n){n=n||window.event;var r=e(n.srcElement||n.target);if(!this.isValid())return;this.updateModel();var i=t.isUndefined(grecaptcha)||t.isNull(grecaptcha)?"":grecaptcha.getResponse(),s=this.model.toJSON(),o={entityId:s.entityId,groupId:s.groupId,fieldId:s.fieldId,outputIds:s.outputIds,recipient:s.recipient,resultCount:s.resultCount,xml:s.xml,json:s.json,csv:s.csv,criteria:s.criteria,query:this.model.buildQuery()};e(r).prop("disabled",!0),e(r).append('&nbsp;&nbsp;<i class="fa fa-spinner fa-pulse" />'),e(r).prop("disabled",!0),jQuery.ajax({context:this,type:"POST",url:"http://www.patentsview.org/querydev/query/verify.php",data:{"g-recaptcha-response":i,query:JSON.stringify(o)},success:function(t){e("#q").val(t.id),e("#submit").submit()},error:function(t){grecaptcha.reset(),e(save).html("Submit Query"),e(save).prop("disabled",!0)}})},routeStep:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=e(r).attr("id"),s="start";if(i==="next"){if(!this.isValid())return!1;var o=this.stepViews.getCurrent().getNext();!t.isUndefined(o)&&!t.isNull(o)&&(s=o.getTab())}else if(i==="previous"){var u=this.stepViews.getCurrent().getPrevious();!t.isUndefined(u)&&!t.isNull(u)&&(s=u.getTab())}else{s=i;var f=this.stepViews.getByTab(s);if(f!==undefined&&f.getPos()>this.stepViews.getCurrent().getPos()&&!this.isValid())return!1}return a.navigate("step/"+s,!0),!1},getNextHtml:function(){return t.isUndefined(this.stepViews.getCurrent().getView().getNextHtml)?"Next":this.stepViews.getCurrent().getView().getNextHtml()},displayPager:function(){return t.isUndefined(this.stepViews.getCurrent().getView().displayPager)?!0:this.stepViews.getCurrent().getView().displayPager()}}),u=null,a=null;return{initialize:function(e,t){a=e,u=new o({model:t})},insertView:function(e){u.insertView(e)},movePrevious:function(){u.movePrevious()},moveNext:function(){u.moveNext()},moveToTab:function(e){return u.moveToTab(e)},render:function(){return u.render()},stepEvents:function(){return u.stepViews.stepEvents()},displayPager:function(t){t?e("#step-pager").show():e("#step-pager").hide()}}}();return o});