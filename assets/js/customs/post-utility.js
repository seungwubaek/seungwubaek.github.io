$(function() {
  $('.memo').each(function(i, e) {
    let dataType = $(e).attr('data-type');
    if(dataType == 'post-for-paper-analysis') {
      $('#show-origin').on('click', function(e){
        $target = $(e.target);
        if($target.prop('checked')) {
          $('.struct-style-paper-origin').css('text-decoration', '');
          $('.md-paper-origin').css('display', '');
        } else {
          $('.struct-style-paper-origin').css('text-decoration', 'line-through');
          $('.md-paper-origin').css('display', 'none');
        }
      });
      $('#show-translated').on('click', function(e){
        $target = $(e.target);
        if($target.prop('checked')) {
          $('.struct-style-paper-translated').css('text-decoration', '');
          $('.md-paper-translated').css('display', '');
          $('.md-paper-origin').css('background-color', '');
        } else {
          $('.struct-style-paper-translated').css('text-decoration', 'line-through');
          $('.md-paper-translated').css('display', 'none');
          $('.md-paper-origin').css('background-color', 'white');
        }
      });
      $('#show-interpreted').on('click', function(e){
        $target = $(e.target);
        if($target.prop('checked')) {
          $('.struct-style-paper-interpreted').css('text-decoration', '');
          $('.md-paper-interpreted').css('display', '');
        } else {
          $('.struct-style-paper-interpreted').css('text-decoration', 'line-through');
          $('.md-paper-interpreted').css('display', 'none');
        }
      });
    }
  });
});
