/*
Welcome to your Dashboard's Script.



To learn how you can access the Widget and Dashboard objects, see the online documentation at https://developer.sisense.com/pages/viewpage.action?pageId=557127
*/

var geoUSA    = '      US';var geoUK    = '     UK';var geoCAN    = '    CA';var geoNA    = ' NA';
var usaCurrency = '  USD';var ukCurrency = ' GBP';var canCurrency = 'CAD';

var defualtFilters = {
	maxDate : ""
};

var customGeofilterjson = {
                                "explicit": true,
                                "multiSelection": true,
                                "members": []
                         };



var customAllGeo = {
                        "explicit": false,
                        "multiSelection": true,
                        "all": true,
                        "filter": {
                            "explicit": false,
                            "multiSelection": true,
                            "exclude": {
                                "members": [
                                    " NA"
                                ]
                            }
                        }
                    };




var customDate_Pulled =  {
                              "explicit": true,
                              "multiSelection": true,
                              "members":[]
                        };




var customCurrencyJQL = {
                          "explicit": true,
                          "userMultiSelect": false,
                          "multiSelection": false,
                          "members": []
                        };



var customJQLGeoAll = {
                          "explicit": false,
                          "multiSelection": true,
                          "all": true
                      };
var customAllRegion = {
	"explicit": true,
	"multiSelection": true,
	"all": true
};

var customAllMarket = {
	"explicit": true,
	"multiSelection": true,
	"all": true
};



