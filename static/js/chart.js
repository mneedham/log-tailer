var chart; // global

        /**
         * Request data from the server, add it to the graph and set a timeout to request again
         */
        function requestData() {
          var socket = io.connect('http://localhost:9000');
          socket.on('tail', function (data) {
	    if(chart !== undefined) {
	      var series = chart.series[0], shift = series.data.length > 20; // shift if the series is longer than 20
     	      var point = 2;
              chart.series[0].addPoint(eval(point), true, shift);
            } 
          });
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
