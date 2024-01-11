var scopeWidgetCurrency ;
let arrayAllFiltersDimmensions = [];
let arrayCurrencyFilterIndex = [4,5,6,7];
let arrayDefaultExculdeValueFromFilterIndex = [9];
let arrayMappedCurrencyFilterIndex = [6];
let arrayMappedGeoFilterIndex = [1];


var mappedConfigurations = {	
	intialCurrency :"USD",
	intialCurrencyResetFilter : "   USD",
	mappedCurrency:"",
	mappedGeo:""
};

var defaultFilterConfig = {
	dim: "",
	datasource: "",
	title:"",
	variable:"",
	values:"",
	multiSelection:"",
	defaultCurrency:""

};

var filterschangedConfig = {
	filterType:"",
	inputValue:"",
	currencyValue:"",
	values:"",
	widget:""
};

var exculdeFiltersValues = {
	filterindex :9,
	Value : ' NA'	
};

let filtersIndexValuesList = [];
var selectedFilterValues = [];
var filterChangedValues = {
	geo: "",
	currency:"",
	type:"",
	inputValues:"",
	values:"",
	inputCurrencyValues:""
};
let filterGeoCurrencyMappingIndex = [['USA',['USA','US','USD']],['UK',['UK','GBP']],['CAN',['CAD','CAN','CA']]];
let filterGeoExtraMappingIndex = [['USA',['USA','US']],['CAN',['CAN','CA']],['UK',['UK']]];
let filterGeoCurrencyExtraMappingIndex = [['USA',['USD']],['CAN',['CAN','CAD']],['UK',['GBP']]];

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



/**** Pulled Filter all available values****/
dashboard.on('initialized', function(d, args) {

	console.log('initialized event:>>>',args);
	for(var i=0; i<args.dashboard.filters.$$items.length; i++) {

		arrayAllFiltersDimmensions = [];
		defaultFilterConfig = {
			dim: "",
			datasource: "",
			title:"",
			variable:"",
			values:"",
			multiSelection:"",
			defaultCurrency:""

		};

		if(args.dashboard.filters.$$items[i].levels != null) { //this is for dependent filters

			for(var j=0; j<args.dashboard.filters.$$items[i].levels.length; j++) {

				console.log(args.dashboard.filters.$$items[i].levels[j].dim);
			}
		}
		else { //normal filters

			defaultFilterConfig.dim =args.dashboard.filters.$$items[i].jaql.dim;
			defaultFilterConfig.datasource = args.dashboard.filters.$$items[i].jaql.datasource;
			defaultFilterConfig.title = args.dashboard.filters.$$items[i].jaql.datasource.title;
			defaultFilterConfig.multiSelection = args.dashboard.filters.$$items[i].jaql.filter.multiSelection;

		}
		//query the filter dimension to retrieve all members sorted descending

		var dimJaql = '{"dim": "' + defaultFilterConfig.dim + '", "sort": "desc"}';

		var query = '{"datasource": ' + JSON.stringify(defaultFilterConfig.datasource) + ', "metadata": [' + dimJaql + ']}';

		var url = '/api/datasources/' + defaultFilterConfig.title + '/jaql';

		$.ajax({

			async:false,

			method: 'POST',

			url: url,

			data: query,

			success: function(result) {

				console.log('API result:>>>',result);
				let arrayAllFilterValues = [];
				defaultFilterConfig.variable = defaultFilterConfig.title +"_"+ defaultFilterConfig.dim.replace("[","").replace("]","");
				for(var j=0; j<result.values.length; j++) {

					arrayAllFilterValues.push(result.values[j][0]);
					
					if(arrayCurrencyFilterIndex.includes(i) == true) {

						if(defaultFilterConfig.multiSelection == false){

							if(result.values[j][0].trim().includes('USD'))
							{
								defaultFilterConfig.defaultCurrency = result.values[j][0];
							}

						}

					}
				}
				filtersIndexValuesList.push([i,arrayAllFilterValues,defaultFilterConfig.multiSelection]);
				defaultFilterConfig.values = arrayAllFilterValues;
				console.log('defaultFilterConfig:>>>',defaultFilterConfig);

				if(arrayCurrencyFilterIndex.includes(i) == true) {

					console.log('Currency Index:>>>',arrayCurrencyFilterIndex.includes(i),i);
					console.log('defaultFilterConfig multiSelection:>>>',defaultFilterConfig.multiSelection);
					if(defaultFilterConfig.multiSelection == true)
					{	
						args.dashboard.filters.$$items[i].jaql.filter = {

							explicit: true,

							all: true,

							multiSelection: true,

							userMultiSelect: true

						};
					}
					else
					{	
						args.dashboard.filters.$$items[i].jaql.filter = {

							explicit: true,

							members: [defaultFilterConfig.defaultCurrency] ,

							multiSelection: false,

							userMultiSelect: false

						};

					}
				}
				else if(arrayDefaultExculdeValueFromFilterIndex.includes(i) == true)
				{				

					console.log('array DefaultExculdeValueFrom Filter Index:>>>',arrayDefaultExculdeValueFromFilterIndex.includes(i),i);

					let selectedArray = [] 
					selectedArray = defaultFilterConfig.values;
					selectedArray.splice(selectedArray.indexOf(exculdeFiltersValues.Value), 1);
					defaultFilterConfig.values = "";
					defaultFilterConfig.values = selectedArray; 

					args.dashboard.filters.$$items[i].jaql.filter = {

						explicit: true,

						members: defaultFilterConfig.values,

						multiSelection: true,

						userMultiSelect: true

					};
				}
				else 
				{
					console.log('Geo Index:>>>',arrayDefaultExculdeValueFromFilterIndex.includes(i),i);

					args.dashboard.filters.$$items[i].jaql.filter = {

						explicit: false,						

						multiSelection: true,

						userMultiSelect: true,

						all: true

					};
				}


			},

			contentType: "application/json; charset=utf-8",

			dataType: "json"

		});

	}
	console.log('filtersIndexValuesList:>>>',filtersIndexValuesList);
	var RevenuelocalUSD = RevenuelocalUSDCurrency(mappedConfigurations.intialCurrency);
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

	var PipelinelocalUSD = PipelinelocalUSDCurrency(mappedConfigurations.intialCurrency);					
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

	var BookingslocalUSD =  BookingslocalUSDCurrency(mappedConfigurations.intialCurrency);
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

	var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(mappedConfigurations.intialCurrency);
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

	var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(mappedConfigurations.intialCurrency);
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

	var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(mappedConfigurations.intialCurrency);
	prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;

	prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : USA,UK,CAN | Currency : ' + mappedConfigurations.intialCurrency;



});


