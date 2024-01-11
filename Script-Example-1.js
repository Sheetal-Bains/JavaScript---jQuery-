
var userFilterMapping = [['Ed.Savage@buck.com',['REG_      USA Central']],['harpreet.singh@buck.com',['MKT_Pittsburgh']],['Paramvir.Singh@buck.com',['GEO_      US']],['hardik.arora@buck.com',['MKT_Atlanta']],['Team1B@buck.com',['MKT_Philadelphia']]]; 

//var userFilterMapping = [['TeamB@buck.com',['REG_      USA Central']],['harpreet.singh@buck.com',['MKT_Pittsburgh']],['TeamB2@buck.com',['GEO_      US']],['hardik.arora@buck.com',['MKT_Atlanta']],['TeamB1@buck.com',['MKT_Philadelphia']]]; 
var userFilterMappingIndex = [['GEO',['12']],['REG',['13']],['MKT',['14']]];

var TimeFrameValue = {
	value:""
}
var TimeFrameForRevenue = {
	value:""
}

var widgetSelection = {
	filterType: "",
	dim:""
}

var custom_JQL = {
	"explicit": true,
	"multiSelection": true,
	"members":[]
}

dashboard.on('initialized', function(d, args) {

	for(var i=0; i < userFilterMapping.length; i++) {
		for(var j=0; j < userFilterMapping[i].length; j++) {

			if(userFilterMapping[i][j] == prism.user.userName)
			{
				var mappedValues = userFilterMapping[i][1][0].split("_");
				if(mappedValues[0] == 'GEO' )
				{
					const market_filter = [];
					market_filter.push(mappedValues[1])
					custom_JQL.members =  market_filter
					prism.activeDashboard.filters.$$items[12].jaql.filter = custom_JQL;
				}
				if(mappedValues[0] == 'REG' )
				{
					const market_filter = [];
					market_filter.push(mappedValues[1])
					custom_JQL.members =  market_filter
					prism.activeDashboard.filters.$$items[13].jaql.filter = custom_JQL;
				}				
				if(mappedValues[0] == 'MKT' )
				{
					const market_filter = [];
					market_filter.push(mappedValues[1])
					custom_JQL.members =  market_filter
					prism.activeDashboard.filters.$$items[14].jaql.filter = custom_JQL;
				}				
			}
		}
	}
});


dashboard.on('filterschanged', (el, args) => {

	var options = {
		save: true,
		refresh: false,
		unionIfSameDimensionAndSameType:false
	};

	widgetSelection = {
		filterType: "",
		dim:""
	};

	if(args.items[0].jaql.dim == '[CustomOpportunityInformation.Bookings All]')
	{
		var filterType	= args.items[0].jaql.filter.members[0];		
		prism.activeDashboard.widgets.$$widgetsmap['6527d9c602b82b0033c7b486'].title =   filterType + ' By Specialization' ; 
		prism.activeDashboard.widgets.$$widgetsmap['63483f84f153824054efc238'].title =   filterType + ' Bookings By  Opportunity' ;
	}

	if(args.reason == 'widgetSelection' && args.items[0].jaql.dim  == '[CustomOpportunityInformation.Specialization]')
	{
		widgetSelection = {
			filterType: args.reason,
			dim:args.items[0].jaql.dim
		}
	}

	if(args.items[0].jaql.dim == '[CustomOpportunityInformation.CloseDate (Calendar)]')
	{	
		console.log('time frame -->',args);
		TimeFrameValue = {
			value:""
		}
		if(args.items[0].jaql.filter.hasOwnProperty('next') == true)
		{
			if(args.items[0].jaql.filter.next.count == 4 && args.items[0].jaql.filter.next.offset == 0)
			{
				TimeFrameValue.value = 'This & Next 3 Quarters';
			}
			if(args.items[0].jaql.filter.next.count == 3 && args.items[0].jaql.filter.next.offset == 0)
			{
				TimeFrameValue.value = 'This & Next 2 Years';
			}
			if(args.items[0].jaql.filter.next.count == 2 && args.items[0].jaql.filter.next.offset == 0)
			{
				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'This & Next Year';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'This & Next Quarter';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'This & Next Month';
				}
			}
			if(args.items[0].jaql.filter.next.count == 1 && args.items[0].jaql.filter.next.offset == 1)
			{

				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'Next Year';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'Next Quarter';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'Next Month';
				}
			}
			if(args.items[0].jaql.filter.next.count == 2 && args.items[0].jaql.filter.next.offset == 1)
			{

				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'Next 2 Years';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'Next 2 Quarters';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'Next 2 Months';
				}
			}

		}
		else
		{
			if(args.items[0].jaql.filter.last.count == 1 && args.items[0].jaql.filter.last.offset == 4)
			{
				TimeFrameValue.value = '4 Quarters Ago';
			}
			if(args.items[0].jaql.filter.last.count == 1 && args.items[0].jaql.filter.last.offset == 2)
			{
				TimeFrameValue.value = '2 Years Ago';
			}
			if(args.items[0].jaql.filter.last.count == 3 && args.items[0].jaql.filter.last.offset == 0)
			{
				TimeFrameValue.value = 'This & Last 2 Years';
			}
			if(args.items[0].jaql.filter.last.count == 4 && args.items[0].jaql.filter.last.offset == 0)
			{
				TimeFrameValue.value = 'This & Last 3 Quarters';
			}

			if(args.items[0].jaql.filter.last.count == 1 && args.items[0].jaql.filter.last.offset == 3)
			{
				TimeFrameValue.value = '3 Months Ago';
			}
			if(args.items[0].jaql.filter.last.count == 2 && args.items[0].jaql.filter.last.offset == 1)
			{
				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'Last 2 Years';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'Last 2 Quarters';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'Last 2 Months';
				}
			}
			if(args.items[0].jaql.filter.last.count == 1 && args.items[0].jaql.filter.last.offset == 1)
			{

				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'Last Year';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'Last Quarter';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'Last Month';
				}
			}
			if(args.items[0].jaql.filter.last.count == 1 && args.items[0].jaql.filter.last.offset == 0)
			{
				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'This Year';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'This Quarter';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'This Month';
				}


			}
			if(args.items[0].jaql.filter.last.count == 2 && args.items[0].jaql.filter.last.offset == 0)
			{

				if(args.items[0].jaql.level == 'years')
				{
					TimeFrameValue.value = 'This & Last Year';
				}
				if(args.items[0].jaql.level == 'quarters')
				{
					TimeFrameValue.value = 'This & Last Quarter';
				}
				if(args.items[0].jaql.level == 'months')
				{
					TimeFrameValue.value = 'This & Last Month';
				}
			}
		}
	}
});




