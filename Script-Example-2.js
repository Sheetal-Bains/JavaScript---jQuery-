
dashboard.on('widgetready', function(w, args) 
{ 
	var arrayClientName = [];var arrayRevenueDirections = [];var arrayPipelineDirections = [];
	var YOYRevenueIncreasePipelineLessThen100K = [];
	var YOYRevenueIncreasePipelineGreaterThen100K = [];
	var YOYRevenueDecreasePipelineLessThen100K = [];
	var YOYRevenueDecreasePipelineGreaterThen100K = [];
	var ClientName = '';var RevenueDirections='';var PipelineDirections ='';
	
	var custom_filterValues	= {
								"explicit": true,
								"multiSelection": true,
								"members": []
							  }
	
	if(args.widget.title =='Top 25 Clients')
	{					
		var Top25ClientsList = [];
		var count = 0 ;	
		$("tbody.table-grid__tbody tr").each(function() {
			var arrayOfThisRow = [];
			if(count <=25)	
			{
				var tableData = $(this).find('td');
				if (tableData.length > 0) {
					tableData.each(function() { arrayOfThisRow.push($(this).text()); });
					Top25ClientsList.push(arrayOfThisRow);
				}
			}
			count = count+1
		});
		console.log(Top25ClientsList);
		
		for (let index = 0; index < Top25ClientsList.length; index++) {
			arrayClientName.push(Top25ClientsList[index][0])
			arrayRevenueDirections.push(Top25ClientsList[index][1])
			arrayPipelineDirections.push(Top25ClientsList[index][2])
						
		}
		
		for (let i = 0; i < arrayPipelineDirections.length; i++) {
			var pipelineDirection =  arrayPipelineDirections[i];
			var revenueDirection =  arrayRevenueDirections[i];
			var clientName =  arrayClientName[i];
			
			if( pipelineDirection == 'Greater than 100K' && revenueDirection == 'Increase' )
			{
				YOYRevenueIncreasePipelineGreaterThen100K.push(clientName);
			}
			if( pipelineDirection == 'Less than 100K' && revenueDirection == 'Increase' )
			{
				YOYRevenueIncreasePipelineLessThen100K.push(clientName);
			}
			if( pipelineDirection == 'Greater than 100K' && revenueDirection == 'Decrease' )
			{
				YOYRevenueDecreasePipelineGreaterThen100K.push(clientName);
			}
			if( pipelineDirection == 'Less than 100K' && revenueDirection == 'Decrease' )
			{
				YOYRevenueDecreasePipelineLessThen100K.push(clientName);
			}
		}
		
		console.log('--Autofill Table--')
        if (YOYRevenueDecreasePipelineLessThen100K.length === 0) { YOYRevenueDecreasePipelineLessThen100K.push("") }
		custom_filterValues	= {
									"explicit": true,
									"multiSelection": true,
									"members": YOYRevenueDecreasePipelineLessThen100K
								  }
		
		prism.activeDashboard.widgets.$$widgetsmap['638e5625fb65332b0c2f9c2d'].metadata.panels[3].items[1].jaql.filter = custom_filterValues;
		prism.activeDashboard.widgets.$$widgetsmap['638e5625fb65332b0c2f9c2d'].refresh();
		if (YOYRevenueDecreasePipelineGreaterThen100K.length === 0) { YOYRevenueDecreasePipelineGreaterThen100K.push("") }
		custom_filterValues	= {
								"explicit": true,
								"multiSelection": true,
								"members": YOYRevenueDecreasePipelineGreaterThen100K
							  }
		prism.activeDashboard.widgets.$$widgetsmap['638f38a4fb65332b0c2fa40f'].metadata.panels[3].items[1].jaql.filter = custom_filterValues;
		prism.activeDashboard.widgets.$$widgetsmap['638f38a4fb65332b0c2fa40f'].refresh();
		if (YOYRevenueIncreasePipelineGreaterThen100K.length === 0) { YOYRevenueIncreasePipelineGreaterThen100K.push("") }
		custom_filterValues	= {
								"explicit": true,
								"multiSelection": true,
								"members": YOYRevenueIncreasePipelineGreaterThen100K
							  }
		prism.activeDashboard.widgets.$$widgetsmap['638efaddfb65332b0c2f9f28'].metadata.panels[3].items[1].jaql.filter = custom_filterValues;
		prism.activeDashboard.widgets.$$widgetsmap['638efaddfb65332b0c2f9f28'].refresh();
		if (YOYRevenueIncreasePipelineLessThen100K.length === 0) { YOYRevenueIncreasePipelineLessThen100K.push("") }
		custom_filterValues	= {
								"explicit": true,
								"multiSelection": true,
								"members": YOYRevenueIncreasePipelineLessThen100K
							  }
		prism.activeDashboard.widgets.$$widgetsmap['638f3896fb65332b0c2fa40d'].metadata.panels[3].items[1].jaql.filter = custom_filterValues;
		prism.activeDashboard.widgets.$$widgetsmap['638f3896fb65332b0c2fa40d'].refresh();	
		console.log('--Autofill Table End --')
		
		console.log('--Autofill NetPipeline , Revenue, YOY Revenue Start --')
		custom_filterValues	= {
									"explicit": true,
									"multiSelection": true,
									"members": arrayClientName
								  }
		prism.activeDashboard.widgets.$$widgetsmap['6398d905633b6b4554903db3'].metadata.panels[4].items[0].jaql.filter = custom_filterValues;
		prism.activeDashboard.widgets.$$widgetsmap['6398da48633b6b4554903dbd'].metadata.panels[4].items[0].jaql.filter = custom_filterValues;	
		
	
		prism.activeDashboard.widgets.$$widgetsmap['6398d905633b6b4554903db3'].refresh();	
		prism.activeDashboard.widgets.$$widgetsmap['6398da48633b6b4554903dbd'].refresh();
		
		prism.activeDashboard.widgets.$$widgetsmap['638e5625fb65332b0c2f9c2d'].refresh();	
		prism.activeDashboard.widgets.$$widgetsmap['638f38a4fb65332b0c2fa40f'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['638efaddfb65332b0c2f9f28'].refresh();	
		prism.activeDashboard.widgets.$$widgetsmap['638f3896fb65332b0c2fa40d'].refresh();
		
		
		
		console.log('--Autofill NetPipeline , Revenue, YOY Revenue End --')
	 }
	
	$('widget.widget[widgetid="638e5625fb65332b0c2f9c2d"] g.highcharts-axis-labels.highcharts-xaxis-labels tspan').css("font-size","8px");
	$('widget.widget[widgetid="638f38a4fb65332b0c2fa40f"] g.highcharts-axis-labels.highcharts-xaxis-labels tspan').css("font-size","8px");
	$('widget.widget[widgetid="638efaddfb65332b0c2f9f28"] g.highcharts-axis-labels.highcharts-xaxis-labels tspan').css("font-size","8px");
	$('widget.widget[widgetid="638f3896fb65332b0c2fa40d"] g.highcharts-axis-labels.highcharts-xaxis-labels tspan').css("font-size","8px");

	
}); 

dashboard.on('widgetprocessresult', function(el, args){ 

	console.log('------------inside widget dashboard process result -------------');
	console.log(args);
		$('widget.widget[widgetid=""]').each(function(){
				$(this).remove();
		});
	

});
	