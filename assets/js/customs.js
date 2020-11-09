// Can write additional js for custom without editting origin script from mmistake.

// Navigation Remocon Functions
var navRemocon = $('#nav-remocon');
var navBtnSetHeight = $('.nav-btn-set').css('height').split('px')[0];
var foldNavBtnHeight = 2*navBtnSetHeight+'px';
var navRemoconBtns = $('#nav-buttons');
function navRemoconFoldItem(reverse) {
    adjustNavRemoconStyle(reverse);
    navRemoconBtns.css('height', foldNavBtnHeight);
    $('#nav-fold-arraw-upper').addClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-down');
    navRemocon.addClass('fold');
    localStorage.setItem('navremocon-fold', JSON.stringify(true));
}
function navRemoconUnfoldItem(reverse) {
    navRemoconBtns.css('height', navRemoconBtns.children().length*navBtnSetHeight+'px');
    adjustNavRemoconStyle(reverse);
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').addClass('nav-arrow-down');
    navRemocon.removeClass('fold');
    localStorage.setItem('navremocon-fold', JSON.stringify(false));
}
function navRemoconHide(reverse) {
    adjustNavRemoconStyle(reverse);
    navRemocon.css('bottom', -(navRemocon.outerHeight() - $('#nav-fold-upper-button').outerHeight()));
    $('#nav-fold-arraw-upper').addClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-down');
    navRemocon.addClass('hide');
    localStorage.setItem('navremocon-hide', JSON.stringify(true));
}
function navRemoconShow(reverse) {
    adjustNavRemoconStyle(reverse);
    $('#nav-remocon').css('bottom', 0);
    if(!navRemocon.hasClass('fold')) {
        $('#nav-fold-arraw-upper').removeClass('nav-arrow-up');
        $('#nav-fold-arraw-upper').addClass('nav-arrow-down');
    }
    $('#nav-remocon').removeClass('hide');
    localStorage.setItem('navremocon-hide', JSON.stringify(false));
}
function navRemoconFold(call_obj) {
    // when upper button pressed,
    if(call_obj.id == 'nav-fold-upper-button') {
        // if remocon is hidden, show remocon
        if($('#nav-remocon').hasClass('hide')) {
            navRemoconShow();
        } else {  // if remocon is shown,
            if(navRemocon.hasClass('fold')){  // unfold remocon
                navRemoconUnfoldItem(true);
            } else {  // fold remocon
                navRemoconFoldItem(true);
            }
        }
    } else if(call_obj.id == 'nav-fold-lower-button') {  // when lower button is pressed, hide remocon
        navRemoconHide();
    }
}
function adjustNavRemoconStyle(reverse){
    reverse = (reverse >= true);  // it makes number, bigger than 1, to 'true'
    // if has 'fold' and reverse is F, border will be 0.
    // if has 'fold' and reverse is T, border will be return to initial.
    var decision = navRemoconBtns.hasClass('fold');
    decision = decision^reverse;
    if(decision) {
        $(navRemoconBtns.children()[1]).css('border-bottom', 0);
    } else {
        $(navRemoconBtns.children()[1]).css('border-bottom', '');
    }
}
function reloadNavRemocon() {
    var navFold = JSON.parse(localStorage.getItem('navremocon-fold'));
    var navHide = JSON.parse(localStorage.getItem('navremocon-hide'));
    $('#nav-remocon, #nav-buttons').each(function(){
        $(this).addClass('notransition');
    });
    if(navFold) {
        navRemoconFoldItem();
    } else {
        navRemoconUnfoldItem();
    }
    if(navHide) {
        navRemoconHide();
    } else {
        navRemoconShow();
    }
    // [Notice]
    // We expect animation won't be work temporally by adding class 'notransition'.
    // But It will be animated. Because the modern browsers are caching styling until javascript finish excuting.
    // And then all styling will be in single css reflow.
    // So, we NEED FORCE REFLOW while javascript code are running.
    // Additionally, Timeout does not have compatibiltiy for various browsers.
    // This Reference said.
    // https://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily
    // And like below code, Calling 'offsetHeight' will make reflow forcely (reference said maybe).
    $('#nav-remocon, #nav-buttons').each(function(){
        $(this)[0].offsetHeight;  // Important! Do reflow, forcely.
        $(this).removeClass('notransition');
    });
}
function navRemoconGoToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
function navRemoconGoToBottom() {
    document.body.scrollTop = $(document).height();
    document.documentElement.scrollTop = $(document).height();
};
function navRemoconGoToUrl(targetUrl) {
    var win = window.open(targetUrl, '_blank');
    win.focus();
};

// TOC Functions
function tocFoldFolder(call_obj) {
    $(call_obj).toggleClass('fa-folder');
    $(call_obj).toggleClass('fa-folder-open');
    $(call_obj).parent().next().toggleClass('fold');
};

$(document).ready(function() {
    // [0] Run some codes immediately after complete page load
    // It may need to style some html..
    reloadNavRemocon();

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
