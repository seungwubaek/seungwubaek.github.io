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
    var decision = navRemocon.hasClass('fold');
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

// Simple Alarm
class SimpleAlarm {
    constructor(name) { this.name = name; }
    show(message, hideInterval = 3000){
        var alarmBoard = $('#simple-alarm');

        // If alarm alrady exist, hide it first. So, alarm is always made only one.
        if(alarmBoard.length > 0) {
            var self = this;
            alarmBoard.each(function(idx, elem){ self.hide($(elem)); });
        }

        // Make alarm.
        var alarmBoard = $('<div></div>')
        alarmBoard.attr('id', 'simple-alarm')
                    .text(message);
        $('body').append(alarmBoard);
        alarmBoard.css({'bottom': -alarmBoard.outerHeight(),
                        'opacity': 1})
                .addClass('onShow');
        alarmBoard.outerHeight();  // force redraw for transition
        alarmBoard.css('bottom', 16);
        setTimeout(this.hide.bind(null, alarmBoard), hideInterval);
    }
    hide(selector){
        // Destory Alarm.
        selector.outerHeight();
        selector.css({'bottom': -selector.outerHeight(),
                      'opacity': 0});
        selector.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
            selector.remove();
        });
    }
}
var simpleAlarm = new SimpleAlarm('main');

$(document).ready(function() {
    // [0] Run some codes immediately after complete page load
    // It may need to style some html..
    reloadNavRemocon();

    // [1] Sidebar Toggle to (un)fold Submenu
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

    // [2] Auto Scroll. Here are three types of scroll.
    // (Only you choose Method 1 in _sass/custom/_mybase.scss) actual html margin top size is 56 (=3em+0.5em).
    // But if we set 56, header of page toc may not be given class "activate" by gumshoe correctly.
    // So, scrollTo Y position is needed tiny pulling to downward ( -1 px )
    //   for getting class "activate" by gumshoe more clearly.
    top_offset = window.innerHeight * 0.27 - 1;
    function scrollToHash(h) {
        var yPos = $(h).offset().top - top_offset;
        scrollTo({top: yPos, behavior: 'smooth'});
    }
    // [2-1] If came from external page.
    //       You'd clicked link, has 'id' attr, from other page and moved to this page.
    if(location.hash.length > 0) {
        var h = decodeURIComponent(location.hash);
        scrollToHash(h);
    }
    // [2-2] If came from internal page.
    //       You just clicked some anchor in this page.
    $('a').click(function (e) {
        if($(this).hasClass('header-link')){
            // Do not scroll. It will be function of copying url.
            e.preventDefault();
        } else {
        if($(this)[0].hash.length < 1) { } // if hash not exist, do nothing.
        else if($(this)[0].origin == location.origin &&
           $(this)[0].pathname == location.pathname) {
            e.preventDefault();
            var h = $(this).attr('href');
            var h = h.replace(':', '\\:');  // escaping char for kramdown footnote id.
            scrollToHash(h);
            // For changing url's hash without scrolling.
            //   the 'history' is used when you want to go back/forward page.
            //   and you can use not only 'pushState' but also 'replaceState'.
            history.pushState({}, null, h);
        }
        }
    });
    // [2-3] Trying to move page by typing url into address bar.
    //       But url is equal with current page's url,
    //       And differ only hash.
    // raise NotImplementedError :)

    // [3] greedy-navigation
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

    // [4] Copy URL to Clipboard
    var clipboard = new ClipboardJS('.header-link');
    clipboard.on('success', function(e) {
        simpleAlarm.show('클립보드에 복사되었습니다.');
        e.clearSelection();
    });
    // clipboard.on('error', function(e) {
    // });

    // [5] Reduce / Unfold long Code Block Height
    $('.code-reducible').each(function(idx, elem){
        var $elem = $(elem);
        var childrenElems = $elem.children();
        var $reduceWrapper = $('<div class="code-reduce-wrapper"></div>');
        $reduceWrapper.append(childrenElems);
        $elem.append($reduceWrapper);
        var $iconPlus = $('<div class="code-reducible-icon"><i class="far fa-plus-square"></i></div>');
        var $iconMinus = $('<div class="code-reducible-icon"><i class="far fa-minus-square"></i></div>');
        if($elem.hasClass('code-reduce')) $elem.prepend($iconPlus);
        else $elem.prepend($iconMinus);
    });
    $('.code-reducible-icon').click(function(e) {
        var $this = $(this);
        var $codeReduce = $this.parent('.code-reducible');
        if($codeReduce.hasClass('code-reduce')) {
            $($this.children('i')).removeClass('fa-plus-square').addClass('fa-minus-square');
            $codeReduce.removeClass('code-reduce');
        } else {
            $($this.children('i')).removeClass('fa-minus-square').addClass('fa-plus-square');
            $codeReduce.addClass('code-reduce');
        }
    });
});
