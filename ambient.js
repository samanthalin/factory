//
$(document).ready(function(){

	

	var fetchWsnNews = () => {
		var url = "https://blahdns.herokuapp.com/http://140.124.184.204:8080/Cloud/WSN/NewestData";
		return fetch(url).then(resp => resp.json()).then(function(wsn_news) {
			// console.log(wsn_news);
			appendWsnNews(wsn_news);
		});
	};
	var sensor  = document.querySelectorAll('.map .sensor')
	 //console.log(sensor)
	function appendWsnNews(wsn_news) {
		var red = [];
		var getDiv = function(id) {
			return document.querySelector('#'+id+'_data')
		}
		//console.log(wsn_news)
		wsn_news.forEach((e,index) => {
		var temperature = Math.round(e.temperature * 100) /100

		var mote = String(e.mote);
		var id = String(e.id);
		var time = moment(e.timeStamp*1000).format('YYYY/MM/DD HH:mm:ss');

		var div = getDiv(mote.slice(18, 22));

		div.innerHTML = ''
		div.innerHTML += 
			//id:${id}<br>
			`
			最後感測時間 <br>${time}<br><p style="margin-bottom: 5px;"></p>
			感測溫度 ${(temperature >= 40) ? '<span class="redTemperature" style="color:red">'+ temperature+'&#8451;</span>'
				:'<span class="color">'+temperature+'&#8451;</span>'
				}
			`
		});
		var div2 = document.querySelectorAll('.bubbel span')

		div2.forEach((e,i) => {
			sensor[i].classList.remove('warning')
			var b = String(e.getAttributeNode('class').value.includes('redTemperature'))
			//console.log( b)
			if ( b == 'true'){
				//console.log(i)
				sensor[i].classList.add('warning')
			}
			//console.log(e.getAttributeNode('class').value.includes('redTemperature')+[i])
			// console.log(e[i].classList.value.includes('redTemperature'))
		})
		
	}

	fetchWsnNews();

	setInterval(function(){
		fetchWsnNews()
	},20000)

	$('.sensor').click(function(){
		//console.log()
		$('.bubbel').hide();
		var href = $(this).attr('href');
		$(href).toggle();
	});

	$('.bubbel').click(function(){
		$(this).hide();
	});
});

// if (tem >= 40){
// 	$('.color').css('color', '#b93f4d');
// }



