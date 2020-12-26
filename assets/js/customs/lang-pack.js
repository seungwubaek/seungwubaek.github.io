// Someday, This process will be replaced to give user translated page with detected language on Web Server Layer.

// Language Pack
//   Default is 'ko'. Do not input that below.
supportedLang = ['en'];
var langPacks = {
    'en': {
        '목차': 'TOC'
    }
};

// Detect Language of Browser
var lang = navigator.language || navigator.userLanguage;
lang = lang || 'ko';
lang = lang.slice(0, 2);

function changeText(selection, langPack) {
    $(selection).each(function(idx, item) {
        $item = $(item);
        var text = $item.text();
        if(text) text = langPack[text];
        if(text) $item.text(text);
    });
};

$(function() {
    if(lang) {
        var langPack = langPacks[lang];
        if(langPack) {
            changeText('.dropdown-title', langPack);
        }
    }
});
