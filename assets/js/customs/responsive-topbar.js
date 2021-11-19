// [3] responsive topbar at greedy-navigation
$(function(){
  var navHamburgBtn = $(".greedy-nav .greedy-nav__toggle");
  var navHiddenLinks = $(".greedy-nav .hidden-links");
  navHamburgBtn.click(function (e) {
      navHiddenLinks.toggleClass('hidden');
  });

  let $dropdownMenu = $('.visible-links .masthead__menu-item.dropdown');
  $dropdownMenu.each(function(idx, item) {
    // Adjust dropdown submenu's width size after all images are loaded
    let $item = $(item);
    let $imgs = $item.find('img');
    $imgs.on('load', function() {
      let $dropdownSubMenu = $item.children('.masthead__submenu');
      let dropdownMenuOuterWidth = $item.outerWidth();
      let dropdownSubMenuOuterWidth = $dropdownSubMenu.outerWidth();
      if(dropdownSubMenuOuterWidth < dropdownMenuOuterWidth) {
          $dropdownSubMenu.outerWidth(dropdownMenuOuterWidth+2);  // include border width(2px)
        }
    });
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
