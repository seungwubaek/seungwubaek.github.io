// It assume jquery is loaded

// for auto-scroll
var top_offset = window.innerHeight * 0.27 - 1;
function scrollToHash(h) {
  var yPos = $(h).offset().top - top_offset;
  scrollTo({top: yPos, behavior: 'smooth'});
}
