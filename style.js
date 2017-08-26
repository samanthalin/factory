$(document).ready(function(){
	$('.sensor').click(function(){
		var href = $(this).attr('href');
		console.log(href)
		$(href).toggle();
	});
});