dashboard.on('initialized', function(d){



	console.log('---dashboard initialized Start -----');

	var dashboardURL = window.location.href;    
	let result         =  dashboardURL.includes("?");
	if(result == true)
	{
		console.log(dashboardURL);

		var redirecteddashboardURL =  dashboardURL.split("?",2)[1].substring(0, 3);
		console.log(redirecteddashboardURL);
		if(redirecteddashboardURL == 'elt')
		{
			var dashboardURLfiltersvalue = dashboardURL.split("?",2)[1];
			var GeoCurrencyfiltervalue = dashboardURLfiltersvalue.split("=",2)[1];
			var regexexp = /,/;			
			var Geofiltervalue = GeoCurrencyfiltervalue.split("&",1)[0];
			console.log('Geofiltervalue',Geofiltervalue);
			var currencyfiltervalue = GeoCurrencyfiltervalue.split("&",2)[1];			
			console.log('currencyfiltervalue',currencyfiltervalue);
			if(regexexp.test(Geofiltervalue) ==true)
			{
				console.log('for multiselect filters');
				FilterOnMultiGeoSelection(Geofiltervalue,currencyfiltervalue);
				console.log('for multiselect filters Ends');
			}
			else
			{
				if(Geofiltervalue == 'includeall')
				{
					prism.activeDashboard.filters.$$items[1].levels[0].filter = customAllGeo;

				}
				else
				{
					console.log('--for single select filters start--');
					FilterOnGeoSelection(Geofiltervalue,currencyfiltervalue);
					console.log('--for single select filters end--');
				}
			}


		}
		else
		{
			var dashboardURLfiltersvalue = dashboardURL.split("?",2)[1];        
			var Geofiltervalue = dashboardURLfiltersvalue.split("=",2)[1];

			var Regionfilter=decodeURIComponent(window.location.href.split("?",2)[1].split("=",2)[1].split("&",3)[1]);
			var Marketfilter=decodeURIComponent(window.location.href.split("?",2)[1].split("=",2)[1].split("&",3)[2]).slice(3);


			if(Regionfilter == 'includeall')
			{
				prism.activeDashboard.filters.$$items[1].levels[1].filter = customAllRegion;

			}
			else
			{
				FilterOnRegionSelection(Regionfilter);	
			}

			if(Marketfilter == 'includeall')
			{
				prism.activeDashboard.filters.$$items[1].levels[2].filter = customAllMarket;

			}
			else
			{
				FilterOnMarketSelection(Marketfilter);
			}

			console.log(dashboardURLfiltersvalue);
			console.log(Geofiltervalue);
			var regexexp = /,/;            
			if(regexexp.test(Geofiltervalue) ==false)
			{
				console.log('for single select filters');            
				var Geofilter = Geofiltervalue.split("&",1)[0];
				console.log(Geofilter);
				var CurrencyFilter = Geofiltervalue.split("&",2)[1];
				console.log(CurrencyFilter)

				if(CurrencyFilter == 'USD')
				{
					var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



					var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



					var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



					var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



					var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



					var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



					var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



					var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



					var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



					var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



					var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



					var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



					var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



					var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


					customCurrencyJQL.members[0] =  usaCurrency;
					prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

				}
				if(CurrencyFilter == 'GBP')
				{
					var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(ukCurrency);
					prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



					var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



					var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



					var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



					var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



					var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



					var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



					var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



					var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



					var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



					var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



					var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



					var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



					var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


					customCurrencyJQL.members[0] =  ukCurrency;
					prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

				}
				if(CurrencyFilter == 'CAN')
				{
					var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



					var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



					var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



					var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



					var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



					var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



					var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



					var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



					var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



					var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



					var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



					var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



					var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



					var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



					var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;



					customCurrencyJQL.members[0] =  canCurrency;
					prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

				}

				if(Geofilter == 'includeall')
				{
					prism.activeDashboard.filters.$$items[1].levels[0].filter = customJQLGeoAll;
				}
				else
				{
					FilterOnGeoSelection(Geofilter);                
				}



			}
			if(regexexp.test(Geofiltervalue) ==true)
			{
				console.log('for multiselect filters');
				var GlobalPracticeFilter = Geofiltervalue.split("&",2)[1]
				console.log(Geofiltervalue);
				FilterOnMultiGeoSelection(Geofiltervalue);

				var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



				var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



				var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



				var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



				var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



				var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



				var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



				var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



				var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



				var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



				var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



				var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



				var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



				var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



				var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



				var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

				var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

				var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
				prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;

				var Geofilter = Geofiltervalue.split("&",1)[0];
				let GeofilterArray  = Geofilter.split(',') ;
				console.log(GeofilterArray)
				var scopeGeoMembers = [];

				var customMultiGeofilterjson = {
					"explicit": true,
					"multiSelection": true,
					"members": scopeGeoMembers
				};
				console.log('--- multi geos GeofilterArray---');
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
				console.log(customMultiGeofilterjson)
				prism.activeDashboard.filters.$$items[1].levels[0].filter = customMultiGeofilterjson;

				customCurrencyJQL.members[0] =  usaCurrency;
				prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

				console.log('for multiselect filters Ends');
			}
		}
	}
	else
	{
		console.log('--result false---')
		var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



		var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



		var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



		var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



		var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;

		prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].refresh();

		var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



		var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



		var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



		var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



		var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



		var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



		var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



		var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



		var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



		var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

		var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

		var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

		var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
		prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
		prism.activeDashboard.filters.$$items[1].levels[0].filter = customJQLGeoAll;
		customCurrencyJQL.members[0] =  usaCurrency;
		prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
	}

	console.log('---dashboard initialized End -----');

});

function FilterOnRegionSelection(Regionfiltervalue)
{
	console.log("data is here-------------------->");
	let RegionfilterArray  = Regionfiltervalue.split(',') ;
	var scopeRegionMembers = [];
	var customMultiRegionfilterjson = {
		"explicit": true,
		"multiSelection": true,
		"members": scopeRegionMembers
	};
	for (let i = 0; i < RegionfilterArray.length; i++)
	{
		var element=RegionfilterArray[i]
		if(element=='USA Northeast')	
		scopeRegionMembers.push('USA Northeast');
		if(element=='USA Central')	
		scopeRegionMembers.push('USA Central');
		if(element=='USA West')	
		scopeRegionMembers.push('USA West');
	
	}
	console.log('---scopeRegionMembers-------------->',customMultiRegionfilterjson);
	prism.activeDashboard.filters.$$items[1].levels[1].filter = customMultiRegionfilterjson;//change filter index according to filter number
}

