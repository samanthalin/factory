$(document).ready(function(){
  var corsProxyServer = 'https://blahdns.herokuapp.com/';
  var ntutCsieServer = 'http://140.124.184.204:8080/Cloud/'
  var date = moment().format('x')//moment("2017-08-23").format('x')
  var page = 1
  var totalAlarmCount = 0
  var totalPages = 1

  //WSNalarm or Iotivityalarm
  // var alarmType = 'Iotivityalarm'
  var dateType = 'today'
  var alarmType = 'WSNalarm'
  var result = {}

  var fetchAlarmData = (alarmType, date) => {
    // console.warn(alarmType, moment(date, 'x').format('YYYY-MM-DD'))
    var url =
    corsProxyServer + ntutCsieServer + alarmType +'/QueryByDate?epoch=' + date + '&page=' + (page - 1);
    return fetch(url).then(resp => resp.json()).then(
      function(resultArray) {
        // console.warn('ajax go')
        switch (alarmType) {
          case 'WSNalarm': {
            result = resultArray.map((item, index) => {
              return {
                idx: 100 * (page - 1) + index + 1,
                time: moment(item.timeStamp*1000).format('YYYY/MM/DD HH:mm:ss'),
                moto: String(item.mote),
                temperature: Math.round(item.temperature * 100) /100,
                msg: item.message
              }
            })
            break
          }
          case 'Iotivityalarm': {
            result = resultArray.map((item, index) => {
              return {
                idx: 200 * (page - 1) + index + 1,
                time: item.timeStamp,
                msg: item.message
              }
            })
            break  
          }
        }

        alarmTable.type = alarmType
        alarmTable.items = result
      }
    );
  };

  var fetchAlarmCount = (alarmType, date) => {
    //console.warn(alarmType, moment(date, 'x').format('YYYY-MM-DD'))
    var url =
    corsProxyServer + ntutCsieServer + alarmType +'/Count?epoch=' + date
    return fetch(url).then(resp => resp.json()).then(
      function(result) {
        //console.warn('count:' + result.count)
        totalAlarmCount = result.count
        totalPages = (alarmType === 'WSNalarm' ? totalAlarmCount / 100 : totalAlarmCount / 200) + 1
        var pageArray = function(){
          var arr = []
          for(var i = 1; i<= totalPages; i++) {
            arr.push(i)
          }
          return arr
        }()
        pageButtonComponent.pages = pageArray
        //console.warn(pageArray)
        // alarmTable.type = alarmType
        // alarmTable.items = result
      }
    );
  };



  

  // 顯示所有資料的表格
  var alarmTable = new Vue({
    el: '#alarmTable',
    data: {
      items: result
    }
  })

  // 月曆選日期
  var datePicker = new Vue({
    el: '#datepicker',
    data: {
      dateType
    },
    methods: {
      greet: function (event) {
        //console.warn(event.target.value)
        date =  moment(event.target.value, 'YYYY-MM-DD').format('x')
      }
    }
  })

  // 
  var alarmTypeChangeHandler = new Vue({
    el: '#select_cat',
    methods: {
      greet: function (event) {
        alarmType = event.target.value
      }
    }
  })
  var dateTypeChangeHandler = new Vue({
    el: '#select_time',
    methods: {
      greet: function (event) {
        datePicker.dateType = event.target.value
        if (event.target.value === 'today') {
          date = moment().format('x')
        } else {
          date = moment("2017-08-23").format('x')
        }
        // console.warn(event.target.value)
        // fetchAlarmData(event.target.value)
      }
    }
  })
  var buttonHandler = new Vue({
    el: '#get_button',
    methods: {
      greet: function (event) {
        // console.warn(event.target.value)
        event.preventDefault()
        fetchAlarmCount(alarmType, date)
        fetchAlarmData(alarmType, date)

      }
    }
  })

  // page buttons
  var pageButtonComponent = new Vue({
    el: '#page_buttons',
    data: {
      pages: [1]
    },
    methods: {
      greet: function (p) {
        page = p
        // event.preventDefault()
        fetchAlarmCount(alarmType, date)
        fetchAlarmData(alarmType, date)
        
      }
    }
  })  
  
  // init fetch
  fetchAlarmCount(alarmType, date)
  fetchAlarmData(alarmType, date)
});