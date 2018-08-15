$(document).ready(function () {
    
    $(".expand-img").on("click", function () {
        $(this).removeClass('expand-img');
        $(this).addClass('collapse-img');
    });

    $(".collapse-img").on("click", function () {
        $(this).removeClass('collapse-img');
        $(this).addClass('expand-img');
        $(this).css('object-position', '-42px 0px');
    });

    $('.file').on("click", function () {
        if(!$(this).hasClass('active')) {
            $('.active').removeClass('active');
        }
        $(this).toggleClass('active');
    })

});
