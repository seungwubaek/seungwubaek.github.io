// Navigation Remocon Functions
var navRemocon = $('#nav-remocon');
var navRemoconBtns = $('#nav-buttons');
var navRemoconBtns_borderTop = 0;
var navRemoconBtns_borderBot = 0;
var navBtnSetHeight = 0;
var foldNavBtnHeight = 0;
var unfoldNavBtnHeight = 0;

function navRemoconFoldItem(reverse) {
    adjustNavRemoconStyle(reverse);
    navRemoconBtns.css('height', foldNavBtnHeight);
    $('#nav-fold-arraw-upper').addClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-down');
    navRemocon.addClass('fold');
    sessionStorage.setItem('navremocon-fold', JSON.stringify(true));
}
function navRemoconUnfoldItem(reverse) {
    navRemoconBtns.css('height', unfoldNavBtnHeight);
    adjustNavRemoconStyle(reverse);
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').addClass('nav-arrow-down');
    navRemocon.removeClass('fold');
    sessionStorage.setItem('navremocon-fold', JSON.stringify(false));
}
function navRemoconHide(reverse) {
    adjustNavRemoconStyle(reverse);
    navRemocon.css('bottom', -(navRemocon.outerHeight() - $('#nav-fold-upper-button').outerHeight()));
    $('#nav-fold-arraw-upper').addClass('nav-arrow-up');
    $('#nav-fold-arraw-upper').removeClass('nav-arrow-down');
    navRemocon.addClass('hide');
    sessionStorage.setItem('navremocon-hide', JSON.stringify(true));
}
function navRemoconShow(reverse) {
    adjustNavRemoconStyle(reverse);
    $('#nav-remocon').css('bottom', 0);
    if(!navRemocon.hasClass('fold')) {
        $('#nav-fold-arraw-upper').removeClass('nav-arrow-up');
        $('#nav-fold-arraw-upper').addClass('nav-arrow-down');
    }
    $('#nav-remocon').removeClass('hide');
    sessionStorage.setItem('navremocon-hide', JSON.stringify(false));
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
    var navFold = JSON.parse(sessionStorage.getItem('navremocon-fold'));
    var navHide = JSON.parse(sessionStorage.getItem('navremocon-hide'));
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

$(window).on('load', function() {
    // [0] Run some codes immediately after complete page load
    // It may need to style some html..
    navRemoconBtns_borderTop = parseFloat(navRemoconBtns.css('border-top-width').split('px')[0]);
    navRemoconBtns_borderBot = parseFloat(navRemoconBtns.css('border-bottom-width').split('px')[0]);
    navBtnSetHeight = parseFloat($('.nav-btn-set').css('height').split('px')[0]);
    foldNavBtnHeight = 2*navBtnSetHeight+navRemoconBtns_borderTop+navRemoconBtns_borderBot+'px';
    unfoldNavBtnHeight = navRemoconBtns.children().length*navBtnSetHeight+navRemoconBtns_borderTop+navRemoconBtns_borderBot+'px'
    reloadNavRemocon();
});
