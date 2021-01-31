// TOC Functions
function tocToggleFolder(call_obj) {
    $(call_obj).toggleClass('fa-folder');
    $(call_obj).toggleClass('fa-folder-open');
    var $elem = $(call_obj).closest('.wholetoc__category');
    if($elem.hasClass('fold')) tocUnfoldCategory($elem);
    else tocFoldCategory($elem);
};

function tocFoldFolder(call_obj) {
    $(call_obj).removeClass('fa-folder-open');
    $(call_obj).addClass('fa-folder');
    var $elem = $(call_obj).closest('.wholetoc__category');
    tocFoldCategory($elem);
};

function tocUnfoldFolder(call_obj) {
    $(call_obj).removeClass('fa-folder');
    $(call_obj).addClass('fa-folder-open');
    var $elem = $(call_obj).closest('.wholetoc__category');
    tocUnfoldCategory($elem);
};

function tocFoldCategory($elem) {
    var $elemCats = $elem.children('.wholetoc__category-list');
    var $elemPosts =$elem.children('.wholetoc__post-list');
    [$elemCats, $elemPosts].map(function(target){
        var $target = $(target);
        if($target.length > 0) $target.css({'overflow': 'hidden', 'height': 0});
    })
    $elem.addClass('fold');
}

function tocUnfoldCategory($elem) {
    var $elemCats = $elem.children('.wholetoc__category-list');
    var $elemPosts =$elem.children('.wholetoc__post-list');
    [$elemCats, $elemPosts].map(function(target){
        var $target = $(target);
        if($target.length > 0) $target.css({'overflow': '', 'height': ''});
    })
    $elem.removeClass('fold');
}

function tocFoldInDepth() {
    var inDepth = $('#opt_fold-inDepth option:selected').val();
    if(inDepth != '-') {
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            if(parseInt($(this).attr('depth')) >= inDepth) tocFoldFolder(this);
            else tocUnfoldFolder(this);
        });
    }
}

/* Only works when page, type of toc. */
$(window).ready(function(){
if($('#wholetoc').length > 0) {
    /*
    Adjust CSS of tree branch
      Connect .wholetoc__post-list's vertical branch and .wholetoc__category-list's vertical branch
    */
    $('.wholetoc__post-list + .wholetoc__category-list').prev().each(function() {
        $(this).children('.wholetoc__post').last().addClass('continuous');
    });
    /*
    Option: View Type
      List of View Type: list, card
    */
   var viewClassList = ['view-style__list', 'view-style__card'];
    function changeViewStyleTo(viewStyle) {
        var $postList = $('.wholetoc__post-list');
        var $post = $('.wholetoc__post');
        if(viewStyle == 'list') {
            var targetClass = 'view-style__list';
            viewClassList.forEach(function(v, i, arr) {
                if(v != targetClass) {
                    $postList.removeClass(v);
                    $post.removeClass(v);
                }
            });
            $postList.addClass(targetClass);
            $post.addClass(targetClass);
        } else if(viewStyle == 'card') {
            var targetClass = 'view-style__card';
            viewClassList.forEach(function(v, i, arr) {
                if(v != targetClass) {
                    $postList.removeClass(v);
                    $post.removeClass(v);
                }
            });
            $postList.addClass(targetClass);
            $post.addClass(targetClass);
        }
    }
    $('input[name=view-style]').on('change', function() {
        var viewStyle = $(this).filter(':checked').val();
        changeViewStyleTo(viewStyle);
    });
    /* Option: Fold All */
    var $optFoldAllCats = $('#opt_foldAll');
    $optFoldAllCats.click(function(){
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            tocFoldFolder(elem);
        });
    });
    /* Option: Unfold All */
    var $optUnFoldAllCats = $('#opt_unfoldAll');
    $optUnFoldAllCats.click(function(){
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            tocUnfoldFolder(elem);
        });
    });
    /* Option: Fold in Depth */
    var $optFoldInDepth = $('#opt_fold-inDepth');
    var maxIndent = 0;
    $('.wholetoc__category-title-icon').each(function(idx, elem){
        maxIndent = Math.max(maxIndent, parseInt($(elem).attr('depth')));
    });
    for(var i=0; i<=maxIndent+1; i++) {
        $optFoldInDepth.append($('<option value='+i+'>'+i+'</option>'));
    }
    /* Option: Hide Post */
    var $optHidePosts = $('#opt_hide-posts');
    $optHidePosts.click(function(){
        if($optHidePosts.prop('checked')){
            $('.wholetoc__post-list').css('display', 'none');
        } else {
            $('.wholetoc__post-list').css('display', '');
        }
    });
}
});
