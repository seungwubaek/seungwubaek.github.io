---
layout: empty
---
// For 2020 Christmas Theme
console.log('Merry Christmas 2020 ! (^0^)');

$(function(){
    // Google Drive image share id list
    var gidCandyLeaned = '1ms0HcaifIgfSUT6vtA8Q_6jchn7je0bE';
    var gidCandy = '143ozaqnrazR12oxkd8C0LNPX0PrxSHC_';
    var gidCircleRudolf = '1nxX2U-Rr2cD_G3otZ_r5wsQZ3Nm8_kaN';
    var gidCircleSled = '129DSTnN-pz6hOzedWXUd_B1unYmgtOvb';
    var gidGingerbreadMan = '1Pk6pxAEMJrAjU-1XYtn6QIT4jgHt4LkT';
    var gidPenguin = '1bzA2t22wbhZckLGWv2-tt1ymC7gT5Vrf';
    var gidSanta = '1yiy6l0a6O151vSaySyfAo6oCI4JoHB82';
    var gidSantaHat = '1RRJ5wf0BSbnek2x7g56Fpg_0B5ExjAoQ';
    var gidSled = '1QmgxLL0VhzKfQ_L62_xsZ6pvrQKhiNPi';
    var gidSnowFlake = '1nsezdzD2Ig03B9s-InetJMjoup3QT7Uk';
    var gidSnowman = '1w3xd8G2AP6l_NBz9puApQwNs4rrgacKs';
    var gidStar = '1y1k0DXwPgYq0XejGmE09Lq9n5ywClp_g';
    var gidTreeWithPresent = '1qTEbVUqzs9gAr_yLmvgUaKRrpmA5Fi0b';
    var gidTree = '1lCXAt3GGYHtWoY7E4lom3bft3GkvLxYQ';

    // Masthead
    $('.site-title').before('\
    <img src="{{ site.gdrive_url_prefix }}' + gidCircleRudolf +'" class="site-title-icon" alt="Merry X-Mas"/>\
    <span>&nbsp;</span>'
    ).after('\
    <span>&nbsp;</span>\
    <img src="{{ site.gdrive_url_prefix }}' + gidCircleSled +'" class="site-title-icon" alt="Merry X-Mas"/>');

    // Sidebar
    var iconRandArr = [gidCandyLeaned, gidPenguin, gidSanta, gidSantaHat, gidSled, gidSnowman, gidTree];
    function getRandIconId(){
        return iconRandArr[Math.floor(Math.random() * iconRandArr.length)];
    }

    function getArrayWithLimitedLength(length) {
        var array = new Array();
        array.push = function () {
            if (this.length >= length) {
                this.shift();
            }
            return Array.prototype.push.apply(this,arguments);
        }
        return array;
    }
    var prevRandIconId = getArrayWithLimitedLength(4);
    $('.nav__items').find('.nav__sub-title-set').each(function(i, o){
        while(true) {
            var gid = getRandIconId();
            if(prevRandIconId.includes(gid)) continue
            else {
                prevRandIconId.push(gid);
                break
            }
        }
        $(o).prepend('<img src="{{ site.gdrive_url_prefix }}' + gid + '" class="nav__sub-title-set-icon" alt="Merry X-Mas"/>&nbsp;');
    });

    // Post in Home Layout
    $('.archive').children('.archive__subtitle').prepend('\
    <img src="{{ site.gdrive_url_prefix }}' + gidStar +'" class="recent-posts-icon" alt="Merry X-Mas"/>\
    <span>&nbsp;</span>'
    ).append('\
    <span>&nbsp;</span>\
    <img src="{{ site.gdrive_url_prefix }}' + gidStar +'" class="recent-posts-icon" alt="Merry X-Mas"/>');

    // Footer
    $('.page__footer').children('footer').append('\
    <span>&nbsp;</span>\
    <img src="{{ site.gdrive_url_prefix }}' + gidGingerbreadMan +'" class="footer-copyright-icon" alt="Merry X-Mas"/>');
});