dashboard.on('filterschanged', (el, args) => {

	if(args.type == 'update')
	{
		if(args.items[0].jaql.dim == '[Country PY.Geo_Order]' && args.items[0].jaql.datasource.title == 'BCK_EE_1.0_Elt_Optimized')
		{
			console.log('filtersIndexValuesList',filtersIndexValuesList);
			console.log('filterGeoCurrencyMappingIndex',filterGeoCurrencyMappingIndex);
			filterschangedConfig.widget = "";
			var selectedFilterValues = [];
			filterChangedValues = {
				geo: "",
				currency:"",
				type:"",
				inputValues:"",
				values:"",
				inputCurrencyValues:""
			};
			console.log('filterschanged event:>>>',args);
			if(args.items[0].jaql.filter.hasOwnProperty('all') == true)
			{
				filterChangedValues.type = "all";
				filterChangedValues.geo = ['all'];
			}
			else if(args.items[0].jaql.filter.hasOwnProperty('exclude') == true)
			{
				for (var k=0; k<filtersIndexValuesList[0][1].length; k++)
				{					
					if(args.items[0].jaql.filter.exclude.members.includes(filtersIndexValuesList[0][1][k]) == false)
					{
						selectedFilterValues.push(filtersIndexValuesList[0][1][k]);
					}
				}
				filterChangedValues.type = "exclude";
				filterChangedValues.geo = selectedFilterValues;

			}
			else
			{
				for (var l=0; l< args.items[0].jaql.filter.members.length; l++)
				{
					selectedFilterValues.push(args.items[0].jaql.filter.members[l]); 
				}
				filterChangedValues.type = "include";			
				filterChangedValues.geo = selectedFilterValues;				
			}

			console.log('filterChangedValues:>>>',filterChangedValues);

			if( filterChangedValues.geo.length == 1)
			{
				for (t = 0; t < filterChangedValues.geo.length; t++ )
				{				
					if(filterChangedValues.type == filterChangedValues.geo[t] )
					{
						console.log('filterChangedValues.type ::>>',filterChangedValues.type);						

						for (i = 0 ; i < filtersIndexValuesList.length; i++)
						{
							for (l = 0 ; l < filtersIndexValuesList[i].length; l++)
							{
								for (x = 0 ; x < filtersIndexValuesList[i][1].length; x++)
								{
									if(filtersIndexValuesList[i][1][x].includes('USD') == true)
									{
										filterChangedValues.currency = filtersIndexValuesList[i][1][x]; 
									}
								}
								console.log('filterChangedValues.currency ::>>',filterChangedValues.currency);
								if(arrayMappedCurrencyFilterIndex.includes(i) == true)
								{
									mappedConfigurations.mappedCurrency  = filterChangedValues.currency;
								}

								if(filtersIndexValuesList[i][2] == true)
								{
									console.log('multiselect ::>>',filtersIndexValuesList[i][2]);
									prism.activeDashboard.filters.$$items[i].jaql.filter = {

										explicit: true,

										all: true,

										multiSelection: true,

										userMultiSelect: true

									};

								}
								else
								{

									prism.activeDashboard.filters.$$items[i].jaql.filter = {

										explicit: true,

										members: [filterChangedValues.currency],

										multiSelection: false,

										userMultiSelect: false

									};
								}
							}

						}
						prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : USA,UK,CAN | Currency : ' + mappedConfigurations.mappedCurrency;
						console.log('filterChangedValues.currency mappedConfigurations.mappedCurrency::>>>', mappedConfigurations.mappedCurrency);
						console.log('filterChangedValues.currency mappedConfigurations.intialCurrency::>>>', mappedConfigurations.intialCurrency);
						var RevenuelocalUSD = RevenuelocalUSDCurrency(mappedConfigurations.intialCurrency);
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

						var PipelinelocalUSD = PipelinelocalUSDCurrency(mappedConfigurations.intialCurrency);					
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

						var BookingslocalUSD =  BookingslocalUSDCurrency(mappedConfigurations.intialCurrency);
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

						var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(mappedConfigurations.intialCurrency);
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

						var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(mappedConfigurations.intialCurrency);
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

						var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(mappedConfigurations.intialCurrency);
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;

					}
					else
					{
						console.log('Else Part:>>>');
						console.log('Else Part filterChangedValues.geo[t]:>>>',filterChangedValues.geo[t]);

						for(w =0; w < filterGeoCurrencyMappingIndex.length;w++) 
						{
							if(filterGeoCurrencyMappingIndex[w][0].trim() == filterChangedValues.geo[t].trim())
							{
								filterChangedValues.inputValues = filterGeoCurrencyMappingIndex[w][1];
							}
						}
						console.log('Else Part filterChangedValues:>>>',filterChangedValues);
						console.log('Else Part filterChangedValues: filterChangedValues.inputValues >>>',filterChangedValues.inputValues);
						for (i = 1 ; i < filtersIndexValuesList.length; i++)
						{
							for (l = 1 ; l < filtersIndexValuesList[i].length; l++)
							{
								for (x = 0 ; x < filtersIndexValuesList[i][1].length; x++)
								{
									console.log('Else Part filterChangedValues: filtersIndexValuesList[i][1] >>>',filtersIndexValuesList[i][1]);
									if(filterChangedValues.inputValues.includes(filtersIndexValuesList[i][1][x].trim()) == true)
									{
										console.log('Else Part filterChangedValues: filtersIndexValuesList[i][1][x] value matched >>>',filtersIndexValuesList[i][1][x]);
										filterChangedValues.values = filtersIndexValuesList[i][1][x]; 
									}
								}
								if(arrayMappedCurrencyFilterIndex.includes(i) == true)
								{
									mappedConfigurations.mappedCurrency  = filterChangedValues.values;
								}
								if(arrayMappedGeoFilterIndex.includes(i) == true)
								{
									mappedConfigurations.mappedGeo  = filterChangedValues.values;
								}

								console.log('filterChangedValues.values ::>>',filterChangedValues.values);

								if(filtersIndexValuesList[i][2] == true)
								{
									console.log('multiselect ::>>',filtersIndexValuesList[i][2]);
									prism.activeDashboard.filters.$$items[i].jaql.filter = {

										explicit: true,

										members: [filterChangedValues.values],

										multiSelection: true,

										userMultiSelect: true

									};

								}
								else
								{

									prism.activeDashboard.filters.$$items[i].jaql.filter = {

										explicit: true,

										members: [filterChangedValues.values],

										multiSelection: false,

										userMultiSelect: false

									};
								}
							}

						}
						prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : '+ mappedConfigurations.mappedGeo + ' | Currency : '+ mappedConfigurations.mappedCurrency;
						console.log('mappedConfigurations.mappedCurrency::>>>', mappedConfigurations.mappedCurrency);

						var RevenuelocalUSD = RevenuelocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

						var PipelinelocalUSD = PipelinelocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());					
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

						var BookingslocalUSD =  BookingslocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

						var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

						var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

						var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(mappedConfigurations.mappedCurrency.trim());
						prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;

						mappedConfigurations.mappedGeo = [mappedConfigurations.mappedGeo];

					} 
				}

			}
			else  
			{
				console.log('Else if Part:>>>');
				console.log('Else if Part filterGeoExtraMappingIndex:>>>' ,filterGeoExtraMappingIndex);
				let selectedInputValues =[];let selectedCurrencyInputValues =[];
				for(w =0; w < filterGeoExtraMappingIndex.length;w++) 
				{
					for(d =0; d < filterChangedValues.geo.length;d++) 
					{
						if(filterGeoExtraMappingIndex[w][0].trim() == filterChangedValues.geo[d].trim())
						{
							selectedInputValues.push(filterGeoExtraMappingIndex[w][1]);
						}
					}
				}
				filterChangedValues.inputValues = selectedInputValues;
				for(wx =0; wx < filterGeoCurrencyExtraMappingIndex.length;wx++) 
				{
					for(d =0; d < filterChangedValues.geo.length;d++) 
					{
						if(filterGeoCurrencyExtraMappingIndex[wx][0].trim() == filterChangedValues.geo[d].trim())
						{
							selectedCurrencyInputValues.push(filterGeoCurrencyExtraMappingIndex[wx][1]);
						}
					}
				}
				filterChangedValues.inputCurrencyValues = selectedCurrencyInputValues;
				console.log('Else if Part filterChangedValues:>>>',filterChangedValues);
				for (i = 1 ; i < filtersIndexValuesList.length; i++)
				{

					for (l = 1 ; l < filtersIndexValuesList[i].length; l++)
					{
						let mappedInputValues =[];
						console.log('filtersIndexValuesList[i][1] ::>>',filtersIndexValuesList[i][1]);	
						if(arrayCurrencyFilterIndex.includes(i) == false)
						{
							for (x = 0 ; x < filtersIndexValuesList[i][1].length; x++)
							{
								console.log('filtersIndexValuesList[i][1][x] ::>>',filtersIndexValuesList[i][1][x]);	
								for (xx = 0 ; xx < filterChangedValues.inputValues.length; xx++)
								{
									console.log('filterChangedValues.inputValues[xx] :::>>>',filterChangedValues.inputValues[xx]);
									if(filterChangedValues.inputValues[xx].includes(filtersIndexValuesList[i][1][x].trim()) == true)
									{
										mappedInputValues.push(filtersIndexValuesList[i][1][x]);
									}
								}
							}

						}
						else if(arrayCurrencyFilterIndex.includes(i) == true)
						{
							for (x = 0 ; x < filtersIndexValuesList[i][1].length; x++)
							{
								console.log('filtersIndexValuesList[i][1][x] ::>>',filtersIndexValuesList[i][1][x]);	
								for (xx = 0 ; xx < filterChangedValues.inputCurrencyValues.length; xx++)
								{
									console.log('filterChangedValues.inputCurrencyValues[xx] :::>>>',filterChangedValues.inputCurrencyValues[xx]);
									if(filterChangedValues.inputCurrencyValues[xx].includes(filtersIndexValuesList[i][1][x].trim()) == true)
									{
										console.log('multiselect ::>>',filtersIndexValuesList[i][2]);
										if(filtersIndexValuesList[i][2] == true)
										{
											mappedInputValues.push(filtersIndexValuesList[i][1][x]);
										}
										else
										{
											console.log('multiselect else part ::>>');
											console.log('filtersIndexValuesList[i][1][x]',filtersIndexValuesList[i][1][x]);
											for (kk = 0 ; kk < filtersIndexValuesList[i][1].length; kk++)
											{
												if(filtersIndexValuesList[i][1][kk].trim().includes('USD') == true)
												{
													mappedInputValues.push(filtersIndexValuesList[i][1][kk]);
												}
											}
										}
									}
								}

							}
						}
						filterChangedValues.values = mappedInputValues;

						console.log('filterChangedValues.values ::>>',filterChangedValues.values);

						if(arrayMappedCurrencyFilterIndex.includes(i) == true)
						{
							mappedConfigurations.mappedCurrency  = filterChangedValues.values;
						}
						if(arrayMappedGeoFilterIndex.includes(i) == true)
						{
							mappedConfigurations.mappedGeo  = filterChangedValues.values;
						}
						console.log('mappedConfigurations ::>>',mappedConfigurations);

						if(filtersIndexValuesList[i][2] == true)
						{

							prism.activeDashboard.filters.$$items[i].jaql.filter = {

								explicit: true,

								members: filterChangedValues.values,

								multiSelection: true,

								userMultiSelect: true

							};

						}
						else
						{

							prism.activeDashboard.filters.$$items[i].jaql.filter = {

								explicit: true,

								members: filterChangedValues.values,

								multiSelection: false,

								userMultiSelect: false

							};
						} 
					}

				}
				prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : '+ mappedConfigurations.mappedGeo + ' | Currency : '+ mappedConfigurations.intialCurrency;
				console.log('filterChangedValues.currency mappedConfigurations.mappedCurrency::>>>', mappedConfigurations.mappedCurrency);
				var RevenuelocalUSD = RevenuelocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

				var PipelinelocalUSD = PipelinelocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());					
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

				var BookingslocalUSD =  BookingslocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

				var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

				var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

				var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(mappedConfigurations.mappedCurrency[0].trim());
				prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;


			}
		}
		if(args.items[0].jaql.dim.trim() == "[Currency_Selection.Currency]" && args.items[0].jaql.datasource.title == 'BCK_EE_1.0_Elt_Optimized')
		{
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',args);

			var selectedCurrency = args.items[0].jaql.filter.members[0].trim();			
			prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : '+ mappedConfigurations.mappedGeo + ' | Currency : '+ selectedCurrency;
			
			if(selectedCurrency == 'CAD')
			{
				selectedCurrency = 'CAN';
			}
			prism.activeDashboard.filters.$$items[7].jaql.filter = {

				explicit: true,

				members: [selectedCurrency] ,

				multiSelection: false,

				userMultiSelect: false

			};

			var RevenuelocalUSD = RevenuelocalUSDCurrency(selectedCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

			var PipelinelocalUSD = PipelinelocalUSDCurrency(selectedCurrency);					
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

			var BookingslocalUSD =  BookingslocalUSDCurrency(selectedCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

			var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(selectedCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

			var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(selectedCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

			var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(selectedCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;
		}

	}
});





dashboard.on('widgetprocessresult', function(el, args){ 

	if(args.reason == "dashboardrefresh" && mappedConfigurations.mappedGeo != "" && args.widget.oid == "62a716d4a31abd28b8dbf7e8")
	{
		filterschangedConfig.widget = 'dashboardrefresh';
		console.log('dashboard widgetprocessresult:>>>>>>>>>>>>>>>>>>>>>>>' , args);
		console.log('mappedConfigurations.intialCurrency',mappedConfigurations.intialCurrency);			
		console.log('filterschangedConfig.widget',filterschangedConfig.widget);	
		resetFilters(prism.activeDashboard);
		prism.activeDashboard.widgets.$$widgetsmap['62d68272db6d692d287a7b96'].style.currentCard.body[0].items[0].columns[0].items[0].text = 'Geo : USA,UK,CAN | Currency : ' + mappedConfigurations.intialCurrency;


		var RevenuelocalUSD = RevenuelocalUSDCurrency(mappedConfigurations.intialCurrency);
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1] = RevenuelocalUSD;

		var PipelinelocalUSD = PipelinelocalUSDCurrency(mappedConfigurations.intialCurrency);					
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1] = PipelinelocalUSD;

		var BookingslocalUSD =  BookingslocalUSDCurrency(mappedConfigurations.intialCurrency);
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1] = BookingslocalUSD;

		var ContributionMarginlocalUSD =  ContributionMarginlocalUSDCurrency(mappedConfigurations.intialCurrency);
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1] = ContributionMarginlocalUSD;	

		var ContributionMarginPercentagelocalUSD =  ContributionMarginPercentagelocalUSDCurrency(mappedConfigurations.intialCurrency);
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1] = ContributionMarginPercentagelocalUSD;

		var ActiveEmployeesSalarylocalUSD =  ActiveEmployeesSalarylocalUSDCurrency(mappedConfigurations.intialCurrency);
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1]= ActiveEmployeesSalarylocalUSD;  
	}
}); 


