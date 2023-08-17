// [5] Reduce / Expand Code Block, has long Height
$(function () {
  $('.code-reducible').each(function (idx, elem) {
    var $elem = $(elem);
    var $iconPlus = $(
      '<div class="code-reducible-icon"><i class="far fa-plus-square"></i>&nbsp;<span class="unfold-label">펼치기</span><span class="fold-label">접기</span></div>'
    );
    var $iconMinus = $(
      '<div class="code-reducible-icon"><i class="far fa-minus-square"></i>&nbsp;<span class="unfold-label">펼치기</span><span class="fold-label">접기</span></div>'
    );
    if ($elem.hasClass('code-reduced')) $elem.prepend($iconPlus);
    else $elem.prepend($iconMinus);
  });
  $('.code-reducible-icon').click(function (e) {
    var $this = $(this);
    var $codeReduce = $this.parent('.code-reducible');
    if ($codeReduce.hasClass('code-reduced')) {
      $($this.children('i'))
        .removeClass('fa-plus-square')
        .addClass('fa-minus-square');
      $codeReduce.removeClass('code-reduced');
    } else {
      $($this.children('i'))
        .removeClass('fa-minus-square')
        .addClass('fa-plus-square');
      $codeReduce.addClass('code-reduced');
    }
  });
});
