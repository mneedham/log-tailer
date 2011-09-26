var chart; // global

        /**
         * Request data from the server, add it to the graph and set a timeout to request again
         */
        function requestData() {
	  if(chart !== undefined) {
		var series = chart.series[0],
	    shift = series.data.length > 20; // shift if the series is longer than 20

		// add the point
		var point = 2;
		chart.series[0].addPoint(eval(point), true, shift);

		// call it again after one second
		setTimeout(requestData, 1000);
} else {  setTimeout(requestData, 1000); }
	}

        $(document).ready(function() {
           var options = {
                chart: {
                    renderTo: 'container',
                    defaultSeriesType: 'spline',
                    events: {
                        load: requestData
                    }
                },
                title: {
                    text: 'Live random data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150,
                    maxZoom: 20 * 1000
                },
                yAxis: {
                    minPadding: 0.2,
                    maxPadding: 0.2,
                    title: {
                        text: 'Value',
                        margin: 80
                    }
                },
                series: [{
                    name: 'Random data',
                    data: []
                }]
            };
            chart = new Highcharts.Chart(options);
        });