dashboard.on('widgetready', function(sender, ev){ 

	console.log('dashboard widget ready event',ev);	
	console.log('filterschangedConfig.widget',filterschangedConfig.widget);		
	console.log('mappedConfigurations.mappedGeo array',mappedConfigurations.mappedGeo);


	if(filterschangedConfig.widget == "dashboardrefresh")
	{
		$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
		$('.uc-checker-content span[title="  GBP"]').parents('.list-item').hide();	
		$('.uc-checker-content span[title=" CAD"]').parents('.list-item').hide();
	}
	else
	{

		if(mappedConfigurations.mappedGeo == '')
		{
			
			$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
			$('.uc-checker-content span[title="  GBP"]').parents('.list-item').hide();	
			$('.uc-checker-content span[title=" CAD"]').parents('.list-item').hide();

		}
		else if(mappedConfigurations.mappedGeo.length > 1)
		{
			$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
			$('.uc-checker-content span[title="  GBP"]').parents('.list-item').hide();	
			$('.uc-checker-content span[title=" CAD"]').parents('.list-item').hide();
		}
		else if(mappedConfigurations.mappedGeo.length = 1)
		{
			if(mappedConfigurations.mappedGeo.includes('CAN') == true)
			{
				$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
				$('.uc-checker-content span[title="  GBP"]').parents('.list-item').hide();	
				$('.uc-checker-content span[title=" CAD"]').parents('.list-item').show();
			}
			else if(mappedConfigurations.mappedGeo.includes('UK') == true)
			{
				$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
				$('.uc-checker-content span[title="  GBP"]').parents('.list-item').show();	
				$('.uc-checker-content span[title=" CAD"]').parents('.list-item').hide();
			}
			else if (mappedConfigurations.mappedGeo.includes('USA') == true)
			{
				$('.uc-checker-content span[title="   USD"]').parents('.list-item').show();
				$('.uc-checker-content span[title="  GBP"]').parents('.list-item').hide();	
				$('.uc-checker-content span[title=" CAD"]').parents('.list-item').hide();
			}
		}
	}

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f2"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e6"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7ee"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e7"] widget-header').css("background-color","#f5f6f7");

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e8"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e9"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7ed"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f0"] widget-header').css("background-color","#f5f6f7");

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e5"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7ec"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7eb"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f3"] widget-header').css("background-color","#f5f6f7");

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f1"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f1"] blox.widget-body.slf-widget-text-primary').css("overflow","hidden");

	$('widget.widget[widgetid="62d68272db6d692d287a7b96"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="62d68272db6d692d287a7b96"] blox.widget-body.slf-widget-text-primary').css("overflow","hidden");


	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f2"] widget-title[title="Pursuit to Cash"]').css("font-size","15px");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f2"] widget-title[title="Pursuit to Cash"]').css("font-weight","bold");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f2"] widget-title[title="Pursuit to Cash"]').css("color","black"); 
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7f2"] widget-title[title="Pursuit to Cash"]').css("font-family","Open Sans");

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e8"] widget-title[title="Utilization to Revenue"]').css("font-size","15px");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e8"] widget-title[title="Utilization to Revenue"]').css("font-weight","bold");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e8"] widget-title[title="Utilization to Revenue"]').css("color","black"); 
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e8"] widget-title[title="Utilization to Revenue"]').css("font-family","Open Sans");

	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e5"] widget-title[title="Revenue to Profit"]').css("font-size","15px");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e5"] widget-title[title="Revenue to Profit"]').css("font-weight","bold");
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e5"] widget-title[title="Revenue to Profit"]').css("color","black"); 
	$('widget.widget[widgetid="62a716d4a31abd28b8dbf7e5"] widget-title[title="Revenue to Profit"]').css("font-family","Open Sans");

	$('widget.widget[widgetid="646b43b04dabf41bb07bbe72"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="646b43b04dabf41bb07bbe72"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="646b43b04dabf41bb07bbe72"] widget-header').css("background-color","#f5f6f7");
	$('widget.widget[widgetid="646b43b04dabf41bb07bbe72"] widget-header').css("background-color","#f5f6f7");
});

