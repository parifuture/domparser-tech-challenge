$(document).ready(function () {
    
    $("#folderizeModal").on("click",".expand-img", function () {
        $(this).removeClass('expand-img');
        $(this).addClass('collapse-img');
        console.log('lala',$(this).parent('li'));
        $(this).parent('li').next().toggleClass("show");
    });

    $("#folderizeModal").on("click",".collapse-img", function () {
        $(this).removeClass('collapse-img');
        $(this).addClass('expand-img');
        $(this).parent('li').next().toggleClass("show");
        // $(this).css('object-position', '-42px 0px');
    });

    $("#folderizeModal").on("click",".file",function () {
        if(!$(this).hasClass('active')) {
            $('.active').removeClass('active');
        }
        $(this).toggleClass('active');
    });

});
