// [2] Auto Scroll. Here are three types of scroll.
// (Only you choose Method 1 in _sass/custom/_mybase.scss) actual html margin top size is 56 (=3em+0.5em).
// But if we set 56, header of page toc may not be given class "activate" by gumshoe correctly.
// So, scrollTo Y position is needed tiny pulling to downward ( -1 px )
//   for getting class "activate" by gumshoe more clearly.
$(function(){
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
});
