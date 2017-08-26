//
$(document).ready(function(){

	var urlWsnNews = "https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/WSN/NewestData";

	var fetchWsnNews = url => {
		return fetch(url).then(resp => resp.json()).then(function(wsn_news) {
			console.log(wsn_news);
			appendWsnNews(wsn_news);
		});
	};
	function appendWsnNews(wsn_news) {
		var getDiv = function(id) {
			return document.querySelector('#'+id+'_data')
		}
		wsn_news.forEach(e => {
		var temperature = String(e.temperature);
		var mote = String(e.mote);
		var id = String(e.id);
		console.log(id);
		var div = getDiv(mote.slice(18, 22));
		div.innerHTML += `
			id:${id}<br>
			現在溫度 ${temperature} &#8451;<br>
			`
		});
		
	}



	fetchWsnNews(urlWsnNews);

	$('.sensor').click(function(){
		var href = $(this).attr('href');
		var dataId = $(href).attr('data-id');
		console.log(dataId);
		$(href).toggle();
	});

});



