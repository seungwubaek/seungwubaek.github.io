$(document).ready(function() {
    // Can write additional js for cumtom without editting origin script from mmistake.

    // Sidebar Toggle to collapse Submenu
    $('.nav__sub-title').click(function(){
        subtitleSet = $(this.children[0]).children();
        if (subtitleSet.length > 1) {  // children이 있을때만 <span> 태그 하나 더 생김
            dropdownIcon = subtitleSet[1].children[0];  // dropdown icon element
            s = $(dropdownIcon);
            if (s.hasClass('fa-plus')) {
                s.removeClass('fa-plus');
                s.addClass('fa-minus');
                $(this).next().toggleClass('show');
            }
            else {
                s.removeClass('fa-minus');
                s.addClass('fa-plus');
                $(this).next().toggleClass('show');
            }
        }
    })

    // Sidebar Sub Menus dropdown animaion
    // Set each Height of Sub Menu, corresponding num of sub menu's children elem.
    li_id = 0;  // Incremental Submenu ID
    arrLiIdHeight = [];  // Submenu ID, Height
    baseLiHeight = $('ul.nav__item-children > li').first().height();
    $('ul.nav__item-children').each(function(){
        numLi = $(this).find('li').length
        liHeight = numLi * baseLiHeight;
        liId = 'sidebarMenuId_' + ++li_id;
        $(this).attr('id', liId);
        arrLiIdHeight.push([liId, liHeight]);
    });
    
    extra_css = '';
    arrLiIdHeight.forEach(function(item, idx){
        liId = item[0];
        liHeight = item[1];
        extra_css += '#'+liId+'.show { height: '+ liHeight + 'px; }\n';
    })
    extra_css = '<style type="text/css">\n'+extra_css+'</style>';
    $('head').append(extra_css);
});
