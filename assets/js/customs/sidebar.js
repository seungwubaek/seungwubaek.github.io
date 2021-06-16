// [1] Sidebar Toggle to (un)fold Submenu
$(function(){
  $('.nav__sub-title-dropdownicon').click(function(){
      var $root_parent = $($(this).closest('li')[0]);
      var $navItems = $($root_parent.find('.nav__item-children')[0]).children();
      var numItems = $navItems.length
      if (numItems > 0) {  // children이 있을때만 (+/-) 아이콘 표시를 위한 <span> 태그 하나 더 생김
          var s = $(this).children('i');
          s.toggleClass('fa-plus');
          s.toggleClass('fa-minus');
          var itemSet = $root_parent.children('ul')
          itemSet.toggleClass('show');
          if(itemSet.hasClass('show')){
              var h = itemSet.children('li:first').height();
              var child_h = numItems * h;
              itemSet.css('max-height', child_h);
          } else { itemSet.css('max-height', '') }
      }
  })
});

// [2] Resizing font-size for prevent to be overflowed on x axis by long title names.
//   This function must be excuted after statistics.js is excuted.
function resizeSidebarFont() {
  let navListWidth = document.getElementsByClassName('nav__list')[0].clientWidth;
  let resizeCnt = 10;
  var widthLimit;

  $('a[id^=sidebar-] .title__name').each(function(idx, titleName){
    $titleName = $(titleName);
    $titleLink = $titleName.parent('a');

    if($titleLink.attr('titledepth') == 0) {
      var $statIcon = $titleLink.children('.nav__sub-title-stat');
      var $dropdownIcon = $titleLink.parent().siblings();
      widthLimit = navListWidth - $statIcon.outerWidth(true) - $dropdownIcon.outerWidth();
    } else {
      var $statIcon = $titleLink.children('.nav__item-children-stat');
      widthLimit = navListWidth - $statIcon.outerWidth(true);
    }

    var tryCnt = 0;
    while($titleName.outerWidth(true) > widthLimit) {
      fs = parseInt($titleName.css('font-size'));
      $titleName.css('font-size', fs-1);
      if(++tryCnt > resizeCnt) break;
    }
  });
}
