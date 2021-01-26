// TOC Functions
function tocToggleFolder(call_obj) {
    $(call_obj).toggleClass('fa-folder');
    $(call_obj).toggleClass('fa-folder-open');
    $(call_obj).parent().next().toggleClass('fold');
};

function tocFoldFolder(call_obj) {
    $(call_obj).removeClass('fa-folder-open');
    $(call_obj).addClass('fa-folder');
    $(call_obj).parent().next().addClass('fold');
};

function tocUnFoldFolder(call_obj) {
    $(call_obj).removeClass('fa-folder');
    $(call_obj).addClass('fa-folder-open');
    $(call_obj).parent().next().removeClass('fold');
};

function tocFoldInDepth() {
    var indentDepth = $('#opt_fold-inDepth option:selected').val();
    if(indentDepth != '-') {
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            if(parseInt($(this).attr('indentation-level')) >= indentDepth) tocFoldFolder(this);
            else tocUnFoldFolder(this);
        });
    }
}

/* Only works when page, type of toc. */
$(window).ready(function(){
if($('#wholetoc').length > 0) {

    var $optFoldAllCats = $('#opt_foldAll');
    $optFoldAllCats.click(function(){
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            tocFoldFolder(elem);
        });
    });
    var $optUnFoldAllCats = $('#opt_unfoldAll');
    $optUnFoldAllCats.click(function(){
        $('.wholetoc__category-title-icon').each(function(idx, elem){
            tocUnFoldFolder(elem);
        });
    });
    var $optFoldInDepth = $('#opt_fold-inDepth');
    var maxIndent = 0;
    $('.wholetoc__category-title-icon').each(function(idx, elem){
        maxIndent = Math.max(maxIndent, parseInt($(elem).attr('indentation-level')));
    });
    for(var i=0; i<=maxIndent+1; i++) {
        $optFoldInDepth.append($('<option value='+i+'>'+i+'</option>'));
    }
    $('#opt_fold-inDepth option').on('click', function() {
        console.log(this);
    });
    var $optHidePosts = $('#opt_hide-posts');
    $optHidePosts.click(function(){
        if($optHidePosts.prop('checked')){
            $('.wholetoc__post-item').css('display', 'none');
        } else {
            $('.wholetoc__post-item').css('display', '');
        }
    });
}
});