function FilterOnMarketSelection(Marketfilter)
{
	let marketfilterArray  = Marketfilter.split(',') ;
	var scopemarketMembers = [];
	var customMultimarketfilterjson = {
		"explicit": true,
		"multiSelection": true,
		"members": scopemarketMembers
	};
	for (let i = 0; i < marketfilterArray.length; i++)
	{
		var element=marketfilterArray[i]
		scopemarketMembers.push(element);
	
	}
	console.log('---scopeMarketMembers-------------->',customMultimarketfilterjson);
	prism.activeDashboard.filters.$$items[1].levels[2].filter = customMultimarketfilterjson;//change filter index according to filter number
}

dashboard.on('filterschanged', function(el, args){  
    
    console.log('---- Filters Changed Event Executed ----')

	console.log(args);
    if(args.type =='update')
    {        
        if(args.items[0].hasOwnProperty('levels') == false)
        {    
            if(args.items[0].jaql.dim == '[Final_MDM.Geo_Sort]')
            {
                console.log('-----Inside [Final_MDM.Geo_Sort]-----');
                
                if(args.items[0].jaql.filter.hasOwnProperty('all') == true)
                {    
                    console.log('---all properties selected ----');
                    
                    var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
					
                    var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
					
                    var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                    var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                    var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                    var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                    var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                    var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                    var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                    var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                    
                    var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
					
					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                    
                    customCurrencyJQL.members[0] =  usaCurrency;
                    prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                    $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                    $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                }
                if(args.items[0].jaql.filter.hasOwnProperty('exclude') == true)
                {
                    console.log('---exclude properties selected ----');
                    if(args.items[0].jaql.filter.exclude.members.length == 3)
                    {
                        console.log('---exclude members selected only 3----');
                        console.log()
                        var Geoexcludefiltervalue = args.items[0].jaql.filter.exclude.members;
                        var scopeGeoMembers = [geoCAN, geoUK, geoUSA, geoNA];
                        for (let i = 0; i <= Geoexcludefiltervalue.length; i++)
                        {
                            console.log('--------------INSIDE FOR LOOP----------');



                            scopemultigeoMembers = Geoexcludefiltervalue[i];
                            if(scopemultigeoMembers == geoCAN)
                            {
                                const index = scopeGeoMembers.indexOf(scopemultigeoMembers);
                                scopeGeoMembers.splice(index, 1);



                            }
                            if(scopemultigeoMembers == geoUK)
                            {
                                const index = scopeGeoMembers.indexOf(scopemultigeoMembers);
                                scopeGeoMembers.splice(index, 1);



                            }
                            if(scopemultigeoMembers == geoUSA)
                            {
                                const index = scopeGeoMembers.indexOf(scopemultigeoMembers);
                                scopeGeoMembers.splice(index, 1);



                            }
                            if(scopemultigeoMembers == geoNA)
                            {
                                const index = scopeGeoMembers.indexOf(scopemultigeoMembers);
                                scopeGeoMembers.splice(index, 1);



                            }
                            console.log('--------------INSIDE FOR LOOP END----------');
                        }
                        console.log('--scope geo Member--');
                        console.log(scopeGeoMembers);
                        if(scopeGeoMembers == geoCAN)
                        {
                            console.log('--scope geo Member CAN--');
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;
                            
                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
							
							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(canCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(canCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                        
                            customCurrencyJQL.members[0] =  canCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                        }
                        if(scopeGeoMembers == geoUK)
                        {
                            console.log('--scope geo Member UK--');
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(ukCurrency);
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;
                            
                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;
                            
                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(ukCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(ukCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


                            customCurrencyJQL.members[0] =  ukCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').show();
                        
                        }
                        if(scopeGeoMembers == geoUSA || scopeGeoMembers == geoNA )
                        {
                            console.log('--scope geo Member USA OR NA--');
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;
                            
                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


                            customCurrencyJQL.members[0] =  usaCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                        }                                        
                                                
                    }
                    else
                    {
                        console.log('---exclude member selected less then 3 ----');
                        var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



                        var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



                        var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                        var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                        var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                        var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                        var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                        var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                        var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                        var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                        var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                        var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                        
                        var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
                        
						var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
						prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

						var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
						prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                        
                        
                        customCurrencyJQL.members[0] =  usaCurrency;
                        prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                        $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                        $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                        
                        
                    }
                }
                
                if(args.items[0].jaql.filter.hasOwnProperty('exclude') == false && args.items[0].jaql.filter.hasOwnProperty('members') == true )
                {
                    console.log('---include properties selected ----');
                    if(args.items[0].jaql.filter.members.length == 1)
                    {
                        console.log('---include properties selected member selection equal 1 ----');
						console.log(args.items[0].jaql.filter.members[0]);
						
                        if(args.items[0].jaql.filter.members[0] == geoCAN)
                        {
                            console.log('---include properties selected member selection equal 1 CAN ----');
							
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;
                            
                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;
							
                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;
							
                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;

                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
							
							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(canCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(canCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                        
                            customCurrencyJQL.members[0] =  canCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                            
                        }
						
                        if(args.items[0].jaql.filter.members[0] == geoUK)
                        {
                            console.log('---include properties selected member selection equal 1 UK ----');
							
                            
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(ukCurrency);
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;
                            
                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;
                            
                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(ukCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(ukCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


                            customCurrencyJQL.members[0] =  ukCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').show();



                        }
						
                        if(args.items[0].jaql.filter.members[0] == geoUSA)
                        {
                            console.log('---include properties selected member selection equal 1 USA ----');
                            
                            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;
                            
                            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;
                            
                            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;
                            
                            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;
                            
                            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;
                            
                            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;
                            
                            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;
                            
                            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                            
                            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
							
							var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

							var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
							prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;

                            customCurrencyJQL.members[0] =  usaCurrency;
                            prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                            $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();



                        }
                        
                    }
                    else
                    {    
                        var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



                        var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



                        var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                        var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                        var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                        var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                        var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                        var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                        var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                        var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                        var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                        var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                        var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                        
                        var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
						
						var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
						prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

						var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
						prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                        
                        customCurrencyJQL.members[0] =  usaCurrency;
                        prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
                        $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                        $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                        $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                    }
                }
            }
            
            if(args.items[0].jaql.dim == '[ARCurrency_Script.currency]')
            {
                console.log('--Inside Currency Selection--');
                if(args.items[0].jaql.filter.members == usaCurrency)
                {
                    var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



                    var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



                    var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                    var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                    var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                    var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                    var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                    var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                    var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                    var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
                    
                    var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
					
					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                }
                if(args.items[0].jaql.filter.members == ukCurrency)
                {
                    var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(ukCurrency);
                    prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



                    var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



                    var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                    var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                    var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                    var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                    var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                    var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                    var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                    var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                    var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



                    var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
					
					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(ukCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                }
                if(args.items[0].jaql.filter.members == canCurrency)
                {
                    var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



                    var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



                    var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



                    var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



                    var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



                    var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



                    var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



                    var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



                    var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



                    var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



                    var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



                    var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



                    var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



                    var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
                    prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;
					
					var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

					var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(canCurrency);                    
					prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
                }                
                
            }        
            
        }
    }
        
});

function  widgetDelinquentlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Delinquent local USD Currency--');
    if(currency == canCurrency || currency ==ukCurrency )
    {
		prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].agg = 'sum';
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
		prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].agg = 'sum';
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].jaql.context["[AD74A-BCE]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0];
    console.log('---End Convert Widget Delinquent local USD Currency--');
}

function  widgetCurrentlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Current local USD Currency--');
    if(currency ==canCurrency|| currency == ukCurrency )
    {
		prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].agg = 'sum';
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
		prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].agg ='sum';
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].jaql.context["[6BF12-329]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0];
    console.log('---End Convert Widget Current local USD Currency--');
}

function  widgetTotallocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Total local USD Currency--');
    if(currency == canCurrency || currency ==ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].jaql.context["[8176A-F48]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0];
    console.log('---End Convert Widget Total local USD Currency--');
}

function  widgetDelinquentAgingFirstlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Delinquent Aging First local USD Currency--');
    if(currency == canCurrency || currency ==ukCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].jaql.context["[ACC45-924]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1];
    console.log('---End Convert Widget Delinquent Aging First local USD Currency--');
}

function  widgetDelinquentAgingSecondlocalUSDCurrency(currency) {
	
    console.log('---Start Convert Widget Delinquent Aging Second local USD Currency--');
	
    if(currency == canCurrency || currency == ukCurrency)
    {
		console.log('---Selected Currrency--' +  currency);
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
		console.log('---Selected Currrency--' +  currency);
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].jaql.context["[B4706-1A6]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1];
	
    console.log('---End Convert Widget Delinquent Aging Second local USD Currency--');
}

function  widgetAgingByGeoSecondlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Aging By Geo Second local USD Currency--');
    if(currency == canCurrency || currency ==ukCurrency )
    {
		console.log('---Selected Currrency--' +  currency);
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].column ='Local_TotalBalance';
 
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
		console.log('---Selected Currrency--' +  currency);
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].jaql.context["[77728-511]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].jaql.context["[CAE31-5D1]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].jaql.context["[EF064-235]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].jaql.context["[8F7CA-AC7]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].dim ='[Custom_AR_Data.Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].jaql.context["[A11A2-D8E]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[3].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1].items[4].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1];
    console.log('---End Convert Widget Aging By Geo Second local USD Currency--');
}

function  widgetPivotagingByGeolocalUSDCurrency(currency) {

    console.log('---Start Convert Widget Pivot Aging By Geo local USD Currency--');

    if(currency == canCurrency || currency ==ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].column ='Local_TotalBalance';

    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[0].jaql.context["[E9CBC-D7A]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[1].jaql.context["[69D9E-FED]"].column ='Total  Open Balance';
                
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1].items[3].jaql.context["[5D39E-AB2]"].column ='Total  Open Balance';
		
		
       
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1];

    console.log('---End Convert Widget Pivot Aging By Geo local USD Currency--');
}

function  widgetAccountsReceivablesDailyTrendlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Accounts Receivables - Daily Trend local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].column ='Local_TotalBalance';
        
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
            
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
            
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].column ='Total  Open Balance';
                
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';        
            
    }
    return prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1];
    console.log('---End Convert Widget Accounts Receivables - Daily Trend local USD Currency--');
}

