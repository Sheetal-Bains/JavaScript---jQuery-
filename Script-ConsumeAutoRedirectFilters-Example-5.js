/*
Welcome to your Dashboard's Script.

To learn how you can access the Widget and Dashboard objects, see the online documentation at https://developer.sisense.com/pages/viewpage.action?pageId=557127
*/
var geoUSA	= '      US'; 
var geoUK	= '     UK'; 
var geoCAN	= '    CA';

var GlobalPractice	= '      Wealth';

var customGeofilterjson = {
	"explicit": true,
	"multiSelection": true,
	"members": []
};
var customAllGeo = {
	"explicit": false,
	"multiSelection": true,
	"all": true
};

var customGlobalPracticefilterjson = {
	"explicit": true,
	"multiSelection": true,
	"members": []
};

var defaultFilterConfig = {

	dim1: "[HeaderMaxDate.Maxdate]",       // Dimensions of header date [ HEADER DATE FILTER ]
	dim2: "[DistinctDates.MonthNameSort]"     // Dimensions of month       [ MONTHS FILTER ]  

};

var valueExculded="N\\A";  // Value excluded from month array       [ Background FILTER exclusion ]


var defualtFilters = {

	maxDate : ""
};

var defaultFilterConfigCalendar = {

	dim1: defaultFilterConfig.dim1.replace("]", " (Calendar)]")

};

var monthFilterArray=[]


