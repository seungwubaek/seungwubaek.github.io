// [3] responsive topbar at greedy-navigation
$(function(){
    var navHamburgBtn = $(".greedy-nav .greedy-nav__toggle");
    var navHiddenLinks = $(".greedy-nav .hidden-links");
    navHamburgBtn.click(function (e) {
        navHiddenLinks.toggleClass('hidden');
    });

    $('.hidden-links .masthead__menu-item').click(function(e){
        $(this).children('.masthead__submenu').toggleClass('hidden');
        arrow = $(this).children('a').children('.dropdown-set').children('.dropdown-icon').children('i');
        if(arrow.hasClass('fa-caret-down')){
            arrow.removeClass('fa-caret-down');
            arrow.addClass('fa-caret-up');
        } else {
            arrow.addClass('fa-caret-down');
            arrow.removeClass('fa-caret-up');
        }
    });
})