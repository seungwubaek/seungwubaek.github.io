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
        var noticeBoard = $('<div></div>')
        noticeBoard.attr('id', 'simple-notice')
                    .text(message);
        $('body').append(noticeBoard);
        noticeBoard.css({'bottom': -noticeBoard.outerHeight(),
                        'opacity': 1})
                .addClass('onShow');
        noticeBoard.outerHeight();  // force redraw for transition
        noticeBoard.css('bottom', 16);
        setTimeout(this.hide.bind(null, noticeBoard), hideInterval);
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
