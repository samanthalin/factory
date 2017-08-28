// $(document).ready(function(){

//     function drawMotorNews() {
//       var url = 'https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivity/QueryAll'
//       $.getJSON(url, function (data) {
//       // Create the chart
//         var reData = data.map(value => {
//           var timeStamp = moment(value.timeStamp, 'YYYYMMDD-hhmmss.SSS').valueOf()//.format('x')
//           var val = value.voltage['0']['sensorValue']
//           return [timeStamp, Math.abs(val) ]
//         }).reverse()
//         console.warn(reData);
//         Highcharts.setOptions({
// 		    global: {
// 		        useUTC: false
// 		    }
// 		});
//         Highcharts.stockChart('container', {
//           // rangeSelector: {
//           //   selected: 
//           // },

//           title: {
//             text: 'test'
//           },

//           xAxis: {
// 	        type: 'datetime',
// 	        dateTimeLabelFormats: {
	            
// 	        }
// 	    },

//           series: [{
//             name: 'Voltage',
//             data: reData,
//             tooltip: {
//                 valueDecimals: 1
//             }
//           }]
//         });

//       });


//       // fetch(url).then(resp => resp.json()).then(function(d) {
//       // var div = document.querySelector('#showData')
//       // console.log(d)
//       //   // data = d;
//       // d.forEach(e => {
//       //   div.innerHTML += `<p>voltage: ${e.voltage['0']['sensorValue']}</p> `
//       //   })
//       // });
//     }
    

// });

$(document).ready(function(){
   
    // var data = '';
    // $('#getData').on('click', selectedHistory)
    
    // function selectedHistory(){
    //   var date = $('#date').val();
    //   var time = $('#time').val();
    //   var dateTime = date+' '+time
    //   var convertedTime = moment(dateTime, 'YYYY-MM-DD hh:mm:ss').format('x')
    //   // convertedTime = convertedTime/1000

    //   console.log('OrginTime:'+ dateTime + 'ConvertedTime:' + convertedTime );
    //   getHistory(convertedTime)
    // }
    getHistory()
    
    function getHistory() {
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
          //   selected: 
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
});