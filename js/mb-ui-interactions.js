$(document).ready(function () {
    
    $(".expand-img").click(function () {
        $(this).removeClass('expand-img');
        $(this).addClass('collapse-img');
        // $(this).css('object-position', '-42px 0px');
    });

    $(".collapse-img").click(function () {
        $(this).removeClass('collapse-img');
        $(this).addClass('expand-img');
        $(this).css('object-position', '-42px 0px');
    });

    $('.file').click(function() {
        if(!$(this).hasClass('active')) {
            $('.active').removeClass('active');
        }
        $(this).toggleClass('active');
    })

});