function RevenuelocalUSDCurrency(currency) {

	console.log('---Inside Revenue local USD Currency --');

	if(currency == 'CAD' || currency =='GBP' ){

		if(currency == 'CAD' )
		{
			console.log('---Inside local currency Revenue CAD  GBP--');
			//Revenue
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].agg = 'sum';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].title = 'Total Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].column ='Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].dim ='[buck_ops.Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].table ='buck_ops';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].datatype = 'numeric';
			//Revenue1 
			console.log('---Inside local currency Revenue  CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].title = 'Total Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].column ='Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].dim ='[buck_ops.Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].table ='buck_ops';
			console.log('---Inside local currency Revenue Plan CAD  2--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].title = 'Total CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].table ='buck_ops';

			console.log('---Inside local currency Revenue CAD  GBP 3--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].title = 'Total CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].table ='buck_ops';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].format.mask.currency.symbol ='C$';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';

		}
		if(currency == 'GBP' )
		{
			console.log('---Inside local currency Revenue CAD  GBP--');
			//Revenue
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].agg = 'sum';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].title = 'Total Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].column ='Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].dim ='[buck_ops.Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].table ='buck_ops';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].datatype = 'numeric';
			//Revenue1 
			console.log('---Inside local currency Revenue  CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].title = 'Total Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].column ='Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].dim ='[buck_ops.Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].table ='buck_ops';

			console.log('---Inside local currency Revenue Plan  GBP 2--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].title = 'Total UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].table ='buck_ops';

			console.log('---Inside local currency Revenue CAD  GBP 3--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].title = 'Total UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].table ='buck_ops';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].format.mask.currency.symbol ='£';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';

		}


	}
	if(currency == 'USD')
	{
		//Revenue
		console.log('---Inside local currency Revenue USD --');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].agg = 'sum';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].table ='buck_ops';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].jaql.context["[A0128-5C0]"].datatype = 'numeric';
		//Revenue1
		console.log('---Inside local currency Revenue USD 1 --');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].jaql.context["[EFA4E-B10]"].table ='buck_ops';
		//Plan
		console.log('---Inside local currency Revenue USD 2 --');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].jaql.context["[33634-195]"].table ='buck_ops';
		//Plan_ind
		console.log('---Inside local currency Revenue USD 3 --');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].jaql.context["[88BE7-BDB]"].table ='buck_ops';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1].items[3].format.mask.currency.symbol ='$';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f0'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';
	}

	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ed'].metadata.panels[1];
}

