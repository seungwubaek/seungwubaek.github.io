$(document).ready(function() {
    // Can write additional js for cumtom without editting origin script from mmistake.

    // [1] Sidebar Toggle to collapse Submenu
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

    // [2] Sidebar dropdown animaion of Sub Menus
    //   Set each height of Sub Menu <ul> Element proportional to num of sub menu's children <li> elems.
    ulCnt = 0;  // Incremental Submenu ID
    arrUlIdHeight = [];  // The Array, consists of pair [Submenu <ul>'s ID, Height]
    baseLiHeight = $('ul.nav__item-children > li').first().height();  // basic height of <li>
    $('ul.nav__item-children').each(function(){
        numLi = $(this).find('li').length
        ulHeight = numLi * baseLiHeight;
        ulId = 'sidebarMenuId_' + ++ulCnt;
        $(this).attr('id', ulId);
        arrUlIdHeight.push([ulId, ulHeight]);
    });

    // Make additional style
    extra_css = '';
    arrUlIdHeight.forEach(function(item, idx){
        extra_css += '#'+item[0]+'.show { height: '+ item[1] + 'px; }\n';
    })
    extra_css = '<style type="text/css">\n'+extra_css+'</style>';
    // Add additional style to <head>
    $('head').append(extra_css);
});
