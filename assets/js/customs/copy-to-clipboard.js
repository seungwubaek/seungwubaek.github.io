// [4] Copy URL to Clipboard
$(function(){
    var clipboard = new ClipboardJS('.header-link');
    clipboard.on('success', function(e) {
        simpleNotice.show('URL을 클립보드에 복사하였습니다.');
        e.clearSelection();
    });
    // clipboard.on('error', function(e) {
    // });
    var clipboardShareOn = new ClipboardJS('#shareon-clipboard');
    clipboardShareOn.on('success', function(e) {
        simpleNotice.show('URL을 클립보드에 복사하였습니다.');
        e.clearSelection();
    });
});