dashboard.on('initialized', function(d,args){    
	
		//************* Auto month filter ********************

	console.log('initialized month started ' , args)

	//print out all dimensions

	var indexForMonthFilter=0    // Index for month filter                  [ Generic method ]

	for(var i=0; i<args.dashboard.filters.$$items.length; i++) {
		if(args.dashboard.filters.$$items[i].levels != null) {

			//this is for dependent filters
			/*
			for(var j=0; j<args.dashboard.filters.$$items[i].levels.length; j++) {
				console.log(args.dashboard.filters.$$items[i].levels[j].dim);
			}
			*/
			indexForMonthFilter=indexForMonthFilter+1;
		}
		else {

			//normal filters

			if(args.dashboard.filters.$$items[i].jaql.dim!=defaultFilterConfig.dim2)
				indexForMonthFilter=indexForMonthFilter+1;
			else{
				console.log(">>>>>> index >>>>>>>>>",indexForMonthFilter)
				break;
			}
		}
	}


	// Initilizing the Months from Table

	var dimJaql = '{"dim": "' + defaultFilterConfig.dim2 + '", "sort": "desc"}';

	var query = '{"datasource": ' + JSON.stringify(args.dashboard.datasource) + ', "metadata": [' + dimJaql + ']}';

	var url = '/api/datasources/' + args.dashboard.datasource.title + '/jaql';

	$.ajax({

		async:false,

		method: 'POST',

		url: url,

		data: query,

		success: function(result) {

			console.log(">>>>>>>>>>>> result month >>>>>>",result)
			//find the date that is most up to date based on today

			for(var x=0; x<result.values.length; x++) {
				if(result.values[x] !=valueExculded){
					var element = result.values[x]
					monthFilterArray.push(element[0])
				}
			}
		},

		contentType: "application/json; charset=utf-8",

		dataType: "json"

	});

	//query the filter dimension to retrieve all members sorted descending

	var dimJaql = '{"dim": "' + defaultFilterConfig.dim1 + '", "sort": "desc"}';

	var query = '{"datasource": ' + JSON.stringify(args.dashboard.datasource) + ', "metadata": [' + dimJaql + ']}';

	var url = '/api/datasources/' + args.dashboard.datasource.title + '/jaql';

	$.ajax({

		async:false,

		method: 'POST',

		url: url,

		data: query,

		success: function(result) {

			console.log(">>>>>>>>>>>> result >>>>>>",result)
			//find the date that is most up to date based on today

			for(var x=0; x<result.values.length; x++) {

				if(result.values[x][0].substring(0,10) <= (new Date()).toUTCString().substring(0,10)) {

					break;
				}
			}

			for(var i=0; i<args.dashboard.filters.$$items.length; i++) {

				console.log('check >>>',args.dashboard.filters.$$items[i].jaql.dim);
				console.log('check >>>',defaultFilterConfigCalendar.dim1);

				if(args.dashboard.filters.$$items[i].levels != null) { //this is for dependent filters

					for(var j=0; j<args.dashboard.filters.$$items[i].levels.length; j++) {

						if(defaultFilterConfigCalendar.dim1 === args.dashboard.filters.$$items[i].levels[j].dim) {

							args.dashboard.filters.$$items[i].levels[j].filter = {

								explicit: true,

								members:[result.values[x][0]],

								multiSelection: false,

								userMultiSelect: false

							};
						}
					}
				}

				else if(defaultFilterConfigCalendar.dim1 == args.dashboard.filters.$$items[i].jaql.dim) { //this is for normal filters         

					defualtFilters.maxDate = convertDateFormate(result.values[x][0]);
					var monthForFilter=convertMonth(result.values[x][0])

					args.dashboard.filters.$$items[i].jaql.filter = {

						explicit: true,

						members:[result.values[x][0]],

						multiSelection: false,

						userMultiSelect: false

					};


					args.dashboard.filters.$$items[indexForMonthFilter].jaql.filter = {

						explicit: true,

						members:monthFilterArray.reverse().slice(0,monthForFilter),                              // reverse month filter

						multiSelection: true,

						//			filter:{explicit:false, multiSelection:true, exclude:{members:[valueExculded]}}

					};

					args.dashboard.defaultFilters[indexForMonthFilter].jaql.filter={

						explicit: true,

						members:monthFilterArray.slice(0,monthForFilter),                                       // reset Filter 

						multiSelection: true,

						//				filter:{explicit:false, multiSelection:true, exclude:{members:[valueExculded]}}

					};
				}

			}

		},

		contentType: "application/json; charset=utf-8",

		dataType: "json"
	});
	console.log('initialized month end ');

	
	//Resets filters to default when dashboard is first loaded (or refreshed)

	//resetFilters(prism.activeDashboard); //Resets filters
	console.log('---dashboard initialized Start -----');


	var dashboardURL = window.location.href;	
	var dashboardURLfiltersvalue = dashboardURL.split("?",2)[1];		
	var Geofiltervalue = dashboardURLfiltersvalue.split("=",2)[1];
	console.log(dashboardURLfiltersvalue);
	console.log(Geofiltervalue);
	var regexexp = /,/;			
	if(regexexp.test(Geofiltervalue) ==false)
	{
		console.log('for single select filters');			
		var Geofilter = Geofiltervalue.split("&",1)[0]
		var GlobalPracticeFilter = Geofiltervalue.split("&",2)[1]
		console.log(Geofilter);
		console.log(GlobalPracticeFilter);
		if(Geofilter == 'includeall')
		{
			prism.activeDashboard.filters.$$items[2].jaql.filter = customAllGeo;
		}
		else
		{
			FilterOnGeoSelection(Geofilter,GlobalPracticeFilter);
		}

	}
	if(regexexp.test(Geofiltervalue) ==true)
	{
		console.log('for multiselect filters');
		var GlobalPracticeFilter = Geofiltervalue.split("&",2)[1]
		console.log(Geofiltervalue);
		FilterOnMultiGeoSelection(Geofiltervalue,GlobalPracticeFilter);
		console.log('for multiselect filters Ends');
	}

	console.log('---dashboard initialized End -----');

});

