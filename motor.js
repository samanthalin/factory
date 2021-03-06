$(document).ready(function() {

    var url = "http://140.124.184.204:8080/Cloud/Iotivity/QueryAll",
          container = $("#container"),
          voltage = [];
      $.ajax({
        "url" : url,
        "type" : "get",
        "dataType" : "json"
      }).done(function(data){
        container.text("Parsing Data...");
        voltage = parseData(data);
        createChart();  
      })


      var parseData = function(data, series){
        var tempdata = [];
        for(i = data.length - 1;i >= 0 ; i--){
          var freq = data[i],
              timestamp = freq.timeStamp.replace("-","").replace(".",""),
              temp = [],
              dFormat = [4,2,2,2,2,2,3],
              idx = 0;
          dFormat.map(function(x,y){
            var val = parseInt(timestamp.substr(idx,x));
            temp.push(val);
            idx = idx + x;
          })
          var ts = Date.UTC(temp[0],temp[1]-1,temp[2],temp[3]-8,temp[4],temp[5],temp[6]),
              val = parseFloat(freq.voltage[0].sensorValue.toFixed(3));
          tempdata.push([ts, val]);
        }
        return tempdata;
      }

      Highcharts.setOptions({
          global: {
              useUTC: false
          }
      });

      var createChart = function(){
        container.text("Loading Chart...");

      // Create the chart
        Highcharts.stockChart('container', {
            chart: {
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                          $.ajax({
                            "url" : url,
                            "type" : "get",
                            "dataType" : "json"
                          }).done(function(data){
                            dt = parseData(data);
                            series.setData(dt,true,"mixed",true);
                          }) 
                        }, 100);
                    }
                }
            },

          // title: {
          //     text: 'Machine Voltage'
          // },

          exporting: {
              enabled: false
          },

          series: [{
              name: 'Machine Voltage',
              data: voltage
          }]
      });
    }
});