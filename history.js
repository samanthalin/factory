$(document).ready(function(){
   
    // var data = '';
    $('#getData').on('click', selectedHistory)
    
    function selectedHistory(){
      var date = $('#date').val();
      var time = $('#time').val();
      var dateTime = date+' '+time
      var convertedTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('x')
      convertedTime = convertedTime/1000

      console.log('OrginTime:'+ dateTime + 'ConvertedTime:' + convertedTime );
      getHistory(convertedTime)
    }

  
    function getHistory(dateTime) {
      var url = 'https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivity/QuerySecond?minute='+dateTime
      $.getJSON(url, function (data) {
      // Create the chart
        var reData = data.map(value => {
          var timeStamp = moment(value.timeStamp, 'YYYYMMDD-HHmmss.SSS').valueOf()//.format('x')
          var val = value.voltage['0']['sensorValue']
          return [timeStamp, Math.abs(val) ]
        }).reverse()
        console.warn(reData)
        Highcharts.stockChart('showData', {


          // rangeSelector: {
          //   selected: 
          // },

          title: {
            text: 'test'
          },

          series: [{
            name: 'Voltage',
            data: reData,
            tooltip: {
                valueDecimals: 2
            }
          }]
        });
      });


      // fetch(url).then(resp => resp.json()).then(function(d) {
      // var div = document.querySelector('#showData')
      // console.log(d)
      //   // data = d;
      // d.forEach(e => {
      //   div.innerHTML += `<p>voltage: ${e.voltage['0']['sensorValue']}</p> `
      //   })
      // });
    }
    

    
});