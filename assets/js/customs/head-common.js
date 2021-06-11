function drawAjaxError(jqXHR, textStatus, errorMsg) {
  console.log(jqXHR);
  console.log(textStatus);
  console.log(errorMsg);
  var errElem = `
  <h4 style="margin-bottom: 4px;">Error Occured</h4>
  <span style="font-size: .75em;">Detailed Below</span>
  <p>${jqXHR.responseText}</p>`;
  return errElem
}

function setTextToTotalPostsCnt(caller) {
  $.ajax({
    type: 'GET',
    url: '/data/posts-info.json',
    success: function(response) {
      $(caller).text(response.length);
    },
    error: function(jqXHR, textStatus, errorMsg) {
      errElem = drawAjaxError(jqXHR, textStatus, errorMsg);
      $(caller).html(Elem);
    }
  });
}
