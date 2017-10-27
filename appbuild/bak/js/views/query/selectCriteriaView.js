define(["jquery","underscore","backbone","handlebars","text!views/query/templates/SelectCriteria.html","text!views/query/templates/SelectCriteriaPatent.html","text!views/query/templates/SelectCriteriaAssignee.html","text!views/query/templates/SelectCriteriaInventor.html","text!views/query/templates/AddCriteria.html","text!views/query/templates/AddCriteriaOperator.html","text!views/query/templates/AddCriteriaValue.html","bootstrap","models/overlay/overlay","views/overlay/overlay","validate"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){var p=n.View.extend({tagName:"section",id:"selectCriteria",className:"step-view",initialize:function(e){return t.bindAll(this,"render","updateModel"),this.template=r.compile(i),this.selectCriteriaPatentTemplate=r.compile(s),this.selectCriteriaAssigneeTemplate=r.compile(o),this.selectCriteriaInventorTemplate=r.compile(u),this.addTemplate=r.compile(a),this.addOperatorTemplate=r.compile(f),this.addValueTemplate=r.compile(l),this},events:{"click .quick-search":"quickSearch","click .submit-search":"submitSearch","click input[type=radio][name=entity]":"selectEntity","change #patent-condition":"changeCondition","change #assignee-condition":"changeCondition","change #inventor-condition":"changeCondition","change #cpc-condition":"changeCondition","change #nber-condition":"changeCondition","change #ipc-condition":"changeCondition","change #upc-condition":"changeCondition","change #citedPatents-condition":"changeCondition","change #citedApplications-condition":"changeCondition","change #citingPatents-condition":"changeCondition","click #add-applications":"addCondition","click #add-inventors":"addCondition","click #add-assignees":"addCondition","click #add-cpcs":"addCondition","click #add-nbers":"addCondition","click #add-ipcs":"addCondition","click #add-uspcs":"addCondition","click #add-cited_patents":"addCondition","click #add-application_citations":"addCondition","click #add-citedby_patents":"addCondition","click .clear-btn":"clearCondition"},render:function(){return e(this.el).empty(),e(this.el).append(this.template(this.model.toJSON())),this.renderCategoryCriteria(),this.model.set("isQuickSearch",!1),this},isValid:function(){if(this.model.get("isQuickSearch")==1){var t=e(this.el).find("#quickSearchForm");return t.validate({rules:{quickSearch:{required:!0}},messages:{quickSearch:{required:"Please provide quick search keywords for the query."}},highlight:function(t){e(t).closest("#quickSearch").addClass("has-error")},unhighlight:function(t){e(t).closest("#quickSearch").removeClass("has-error")}}),t.valid()}return e(this.el).find(".expression").length==0?(e(this.el).find("#filters").html('<span id="submitSearch-error" class="error">Please add search criteria for the query.</span>'),!1):!0},updateModel:function(){var n=this.model.get("entities"),r=e(this.el).find("input[name=entity]:checked"),i=r.data("name"),s=r.val(),o=t.find(n,{id:s}),u=[];t.forEach(n,function(e){e.isActive=e.id==s}),e(this.el).find(".expression").each(function(){u.push({fieldText:e(this).data("field-text"),field:e(this).data("field"),operatorText:e(this).data("operator-text"),operator:e(this).data("operator"),value:e(this).data("value")})}),this.model.set("entities",n),this.model.set("entityId",s),this.model.set("entityName",i),this.model.set("quickSearch",e(this.el).find("#quickSearch").val()),this.model.set("expressions",u);this.model.set("sorts",this.model.getSorts())},renderCategoryCriteria:function(){var t=this.model.get("entityId");var n=this.addTemplate({optGroup:"applications",id:"applications",name:"Patent",tip:"Data on patents and applications associated with patents",fields:this.model.getFilters("applications")}),r=this.addTemplate({optGroup:"inventors",id:"inventors",name:"Inventor",tip:"Data on the inventors on the patents",fields:this.model.getFilters("inventors")}),i=this.addTemplate({optGroup:"assignees",id:"assignees",name:"Assignee",tip:"Data on assignees on the patents",fields:this.model.getFilters("assignees")}),s=this.addTemplate({optGroup:"cpcs",id:"cpcs",name:"Cooperative Patent Class",tip:"Metadata describing the cooperative patent classification of the patents",fields:this.model.getFilters("cpcs")}),o=this.addTemplate({optGroup:"nbers",id:"nbers",name:"NBER",tip:"Metadata describing the technology area of the patents.  See www.nber.org/patents for more information on NBER technology areas.",fields:this.model.getFilters("nbers")}),u=this.addTemplate({optGroup:"ipcs",id:"ipcs",name:"International Patent Class",tip:"Metadata describing the international patent classification of the patents",fields:this.model.getFilters("ipcs")}),a=this.addTemplate({optGroup:"uspcs",id:"upc",name:"US Patent Class",tip:"Metadata describing the US patent classification of the patents",fields:this.model.getFilters("uspcs")}),f=this.addTemplate({optGroup:"cited_patents",id:"cited_patents",name:"Cited Patents",tip:"Data on patents that have been cited by the patents",fields:this.model.getFilters("cited_patents")}),l=this.addTemplate({optGroup:"application_citations",id:"application_citations",name:"Cited Appliations",tip:"Data on applications that are cited by patents",fields:this.model.getFilters("application_citations")}),c=this.addTemplate({optGroup:"citedby_patents",id:"citedby_patents",name:"Citing Patents",tip:"Data on patents that have cited the patents",fields:this.model.getFilters("citedby_patents")});switch(t){case"inventor":e(this.el).find("#conditions").html(this.selectCriteriaInventorTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#upc-condition").html(a);break;case"assignee":e(this.el).find("#conditions").html(this.selectCriteriaAssigneeTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#upc-condition").html(a);break;default:e(this.el).find("#conditions").html(this.selectCriteriaPatentTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#upc-condition").html(a),e(this.el).find("#citedPatents-condition").html(f),e(this.el).find("#citedApplications-condition").html(l),e(this.el).find("#citingPatents-condition").html(c)}e(this.el).find('[data-toggle="popover"]').popover({trigger:"hover",placement:"top"})},quickSearch:function(){this.model.set("isQuickSearch",!0),this.model.set("entityId","patent"),e("#next").click()},submitSearch:function(){this.model.set("isQuickSearch",!1),e("#next").click()},changeCondition:function(t){t=t||window.event;var n=e(t.srcElement||t.target),r=this.model.getFilter(n.val());e(this.el).find("#add-"+n.data("id")+"-operator-container").html(this.addOperatorTemplate(r)),e(this.el).find("#add-"+n.data("id")+"-value-container").html(this.addValueTemplate(r))},addCondition:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=r.closest(".condition").find("form"),s=i.validate({});if(i.valid()){var o=r.data("id"),u=r.data("name"),a=e(this.el).find("#add-"+o+"-field option:selected"),f=a.val(),l=e(this.el).find("#add-"+f+"-operator option:selected"),c=e(this.el).find("#add-"+f+"-value"),h=e(this.el).find("#submitSearch-error"),p=e(this.el).find("#filters p");t.isUndefined(p)||p.remove(),t.isUndefined(h)||h.remove(),e(this.el).find("#filters").append('<button type="button" class="clear-btn btn expression" data-field-text="'+u+": "+a.text()+'" data-field="'+f+'" data-operator-text="'+l.text()+'" data-operator="'+l.val()+'" data-value="'+c.val()+'">'+u+": "+a.text()+" "+l.text()+" "+c.val()+"</button>"),s.resetForm(),this.model.set("isQuickSearch",!1)}},clearCondition:function(t){t=t||window.event;var n=e(t.srcElement||t.target);n.remove()},getNextHtml:function(){return'Submit Search <i class="fa fa-caret-right" />'},getNavHtml:function(e){return""},selectEntity:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=r.val(),s=this.model.get("entityId"),o=this;!t.isUndefined(s)&&!t.isEmpty(s)&&i!=s&&(e(".entity-change-modal").find(".ok").on("click",function(){e(".entity-change-modal").modal("hide"),o.model.set("entityId",i),e(o.el).find("#quickSearch").val(""),e(o.el).find("#filters").empty(),o.renderCategoryCriteria(),o.resetView=!0,o.model.trigger("entityChanged")}),e(".entity-change-modal").find(".cancel").on("click",function(){e("#categories").find("input[type=radio][name=entity]").prop("checked",!1),e("#categories").find("input[type=radio][value="+s+"]").prop("checked",!0),e(".entity-change-modal").modal("hide")}),e(".entity-change-modal").modal("show"))}});return p});