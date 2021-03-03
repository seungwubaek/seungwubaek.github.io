// It assume jquery is loaded

function sortArrayOfObjectsByKey(arr, key, sortDirection='asc') {
  switch(sortDirection) {
    case 'asc': sortDirection = 1; break;
    case 'desc': sortDirection = -1; break;
    default: sortDirection = 1; break;
  }
  function compare( a, b ) {
    aVal = a[key];
    bVal = b[key];
    if ( a[key] < b[key] ){
      return -1 * sortDirection;
    }
    else if ( a[key] > b[key] ){
      return 1 * sortDirection;
    }
    return 0;
    }
    arr.sort(compare);
    return arr;
}

// for auto-scroll
var top_offset = window.innerHeight * 0.27 - 1;
function scrollToHash(h) {
  var yPos = $(h).offset().top - top_offset;
  scrollTo({top: yPos, behavior: 'smooth'});
}