function  widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Accounts Receivables - Monthly Trend local USD Currency--');
 
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].column ='Local_TotalBalance';
        
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].jaql.context["[CB7C6-7A5]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].jaql.context["[83DC1-CE5]"].column ='Total  Open Balance';
                
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';        
            
    }
    return prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1];
    console.log('---End Convert Widget Accounts Receivables - Monthly Trend local USD Currency--');
}


function  widgetRecentDelinquentlastdayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].jaql.context["[4CFEB-A8B]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0];
    console.log('---End Convert Widget Recent Delinquent last 7 days local USD Currency--');
}

function  widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Recent Delinquent last 7 days Second local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1];
    console.log('---End Convert Widget Recent Delinquent last 7 days Second local USD Currency--');
}

function  widgetTotalRecentDelinquentlastdayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Total Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].jaql.context["[B4E73-C50]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0];
    console.log('---End Convert Widget Total Recent Delinquent last 7 days local USD Currency--');
}

function  widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Total Second Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].jaql.context["[D0D07-393]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1];
    console.log('---End Convert Widget Total Second Recent Delinquent last 7 days local USD Currency--');
}



function  widgetpivotRecentDelinquentlastdayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget pivot first Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1];
    console.log('---End Convert Widget pivot first Recent Delinquent last 7 days local USD Currency--');
}



