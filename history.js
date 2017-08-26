$(document).ready(function(){
	 
	  
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
	    var url = 'https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/WSNalarm/QueryByDate?epoch='+dateTime+'&page=0'
	    fetch(url).then(resp => resp.json()).then(function(d) {
	    var div = document.querySelector('#showData')
	    console.log(d)
	    d.forEach(e => {
	      div.innerHTML += `<p> ID: ${e.id} </p> `
		    })
	    });
	  }

	  
});