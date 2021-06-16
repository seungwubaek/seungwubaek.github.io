// We need data about posts, but doesn't have backend. So, use trick like below ajax.

function groupByCategories(post, group, nestedIdx=0) {
  var postKey = post.categories[nestedIdx];
  group[postKey] = group[postKey] || {'posts': [], 'children': {}};
  if(nestedIdx >= post.categories.length-1){  // if last nested
    group[postKey]['posts'] = group[postKey]['posts'] || [];
    group[postKey]['posts'].push(post);
  } else {  // if not last nested
    updatedGroupChildren = groupByCategories(post, group[postKey].children, ++nestedIdx);
    group[postKey].children = updatedGroupChildren;
  }
  return group
};

function countPostsGroupByCats(group) {
  var numIncludeChildren = group['posts'].length;
  var childKeys = Object.keys(group['children']);
  for(catKey of childKeys) {  // if current group has children
    countedGroupChildren = countPostsGroupByCats(group['children'][catKey]);
    group['children'][catKey] = countedGroupChildren;
    numIncludeChildren += countedGroupChildren['numTot'];  // propagate count of children's to parent
  }
  group['numTot'] = numIncludeChildren;
  return group
};

function getStatFromGroupByCategories(postsGroupByCats, targetCategories, targetStat='numTot', defaultVal=0, nestedIdx=0) {
  if(!Array.isArray(targetCategories)) targetCategories = [targetCategories];
  var res = defaultVal;
  var catKey = targetCategories[nestedIdx];
  if(!postsGroupByCats[catKey]) return defaultVal;

  if(nestedIdx < targetCategories.length - 1) {  // if not last nested
    res = getStatFromGroupByCategories(postsGroupByCats[catKey]['children'], targetCategories, targetStat, defaultVal, ++nestedIdx);
  } else {  // if last nested
    res = postsGroupByCats[catKey][targetStat];
  }
  return res
}

var postsGroupByCats = {};
$(function(){
  $.ajax({
    url: location.origin + '/data/' + 'posts-info.json',
    dataType: 'json',
    success: function(data) {
      // Aggregate Statistics
      var allPosts = data;

      $(allPosts).each(function(idx, item){
        postsGroupByCats = groupByCategories(item, postsGroupByCats);
      });

      $(Object.keys(postsGroupByCats)).each(function(idx, catKey){
        postsGroupByCats[catKey] = countPostsGroupByCats(postsGroupByCats[catKey]);
      });

      // Sidebar Num of Posts
      //   Main Menu
      $('.nav__sub-title-name > a').each(function(idx, item){
        var $item = $(item);
        var itemCat = $item.attr('id').split('sidebar-')[1];
        var numTot = getStatFromGroupByCategories(postsGroupByCats, itemCat, 'numTot', 0);
        $item.append('<span class="nav__sub-title-stat">' + numTot + '</span>');
      });
      //   Sub Menu
      var catSep = '|';
      $('.nav__item-children > li > a').each(function(idx, item){
        var $item = $(item);
        var itemCats = $item.attr('id').split('sidebar-')[1].split(catSep);
        var numTot = getStatFromGroupByCategories(postsGroupByCats, itemCats, 'numTot', 0);
        $item.append('<span class="nav__item-children-stat">' + numTot + '</span>');
      });
      // Sidebar Afterprocess - Resize sidebar font
      resizeSidebarFont();

      // From memo type
      var memoType = $('.memo').data('type');  // this selector.data return first class's data in page.
      // Whole TOC Page
      var catSep = '/';
      if(memoType == 'toc') {
        $('.wholetoc__category-title > a').each(function(idx, item) {
          var $item = $(item);
          var itemCats = $item.attr('href');
          if(itemCats.substr(0, 1) == '/') itemCats = itemCats.substring(1, itemCats.length);
          if(itemCats.substr(itemCats.length-1, 1) == '/') itemCats = itemCats.substring(0, itemCats.length-1);
          itemCats = itemCats.split('/');
          var numTot = getStatFromGroupByCategories(postsGroupByCats, itemCats, 'numTot', 0);
          $item.append('<span class="wholetoc__category-stat">(' + numTot + ')</span>');
        });
      }
      // Post Pagination
      let $pagination = $('.post-pagination');
      if($pagination.length > 0) {
        let postsInCurCats = getStatFromGroupByCategories(postsGroupByCats, $pagination.data('categories').split('/'), 'posts', []);
        if(postsInCurCats.length > 1) {  // except itself
          $pagination.removeClass('hidden');

          sortArrayOfObjectsByKey(postsInCurCats, 'date', 'asc');
          sortArrayOfObjectsByKey(postsInCurCats, 'post-order', 'asc');

          let curPath = window.location.pathname;
          let curPathIdx = postsInCurCats.findIndex(function(item) { return item.url == curPath });
          if(curPathIdx > -1) {
            let prevPost = postsInCurCats[curPathIdx-1];
            if(prevPost) {
              $('.pagination__pager.pager-prev').attr('href', prevPost.url+'#page-title');
              $('.pagination__pager.pager-prev .pager-title').text($('<textarea />').html(prevPost.title).text());
            } else $('.pagination__pager.pager-prev').css('display', 'none');
            let nextPost = postsInCurCats[curPathIdx+1];
            if(nextPost) {
              $('.pagination__pager.pager-next').attr('href', nextPost.url+'#page-title');
              $('.pagination__pager.pager-next .pager-title').text($('<textarea />').html(nextPost.title).text());
            } else $('.pagination__pager.pager-next').css('display', 'none');
          }
        }
      }
    },
    statusCode: {
      404: function() {
      // alert('There was a problem with the server. Try again soon!');
      }
    }
  });
});