function PipelinelocalUSDCurrency(currency) {

	console.log('---Inside Pipeline local USD Currency--');

	if(currency == 'CAD' || currency =='GBP' )
	{		
		console.log('---Inside local currency Pipeline CAD GBP --');
		//Current Month Pipeline
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].title = 'Total Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].dim ='[Opportunity_Custom.Price_Entry__c]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].column ='Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].table ='Opportunity_Custom';
		//Pipeline
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].title = 'Total Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].dim ='[Opportunity_Custom.Price_Entry__c]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].column ='Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].table ='Opportunity_Custom';
		//Target		
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].title = 'Local_Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].dim ='[Sales_Target_Geo.Local_Target]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].column ='Local_Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].table ='Sales_Target_Geo';

		if(currency =='GBP')
		{
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';

		}
		else 
		{
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';

		}


	}
	if(currency == 'USD')
	{
		console.log('---Inside local currency Pipeline USD --');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].title = 'Total Price_Entry_USD'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].dim ='[Opportunity_Custom.Price_Entry_USD]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].column ='Price_Entry_USD';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].jaql.context["[156C1-072]"].table ='Opportunity_Custom';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].title = 'Total Price_Entry_USD';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].dim ='[Opportunity_Custom.Price_Entry_USD]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].column ='Price_Entry_USD';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].jaql.context["[FC5A9-B2F]"].table ='Opportunity_Custom';
		//Target		
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].title = 'Bookings Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].dim ='[Sales_Target_Geo.Bookings Target]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].column ='Bookings Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].jaql.context["[EDD98-3C3]"].table ='Sales_Target_Geo';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';
	}

	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f2'].metadata.panels[1];

}

