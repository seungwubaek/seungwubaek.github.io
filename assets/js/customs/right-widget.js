if($('nav.right-widget__toc').length > 0) {
  var spy = new Gumshoe("nav.right-widget__toc a", {
    // Active classes
    navClass: "active", // applied to the nav list item
    contentClass: "active", // applied to the content

    // Nested navigation
    nested: false, // if true, add classes to parents of active link
    nestedClass: "active", // applied to the parent items

    // Offset & reflow
    // if you change this offset, You must consider the variable 'top_offset' in my javascript code,
    //    section '[2] Auto Scroll' at /assets/js/custom.js.
    offset: window.innerHeight * 0.27, // how far from the top of the page to activate a content area
    reflow: true, // if true, listen for reflows

    // Event support
    events: true // if true, emit custom events
  });
}

/* for responsive web */
var $rWidget = undefined;
var $rWidgetResizer = undefined;
var rWidgetMaxWidth = JSON.parse(sessionStorage.getItem('rWidgetMaxWidth')) || 400; // It should be equal with _variables.scss's widget initial width size.
var rWidgetWidthMin = 245;
var btnWidth = 0;
function reloadRightWidget(skipBtnReloadAni) {
  var maxWidth = $(window).width();
  rWidgetMaxWidth = Math.min(maxWidth, rWidgetMaxWidth);
  var willChangeWidth = 0;
  if(maxWidth <= 600) {  // It should be equal with _variables.scss's small size.
    $rWidget.css('max-width', maxWidth);
    willChangeWidth = maxWidth;
  }
  else {
    $rWidget.css('max-width', rWidgetMaxWidth);
    willChangeWidth = $rWidget.width();
  }

  if($rWidget.hasClass('hide')){
    if(skipBtnReloadAni) {
      $rWidget.addClass('notransition');
      $rWidget.css('right', btnWidth-willChangeWidth);
      $rWidget.outerHeight();
      $rWidget.removeClass('notransition');
    } else {
      $rWidget.addClass('notransition');
      $rWidget.css('right', -willChangeWidth);
      $rWidget.outerHeight();
      $rWidget.removeClass('notransition');
      $rWidget.css('right', btnWidth-willChangeWidth);
    }
  }
}
function openRightWidget() {
  $rWidget.css('right', '0');
}
function closeRightWidget() {
  $rWidget.css('right', btnWidth-$rWidget.width());
}
function switchArrow() {
  var $arrow = $('.right-widget__btn > div');
  if($arrow.hasClass('nav-arrow-left')) {
      $arrow.removeClass('nav-arrow-left')
          .addClass('nav-arrow-right');
  } else if($arrow.hasClass('nav-arrow-right')) {
      $arrow.removeClass('nav-arrow-right')
          .addClass('nav-arrow-left');
  }
}
function rightWidgetToggle() {
  if($rWidget.hasClass('hide')) {
      openRightWidget();
      $rWidget.removeClass('hide');
  } else {
      closeRightWidget();
      $rWidget.addClass('hide');
  }
  switchArrow();
}

function resizableWidget() {
  $rWidgetResizer.on('mousedown', function(e) {
    e.preventDefault();
    $(window).on('mousemove', resizeWidgetWidth);
    $(window).on('mouseup', stopResizeWidgetWidth);
  });
}

function resizeWidgetWidth(e) {
  var windowWidth = $(window).width();
  rWidgetMaxWidth = Math.max(windowWidth - e.pageX + btnWidth, rWidgetWidthMin);
  rWidgetMaxWidth = Math.min(windowWidth, rWidgetMaxWidth);
  $rWidget.css('max-width', rWidgetMaxWidth);
  sessionStorage.setItem('rWidgetMaxWidth', JSON.stringify(rWidgetMaxWidth));
}

function stopResizeWidgetWidth(e) {
  $(window).off('mousemove');
}

$(window).on('load', function() {
  $rWidget = $('.right-widget');
  $rWidget.appendTo('body');

  var $rWidgetBtn = $('.right-widget__btn');
  btnWidth = $rWidgetBtn.outerWidth();

  $rWidgetResizer = $('.right-widget__resizer');

  reloadRightWidget();
  resizableWidget();
});

$(window).resize(reloadRightWidget.bind(null, true));
