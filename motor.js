$(document).ready(function(){

    getMotor()
    
    function getMotor() {
      var url = 'https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivity/QueryAll'
      $.getJSON(url, function (data) {
      // Create the chart
        var reData = data.map(value => {
          var timeStamp = moment(value.timeStamp, 'YYYYMMDD-hhmmss.SSS').valueOf()//.format('x')
          var val = value.voltage['0']['sensorValue']
          return [timeStamp, Math.abs(val) ]
        }).reverse()
        console.warn(reData);
        Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
        Highcharts.stockChart('container', {
          // rangeSelector: {
          //   selected: 0.0001,
          // },

          title: {
            text: 'test'
          },

          xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
              
          }
      },

          series: [{
            name: 'Voltage',
            data: reData,
            tooltip: {
                valueDecimals: 1
            }
          }]
        });

      });
    }

    setInterval(function(){
      getMotor()
    },2000)
});