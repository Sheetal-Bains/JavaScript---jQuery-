// Remvoe the vertical lines

dashboard.on('widgetready', function(sender, ev){ 
	//$('.dashboard-layout-cell-horizontal-divider') 
	//.css('background-color','#ffffff')
	$('.dashboard-layout-subcell-vertical-divider') 
		.css('background-color','#ffffff')
});

dashboard.on('filterschanged', (el, args) => {
	console.log('----- filterschanged -----');
	console.log(args);
	var options = {
		save: true,
		refresh: false,
		unionIfSameDimensionAndSameType:false
	};

	if(args.type == 'update')
	{	

		var Geo_Final_MDM = ['      US', '     UK', '    CA'];
		var Practice_tbl = ['      Wealth', '     Health', '    Engagement', '   Outsourcing', '  Support', 'NA', 'N\\A', 'One-Time Expenses'];
		var Region_Final_MDM = ['         USA Central', '        USA Northeast', '       USA West', '      National Groups', '     United Kingdom', '    Europe', '   Canada', 'Atlanta', 'Boston', 'Bristol', 'Bristol Concert', 'Canada National', 'Chicago', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Edinburgh', 'Ft. Wayne', 'Honolulu', 'Houston', 'Ipswich', 'London', 'Los Angeles', 'Manchester', 'Minneapolis', 'Mississauga', 'Montreal', 'Netherlands', 'New Jersey', 'New York', 'Philadelphia', 'Pittsburgh', 'Puerto Rico', 'Reading', 'San Francisco', 'St. Louis', 'Stamford', 'Toronto', 'UK National', 'USA National', 'Washington'];
		var Region_Final_MDM_list_last_Value = 'NA';
		var Region_Market_List = ['         USA Central', '        USA Northeast', '       USA West', '      National Groups', '     United Kingdom', '    Europe', '   Canada', 'Atlanta', 'Boston', 'Bristol', 'Bristol Concert', 'Canada National', 'Chicago', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Edinburgh', 'Ft. Wayne', 'Honolulu', 'Houston', 'Ipswich', 'London', 'Los Angeles', 'Manchester', 'Minneapolis', 'Mississauga', 'Montreal', 'Netherlands', 'New Jersey', 'New York', 'Philadelphia', 'Pittsburgh', 'Puerto Rico', 'Reading', 'San Francisco', 'St. Louis', 'Stamford', 'Toronto', 'UK National', 'USA National', 'Washington','USA Central Adjustments', 'USA Northeast Adjustments', 'USA West Adjustments'];
		var Industries_tbl = ['N\\A', '(blank)', 'Aerospace & Defense', 'Banking & Finance', 'Beverage, Food, & Tobacco', 'Energy', 'Healthcare & Pharmaceutic', 'High Tech', 'Higher Education', 'Holding Companies', 'Hotel, Gaming, & Leisure', 'Insurance', 'Manufacturing', 'Media: Advertising, Print', 'Media: Broadcasting & Sub', 'Metals & Mining', 'Nonclassifiable Establish', 'Professional Services', 'Public Sector', 'Real Estate', 'Retail', 'Services: Business', 'Services: Consumer', 'Telecommunications', 'Transportation', 'Unknown', 'Wholesale'];

		console.log('Geo_Final_MDM',Geo_Final_MDM)

		console.log('Practice_tbl',Practice_tbl)


		console.log('Region_Final_MDM',Region_Final_MDM)

		console.log('Region_Market_List',Region_Market_List);

		console.log('Industries_tbl',Industries_tbl)

		if(args.items[0].jaql.filter.explicit == false)
		{
			console.log(' explicit false');
			console.log(args);
			if(prism.activeDashboard.filters.$$items[0].jaql.filter.hasOwnProperty('all') == true)
			{
				var customfilterMDMGeojson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};
				var customfilterPracticejson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};
				var customfilterRegionjson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};
				prism.activeDashboard.filters.$$items[5].jaql.filter = customfilterMDMGeojson ; 
				prism.activeDashboard.filters.$$items[7].jaql.filter = customfilterPracticejson ;
				prism.activeDashboard.filters.$$items[6].levels[0].filter = customfilterRegionjson ;
			}
			else
			{
				console.log('----Reached ELSE------');
				if(args.items[0].jaql.dim == '[Country PY.Geo_Pursuit]')
				{
					var excludedMembers = args.items[0].jaql.filter.exclude.members;				
					var selectedList_GeoFinalMDM = selectedMembersList(Geo_Final_MDM ,excludedMembers,'exclude')				
					var customfilterGeoFinalMDMjson = {
						"explicit": false,
						"multiSelection": true,
						"members": selectedList_GeoFinalMDM
					};
					prism.activeDashboard.filters.$$items[5].jaql.filter = customfilterGeoFinalMDMjson ; 
				}
			}
			console.log('----Reached------');
			if(prism.activeDashboard.filters.$$items[1].jaql.filter.hasOwnProperty('all') == true)
			{
				var customfilterPractice_Reportjson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};				
				prism.activeDashboard.filters.$$items[7].jaql.filter = customfilterPractice_Reportjson ;				
			}
			else
			{
				if(args.items[0].jaql.dim == '[LobPractice.lob_practice Sort]')
				{
					console.log('excludedMembers');
					var excludedMembers = args.items[0].jaql.filter.exclude.members;
					console.log(excludedMembers)
					var selectedList_Practice_table = selectedMembersList(Practice_tbl ,excludedMembers,'exclude')
					console.log(selectedList_Practice_table)
					var customfilterPractice_table_json = {
						"explicit": true,
						"multiSelection": true,
						"members": selectedList_Practice_table
					};
					prism.activeDashboard.filters.$$items[7].jaql.filter = customfilterPractice_table_json ; 
				}
			}
			console.log('----Reached 1------');
			if(prism.activeDashboard.filters.$$items[2].levels[0].filter.hasOwnProperty('all') == true )
			{
				var customfilterRegion_Reportjson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};				
				prism.activeDashboard.filters.$$items[6].levels[0].filter = customfilterRegion_Reportjson ;				
			}
			else
			{
				if(args.items[0].jaql.dim == '[Employee_Data.Region_Sort]')
				{
					var excludedMembers = args.items[0].jaql.filter.exclude.members;
					console.log(excludedMembers)
					for (let index = 0; index < excludedMembers.length; index++) {
						console.log(excludedMembers[index])

						if(excludedMembers[index]=='N/A')
						{
							console.log('--Inside replace ----')
							var replaceindex = excludedMembers.indexOf(excludedMembers[index]);
							excludedMembers[replaceindex] = '      National Groups';
						}
						if(excludedMembers[index]=='      USA National' || excludedMembers[index]=='  India' )
						{
							console.log('--Inside replace ----')
							var replaceindex = excludedMembers.indexOf(excludedMembers[index]);
							excludedMembers[replaceindex] = 'NA';
						}
					}

					var selectedList_Region = selectedMembersList(Region_Final_MDM ,excludedMembers,'exclude')
					console.log(selectedList_Region)
					var customfilterRegion_table_json = {
						"explicit": true,
						"multiSelection": true,
						"members": selectedList_Region
					};
					prism.activeDashboard.filters.$$items[6].levels[0].filter = customfilterRegion_table_json ; 
				}
			}
			console.log('----Reached-2-----');
			if(prism.activeDashboard.filters.$$items[2].levels[1].filter.hasOwnProperty('all') == true )
			{
				var customfilterMarket_Reportjson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};				
				prism.activeDashboard.filters.$$items[6].levels[1].filter = customfilterMarket_Reportjson ;				
			}
			else
			{
				if(args.items[0].jaql.dim == '[Employee_Data.Market]')
				{
					var excludedMembers = args.items[0].jaql.filter.exclude.members;
					console.log(excludedMembers)
					for (let index = 0; index < excludedMembers.length; index++) {
						console.log(excludedMembers[index])

						if(excludedMembers[index]=='Bristol Buck')
						{
							console.log('--Inside replace ----')
							var replaceindex = excludedMembers.indexOf(excludedMembers[index]);
							excludedMembers[replaceindex] = 'Bristol';
						}
						if(excludedMembers[index]=='N\\A')
						{
							console.log('--Inside replace ----')
							excludedMembers.push('Puerto Rico');
							excludedMembers.push('Netherlands');
							excludedMembers.push('Canada National');
							excludedMembers.push('UK National');
							excludedMembers.push('(blank)');
						}
					}

					var selectedList_Region_Market = selectedMembersList(Region_Market_List ,excludedMembers,'exclude')
					console.log(selectedList_Region_Market)
					var customfilterRegion_Market_table_json = {
						"explicit": true,
						"multiSelection": true,
						"members": selectedList_Region_Market
					};
					prism.activeDashboard.filters.$$items[6].levels[1].filter = customfilterRegion_Market_table_json ; 
				}
			}
			console.log('----Reached--3----');
			if(prism.activeDashboard.filters.$$items[8].jaql.filter.hasOwnProperty('all') == true)
			{
				var customfilterIndustry_Reportjson = {
					"explicit": false,
					"multiSelection": true,
					"all": true
				};				
				prism.activeDashboard.filters.$$items[9].jaql.filter = customfilterIndustry_Reportjson ;				
			}
			else
			{
				if(args.items[0].jaql.dim == '[MDM.Industry Code]')
				{
					console.log('excludedMembers');
					var excludedMembers = args.items[0].jaql.filter.exclude.members;
					console.log(excludedMembers)
					var selectedList_Industry_table = selectedMembersList(Industries_tbl ,excludedMembers,'exclude')
					console.log(selectedList_Practice_table)
					var customfilterIndustry_table_json = {
						"explicit": true,
						"multiSelection": true,
						"members": selectedList_Industry_table
					};
					prism.activeDashboard.filters.$$items[9].jaql.filter = customfilterIndustry_table_json ; 
				}
			}

		}
		if(args.items[0].jaql.filter.explicit == true)
		{
			console.log(' explicit true');
			var includedMembers = args.items[0].jaql.filter.members;
			console.log(includedMembers);

			if(args.items[0].jaql.dim == '[Country PY.Geo_Pursuit]')
			{
				var  selectedList_GeoFinalMDM = selectedMembersList(Geo_Final_MDM ,includedMembers,'include');				
				console.log(selectedList_GeoFinalMDM);				
				var customfilterGeoFinalMDMjson = {
					"explicit": true,
					"multiSelection": true,
					"members": selectedList_GeoFinalMDM
				};
				prism.activeDashboard.filters.$$items[5].jaql.filter = customfilterGeoFinalMDMjson; 
			}

			if(args.items[0].jaql.dim == '[LobPractice.lob_practice Sort]')
			{
				var  selectedList_Practice = selectedMembersList(Practice_tbl ,includedMembers,'include');
				console.log(Practice_tbl);
				var customfilterPractice_json = {
					"explicit": true,
					"multiSelection": true,
					"members": selectedList_Practice
				};			

				prism.activeDashboard.filters.$$items[7].jaql.filter = customfilterPractice_json ;
			}

			if(args.items[0].jaql.dim == '[Employee_Data.Region_Sort]')
			{
				console.log('--Inside [Employee_Data.Region_Sort] ----')
				for (let index = 0; index < includedMembers.length; index++) {
					console.log(includedMembers[index])

					if(includedMembers[index]=='N/A')
					{
						console.log('--Inside replace ----')
						includedMembers.push('      National Groups');
					}
					if(includedMembers[index]=='      USA National' || includedMembers[index]=='  India')
					{
						console.log('--Inside replace ----')
						includedMembers.push('NA');
					}


				}
				console.log(includedMembers);
				var  selectedList_Region = selectedMembersList(Region_Final_MDM ,includedMembers,'include');
				console.log(selectedList_Region);
				var customfilterRegion_json = {
					"explicit": true,
					"multiSelection": true,
					"members": selectedList_Region
				};
				prism.activeDashboard.filters.$$items[6].levels[0].filter = customfilterRegion_json ;
			}
			if(args.items[0].jaql.dim == '[Employee_Data.Market]')
			{
				console.log('--Inside [Employee_Data.Market] ----')
				for (let index = 0; index < includedMembers.length; index++) {
					console.log(includedMembers[index])
					if(includedMembers[index]=='Bristol Buck')
					{
						console.log('--Inside replace ----');
						includedMembers.push('Bristol');					
					}
					if(includedMembers[index]=='N\\A')
					{
						console.log('--Inside replace ----')
						includedMembers.push('Puerto Rico');
						includedMembers.push('Netherlands');
						includedMembers.push('Canada National');
						includedMembers.push('UK National');
						includedMembers.push('(blank)');
					}
					if(includedMembers[index]=='Central Regionalized')
					{
						console.log('--Inside replace ----');
						includedMembers.push('USA Central Adjustments');					
					}
					if(includedMembers[index]=='Northeast Regionalized')
					{
						console.log('--Inside replace ----');
						includedMembers.push('USA Northeast Adjustments');					
					}
					if(includedMembers[index]=='West Regionalized')
					{
						console.log('--Inside replace ----');
						includedMembers.push('USA West Adjustments');
					}					
				}
				console.log(includedMembers);
				var  selectedList_Market = selectedMembersList(Region_Market_List ,includedMembers,'include');
				console.log(selectedList_Market);
				var customfilterMarket_json = {
					"explicit": true,
					"multiSelection": true,
					"members": selectedList_Market
				};
				prism.activeDashboard.filters.$$items[6].levels[1].filter = customfilterMarket_json ;
			}
			if(args.items[0].jaql.dim == '[MDM.Industry Code]')
			{
				var  selectedList_Industry = selectedMembersList(Industries_tbl ,includedMembers,'include');
				console.log(selectedList_Industry);
				var customfilterIndustries_json = {
					"explicit": true,
					"multiSelection": true,
					"members": selectedList_Industry
				};			

				prism.activeDashboard.filters.$$items[9].jaql.filter = customfilterIndustries_json ;
			}
		}
	}
	$('.uc-checker-content span[title="NA"]').parents('.list-item').hide();
	prism.activeDashboard.widgets.$$widgetsmap['60fd2bf4e96bb332d03f0c64'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['613f54416353db35e40ef6b2'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd1d9e11e93e320416ad4e'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd1d0c11e93e320416ad2c'].refresh();

	prism.activeDashboard.widgets.$$widgetsmap['60fd1d0c11e93e320416ad2a'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['612cb7327072af02ac35c69b'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60ffcf86e96bb332d03f14d0'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60ffca7fe96bb332d03f1498'].refresh();

	prism.activeDashboard.widgets.$$widgetsmap['60fd5355e96bb332d03f0cbc'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd2689e96bb332d03f0c3a'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd5083e96bb332d03f0ca0'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['6359024525d3ff2bd84b6788'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd547be96bb332d03f0cc8'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['60fd5809e96bb332d03f0cee'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['6133877156d65d2c9c95bb56'].refresh();

	prism.activeDashboard.widgets.$$widgetsmap['639b29d611dfa63ee0c31496'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['639b2a0d11dfa63ee0c3149b'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['639c1fb6633b6b455490493f'].refresh();
	prism.activeDashboard.widgets.$$widgetsmap['639c1fbf633b6b4554904941'].refresh();

});


function selectedMembersList (inputlist,inputValue,type)
{
	var includeTypeList = [];
	console.log('inputValue',inputValue);
	console.log('inputlist',inputlist);
	console.log('type',type);
	for (let index = 0; index < inputValue.length; index++) {

		if(inputlist.includes(inputValue[index]) == true)
		{
			if(type == 'exclude')
			{
				let inputValueindex = inputlist.indexOf(inputValue[index]);
				inputlist.splice(inputValueindex, 1);
			}
			if(type == 'include')
			{
				includeTypeList.push(inputValue[index]); 
			}
		}

	}
	if(type == 'include')
	{
		console.log(' condition type include')
		inputlist = [];
		inputlist = includeTypeList;
	}
	return inputlist;													
}





