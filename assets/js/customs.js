// Can write additional js for cumtom without editting origin script from mmistake.

// Navigation Functions
function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function foldOnOff() {
    $('.nav-btn-set__foldable').toggleClass('nav-btn-set__fold');
    $($('#nav-fold-button').children()[0]).toggleClass('nav-arrow-up');
    $($('#nav-fold-button').children()[0]).toggleClass('nav-arrow-down');
};

function goToUrl(targetUrl) {
    var win = window.open(targetUrl, '_blank');
    win.focus();
};

$(document).ready(function() {
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
    // !!!Not used!!!
    // 아래 코드는 height 사이즈를 고정시킨다. 즉, 작은 화면에서 화면이 다 로드 된 이후 화면 사이즈를 바꾸면
    // font size는 커지는데 작은 화면일때 계산한 height가 적용되므로 요소 안의 text가 밖으로 밀려 나온다
    // 해결을 위해선 resize 이벤트마다 height를 다시 계산해서 적용해야하는데.. 그냥 안하기로 했다.
    // 따라서 완전히 똑같진 않지만 animation으로 대체한다.
    //   Set each height of Sub Menu <ul> Element proportional to num of sub menu's children <li> elems.
    // ulCnt = 0;  // Incremental Submenu ID
    // arrUlIdHeight = [];  // The Array, consists of pair [Submenu <ul>'s ID, Height]
    // baseLiHeight = $('ul.nav__item-children > li').first().height();  // basic height of <li>
    // $('ul.nav__item-children').each(function(){
    //     ulId = $(this).attr('id');
    //     numLi = $(this).find('li').length
    //     ulHeight = numLi * baseLiHeight;
    //     arrUlIdHeight.push([ulId, ulHeight]);
    // });

    // // Make additional style
    // extra_css = '';
    // arrUlIdHeight.forEach(function(item, idx){
    //     extra_css += '#'+item[0]+'.show { height: '+ item[1] + 'px; }\n';
    // })
    // extra_css = '<style type="text/css">\n'+extra_css+'</style>';
    // // Add additional style to <head>
    // $('head').append(extra_css);


});
