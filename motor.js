$(document).ready(function() {

    var url = "https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivity/QueryAll",
        container = $("#container"),
        voltage = [];
    $.ajax({
        "url": url,
        "type": "get",
        "dataType": "json"
    }).done(function(data) {
        container.text("Parsing Data...");
        voltage = parseData(data);
        createChart();
    })


    var parseData = function(data, series) {
        var tempdata = [];
        for (i = data.length - 1; i >= 0; i--) {
            var freq = data[i],
                timestamp = freq.timeStamp.replace("-", ""),
                temp = "",
                dFormat = [4, 2, 2, 2, 2, 6],
                spacer = ["-", "-", " ", ":", ":", ""],
                idx = 0;
            dFormat.map(function(x, y) {
                temp = temp + timestamp.substr(idx, x) + spacer[y];
                idx = idx + x;
            })
            var ts = new Date(temp).getTime(),
                val = Math.abs(parseFloat(freq.voltage[0].sensorValue.toFixed(3)));
            tempdata.push([ts, val]);
        }
        return tempdata;
    }

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var createChart = function() {

        // Create the chart
        Highcharts.stockChart('container', {
            chart: {
                events: {
                    load: function() {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            $.ajax({
                                "url": url,
                                "type": "get",
                                "dataType": "json"
                            }).done(function(data) {
                                dt = parseData(data);
                                series.setData(dt, true, "mixed", true);
                            })
                        }, 100);
                    }
                }
            },

            // title: {
            //     text: '電壓-微秒'
            // },

            exporting: {
                enabled: true,
            },

            series: [{
                name: 'Machine Voltage',
                data: voltage
            }]
        });
    }
});