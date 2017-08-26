//
$(document).ready(function(){
	$('.sensor').click(function(){
		var href = $(this).attr('href');
		$(href).toggle();
	});
});

var urlWsnNews = "https://blahdns-proxy-eusudefuvv.now.sh/http://140.124.184.204:8080/Cloud/WSN/NewestData";

var fetchWsnNews = url => {
	return fetch(url).then(resp => resp.json()).then(function(wsn_news) {
		console.log(wsn_news);
		appendWsnNews(wsn_news);
	});
};

fetchWsnNews(urlWsnNews);

function appendWsnNews(wsn_news) {
	var div = document.querySelector(".bubbel");
	// console.log(wsn_page.length);
	wsn_news.forEach(e => {
	var temperature = String(e.temperature);
	var mote = String(e.mote);
	div.innerHTML += `
	溫度感測器 ${mote} <br>
	溫度 ${temperature} &#8451;<br>
	`
	});
}