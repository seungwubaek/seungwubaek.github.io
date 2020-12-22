// We need data about posts, but doesn't have backend. So, use trick like below.

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

$(function(){
    var postsGroupByCats = {};
    $.ajax({
        url: location.origin + '/' + 'posts-info.json',
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
                var numTot = 0;
                if(postsGroupByCats[itemCat]) numTot = postsGroupByCats[itemCat]['numTot'];
                $item.append('<span class="nav__sub-title-stat">' + numTot + '</span>');
            });
            //   Sub Menu
            var catSep = '|';
            $('.nav__item-children > li > a').each(function(idx, item){
                var $item = $(item);
                var itemCats = $item.attr('id').split('sidebar-')[1].split(catSep);
                var numTot = 0;
                if(postsGroupByCats[itemCats[0]] && postsGroupByCats[itemCats[0]].children[itemCats[1]]) {
                    numTot = postsGroupByCats[itemCats[0]].children[itemCats[1]]['numTot'];
                }
                $($item).append('<span class="nav__item-children-stat">' + numTot + '</span>');
            });
        },
        statusCode: {
            404: function() {
            // alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
});