function BookingslocalUSDCurrency(currency) {

	console.log('---Inside Bookings local USD Currency--');

	if(currency == 'CAD' || currency =='GBP' )
	{		
		console.log('---Inside local currency Bookings CAD GBP--');
		////CurrentBookings
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].title = 'Total Price_Entry__c'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].dim ='[Opp_Booking_Custom.Price_Entry__c]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].column ='Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].table ='Opp_Booking_Custom';
		//Bookings 
		console.log('---Inside local currency Bookings CAD GBP 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].title = 'Total Price_Entry__c'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].dim ='[Opp_Booking_Custom.Price_Entry__c]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].column ='Price_Entry__c';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].table ='Opp_Booking_Custom';
		console.log('---Inside local currency Bookings CAD GBP 2--');
		//Target

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].title = 'Local_Target'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].dim ='[Sales_Target_Geo.Local_Target]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].column ='Local_Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].table ='Sales_Target_Geo';

		if(currency =='GBP')
		{
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';

		}
		else 
		{
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';

		}
	}

	if(currency == 'USD')
	{
		console.log('---Inside local currency Bookings USD--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].title = 'Total Price_Entry_USD'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].dim ='[Opp_Booking_Custom.Price_Entry_USD]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].column ='Price_Entry_USD';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].jaql.context["[B8AE0-D5A]"].table ='Opp_Booking_Custom';
		console.log('---Inside local currency Bookings USD 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].title = 'Total Price_Entry_USD'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].dim ='[Opp_Booking_Custom.Price_Entry_USD]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].column ='Price_Entry_USD';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].jaql.context["[80C62-B3E]"].table ='Opp_Booking_Custom';
		console.log('---Inside local currency Bookings USD 2--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].title = 'Bookings Target'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].dim ='[Sales_Target_Geo.Bookings Target]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].column ='Bookings Target';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].jaql.context["[727B9-0B6]"].table ='Sales_Target_Geo';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';

	}

	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7e6'].metadata.panels[1];

}

