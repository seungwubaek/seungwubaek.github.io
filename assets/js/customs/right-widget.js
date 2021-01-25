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
  var btnWidth = 0;
  function reloadRightWidget() {
    var maxWidth = window.innerWidth;
      if(maxWidth <= 600) {  // It should be equal with _variables.scss's small size.
          if($rWidget.hasClass('hide')) {
              $rWidget.css('right', btnWidth-maxWidth-1);
          }
          $rWidget.css('width', maxWidth);
      }
  }
  function openRightWidget() {
      $rWidget.css('right', '');
  }
  function closeRightWidget() {
    if(window.innerWidth <= 600) $rWidget.css('right', btnWidth-window.innerWidth-1);
    else $rWidget.css('right', btnWidth-$rWidget.width());
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

  $(window).on('load', function() {
      $rWidget = $('.right-widget');
      $rWidget.appendTo('body');

      var $rWidgetBtn = $('.right-widget__btn');
      btnWidth = $rWidgetBtn.outerWidth();
      reloadRightWidget();
  });
