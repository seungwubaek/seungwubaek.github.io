// Simple Notice
class SimpleNotice {
    constructor(name) { this.name = name; }
    show(message, hideInterval = 3000){
        var noticeBoard = $('#simple-notice');

        // If notice alrady exist, hide it first. So, notice is always made only one.
        if(noticeBoard.length > 0) {
            var self = this;
            noticeBoard.each(function(idx, elem){ self.hide($(elem)); });
        }

        // Make notice.
        var noticeBoard = $(`
        <div id="simple-notice">
          <div class="simple-notice__msg">${message}</div>
          <button class="simple-notice__btn-close"><i class="fas fa-fw fa-times"></i></button>
        </div>
        `)
        $('body').append(noticeBoard);
        var self = this;
        $('.simple-notice__btn-close').click(function() {
            self.hide($('#simple-notice'));
        });
        noticeBoard.css({'bottom': -noticeBoard.outerHeight(),
                        'opacity': 1})
                .addClass('onShow');
        noticeBoard.outerHeight();  // force redraw for transition
        noticeBoard.css('bottom', 16);
        setTimeout(self.hide.bind(null, noticeBoard), hideInterval);
    }
    hide(selector){
        // Destory notice.
        selector.outerHeight();
        selector.css({'bottom': -selector.outerHeight(),
                      'opacity': 0});
        selector.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
            selector.remove();
        });
    }
}
var simpleNotice = new SimpleNotice('main');