function ContributionMarginlocalUSDCurrency(currency) {

	console.log('---Inside Contribution Margin local USD Currency --');

	if(currency == 'CAD' || currency =='GBP' )
	{
		console.log('---Inside local currency Contribution Margin CAD  GBP--');

		if(currency =='GBP')
		{
			//Contribution
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].title = '[Total UK_Value]'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].table ='buck_ops';
			//Contribution 1
			console.log('---Inside local currency Contribution Margin CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].title = 'Total UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].table ='buck_ops';
			//Plan
			console.log('---Inside local currency Contribution Margin CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].title = 'UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].table ='buck_ops';
			//Plan Ind
			console.log('---Inside local currency Contribution Margin CAD  GBP 2--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].title = 'Total UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].dim ='[buck_ops.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].table ='buck_ops';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';

		}
		else 
		{
			//Contribution
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].title = '[Total CAN_Value]'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].table ='buck_ops';
			//Contribution 1
			console.log('---Inside local currency Contribution Margin CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].title = 'Total CAN_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].table ='buck_ops';
			//Plan
			console.log('---Inside local currency Contribution Margin CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].title = 'CAN_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].table ='buck_ops';
			//Plan Ind
			console.log('---Inside local currency Contribution Margin CAD  GBP 2--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].title = 'Total CAN_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].dim ='[buck_ops.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].table ='buck_ops';

			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';

		}



	}
	if(currency == 'USD')
	{
		//Contribution
		console.log('---Inside local currency Contribution Margin USD--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].jaql.context["[70235-69F]"].table ='buck_ops';
		//Contribution 1
		console.log('---Inside local currency Contribution Margin USD 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].jaql.context["[CC653-EE3]"].table ='buck_ops';
		//Plan
		console.log('---Inside local currency Contribution Margin USD 2--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].title = 'Value'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].column ='Value';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].dim ='[buck_ops.Value]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].jaql.context["[40BAB-890]"].table ='buck_ops';
		//Plan ind
		console.log('---Inside local currency Contribution Margin USD 3--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[3].jaql.context["[DF3B2-313]"].table ='buck_ops';

		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';


	}
	console.log('---Inside Contribution Margin local USD Currency completed ! --');

	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7eb'].metadata.panels[1];
}

function ContributionMarginPercentagelocalUSDCurrency(currency) {

	console.log('---Inside Contribution Margin Percentage local USD Currency --');

	if(currency == 'CAD' || currency =='GBP' )
	{ 
		console.log('---Inside local currency Contribution Margin Percentage CAD  GBP--');
		//Contribution Margin
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].title = 'Total Value'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].column ='Value';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].dim ='[buck_ops.Value]';	
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].table ='buck_ops';	
		//Plan
		console.log('---Inside local currency Contribution Margin Percentage CAD  GBP 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].title = 'Total Value'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].column ='Value';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].dim ='[buck_ops.Value]';	
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].table ='buck_ops';


	}
	if(currency == 'USD')
	{
		//Contribution Margin
		console.log('---Inside local currency Contribution Margin USD--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[0].jaql.context["[16E23-276]"].table ='buck_ops';	
		//Plan
		console.log('---Inside local currency Contribution Margin Percentage USD 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].title = 'Total usd_amount'
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].column ='usd_amount';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].dim ='[buck_ops.usd_amount]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1].items[2].jaql.context["[A8B1B-4F6]"].table ='buck_ops';


	}
	console.log('---Inside local currency Contribution Margin Percentage completed 1--');
	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7f3'].metadata.panels[1];
}