function  widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget pivot second Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1];
    console.log('---End Convert Widget pivot second Recent Delinquent last 7 days local USD Currency--');
}

function  widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(currency) {
    console.log('---Start Convert Widget Accounts Receivables - Daily Trend local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].column ='Local_TotalBalance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].column ='Local_TotalBalance';
        
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].format.mask.currency.symbol ='C$';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].format.mask.currency.symbol ='C$';
            
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].format.mask.currency.symbol ='£';
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].jaql.context["[3BE78-A87]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].jaql.context["[2E91B-BEF]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].jaql.context["[9A8A2-866]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].jaql.context["[75F77-2BC]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].jaql.context["[EFDEE-0AE]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].jaql.context["[39BAC-0C3]"].column ='Total  Open Balance';
        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].jaql.context["[5427D-BCA]"].column ='Total  Open Balance';
                
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[1].format.mask.currency.symbol ='$';        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[2].format.mask.currency.symbol ='$';        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[3].format.mask.currency.symbol ='$';        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[4].format.mask.currency.symbol ='$';        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[6].format.mask.currency.symbol ='$';        
        prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1].items[7].format.mask.currency.symbol ='$';        
            
    }
    return prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1];
    console.log('---End Convert Widget Accounts Receivables - Daily Trend local USD Currency--');
}