function FilterOnGeoSelection(Geofiltervalue,PracticeFilter)
{
	console.log('-----Inside FilterOnGeoSelection---');
	if(Geofiltervalue =='USA')
	{
		console.log('-----Inside FilterOnGeoSelection USA--');
		customGeofilterjson.members[0] =  geoUSA;
		prism.activeDashboard.filters.$$items[2].jaql.filter = customGeofilterjson;//change filter index according to filter number
		if(PracticeFilter =='Wealth')
		{
			console.log('-----Inside FilterOnGeoSelection Wealth--');
			customGlobalPracticefilterjson.members[0] =  GlobalPractice;
			prism.activeDashboard.filters.$$items[4].jaql.filter = customGlobalPracticefilterjson; //change filter index according to filter number
		}
	}
	if(Geofiltervalue =='UK')
	{
		console.log('-----Inside FilterOnGeoSelection UK--');
		customGeofilterjson.members[0] =  geoUK;		
		prism.activeDashboard.filters.$$items[2].jaql.filter = customGeofilterjson;//change filter index according to filter number
		if(PracticeFilter =='Wealth')
		{
			console.log('-----Inside FilterOnGeoSelection Wealth--');
			customGlobalPracticefilterjson.members[0] =  GlobalPractice;
			prism.activeDashboard.filters.$$items[4].jaql.filter = customGlobalPracticefilterjson;//change filter index according to filter number
		}
	}
	if(Geofiltervalue =='CAN')
	{
		console.log('-----Inside FilterOnGeoSelection CAN--');
		customGeofilterjson.members[0] =  geoCAN;		
		prism.activeDashboard.filters.$$items[2].jaql.filter = customGeofilterjson;//change filter index according to filter number
		if(PracticeFilter =='Wealth')
		{
			console.log('-----Inside FilterOnGeoSelection Wealth--');
			customGlobalPracticefilterjson.members[0] =  GlobalPractice;
			prism.activeDashboard.filters.$$items[4].jaql.filter = customGlobalPracticefilterjson;//change filter index according to filter number
		}

	}
}


function FilterOnMultiGeoSelection(Geofiltervalue,PracticeFilter)
{
	let GeofilterArray  	= Geofiltervalue.split(',') ;
	var scopeGeoMembers = [];
	var customMultiGeofilterjson = {
		"explicit": true,
		"multiSelection": true,
		"members": scopeGeoMembers
	};
	console.log(GeofilterArray);
	for (let i = 0; i <= GeofilterArray.length; i++)
	{
		console.log('--------------INSIDE FOR LOOP----------');
		scopemultigeoMembers = GeofilterArray[i];
		if(scopemultigeoMembers =='CAN')
		{
			scopeGeoMembers.push(geoCAN);

		}
		if(scopemultigeoMembers =='UK')
		{
			scopeGeoMembers.push(geoUK);

		}
		if(scopemultigeoMembers =='USA')
		{
			scopeGeoMembers.push(geoUSA);

		}
		console.log('--------------INSIDE FOR LOOP END----------');
	}
	prism.activeDashboard.filters.$$items[2].jaql.filter = customMultiGeofilterjson;//change filter index according to filter number

}

