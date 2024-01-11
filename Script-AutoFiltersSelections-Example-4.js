let arrayregionMarketFilterIndex = [1,2,3,4];
let arraypracticeFilterIndex = [6,7,8];
let arrayRegionExcludeValue = ['NA'];
var filterschangedConfig = {
	filterType:"",
	regionValue:"",
	marketvalues:"",
	dim :"",
	datasource:"",
	title:"",
	mappedvalues:""
};


let arrayExtraMarketfilterIndex = [0];

dashboard.on('filterschanged', (el, args) => {

	if(args.type == 'update')
	{
		if(args.items[0].jaql.dim == '[Geo_Region_KPIs.Region_KPI]' && args.items[0].jaql.datasource.title == 'Client P&L')
			//if(args.items[0].jaql.dim == '[Geo_Region_KPIs.Region_KPI]' && args.items[0].jaql.datasource.title == 'Client P&L')
		{
			console.log('filterschangedConfig Region Filter >>>>>>>>>>>>>>>>>>>>>>>>>>');
			var selectedFilterValues = [];
			filterschangedConfig = {
				filterType:"",
				regionValue:"",
				marketvalues:"",
				dim :"",
				datasource:"",
				title:"",
				mappedvalues:""
			};
			console.log('filterschanged event:>>>',args);
			if(args.items[0].jaql.filter.hasOwnProperty('all') == true)
			{
				filterschangedConfig.filterType = "all";				
			}
			else if(args.items[0].jaql.filter.hasOwnProperty('exclude') == true)
			{
				for (var k=0; k<args.items[0].jaql.filter.exclude.members.length; k++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.exclude.members[k].trim()); 
				}
				filterschangedConfig.filterType = "exclude";
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			else
			{
				for (var l=0; l< args.items[0].jaql.filter.members.length; l++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.members[l].trim()); 
				}
				filterschangedConfig.filterType = "include";			
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			console.log('filterschangedConfig:>>>',filterschangedConfig);

			for(var i=0; i<1; i++) {

				if(prism.activeDashboard.filters.$$items[i].levels != null) { //this is for dependent filters

					for(var j=0; j<prism.activeDashboard.filters.$$items[i].levels.length - 1; j++) {

						console.log(prism.activeDashboard.filters.$$items[i].levels[j].dim);
						filterschangedConfig.dim = prism.activeDashboard.filters.$$items[i].levels[j].dim;
						filterschangedConfig.datasource = prism.activeDashboard.filters.$$items[i].levels[j].datasource;
						filterschangedConfig.title = prism.activeDashboard.filters.$$items[i].levels[j].datasource.title;
					}
				}
				else { //normal filters

					//defaultFilterConfig.dim =prism.activeDashboard.filters.$$items[i].jaql.dim;
				}

				console.log('filterschangedConfig.dim:>>>',filterschangedConfig.dim);
				var dimJaql = '{"dim": "' + filterschangedConfig.dim + '", "sort": "desc"}';
				var query = '{"datasource": ' + JSON.stringify(filterschangedConfig.datasource) + ', "metadata": [' + dimJaql + ']}';
				var url = '/api/datasources/' + filterschangedConfig.title + '/jaql';

				$.ajax({

					async:false,

					method: 'POST',

					url: url,

					data: query,

					success: function(result) {

						console.log('API Result Values:>>>',result)
						let arrayAllFilterValues = [];let arraySelectedFilterValues = [];

						for(var j=0; j<result.values.length; j++) {

							arrayAllFilterValues.push(result.values[j][0]);	
						}

						filterschangedConfig.regionValue = arrayAllFilterValues; 

						if(filterschangedConfig.filterType == 'exclude')
						{
							for(var d=0; d< arrayAllFilterValues.length; d++) {

								if(filterschangedConfig.inputValue.includes(arrayAllFilterValues[d].trim()) == false )
								{
									if(arrayRegionExcludeValue.includes(arrayAllFilterValues[d]) == false)
									{
										arraySelectedFilterValues.push(arrayAllFilterValues[d]);
									}
								}
							}												
							filterschangedConfig.mappedvalues = arraySelectedFilterValues;
						}
						console.log('filterschangedConfig:>>>',filterschangedConfig);

						console.log('filterschangedConfig.inputValue:>>>',filterschangedConfig.inputValue);								
						console.log('filterschangedConfig.filterType:>>>',filterschangedConfig.filterType);
						console.log('filterschangedConfig.mappedvalues:>>>',filterschangedConfig.mappedvalues);


						arrayregionMarketFilterIndex.forEach(function(FilterIndex) {	

							if(filterschangedConfig.filterType == "all")
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[0].filter = {

									explicit: true,

									all: true,

									multiSelection: true,

									userMultiSelect: true

								};
							}
							else if(filterschangedConfig.filterType == "exclude")						
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[0].filter = {

									explicit: true,

									members: filterschangedConfig.mappedvalues ,

									multiSelection: true,

									userMultiSelect: true

								};

							}
							else
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[0].filter = {

									explicit: true,

									members: filterschangedConfig.inputValue ,

									multiSelection: true,

									userMultiSelect: true

								};
							}
						});



					},

					contentType: "application/json; charset=utf-8",

					dataType: "json"

				});

			}

		}
		if(args.items[0].jaql.dim.trim() == "[Practice_TEST.Practice_Sort]" && args.items[0].jaql.datasource.title == 'Client P&L')
		{
			console.log('filterschangedConfig Practice Filter >>>>>>>>>>>>>>>>>>>>>>>>>>');
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',args);
			var selectedFilterValues = [];
			filterschangedConfig = {
				filterType:"",
				regionValue:"",
				marketvalues:"",
				dim :"",
				datasource:"",
				title:"",
				mappedvalues:""
			};
			console.log('filterschanged event:>>>',args);
			if(args.items[0].jaql.filter.hasOwnProperty('all') == true)
			{
				filterschangedConfig.filterType = "all";				
			}
			else if(args.items[0].jaql.filter.hasOwnProperty('exclude') == true)
			{
				for (var k=0; k<args.items[0].jaql.filter.exclude.members.length; k++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.exclude.members[k].trim()); 
				}
				filterschangedConfig.filterType = "exclude";
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			else
			{
				for (var l=0; l< args.items[0].jaql.filter.members.length; l++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.members[l].trim()); 
				}
				filterschangedConfig.filterType = "include";			
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			console.log('filterschangedConfig:>>>',filterschangedConfig);

			for(var i=5; i<6; i++) {

				if(prism.activeDashboard.filters.$$items[i].levels != null) { //this is for dependent filters

					for(var j=0; j<prism.activeDashboard.filters.$$items[i].levels.length - 1; j++) {
						//this is for dependent filters
					}
				}
				else { //normal filters

					filterschangedConfig.dim =prism.activeDashboard.filters.$$items[i].jaql.dim;
					filterschangedConfig.datasource = prism.activeDashboard.filters.$$items[i].jaql.datasource;
					filterschangedConfig.title = prism.activeDashboard.filters.$$items[i].jaql.datasource.title;
				}

				console.log('filterschangedConfig.dim:>>>',filterschangedConfig.dim);
				var dimJaql = '{"dim": "' + filterschangedConfig.dim + '", "sort": "desc"}';
				var query = '{"datasource": ' + JSON.stringify(filterschangedConfig.datasource) + ', "metadata": [' + dimJaql + ']}';
				var url = '/api/datasources/' + filterschangedConfig.title + '/jaql';

				$.ajax({

					async:false,

					method: 'POST',

					url: url,

					data: query,

					success: function(result) {

						console.log('API Result Values:>>>',result)
						let arrayAllFilterValues = [];let arraySelectedFilterValues = [];

						for(var j=0; j<result.values.length; j++) {

							arrayAllFilterValues.push(result.values[j][0]);	
						}

						filterschangedConfig.regionValue = arrayAllFilterValues; 

						if(filterschangedConfig.filterType == 'exclude')
						{
							for(var d=0; d< arrayAllFilterValues.length; d++) {

								if(filterschangedConfig.inputValue.includes(arrayAllFilterValues[d].trim()) == false )
								{
									if(arrayRegionExcludeValue.includes(arrayAllFilterValues[d]) == false)
									{
										arraySelectedFilterValues.push(arrayAllFilterValues[d]);
									}
								}
							}												
							filterschangedConfig.mappedvalues = arraySelectedFilterValues;
						}
						console.log('filterschangedConfig:>>>',filterschangedConfig);

						console.log('filterschangedConfig.inputValue:>>>',filterschangedConfig.inputValue);								
						console.log('filterschangedConfig.filterType:>>>',filterschangedConfig.filterType);
						console.log('filterschangedConfig.mappedvalues:>>>',filterschangedConfig.mappedvalues);


						arraypracticeFilterIndex.forEach(function(FilterIndex) {	

							if(filterschangedConfig.filterType == "all")
							{
								prism.activeDashboard.filters.$$items[FilterIndex].jaql.filter = {

									explicit: true,

									all: true,

									multiSelection: true,

									userMultiSelect: true

								};
							}
							else if(filterschangedConfig.filterType == "exclude")						
							{
								prism.activeDashboard.filters.$$items[FilterIndex].jaql.filter = {

									explicit: true,

									members: filterschangedConfig.mappedvalues ,

									multiSelection: true,

									userMultiSelect: true

								};

							}
							else
							{
								prism.activeDashboard.filters.$$items[FilterIndex].jaql.filter = {

									explicit: true,

									members: filterschangedConfig.inputValue ,

									multiSelection: true,

									userMultiSelect: true

								};
							}
						});



					},

					contentType: "application/json; charset=utf-8",

					dataType: "json"

				});

			}

		}
		if(args.items[0].jaql.dim == '[Geo_Region_KPIs.Market]' && args.items[0].jaql.datasource.title == 'Client P&L')
		{
			console.log('filterschangedConfig Region Filter >>>>>>>>>>>>>>>>>>>>>>>>>>');
			var selectedFilterValues = [];
			filterschangedConfig = {
				filterType:"",
				regionValue:"",
				marketvalues:"",
				dim :"",
				datasource:"",
				title:"",
				mappedvalues:""
			};
			console.log('filterschanged event:>>>',args);
			if(args.items[0].jaql.filter.hasOwnProperty('all') == true)
			{
				filterschangedConfig.filterType = "all";				
			}
			else if(args.items[0].jaql.filter.hasOwnProperty('exclude') == true)
			{
				for (var k=0; k<args.items[0].jaql.filter.exclude.members.length; k++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.exclude.members[k].trim()); 
				}
				filterschangedConfig.filterType = "exclude";
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			else
			{
				for (var l=0; l< args.items[0].jaql.filter.members.length; l++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.members[l].trim()); 
				}
				filterschangedConfig.filterType = "include";			
				filterschangedConfig.inputValue = selectedFilterValues;
			}
			console.log('filterschangedConfig:>>>',filterschangedConfig);

			for(var i=0; i<1; i++) {

				if(prism.activeDashboard.filters.$$items[i].levels != null) { //this is for dependent filters

					for(var j=1; j<prism.activeDashboard.filters.$$items[i].levels.length ; j++) {

						console.log(prism.activeDashboard.filters.$$items[i].levels[j].dim);
						filterschangedConfig.dim = prism.activeDashboard.filters.$$items[i].levels[j].dim;
						filterschangedConfig.datasource = prism.activeDashboard.filters.$$items[i].levels[j].datasource;
						filterschangedConfig.title = prism.activeDashboard.filters.$$items[i].levels[j].datasource.title;
					}
				}
				else { //normal filters

					//defaultFilterConfig.dim =prism.activeDashboard.filters.$$items[i].jaql.dim;
				}

				console.log('filterschangedConfig.dim:>>>',filterschangedConfig.dim);
				var dimJaql = '{"dim": "' + filterschangedConfig.dim + '", "sort": "desc"}';
				var query = '{"datasource": ' + JSON.stringify(filterschangedConfig.datasource) + ', "metadata": [' + dimJaql + ']}';
				var url = '/api/datasources/' + filterschangedConfig.title + '/jaql';

				$.ajax({

					async:false,

					method: 'POST',

					url: url,

					data: query,

					success: function(result) {

						console.log('API Result Values:>>>',result)
						let arrayAllFilterValues = [];let arraySelectedFilterValues = [];

						for(var j=0; j<result.values.length; j++) {

							arrayAllFilterValues.push(result.values[j][0]);	
						}

						filterschangedConfig.regionValue = arrayAllFilterValues; 

						if(filterschangedConfig.filterType == 'exclude')
						{
							for(var d=0; d< arrayAllFilterValues.length; d++) {

								if(filterschangedConfig.inputValue.includes(arrayAllFilterValues[d].trim()) == false )
								{
									if(arrayRegionExcludeValue.includes(arrayAllFilterValues[d]) == false)
									{
										arraySelectedFilterValues.push(arrayAllFilterValues[d]);
									}
								}
							}												
							filterschangedConfig.mappedvalues = arraySelectedFilterValues;
						}
						console.log('filterschangedConfig:>>>',filterschangedConfig);

						console.log('filterschangedConfig.inputValue:>>>',filterschangedConfig.inputValue);								
						console.log('filterschangedConfig.filterType:>>>',filterschangedConfig.filterType);
						console.log('filterschangedConfig.mappedvalues:>>>',filterschangedConfig.mappedvalues);


						arrayregionMarketFilterIndex.forEach(function(FilterIndex) {	

							if(filterschangedConfig.filterType == "all")
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[1].filter = {

									explicit: true,

									all: true,

									multiSelection: true,

									userMultiSelect: true

								};
							}
							else if(filterschangedConfig.filterType == "exclude")						
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[1].filter = {

									explicit: true,

									members: filterschangedConfig.mappedvalues ,

									multiSelection: true,

									userMultiSelect: true

								};

							}
							else
							{
								prism.activeDashboard.filters.$$items[FilterIndex].levels[1].filter = {

									explicit: true,

									members: filterschangedConfig.inputValue ,

									multiSelection: true,

									userMultiSelect: true

								};
							}
						});



					},

					contentType: "application/json; charset=utf-8",

					dataType: "json"

				});

			}

		}

		prism.activeDashboard.widgets.$$widgetsmap['632c83b9667e4e497ca344a4'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['632d6546667e4e497ca34571'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['632d6535667e4e497ca3456f'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['632d654f667e4e497ca34574'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['646cb31bf7febc37146b5f75'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['64674959afa2ae59d811686c'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['64663df9afa2ae59d8116702'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['64665bd4afa2ae59d8116751'].refresh();

		prism.activeDashboard.widgets.$$widgetsmap['64677d4cafa2ae59d8116c32'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['6467981bafa2ae59d8116ce7'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['646606f6afa2ae59d8116398'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['64674959afa2ae59d811686c'].refresh();


	}

});



dashboard.on('widgetprocessresult', function(el, args) 
			 { 
	console.log('------------Dashboard level widget process result -------------');

	// new styling script starts here
	
	// Styling | when filter panel is open or closed

	//var filterPaneIsOpen=$('div.global-filters').is(":visible");
	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .indicator-container').css("padding-left",filterPaneIsOpen? "196px":"217px");
	$('widget.widget[widgetid="650ad89402b82b0033c782f2"] .indicator-container').css("padding-right",filterPaneIsOpen? "32px":"66px");
	$('widget.widget[widgetid="650ad94402b82b0033c782fa"] .indicator-container').css("padding-right",filterPaneIsOpen? "116px":"146px");
	
	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	$('widget.widget[widgetid="632c83b9667e4e497ca344a4"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	$('widget.widget[widgetid="6319a4f9a4834b50a0d8ea68"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	$('widget.widget[widgetid="637c9fe3f6197e2bd4900501"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
    $('widget.widget[widgetid="632d6546667e4e497ca34571"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	$('widget.widget[widgetid="650ad89402b82b0033c782f2"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	$('widget.widget[widgetid="650ad94402b82b0033c782fa"] .widget-header--title-edited.ui-draggable-handle').css("display","none");
	
	//$('widget.widget[widgetid="632c83b9667e4e497ca344a4"] widget-header').hide();
	//$('widget.widget[widgetid="632d6546667e4e497ca34571"] widget-header').hide();

	$('div.dashboard-layout-cell.ui-resizable').eq(2).css('height','40px');
	$('div.dashboard-layout-cell.ui-resizable').eq(2).css('align-items','center');
	$('div.dashboard-layout-cell.ui-resizable').eq(2).css('overflow','hidden');
	$('div.dashboard-layout-cell.ui-resizable').eq(6).css('height','40px');
	$('div.dashboard-layout-cell.ui-resizable').eq(6).css('align-items','center');
	//$('div.dashboard-layout-cell.ui-resizable').eq(6).css('overflow','hidden');

	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .transput-caption.small.editable').css("font-weight", "bold");
	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .transput-caption.small.editable').css("color", "#080708");
	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .transput-caption.small.editable').css("font-size", "15px");
	$('widget.widget[widgetid="643fe31eda18bd1dfc8dc96d"] .transput-caption.small.editable').css("padding-left", "270px");
	

	//$('widget-toolbar').hide(); 

	// end here

	//$('.uc-checker-content span[title="NA"]').parents('.list-item').hide();
	//$('.uc-checker-content span[title="One-Time Expenses"]').parents('.list-item').hide();

	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .transput-caption.small.editable').css("font-weight", "bold");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .transput-caption.small.editable').css("color", "#080708");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .transput-caption.small.editable').css("font-size", "15px");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .transput-caption.small.editable').css("padding-left", "270px");	

	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .widget-title__holder.widget-title__holder--view.uneditable-title').css("font-weight", "bold");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .widget-title__holder.widget-title__holder--view.uneditable-title').css("color", "#080708");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .widget-title__holder.widget-title__holder--view.uneditable-title').css("font-size", "15px");
	$('widget.widget[widgetid="6440fd17da18bd1dfc8dcb9e"] .widget-title__holder.widget-title__holder--view.uneditable-title').css("padding-left", "270px");
	$('.dashboard-layout-cell-horizontal-divider').css("height", "0px");

	$('widget.widget[widgetid="6319a4f9a4834b50a0d8ea67"] .indicator-container').css("padding-right", "16px");

	$('widget.widget[widgetid="64463e1a4a55b138246e3afa"] .widget-header--title-edited').css("display","none");
	$('widget.widget[widgetid="64463e1a4a55b138246e3af2"] .widget-header--title-edited').css("display","none");
	$('widget.widget[widgetid="64463e1a4a55b138246e3af4"] .widget-header--title-edited').css("display","none");
	$('widget.widget[widgetid="64463e1a4a55b138246e3aee"] .widget-header--title-edited').css("display","none");
	$('widget.widget[widgetid="64463e1a4a55b138246e3af8"] .widget-header--title-edited').css("display","none");
	$('widget.widget[widgetid="64463e1a4a55b138246e3af4"] .widget-header--title-edited').css("display","none");

	$('widget.widget[widgetid="6532919902b82b0033c7d38c"]').hide(); 

	//$('widget.widget[widgetid=""]').each(function(){
	//	$(this).remove();
	//});
	console.log('------------Dashboard level widget process result End -------------');

});


dashboard.on('widgetready', function(sender, ev){ 

	console.log('------------Dashboard level widget ready result -------------');
	$('widget.widget[widgetid="646ca3f7f7febc37146b5ef8"] widget-header').css("background-color","lightgray"); 

	$('widget.widget[widgetid="646ca3f7f7febc37146b5ef8"] .widget-title__holder.widget-title__holder--view.uneditable-title').css("font-weight", "bold");
	$('widget.widget[widgetid="646ca3f7f7febc37146b5ef8"] .transput-caption.small.editable').css("font-weight", "bold");
	$('widget.widget[widgetid="646ca3f7f7febc37146b5ef8"]').css("height","30px");
	$('span.BloxRowTitle').css("color","darkslategray");
	console.log('------------Dashboard level widget process result End-------------');

}); 



//REST FILTERS ON PAGE LOAD


window.resetFilters = function(d) { 

	d.filters.clear(); 
	console.log('>>>>>>>>reset filters<<<<<<<<<<<<<');
	d.defaultFilters.forEach(function(filter, index){ 
		if(index != d.defaultFilters.length - 1){ 
			d.filters.update(filter,{
				save:true, 
				refresh:false, 
				unionIfSameDimensionAndSameType:true
			});
		} 
		else{//Only refresh dashboard on the last filter
			d.filters.update(filter,{
				save:true, 
				refresh:true, 
				unionIfSameDimensionAndSameType:true
			});
		} 
	});

};

dashboard.on('initialized', function(d, args) {

	resetFilters(prism.activeDashboard);

}
			);


