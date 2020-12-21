// [4] Copy URL to Clipboard
$(function(){
    var clipboard = new ClipboardJS('.header-link');
    clipboard.on('success', function(e) {
        simpleNotice.show('클립보드에 복사되었습니다.');
        e.clearSelection();
    });
    // clipboard.on('error', function(e) {
    // });
});
