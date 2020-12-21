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