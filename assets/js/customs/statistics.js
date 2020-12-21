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
            $('.nav__sub-title-name > a').each(function(idx, item){
                var itemId = $(item).attr('id');
                var itemCat = itemId.split('sidebar-')[1];
                var numTot = 0;
                if(postsGroupByCats[itemCat]) numTot = postsGroupByCats[itemCat]['numTot'];
                $('#'+itemId).parents('.nav__sub-title-set').find('.nav__sub-title-dropdownicon')
                             .prepend('<span class="nav__sub-title-stat">' + numTot + '</span>');
            });
        },
        statusCode: {
            404: function() {
            // alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
});
