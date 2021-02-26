$(function() {
  // Magnific-Popup options
  $('.img-popup').magnificPopup({
    delegate: 'img',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
      verticalFit: true,
			titleSrc: function(item) {
				return item.el.parent().data('title');
			}
		},
    closeBtnInside: false,
    mainClass: 'mfp-zoom-in',
    callbacks: {
      elementParse: function(item) {
        item.src = item.el.attr('src');
      }
    }
  });
});