dashboard.on('widgetready', function(sender, ev){ 

	console.log('------------inside widget ready result -------------');

	$('widget.widget[widgetid="5f33863b971e58317c4e4f1f"]').find('tr').each (function() {
		var currentRow=$(this).closest("tr");
		var col1=currentRow.find("td:eq(0)").text();

		if(col1 == '  Support')
		{   
			$(currentRow).find('td:eq(4)').each (function() {
			 
				$(this).css('visibility', 'hidden');
			
			}); 
		}                  
	}); 

	$('widget.widget[widgetid="5f33a985971e58317c4e50af"]').find('tr').each (function() {
		var currentRow=$(this).closest("tr");
		var col1=currentRow.find("td:eq(0)").text();

		if(col1 == '  Support')
		{
			$(currentRow).find('td:eq(4)').each (function() {
			
				$(this).css('visibility', 'hidden');
			}); 
			
			$(currentRow).find('td:eq(7)').each (function() {
			
				$(this).css('visibility', 'hidden');
			}); 
		}                  
	}); 	

	$('widget.widget[widgetid="5f33acd3971e58317c4e5107"]').find('tr').each (function() {
		var currentRow=$(this).closest("tr");
		var col1=currentRow.find("td:eq(0)").text();

		if(col1 == '  Support')
		{ 
			$(currentRow).find('td:eq(4)').each (function() {				
				$(this).css('visibility', 'hidden');
				
			}); 
		}                  
	}); 
	
	$('widget.widget[widgetid="5fc8a58abf53472afc838ad0"]').find('tr').each (function() {
		var currentRow=$(this).closest("tr");
		var col1=currentRow.find("td:eq(0)").text();
		var colGeo=currentRow.find("td:eq(1)").text();
	
		if(colGeo != null)		
		{			
			$(currentRow).find('td:eq(5)').each (function() {
				$(this).css('visibility', 'visible');
			});
			var nextRow=$(this).closest("tr").next();
			var nextToNextRow=$(this).closest("tr").next().next();
			
			$(nextToNextRow).find('td:eq(4)').each (function() {
				$(this).css('visibility', 'visible');
			});	
		}
		if(col1 == '  Support')
		{
			var nextRow=$(this).closest("tr").next();
			var nextToNextRow=$(this).closest("tr").next().next();

			var col2=nextRow.find("td:eq(0)").text();
			var col3=nextToNextRow.find("td:eq(0)").text();
			$(currentRow).find('td:eq(5)').each (function() {
				$(this).css('visibility', 'hidden');
			}); 
			
			$(currentRow).find('td:eq(8)').each (function() {
				$(this).css('visibility', 'hidden');
			}); 
			if(col2 !='Grand Total')
			{
				$(nextRow).find('td:eq(4)').each (function() {
					$(this).css('visibility', 'hidden');
				}); 
				
				$(nextRow).find('td:eq(7)').each (function() {
				$(this).css('visibility', 'hidden');
				}); 
			}
			if(col3 !='  Support Total')
			{
				$(nextToNextRow).find('td:eq(4)').each (function() {
					$(this).css('visibility', 'hidden');
				});
				
				$(nextToNextRow).find('td:eq(7)').each (function() {
					$(this).css('visibility', 'hidden');
				});
				
			}	
		}	
		
	}); 
	
	$('widget.widget[widgetid="5fc8a33c8d128c0e24f7cb26"]').find('tr').each (function() {
		var currentRow=$(this).closest("tr");
		var col1=currentRow.find("td:eq(0)").text();
		var colGeo=currentRow.find("td:eq(1)").text();

		if(colGeo != null)		
		{			
			$(currentRow).find('td:eq(5)').each (function() {
				$(this).css('visibility', 'visible');
			});
			var nextRow=$(this).closest("tr").next();
			var nextToNextRow=$(this).closest("tr").next().next();

			$(nextToNextRow).find('td:eq(4)').each (function() {
				$(this).css('visibility', 'visible');
			});	
			
			
		}
		if(col1 == '  Support')
		{
			var nextRow=$(this).closest("tr").next();
			var nextToNextRow=$(this).closest("tr").next().next();

			var col2=nextRow.find("td:eq(0)").text();
			var col3=nextToNextRow.find("td:eq(0)").text();
			
			$(currentRow).find('td:eq(5)').each (function() {
				$(this).css('visibility', 'hidden');
			}); 
			
		    $(currentRow).find('td:eq(8)').each (function() {
				$(this).css('visibility', 'hidden');
			}); 
			
			if(col2 !='Grand Total')
			{
				$(nextRow).find('td:eq(4)').each (function() {
					$(this).css('visibility', 'hidden');
				}); 
				
				$(nextRow).find('td:eq(7)').each (function() {
					$(this).css('visibility', 'hidden');
				}); 
			}
			if(col3 !='  Support Total')
			{	$(nextToNextRow).find('td:eq(4)').each (function() {
					$(this).css('visibility', 'hidden');
				}); 
			 $(nextToNextRow).find('td:eq(7)').each (function() {
					$(this).css('visibility', 'hidden');
				}); 
			}
		}	

	});
   $('widget.widget[widgetid="5f33863b971e58317c4e4f1f"]').find('tr').each (function() {
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text();

 

        if(col1 == '  Support')
        { 
            $(currentRow).find('td:eq(7)').each (function() {                
                $(this).css('visibility', 'hidden');

            }); 

       
        }                  
    }); 
	
	
	
});


function convertDateFormate(dateValue) {
	var date = new Date(dateValue),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	return [ mnth,day,date.getFullYear().toString().substr(-2)].join("/");
}

function convertMonth(dateValue) {
	var date = new Date(dateValue);
	month = (date.getMonth() + 1)

	return month.toString();
}



