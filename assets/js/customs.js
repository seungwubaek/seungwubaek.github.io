// Navigation Functions
function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function foldOnOff() {
    $('li.nav-btn-set__foldable').toggleClass('.nav-btn-set__fold');
}

$(document).ready(function() {
    // Can write additional js for cumtom without editting origin script from mmistake.

    // [1] Sidebar Toggle to (un)fold Submenu
    $('.nav__sub-title').click(function(){
        subtitleSet = $(this.children[0]).children();
        if (subtitleSet.length > 1) {  // children이 있을때만 (+/-) 아이콘 표시를 위한 <span> 태그 하나 더 생김
            dropdownIcon = subtitleSet[1].children[0];  // dropdown (+/-) icon element
            s = $(dropdownIcon);
            s.toggleClass('fa-plus');
            s.toggleClass('fa-minus');
            $(this).next().toggleClass('show');
        }
    })

    // [2] Sidebar dropdown animaion of Sub Menus
    //   Set each height of Sub Menu <ul> Element proportional to num of sub menu's children <li> elems.
    ulCnt = 0;  // Incremental Submenu ID
    arrUlIdHeight = [];  // The Array, consists of pair [Submenu <ul>'s ID, Height]
    baseLiHeight = $('ul.nav__item-children > li').first().height();  // basic height of <li>
    $('ul.nav__item-children').each(function(){
        ulId = $(this).attr('id');
        numLi = $(this).find('li').length
        ulHeight = numLi * baseLiHeight;
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