function  widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget piechart second Recent Delinquent last 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].jaql.context["[B4E73-C50]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1];
    console.log('---End Convert Widget piechart second Recent Delinquent last 7 days local USD Currency--');
}

function  widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(currency) {
    console.log('---Start Convert Widget pie chart Delinquent next 7 days local USD Currency--');
    if(currency == canCurrency || currency == ukCurrency )
    {
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title = 'Total Local_TotalBalance';    
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim = '[Custom_AR_Data.Local_TotalBalance]';
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Local_TotalBalance';
        if(currency == canCurrency)
        {
            prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].format.mask.currency.symbol ='C$';
        }
        else
        {
            prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].format.mask.currency.symbol ='£';
        }
    }
    if(currency == usaCurrency)
    {
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].title ='Total Total  Open Balance';    
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].dim ='[Custom_AR_Data.Total  Open Balance]';
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].table ='Custom_AR_Data';    
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].jaql.context["[4CFEB-A8B]"].column ='Total  Open Balance';
        prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1].items[0].format.mask.currency.symbol ='$';
    }
    return prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1];
    console.log('---End Convert Widget pie chart Delinquent next 7 days local USD Currency--');
}


dashboard.on('widgetprocessresult', function(el, args){     



    if(args.reason == 'dashboardrefresh' )// && args.widget.type == 'header_P&L'  )
    {
		console.log('------------Dashboard level widget process result -------------');
		
		
		customDate_Pulled.members[0] =  defualtFilters.maxDate;
        prism.activeDashboard.filters.$$items[0].jaql.filter = customDate_Pulled; 
		
        if(prism.activeDashboard.filters.$$items[1].levels[0].filter.hasOwnProperty('all') == true)
        {
                        
            var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



            var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



            var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



            var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



            var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



            var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



            var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



            var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



            var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



            var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



            var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



            var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



            var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



            var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



            var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



            var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
            prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;
			
			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;
            
            $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
            $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
            $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
        }
        else
        {
            if(prism.activeDashboard.filters.$$items[1].levels[0].filter.members.length == 1)
            {
                if(prism.activeDashboard.filters.$$items[1].levels[0].filter.members.includes(geoUSA) == true)
                {
                    $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                    $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                    $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                }
                if(prism.activeDashboard.filters.$$items[1].levels[0].filter.members.includes(geoUK) == true)
                {
                    $('.uc-checker-content span[title=" GBP"]').parents('.list-item').show();
                    $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                    $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                }
                if(prism.activeDashboard.filters.$$items[1].levels[0].filter.members.includes(geoCAN) == true)
                {
                    $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                    $('.uc-checker-content span[title="CAD"]').parents('.list-item').show();
                    $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
                }
            }
            else
            {
                $('.uc-checker-content span[title=" GBP"]').parents('.list-item').hide();
                $('.uc-checker-content span[title="CAD"]').parents('.list-item').hide();
                $('.uc-checker-content span[title="  USD"]').parents('.list-item').show();
            }
        }
        
        console.log('------------End Dashboard level widget process result -------------');
    }
});




