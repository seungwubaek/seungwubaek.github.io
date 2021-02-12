function paginationTemplate(data) {
    var uiText = '';
    $.ajax({
        url: '/data/ui-text.json',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(uiTextData) {
            uiText = uiTextData;
        }
    });

    var categoryLabel = uiText['en']['categories_label'] || 'Categories:';
    var dateLabel = uiText['en']['date_label'] || 'Uploaded:';
    var modifiedDateLabel = uiText['en']['modified_date_label'] || 'Modified:';
    var html = '<ul>';
    for(post of data) {
        var dateLabelValISO, modifiedDateLabelValISO = '';
        if(post.date.length > 0) {
            dateLabelValISO = (new Date(post.date)).toISOString();
        }
        if(post.last_modified_at.length > 0) {
            modifiedDateLabelValISO = (new Date(post.last_modified_at)).toISOString();
        }

        var categoryHtml = [];
        for(categoryIdx of Array(post.categories.length).keys()) {
            var innerCategories = post.categories.slice(0, categoryIdx+1);
            categoryHtml.push(`<a href="${'/' + innerCategories.join('/') + '#wholetoc__title'}" class="page__header-taxonomy-item" rel="tag">${post.categories[categoryIdx]}</a>`);
        }
        categoryHtml = categoryHtml.join('<span class="sep">, </span>');
        var postExcerpt = post.excerpt.trim();
        var post =`
        <li>
            <div class="list__item">
                <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
                    <h3 class="archive__item-title no_toc" itemprop="headline">
                        <a href="${post.url}#page-title" rel="permalink">${post.title}</a>
                    </h3>
                    <div class="page-meta">
                        <span class="page__header-taxonomy">
                            <strong><i class="fas fa-fw fa-folder-open" aria-hidden="true"></i> ${categoryLabel} </strong>
                            <span itemprop="keywords">${categoryHtml}</span>
                        </span>
                        <div class="page__header-meta">
                            <span class="page__header-meta-date">
                                <i class="far fa-fw fa-calendar-alt" aria-hidden="true"></i>
                                <strong>${dateLabel}</strong> <time datetime="${dateLabelValISO}">${post.date}</time>
                            </span>
                            <br/>
                            <span class="page__header-meta-date">
                                <i class="far fa-fw fa-calendar-alt" aria-hidden="true"></i>
                                <strong>${modifiedDateLabel}</strong> <time datetime="${modifiedDateLabelValISO}">${post.last_modified_at}</time>
                            </span>
                        </div>
                    </div>
                    <div class="archive__item-excerpt" itemprop="description" data-full-excerpt="${postExcerpt}">${postExcerpt}</div>
                    <div class="archive__item-excerpt-folder fold" onclick="toggleNavExcerpt(this);">펼치기</div>
                </article>
            </div>
        </li>`;
        html += post;
    }
    html += '</ul>';
    return html;
}

$('#site-paginator').pagination({
    dataSource: function(done) {
        $.ajax({
            type: 'GET',
            url: '/posts-info.json',
            success: function(response) {
                done(response);
            },
            error: function(req, stat, err) {
                console.log(req);
                console.log(stat);
                console.log(err);
            }
        });
    },
    pageSize: 5,
    pageRange: 1,
    showFirstOnEllipsisShow: false,
    activeClassName: 'current',
    callback: function(data, pagination) {
        var html = paginationTemplate(data);
        var $paginationList = $('#site-pagination-list');
        $paginationList.html(html);
        $('.archive__item-excerpt').each(function(idx, elem) {
            let fullHeight = elem.scrollHeight;
            let viewHeight = elem.offsetHeight;
            if(fullHeight > viewHeight) {
                elem.className += ' truncated';
                console.log(elem.textContent.substr(0, elem.textContent.length-4));  // 아니지 보이는 height 부터 잘려야지
            }
        });
    }
});

$('.paginationjs-go-button > input').click(function() {
    $('#site-paginator').pagination('go', $('.paginationjs-go-input > input').val());
});

$('.paginationjs-go-input > input').on('keypress', function(event){
    if(event.which == 13) {
        event.preventDefault();
        $('.paginationjs-go-button > input').click();
    }
});

$('.paginationjs-go-input > input').focus(function() { $(this).select(); });

function toggleNavExcerpt(self){
    var $excerpt = $(self).prev();
    var fullExcerpt = $excerpt.data('full-excerpt');
    $excerpt.text(fullExcerpt);
    $excerpt.css('max-height', '100%');
    $excerpt.removeClass('truncated');
}