function ActiveEmployeesSalarylocalUSDCurrency(currency) {

	console.log('---Inside Active Employees Salary local USD Currency --');

	if(currency == 'CAD' || currency =='GBP' )
	{
		console.log('---Inside Active Employees Salary local USD Currency CAD  GBP--');

		if(currency == 'CAD' )
		{
			//Active Employee
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].title = 'Total CAN_Salary'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].column ='CAN_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].dim ='[Employee Status Monthly.CAN_Salary]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].table ='Employee Status Monthly';
			//Active Employee 1
			console.log('---Inside Active Employees Salary local USD Currency CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].title = 'Total CAN_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].column ='CAN_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].dim ='[Employee_Data.CAN_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].table ='Employee_Data';
			// Active Employee Prior Year
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].title = 'CAN_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].column ='CAN_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].dim ='[Employee Status Monthly.CAN_Salary]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].table ='Employee Status Monthly';	


			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';
		}

		if(currency == 'GBP' )
		{
			//Active Employee
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].title = 'Total UK_Salary'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].column ='UK_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].dim ='[Employee Status Monthly.UK_Salary]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].table ='Employee Status Monthly';
			//Active Employee 1
			console.log('---Inside Active Employees Salary local USD Currency CAD  GBP 1--');
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].title = 'Total UK_Value'
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].column ='UK_Value';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].dim ='[Employee_Data.UK_Value]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].table ='Employee_Data';
			// Active Employee Prior Year
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].title = 'UK_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].column ='UK_Salary';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].dim ='[Employee Status Monthly.UK_Salary]';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].table ='Employee Status Monthly';


			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
			prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';

		}


	}
	if(currency == 'USD')
	{
		//Active Employee
		console.log('---Inside Active Employees Salary local USD Currency USD--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].title = 'Total Usd Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].column ='Usd Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].dim ='[Employee_Data.Usd Salary]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].jaql.context["[DFB26-A01]"].table ='Employee_Data';
		// Active Employee 1
		console.log('---Inside Active Employees Salary local USD Currency USD 1--');
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].title = 'Total Usd Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].column ='Usd Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].dim ='[Employee_Data.Usd Salary]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].jaql.context["[593CC-4E9]"].table ='Employee_Data';
		// Active Employee Prior Year
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].title = 'Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].column ='Salary';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].dim ='[Employee Status Monthly.Salary]';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].jaql.context["[5C694-636]"].table ='Employee Status Monthly';


		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
		prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';
	}
	console.log('---Inside Active Employees Salary local USD Currency USD RETURN--');
	return prism.activeDashboard.widgets.$$widgetsmap['62a716d4a31abd28b8dbf7ec'].metadata.panels[1];
}



