/*
    Used Kakao SDK
*/

/* Share On */
function scrapKakao() {
    var imgUrl1 = 'https://seungwubaek.github.io/android-chrome-192x192.png';
    var imgUrl2 = '';
    var imgUrlRest = '';
    var $imgs = $('.page__content img');
    var imgUrlCnt = $imgs.length+1;
    if($imgs.length > 0) {
        imgUrl2 = $imgs[0].src;
    }
    if($imgs.length > 1) {
        imgUrl2 = $imgs[1].src;
    }
    if($imgs.length > 2) {
        imgUrlRest = $imgs[2].src;
    }

    Kakao.Link.sendScrap({
        requestUrl: location.origin + location.pathname,
        templateId: 46696,
        templateArgs: {
            img1: imgUrl1,
            img2: imgUrl2,
            imgRest: imgUrlRest,
            imgCnt: imgUrlCnt,
            title: $('meta[property="og:title"]').attr('content'),
            description: $('meta[property="og:description"]').attr('content'),
            pagePathname: location.pathname
        },
        installTalk: true
        });
}
