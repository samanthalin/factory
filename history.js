$(document).ready(function() {

    $('#getData').on('click', selectedHistory)

    function selectedHistory() {
        var date = $('#date').val();
        var time = $('#time').val();
        var dateTime = date + ' ' + time
        var convertedTime = moment(dateTime, 'YYYY-MM-DD hh:mm:ss').format('x')
            // convertedTime = convertedTime/1000

        //console.log('OrginTime:' + dateTime + 'ConvertedTime:' + convertedTime);
        getMotorHistory(convertedTime)
    }


    function getMotorHistory(dateTime) {
        var url = 'https://blahdns.herokuapp.com/http://140.124.184.204:8080/Cloud/Iotivity/QuerySecond?second=' + dateTime
        $.getJSON(url, function(data) {
            // Create the chart
            var reData = data.map(value => {
                var timeStamp = moment(value.timeStamp, 'YYYYMMDD-hhmmss.SSS').valueOf() //.format('x')
                var val = value.voltage['0']['sensorValue']
                return [timeStamp, Math.abs(val)]
            }).reverse()
            //console.warn(reData);
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            Highcharts.stockChart('showData', {
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

    $('#getWsn').on('click', selected)

    function selected() {
        var date = $('#date-w').val();
        var convertedDate = moment(date, 'YYYY-MM-DD').format('x')
        var mote = $('#select_wsn').val()
        getWsnHistory(convertedDate, mote)
    }

    function getWsnHistory(date, mote) {
        var url = 'https://blahdns.herokuapp.com/http://140.124.184.204:8080/Cloud/WSN/queryDate?epoch='+date+'&mote='+mote
        console.log(url)
        $.getJSON(url, function(data) {
            // Create the chart
            var reData = data.map(value => {
                    var timeStamp = moment(value.timeStamp * 1000).valueOf()
                    var temperature = Math.round(value.temperature*100)/100
                    return [timeStamp, temperature]
                })
                // console.warn(reData);
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            Highcharts.stockChart('showWsn', {
                // rangeSelector: {
                //   selected: 
                // },

                title: {
                    text: 'test'
                },

                xAxis: {
                    type: 'datetime',
                    
                },

                series: [{
                    name: 'temperature',
                    data: reData,
                    tooltip: {
                        valueDecimals: 1
                    }
                }]
            });

        });
    }
});