define(["jquery","underscore","backbone","handlebars","text!views/query/templates/SelectCriteria.html","text!views/query/templates/SelectCriteriaPatent.html","text!views/query/templates/SelectCriteriaAssignee.html","text!views/query/templates/SelectCriteriaInventor.html","text!views/query/templates/Expressions.html","text!views/query/templates/AddCriteria.html","text!views/query/templates/AddCriteriaOperator.html","text!views/query/templates/AddCriteriaValue.html","bootstrap","models/overlay/overlay","views/overlay/overlay","validate","typeahead","bloodhound"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){var d=n.View.extend({tagName:"section",id:"selectCriteria",className:"step-view",initialize:function(e){return this.options=e,this.listenTo(this.model,"entityChanged",this.entityChanged),t.bindAll(this,"render","updateModel"),this.template=r.compile(i),this.selectCriteriaPatentTemplate=r.compile(s),this.selectCriteriaAssigneeTemplate=r.compile(o),this.selectCriteriaInventorTemplate=r.compile(u),this.expressionsTemplate=r.compile(a),this.addTemplate=r.compile(f),this.addOperatorTemplate=r.compile(l),this.addValueTemplate=r.compile(c),this},events:{"click #advanced-search":"toggleSearch","click #back-quick-search":"toggleSearch","click .quick-search":"quickSearch","click .submit-search":"submitSearch","keyup #quickSearch":"keyPressQuickSearch","click input[type=radio][name=entity]":"selectEntity","change #patent-condition":"changeCondition","change #assignee-condition":"changeCondition","change #inventor-condition":"changeCondition","change #cpc-condition":"changeCondition","change #nber-condition":"changeCondition","change #ipc-condition":"changeCondition","change #uspc-condition":"changeCondition","change #wipos-condition":"changeCondition","change #citedPatents-condition":"changeCondition","change #citedApplications-condition":"changeCondition","change #citingPatents-condition":"changeCondition","click #add-applications":"addCondition","click #add-inventors":"addCondition","click #add-assignees":"addCondition","click #add-cpcs":"addCondition","click #add-nbers":"addCondition","click #add-ipcs":"addCondition","click #add-uspcs":"addCondition","click #add-wipos":"addCondition","click #add-cited_patents":"addCondition","click #add-application_citations":"addCondition","click #add-citedby_patents":"addCondition","click .clear-btn":"clearCondition","click #filters-clearall":"clearAllExpressions"},render:function(){var t=this.model.toJSON();return e(this.el).empty(),e(this.el).append(this.template(t)),this.renderCategoryCriteria(),e(this.el).find("#filters").html(this.expressionsTemplate(t)),this.model.get("isQuickSearch")?(e(this.el).find("#entity-section").hide(),e(this.el).find("#criteria-section").hide(),e(this.el).find("#quick-search-section").show(),e(this.el).find("#back-quick-search").hide(),e(this.el).find(".intro-text").show(),e(this.el).find(".intro").addClass("intro-centered")):(e(this.el).find("#quick-search-section").hide(),e(this.el).find("#entity-section").show(),e(this.el).find("#criteria-section").show(),e(this.el).find("#back-quick-search").show(),e(this.el).find(".intro-text").hide(),e(this.el).find(".intro").removeClass("intro-centered")),this},isValid:function(){if(this.model.get("isQuickSearch")==1){var t=e(this.el).find("#quickSearchForm");return t.validate({rules:{quickSearch:{required:!0}},messages:{quickSearch:{required:"Please provide quick search keywords for the query."}},highlight:function(t){e(t).closest("#quickSearch").addClass("has-error")},unhighlight:function(t){e(t).closest("#quickSearch").removeClass("has-error")}}),t.valid()}return e(this.el).find(".expression").length==0?(e(this.el).find("#filters").html('<span id="submitSearch-error" class="error">Please add search criteria for the query.</span>'),!1):!0},updateModel:function(){var n=this.model.get("entities"),r=e(this.el).find("input[name=entity]:checked"),i=r.data("name"),s=r.val(),o=t.find(n,{id:s}),u=[];e(this.el).find(".expression").each(function(t,n){var r=e(n);u.push({fieldText:r.data("fieldText"),field:r.data("field"),operatorText:r.data("operatorText"),operator:r.data("operator"),value:r.data("value")})}),t.forEach(n,function(e){e.isActive=e.id==s}),this.model.set("expressions",u),this.model.set("entities",n),this.model.set("entityId",s),this.model.set("entityName",i),this.model.set("quickSearch",e(this.el).find("#quickSearch").val()),this.model.set("sorts",this.model.getSorts())},renderCategoryCriteria:function(){var t=this.model.get("entityId"),n=this.addTemplate({optGroup:"applications",id:"applications",name:"Patents",tip:"Data related to patents and patent applications",fields:this.model.getFilters("applications")}),r=this.addTemplate({optGroup:"inventors",id:"inventors",name:"Inventors",tip:"Data related to inventors on the patents",fields:this.model.getFilters("inventors")}),i=this.addTemplate({optGroup:"assignees",id:"assignees",name:"Assignees",tip:"Data related to assignees on the patents",fields:this.model.getFilters("assignees")}),s=this.addTemplate({optGroup:"cpcs",id:"cpcs",name:"Cooperative Patent Class",tip:"Metadata describing the cooperative patent classification of the patents. The full class string can be searched in CPC Class field with type-ahead functionality.",fields:this.model.getFilters("cpcs")}),o=this.addTemplate({optGroup:"nbers",id:"nbers",name:"NBER",tip:"Metadata describing the technology area of the patents. See www.nber.org/patents for more information on NBER technology areas. Only available through May 2015.",fields:this.model.getFilters("nbers")}),u=this.addTemplate({optGroup:"ipcs",id:"ipcs",name:"International Patent Class",tip:"Metadata describing the international patent classification of the patents. The full class string can be searched in IPC Class field with type-ahead functionality.",fields:this.model.getFilters("ipcs")}),a=this.addTemplate({optGroup:"uspcs",id:"uspcs",name:"US Patent Class",tip:"Metadata describing the US patent classification of the patents. The full class string can be searched in USPC Class field with type-ahead functionality. Only available through May 2015.",fields:this.model.getFilters("uspcs")}),f=this.addTemplate({optGroup:"wipos",id:"wipos",name:"WIPO",tip:"WIPO tooltip should read: Metadata describing the technology field of the patents.",fields:this.model.getFilters("wipos")}),l=this.addTemplate({optGroup:"cited_patents",id:"cited_patents",name:"Cited Patents",tip:"Data related to patents that have been cited by the patents associated with the search criteria",fields:this.model.getFilters("cited_patents")}),c=this.addTemplate({optGroup:"application_citations",id:"application_citations",name:"Cited Appliations",tip:"Data related to patent applications that have been cited by the patents associated with the search criteria",fields:this.model.getFilters("application_citations")}),h=this.addTemplate({optGroup:"citedby_patents",id:"citedby_patents",name:"Citing Patents",tip:"Data related to patents that have cited the patents associated with the search criteria",fields:this.model.getFilters("citedby_patents")});switch(t){case"inventor":e(this.el).find("#conditions").html(this.selectCriteriaInventorTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#uspc-condition").html(a),e(this.el).find("#wipos-condition").html(f);break;case"assignee":e(this.el).find("#conditions").html(this.selectCriteriaAssigneeTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#uspc-condition").html(a),e(this.el).find("#wipos-condition").html(f);break;default:e(this.el).find("#conditions").html(this.selectCriteriaPatentTemplate({})),e(this.el).find("#patent-condition").html(n),e(this.el).find("#inventor-condition").html(r),e(this.el).find("#assignee-condition").html(i),e(this.el).find("#cpc-condition").html(s),e(this.el).find("#nber-condition").html(o),e(this.el).find("#ipc-condition").html(u),e(this.el).find("#uspc-condition").html(a),e(this.el).find("#wipos-condition").html(f),e(this.el).find("#citedPatents-condition").html(l),e(this.el).find("#citedApplications-condition").html(c),e(this.el).find("#citingPatents-condition").html(h)}e(this.el).find('[data-toggle="popover"]').popover({trigger:"hover",placement:"top"})},toggleSearch:function(t){t=t||window.event;var n=e(t.srcElement||t.target);return this.model.get("isQuickSearch")?(e(this.el).find("#quick-search-section").hide(),e(this.el).find("#entity-section").show(),e(this.el).find("#criteria-section").show(),e(this.el).find("#back-quick-search").show(),e(this.el).find(".intro-text").hide(),e(this.el).find(".intro").removeClass("intro-centered"),this.model.set("isQuickSearch",!1)):(e(this.el).find("#entity-section").hide(),e(this.el).find("#criteria-section").hide(),e(this.el).find("#quick-search-section").show(),e(this.el).find("#back-quick-search").hide(),e(this.el).find(".intro-text").show(),e(this.el).find(".intro").addClass("intro-centered"),this.model.set("isQuickSearch",!0)),this.options.stepByStepView.displayPager(this.displayPager()),!1},keyPressQuickSearch:function(e){if(e.keyCode==13)return this.quickSearch()},quickSearch:function(){return this.model.set("isQuickSearch",!0),this.model.set("entityId","patent"),e("#next").click(),!1},submitSearch:function(){this.model.set("isQuickSearch",!1),e("#next").click()},changeCondition:function(t){t=t||window.event;var n=e(t.srcElement||t.target),r=this.model.getFilter(n.val());e(this.el).find("#add-"+n.data("id")+"-operator-container").html(this.addOperatorTemplate(r)),e(this.el).find("#add-"+n.data("id")+"-value-container").html(this.addValueTemplate(r));if(r.type=="location"){var i=e(this.el).find("#add-"+n.data("id")+'-value-container input[data-location-type="country"]'),s=e(this.el).find("#add-"+n.data("id")+'-value-container input[data-location-type="city"]'),o=e(this.el).find("#add-"+n.data("id")+'-value-container input[data-location-type="state"]'),u=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,local:["Afghanistan","Aland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Cambodia","Cameroon","Canada","Cayman Islands","Central African Republic","Chad","Chile","China","Colombia","Congo [DRC]","Congo [Republic]","Cook Islands","Costa Rica","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia [FYROM]","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar [Burma]","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territories","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Saint Barthelemy","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","South Africa","South Korea","South Sudan","Soviet Union","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Wallis and Futuna","Yemen","Yugoslavia","Zambia","Zimbabwe"],remote:{url:"http://www.patentsview.org/querydev/query/location.php",replace:function(e,t){return e+"?cc="+t}},initialize:!0}),a=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://www.patentsview.org/querydev/query/location.php",replace:function(e,t){return e+"?cc="+i.typeahead("val")+"&r=c"+"&c="+t}},initialize:!0}),f=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,local:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],remote:{url:"http://www.patentsview.org/querydev/query/location.php",replace:function(e,t){return e+"?cc="+i.typeahead("val")+"&r=s"+"&s="+t}},initialize:!0});i.typeahead({hint:!0,highlight:!0,minLength:1},{name:"countries",source:u}),s.typeahead({hint:!0,highlight:!0,minLength:2},{name:"cities",source:a}),o.typeahead({hint:!0,highlight:!0,minLength:1},{name:"states",source:f})}if(r.type=="cpc"){var l=e(this.el).find("#add-"+r.id+"-value");l.attr("data-provider","typeahead").attr("autocomplete","false");var c=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://www.patentsview.org/querydev/query/cpc.php",replace:function(e,t){return e+"?cc="+t}},initialize:!0});l.typeahead({hint:!0,highlight:!0,minLength:1},{name:"cpc",source:c})}if(r.type=="uspc"){var l=e(this.el).find("#add-"+r.id+"-value");l.attr("data-provider","typeahead").attr("autocomplete","false");var h=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://www.patentsview.org/querydev/query/uspc.php",replace:function(e,t){return e+"?cc="+t}},initialize:!0});l.typeahead({hint:!0,highlight:!0,minLength:1},{name:"uspc",source:h})}if(r.type=="ipc"){var l=e(this.el).find("#add-"+r.id+"-value");l.attr("data-provider","typeahead").attr("autocomplete","false");var p=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://www.patentsview.org/querydev/query/ipc.php",replace:function(e,t){return e+"?cc="+t}},initialize:!0});l.typeahead({hint:!0,highlight:!0,minLength:1},{name:"ipc",source:p})}if(r.id=="assignee_organization"&&e(this.el).find("#add-"+r.id+"-operator").val()=="_eq"){var l=e(this.el).find("#add-"+r.id+"-value");l.attr("data-provider","typeahead").attr("autocomplete","false");var d=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://www.patentsview.org/querydev/query/assignee.php",replace:function(e,t){return e+"?o="+t}},initialize:!0});l.typeahead({hint:!0,highlight:!0,minLength:1},{name:"organization",source:d})}},addCondition:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=r.closest(".condition").find("form");if(i.length==0)return;var s=i.validate({});if(i.valid()){var o=r.data("id"),u=r.data("name"),a=this.model.get("expressions"),f=e(this.el).find("#add-"+o+"-field option:selected"),l=f.val(),c=e(this.el).find("#add-"+l+"-operator option:selected");filter=this.model.getFilter(l);if(filter.type=="location"){var h=e(this.el).find("#add-"+l+"-country"),p=e(this.el).find("#add-"+l+"-city"),d=e(this.el).find("#add-"+l+"-state");if(h.val().length>0){var v=this.model.getCountryCode(h.val());v.length>0&&a.push({fieldText:f.text()+" Country",field:l.replace("location","country"),operatorText:c.text(),operator:c.val(),value:v}),this.clearValue(h)}p.val().length>0&&(a.push({fieldText:f.text()+" City",field:l.replace("location","city"),operatorText:c.text(),operator:c.val(),value:p.val()}),this.clearValue(p));if(d.val().length>0){var m=this.model.getStateCode(d.val());m.length>0&&a.push({fieldText:f.text()+" State",field:l.replace("location","state"),operatorText:c.text(),operator:c.val(),value:m}),this.clearValue(d)}}else if(filter.type=="cpc"){var g=e(this.el).find("#add-"+l+"-value"),y=g.val().trim(),b=y.length>0?y.substr(0,1):"",w=y.length>2?y.substr(0,3):"",E=y.length>3?y.substr(0,4):"",S=y.length>4?y:"";a.push({fieldText:"CPC Section ID",field:l.replace("class","section_id"),operatorText:c.text(),operator:c.val(),value:b.trim()}),w.length>0&&a.push({fieldText:"CPC Subsection ID",field:l.replace("class","subsection_id"),operatorText:c.text(),operator:c.val(),value:w.trim()}),E.length>0&&a.push({fieldText:"CPC Group ID",field:l.replace("class","group_id"),operatorText:c.text(),operator:c.val(),value:E.trim()}),S.length>0&&a.push({fieldText:"CPC Subgroup ID",field:l.replace("class","subgroup_id"),operatorText:c.text(),operator:c.val(),value:S.trim()}),this.clearValue(g)}else if(filter.type=="uspc"){var g=e(this.el).find("#add-"+l+"-value"),y=g.val().trim().split("/"),x=y.length>0?y[0]:"",T=y.length>1?y[1]:"";x.length>0&&a.push({fieldText:"USPC Mainclass ID",field:l.replace("class","mainclass_id"),operatorText:c.text(),operator:c.val(),value:x.trim()}),T.length>0&&a.push({fieldText:"USPC Subclass ID",field:l.replace("class","subclass_id"),operatorText:c.text(),operator:c.val(),value:x.length>0?x+"/"+T:T}),this.clearValue(g)}else if(filter.type=="ipc"){var g=e(this.el).find("#add-"+l+"-value"),y=g.val().trim();}else{var g=e(this.el).find("#add-"+l+"-value");a.push({fieldText:f.text(),field:l,operatorText:c.text(),operator:c.val(),value:g.val()}),this.clearValue(g)}var N=e(this.el).find("#submitSearch-error"),C=e(this.el).find("#filters p");t.isUndefined(C)||C.remove(),t.isUndefined(N)||N.remove(),this.model.set("expressions",a),e(this.el).find("#filters").html(this.expressionsTemplate(this.model.toJSON())),s.resetForm(),this.model.set("isQuickSearch",!1)}},clearAllExpressions:function(t){this.model.set("expressions",[]),e(this.el).find("#filters").html(this.expressionsTemplate(this.model.toJSON()))},clearCondition:function(t){t=t||window.event;var n=e(t.srcElement||t.target);n.remove();var r=[];e(this.el).find(".expression").each(function(t,n){var i=e(n);r.push({fieldText:i.data("fieldText"),field:i.data("field"),operatorText:i.data("operatorText"),operator:i.data("operator"),value:i.data("value")})}),this.model.set("expressions",r),e(this.el).find(".expression").length==0&&(this.model.set("expressions",[]),e(this.el).find("#filters").html(this.expressionsTemplate(this.model.toJSON())))},clearValue:function(n){if(t.isUndefined(n))return;if(e(n).is("select")){e(n).find("option").each(function(){if(this.defaultSelected)return this.selected=!0,!1});return}if(e(n).is("input")){n.val("");return}},getNextHtml:function(){return'Submit Search <i class="fa fa-caret-right" />'},getNavHtml:function(e){return""},displayPager:function(){return!this.model.get("isQuickSearch")},entityChanged:function(){this.model.set("outputIds",[]),this.model.set("quickSearch",""),this.model.set("expressions",[]),e(this.el).find("#quickSearch").val(""),e(this.el).find("#filters").html(this.expressionsTemplate(this.model.toJSON())),this.renderCategoryCriteria(),this.resetView=!0},selectEntity:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=r.val(),s=this.model.get("entityId"),o=e(this.el).find("#quickSearch").val(),u=this.model.get("expressions"),a=this;!t.isUndefined(s)&&!t.isEmpty(s)&&i!=s&&(o!=""||u.length>0)?(e(".entity-change-modal").find(".ok").on("click",function(){e(".entity-change-modal").modal("hide"),a.model.set("entityId",i),a.model.trigger("entityChanged")}),e(".entity-change-modal").find(".cancel").on("click",function(){e("#categories").find("input[type=radio][name=entity]").prop("checked",!1),e("#categories").find("input[type=radio][value="+s+"]").prop("checked",!0),e(".entity-change-modal").modal("hide")}),e(".entity-change-modal").modal("show")):(this.model.set("entityId",i),this.model.trigger("entityChanged"))}});return d});