function FilterOnGeoSelection(Geofiltervalue,CurrencyFilter)
{
	console.log('-----Inside FilterOnGeoSelection---');
	if(Geofiltervalue =='USA')
	{
		console.log('-----Inside FilterOnGeoSelection USA--');
		customGeofilterjson.members[0] =  geoUSA;
		prism.activeDashboard.filters.$$items[1].levels[0].filter = customGeofilterjson;//change filter index according to filter number
		if(CurrencyFilter == 'USD')
		{
			var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



			var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



			var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



			var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



			var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



			var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



			var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



			var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



			var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


			customCurrencyJQL.members[0] =  usaCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

		}

	}
	if(Geofiltervalue =='UK')
	{
		console.log('-----Inside FilterOnGeoSelection UK--');
		customGeofilterjson.members[0] =  geoUK;        
		prism.activeDashboard.filters.$$items[1].levels[0].filter = customGeofilterjson;//change filter index according to filter number   

		if(CurrencyFilter == 'USD')
		{
			var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



			var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



			var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



			var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



			var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



			var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



			var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



			var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



			var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


			customCurrencyJQL.members[0] =  usaCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

		}
		if(CurrencyFilter == 'GBP')
		{
			var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(ukCurrency);
			prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



			var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



			var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



			var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



			var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



			var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



			var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



			var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



			var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



			var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



			var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(ukCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


			customCurrencyJQL.members[0] =  ukCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

		}



	}
	if(Geofiltervalue =='CAN')
	{
		console.log('-----Inside FilterOnGeoSelection CAN--');
		customGeofilterjson.members[0] =  geoCAN;        
		prism.activeDashboard.filters.$$items[1].levels[0].filter = customGeofilterjson;//change filter index according to filter number

		if(CurrencyFilter == 'USD')
		{
			var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



			var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



			var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



			var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



			var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



			var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



			var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



			var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



			var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;

			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(usaCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;


			customCurrencyJQL.members[0] =  usaCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

		}

		if(CurrencyFilter == 'CAN')
		{
			var widgetdelinquentlocalUSDCurrency = widgetDelinquentlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651355fe3c21288ca4fd2c'].metadata.panels[0] = widgetdelinquentlocalUSDCurrency;



			var widgetcurrentlocalUSDCurrency = widgetCurrentlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265135bfe3c21288ca4fd2e'].metadata.panels[0] = widgetcurrentlocalUSDCurrency;



			var widgettotallocalUSDCurrency = widgetTotallocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651338fe3c21288ca4fd29'].metadata.panels[0] = widgettotallocalUSDCurrency;



			var widgetdelinquentAgingFirstlocalUSDCurrency = widgetDelinquentAgingFirstlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6325a9cb633b6026047e52b2'].metadata.panels[1] = widgetdelinquentAgingFirstlocalUSDCurrency;



			var widgetdelinquentAgingSecondlocalUSDCurrency = widgetDelinquentAgingSecondlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63088662da164c4684b89e1b'].metadata.panels[1] = widgetdelinquentAgingSecondlocalUSDCurrency;



			var widgetagingByGeoSecondlocalUSDCurrency = widgetAgingByGeoSecondlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328706c78f61204389b92f3'].metadata.panels[1] = widgetagingByGeoSecondlocalUSDCurrency;



			var widgetpivotagingByGeolocalUSDCurrency = widgetPivotagingByGeolocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6265147bfe3c21288ca4fd4f'].metadata.panels[1] = widgetpivotagingByGeolocalUSDCurrency;



			var widgetaccountsReceivablesDailyTrendlocalUSDCurrency = widgetAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['62651484fe3c21288ca4fd53'].metadata.panels[1] = widgetaccountsReceivablesDailyTrendlocalUSDCurrency;



			var widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency = widgetAccountsReceivablesMonthlyTrendlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['635faa1a811010285ce5125f'].metadata.panels[1] = widgetaccountsReceivablesMonthlyTrendlocalUSDCurrency;



			var widgetrecentDelinquentlastdayslocalUSDCurrency = widgetRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a81633e3773c406b50e7'].metadata.panels[0] = widgetrecentDelinquentlastdayslocalUSDCurrency;



			var widgetrecentDelinquentlastdaysSecondlocalUSDCurrency = widgetRecentDelinquentlastdaysSecondlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6a86a33e3773c406b50ee'].metadata.panels[1] = widgetrecentDelinquentlastdaysSecondlocalUSDCurrency;



			var widgettotalRecentDelinquentlastdayslocalUSDCurrency = widgetTotalRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab4733e3773c406b5125'].metadata.panels[0] = widgettotalRecentDelinquentlastdayslocalUSDCurrency;



			var widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency = widgetTotalSecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['63b6ab7133e3773c406b512b'].metadata.panels[1] = widgettotalSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotRecentDelinquentlastdayslocalUSDCurrency = widgetpivotRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea1b81a7615b602bbd48'].metadata.panels[1] = widgetPivotRecentDelinquentlastdayslocalUSDCurrency;



			var widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency = widgetpivotsecondRecentDelinquentlastdayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6328775378f61204389b93bf'].metadata.panels[1] = widgetpivotSecondRecentDelinquentlastdayslocalUSDCurrency;



			var widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency = widgetpivotLastAccountsReceivablesDailyTrendlocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['6305c5f5da164c4684b893ef'].metadata.panels[1] = widgetPivotLastAccountsReceivablesDailyTrendlocalUSDCurrency;

			var widgetpiechartdDelinquentNextSevendayslocalUSDCurrency = widgetpieChartdDelinquentNextSevendayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640744b67a2eff10d4bc0671'].metadata.panels[1] = widgetpiechartdDelinquentNextSevendayslocalUSDCurrency;

			var widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency = widgetsecondpieChartdDelinquentlastSevendayslocalUSDCurrency(canCurrency);                    
			prism.activeDashboard.widgets.$$widgetsmap['640eea2c81a7615b602bbd4a'].metadata.panels[1] = widgetSecondpieChartdDelinquentlastSevendayslocalUSDCurrency;



			customCurrencyJQL.members[0] =  canCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;

		}

	}
}




function FilterOnMultiGeoSelection(Geofiltervalue,CurrencyFilter)
{
            let GeofilterArray      = Geofiltervalue.split(',') ;
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
            prism.activeDashboard.filters.$$items[1].levels[0].filter = customMultiGeofilterjson;//change filter index according to filter number
			customCurrencyJQL.members[0] =  usaCurrency;
			prism.activeDashboard.filters.$$items[2].jaql.filter = customCurrencyJQL;
        
}


var defaultFilterConfig = {

	dim1: "[Custom_AR_Data.Date Pulled]"

};

var defaultFilterConfigCalendar = {
	
	dim1: defaultFilterConfig.dim1.replace("]", " (Calendar)]")

};


/**** Set Date Pulled Filter to the latest date available ****/
dashboard.on('initialized', function(d, args) {

	//print out all dimensions
	

	for(var i=0; i<args.dashboard.filters.$$items.length; i++) {

		if(args.dashboard.filters.$$items[i].levels != null) { //this is for dependent filters

			for(var j=0; j<args.dashboard.filters.$$items[i].levels.length; j++) {

				console.log(args.dashboard.filters.$$items[i].levels[j].dim);

			}

		}

		else { //normal filters

			console.log(args.dashboard.filters.$$items[i].jaql.dim);

		}

	}
	


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

			//find the date that is most up to date based on today

			for(var x=0; x<result.values.length; x++) {

				if(result.values[x][0].substring(0,10) <= (new Date()).toUTCString().substring(0,10)) {

					break;
				}

			}
			


			for(var i=0; i<args.dashboard.filters.$$items.length; i++) {

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

				else if(defaultFilterConfigCalendar.dim1 === args.dashboard.filters.$$items[i].jaql.dim) { //this is for normal filters
					
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',result.values[x][0]);
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',convertDateFormate(result.values[x][0]));
					defualtFilters.maxDate = convertDateFormate(result.values[x][0]);
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> defualtFilters.maxDate',defualtFilters.maxDate);
					args.dashboard.filters.$$items[i].jaql.filter = {

						explicit: true,

						members:[result.values[x][0]],

						multiSelection: false,

						userMultiSelect: false

					};

				}

			}

		},

		contentType: "application/json; charset=utf-8",

		dataType: "json"

	});

});


function convertDateFormate(dateValue) {
	var date = new Date(dateValue),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	return [ mnth,day,date.getFullYear().toString().substr(-2)].join("/");
}