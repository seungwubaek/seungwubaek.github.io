$(document).ready(function() {
    // Can write additional js for cumtom without editting origin script from mmistake.

    // Sidebar Toggle to collapse Submenu
    $('.nav__sub-title').click(function(){
        subtitleSet = $(this.children[0]).children();
        if (subtitleSet.length > 1) {  // children이 있을때만 <span> 태그 하나 더 생김
            dropdownIcon = subtitleSet[1].children[0];  // dropdown icon element
            s = $(dropdownIcon);
            if (s.hasClass('fa-plus')) {
                s.removeClass('fa-plus');
                s.addClass('fa-minus');
                $(this).next().toggleClass('show');
            }
            else {
                s.removeClass('fa-minus');
                s.addClass('fa-plus');
                $(this).next().toggleClass('show');
            }
        }
    })
});