dashboard.on('widgetprocessresult', function(el, args){ 

	$('.filter-widget-wrapper .filter-widget-dropdown li a').css("color","black");

	if(args.widget.oid == '643fa41c791f933b74fd44fa' && widgetSelection.dim == '[CustomOpportunityInformation.Specialization]')
	{			
		var industryfilter = 	{
			"explicit": true,
			"multiSelection": true,
			"members": args.result.xAxis.categories,
		}

		//prism.activeDashboard.filters.$$items[9].jaql.filter 
		prism.activeDashboard.filters.$$items[9].levels[2].filter= industryfilter;
		
		prism.activeDashboard.widgets.$$widgetsmap['63485b397aab7e15e4b2046b'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['636e1bcde7b16e4644df8a3e'].refresh();
		prism.activeDashboard.widgets.$$widgetsmap['64e3168f02b82b0033c73308'].refresh()
	}
	if(args.widget.oid == '64e5cbdf02b82b0033c739ea') 
	{
		const revneueMaxYTD = new Date(args.result.rowsTreeService.columns[0][0].value);	
		TimeFrameForRevenue.value = revneueMaxYTD.toString().substring(4,16).replace('01 ','');
	}
});

dashboard.on('widgetready', function(sender, ev){ 

	$('widget.widget[widgetid="634d743190d4fd292083af95"] widget-header').css("background-color","#f5f6f7").css("color","#25383C").css("font-weight","bold").css("font-family","Open Sans");
	$('widget.widget[widgetid="634d743190d4fd292083af95"] widget-title').css("font-size","14px");
	$('widget.widget[widgetid="645df3a628b6f13380d06f7e"] widget-header').css("background-color","#f5f6f7").css("color","#25383C").css("font-weight","bold").css("font-family","Open Sans");
	$('widget.widget[widgetid="645df3a628b6f13380d06f7e"] widget-title').css("font-size","14px");
	$('span.smartLabelRowTitle').css("color","darkslategray");
	$('.filter-widget-wrapper').css("color","black").css("width","230px").css("margin","2px auto").css("background","ghostwhite").css("border","1px solid gray").css('text-align','center');
	$('.filter-widget-wrapper.active .filter-widget-dropdown li a').css("color","black !important");
	$('.filter-widget-wrapper .filter-widget-dropdown li a').css("color","black");

	/*Smart Label CSS */
	$('widget.widget[widgetid="637de37d1f52422bd00ea534"] .smartLabelContainer').css("font-size","10pt");
	$('widget.widget[widgetid="637de37d1f52422bd00ea534"] .smartLabelContainer').find('span:gt(0):last').html(TimeFrameValue.value);
	$('widget.widget[widgetid="64e3168f02b82b0033c73308"] .smartLabelContainer').find('span:gt(0):last').html(TimeFrameForRevenue.value);
	$('span.smartLabelRowValues').css("color","#eb3e6d");
	$('span.smartLabelRowTitle').css("color","black");

	$('widget.widget[widgetid="64e5cbdf02b82b0033c739ea"]').css("display","none");
	
	$('widget.widget[widgetid="6530054e02b82b0033c7cca1"]').css("display","none");
	$('widget.widget[widgetid="65300c6a02b82b0033c7ccc9"]').css("display","none");
	$('widget.widget[widgetid="65300b0502b82b0033c7ccbd"]').css("display","none");
	$('widget.widget[widgetid="65300b9f02b82b0033c7ccc3"]').css("display","none");

	$('widget.widget[widgetid="651c31fce2c3f8003331fb21"] widget-header').css("background-color","#f5f6f7").css("color","#25383C").css("font-size","14px").css("font-weight","bold").css("font-family","Open Sans");
	$('widget.widget[widgetid="651c31fce2c3f8003331fb21"] widget-title').css("font-size","14px");

	/*Filter CSS*/
	/*	$('span.ew-i-caption').css("font-weight","bold").css("font-size","10pt").css("color","black").css("font-family","Open Sans");
	$('span.filters-title').css("font-weight","bold").css("font-size","14pt").css("color","black").css("font-family","Open Sans");
	$('.uc-mini-collapsed').css("color","navy");
	$('.sis-scope .uc-tagline-content .uc-tag').css("font-weight","bold").css("font-size","10pt").css("color","navy").css("font-family","Open Sans").css("background-color","#f0d8ec");//#fcf2fb
	*/

});

