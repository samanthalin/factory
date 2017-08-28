$(document).ready(function() {
    $('#page_buttons span:first-child').addClass('active');


    const button = document.getElementById('get_button');

    button.addEventListener('click', function() {
        setTimeout(function() {
            var count = document.querySelectorAll('#page_buttons span');
            //console.log(count)
            getSpanButton()
        }, 2000)

        function getSpanButton() {
            let spanButton = document.querySelectorAll('.page_btn')

            for (var i = 0; i < spanButton.length; i++) {
                //console.log(spanButton[i])

                spanButton[i].onclick = function(idx) {
                    //console.log(spanButton)

                    spanButton.forEach(function(item) {
                        item.classList.remove('active')
                    })
                    this.classList.toggle("active")
                }
            }
        }
    });

    //scroll to top
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
    });

    $('.scroll-to-top').on('click', function(e) {
      e.preventDefault();
        $('html, body').animate({scrollTop : 0}, 800);
    });
})