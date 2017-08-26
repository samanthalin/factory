$(document).ready(function(){

  var currentDate = Math.round(new Date().getTime());

  // var urlWsnPage =
  //   'https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivityalarm/Count?epoch='+currentDate;

  // var fetchWsnPage = url => {
  //   return fetch(url).then(resp => resp.json()).then(function(wsn_page) {
  //     console.log(wsn_page);
  //     appendWsnPage(wsn_page);
  //   });
  // };

  // fetchWsnPage(urlWsnPage);

  // function appendWsnPage(wsn_page) {
  //   var div = document.querySelector(".page-count");
  //   // console.log(wsn_page.length);
  //   wsn_page.forEach(e => {
  //     var temperature = String(e.temperature);
  //     var mote = String(e.mote);
  //     div.innerHTML += `
  //   Time: ${moment(e.timeStamp*1000).format('YYYY/MM/DD HH:mm:ss')} &nbsp &nbsp
  //   溫度感測器 ${mote}&nbsp &nbsp
  //    ${e.message}(${temperature} &#8451;)
  //   <hr>
  // `
  //   });
  // }

  // var urlMotorAlarm = 
  //   "https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/Iotivityalarm/QueryAll";

  // var fetchDataMotorAlarm = url => {
  //   return fetch(url).then(resp => resp.json()).then(function(data_motor) {
  //     console.log(data_motor);
  //     appendMotorAlarm(data_motor);
  //   });
  // };

  // fetchDataMotorAlarm(urlMotorAlarm);

  // function appendMotorAlarm(data_motor) {
  //   var div = document.querySelector("#motorAlarm");
  //   data_motor.forEach(e => {
  //     var state = String(e.state);
  //     var reason = String(e.reason);
  //     //var time = String(e.timeStamp);
  //     div.innerHTML += `
  //     Time: ${moment(e.time).format('YYYY/MM/DD HH:mm:ss')} &nbsp &nbsp
  //     馬達 &nbsp &nbsp
  //     ${e.message}
  //   <hr>
  // `
  //   });
  // }
  var corsProxyServer = 'https://blahdns-proxy-eusudefuvv.now.sh/';
  var ntutCsieServer = 'http://140.124.184.204:8080/Cloud/'
  var date = moment("2017-08-23").format('x')
  var page = 0
  //WSNalarm or Iotivityalarm
  // var alarmType = 'Iotivityalarm'
  
  var result = {}

  var fetchDataWsnAlarm = (alarmType) => {
    var url =
    corsProxyServer + ntutCsieServer + alarmType +'/QueryByDate?epoch=' + date + '&page=' + page;
    return fetch(url).then(resp => resp.json()).then(
      function(resultArray) {
        console.warn('ajax go')
        switch (alarmType) {
          case 'WSNalarm': {
            result = resultArray.map((item, index) => {
              return {
                idx: 100 * page + index + 1,
                time: moment(item.timeStamp*1000).format('YYYY/MM/DD HH:mm:ss'),
                moto: String(item.mote),
                temperature: String(item.temperature),
                msg: item.message
              }
            })
            break
          }
          case 'Iotivityalarm': {
            result = resultArray.map((item, index) => {
              return {
                idx: 100 * page + index + 1,
                time: item.timeStamp,
                msg: item.message
              }
            })
            break  
          }
        }

        // result = data_wsn
        console.warn(result)
        example1.alarmType = alarmType
        example1.items = result
      }
    );
  };

  fetchDataWsnAlarm('WSNalarm');
  var example1 = new Vue({
    el: '#wsnAlarm',
    data: {
      items: result
    }
  })

  // function appendWsnAlarm(data_wsn) {
  //   var div = document.querySelector("#wsnAlarm");
  //   data_wsn.forEach(e => {
  //     var temperature = String(e.temperature);
  //     var mote = String(e.mote);
  //     div.innerHTML += `
  //   Time: ${moment(e.timeStamp*1000).format('YYYY/MM/DD HH:mm:ss')} &nbsp &nbsp
  //   溫度感測器 ${mote}&nbsp &nbsp
  //    ${e.message}(${temperature} &#8451;)
  //   <hr>
  // `
  //   });
  // }
  var selectorChangeHandler = new Vue({
    el: '#select_cat',
    data: {
      name: 'Vue.js'
    },
    // define methods under the `methods` object
    methods: {
      greet: function (event) {
        console.warn(event.target.value)
        fetchDataWsnAlarm(event.target.value)
      }
    }
  })

  
  // console.log($('#select_cat').val());
  
  // var selectA = $('#select_cat, #select_time')
  // selectA.on('click, change', regenerateData)

  // function regenerateData (){
  //   var v = $('#select_cat option:selected').val();
  // console.log(v);
  // }

  // $('button').click(function(){

  // });

});