var $sitePaginator = $('#site-paginator');
var isPaginatorInitialized = false;

if($sitePaginator.length > 0) {
  var totalData = undefined;
  var isEventAttached = false;
  // var ad_script =
  // `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  // <ins class="adsbygoogle"
  //   style="display:block"
  //   data-ad-format="fluid"
  //   data-ad-layout-key="-gs+5+15-58+68"
  //   data-ad-client="ca-pub-9480069633849139"
  //   data-ad-slot="9523124851"></ins>
  // <script>
  //   (adsbygoogle = window.adsbygoogle || []).push({});
  // </script>`;

  $('.recent-posts__opt.sort button').on('click', function() {
    $('.recent-posts__opt.sort-dropdown').toggleClass('visible');
  });

  function toggleNavExcerpt(self) {
    var $excerpt = $(self).prev();
    var fullExcerpt = $excerpt.data('full-excerpt');
    $excerpt.text(fullExcerpt);
    $excerpt.css('max-height', '100%');
    $excerpt.removeClass('truncated');
  }

  function sortPaginationByDate(dateKey, sortDirection) {
    switch(sortDirection) {
      case 'asc': sortDirection = 1; break;
      case 'desc': sortDirection = -1; break;
      default: sortDirection = 1; break;
    }
    function compare( a, b ) {
      aVal = a[dateKey] || 0;
      bVal = b[dateKey] || 0;
      if ( a[dateKey] < b[dateKey] ){
        return -1 * sortDirection;
      }
      if ( a[dateKey] > b[dateKey] ){
        return 1 * sortDirection;
      }
      return 0;
      }
      totalData['data'].sort(compare);
  }

  function sortPaginationData(sortKey) {
    let curSortKey = $('.recent-posts__opt.sort-dropdown').data('current-sort-key');
    if(curSortKey === sortKey) return;
    if(sortKey === 'lastPublished') {
      sortPaginationByDate('date', 'desc');
    } else if(sortKey == 'initialPublished') {
      sortPaginationByDate('date', 'asc');
    } else if(sortKey == 'lastModified') {
      sortPaginationByDate('last_modified_at', 'desc');
    } else if(sortKey == 'initialModified') {
      sortPaginationByDate('last_modified_at', 'asc');
    }
  }

  function paginationTemplate(data, uiText) {
    var categoryLabel = uiText['en']['categories_label'] || 'Categories:';
    var dateLabel = uiText['en']['date_label'] || 'Uploaded:';
    var modifiedDateLabel = uiText['en']['modified_date_label'] || 'Modified:';
    var html = '<ul>';
    for(post of data) {
      if(post.ad) {
        var item = post.script;
      } else {
        var dateLabelValISO, modifiedDateLabelValISO = '';
        if(post.date.length > 0) {
          dateLabelValISO = new Date(post.date.replace(/-/g, '/').replace('T', ' ')).toISOString();
        }
        if(post.last_modified_at.length > 0) {
          modifiedDateLabelValISO = new Date(post.last_modified_at.replace(/-/g, '/').replace('T', ' ')).toISOString();
        }

        var categoryHtml = [];
        for(categoryIdx of Array(post.categories.length).keys()) {
          var innerCategories = post.categories.slice(0, categoryIdx+1);
          categoryHtml.push(`<a href="${'/' + innerCategories.join('/') + '#wholetoc__title'}" class="page__header-taxonomy-item" rel="tag">${post.categories[categoryIdx]}</a>`);
        }
        categoryHtml = categoryHtml.join('<span class="sep">, </span>');
        var postExcerpt = post.excerpt.trim();
        var item =`
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
              <div class="archive__item-excerpt" onclick=\"location.href='${post.url}#page-title'\" itemprop="description" data-full-excerpt="${postExcerpt}">${postExcerpt}</div>
              <div class="archive__item-excerpt-folder fold" onclick="toggleNavExcerpt(this);">펼치기</div>
            </article>
          </div>
        </li>`;
      }
      html += item;
    }
    html += '</ul>';
    return html;
  }

  function drawAjaxError(jqXHR, textStatus, errorMsg) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorMsg);
    var $paginationList = $('#site-pagination-list');
    var err_msg = `
    <h1 style="margin-bottom: 4px;">Error Occured</h1>
    <span style="font-size: .75em;">Detailed Below</span>
    <p>${jqXHR.responseText}</p>`;
    $paginationList.html(err_msg);
  }

  function loadPaginator() {
    $sitePaginator.pagination({
      dataSource: function(done) {
        if(totalData === undefined) {
          $.ajax({
            type: 'GET',
            url: '/data/posts-info.json',
            success: function(response) {
              totalData = {'data': response};
              done(response);
            },
            error: drawAjaxError
          });
        } else {
          done(totalData['data'])
        }
      },
      pageSize: 5,
      pageRange: 1,
      showFirstOnEllipsisShow: false,
      activeClassName: 'current',
      callback: function(data, pagination) {
        // if(window.origin == 'https://seungwubaek.github.io') {
        //   data.splice(2, 0, { 'ad': true, 'script': ad_script });
        //   data.splice(5, 0, { 'ad': true, 'script': ad_script });
        // }
        $.ajax({
          url: '/data/ui-text.json',
          type: 'GET',
          dataType: 'json',
        })
        .done(function(uiText) {
          var html = paginationTemplate(data, uiText);
          var $paginationList = $('#site-pagination-list');
          $paginationList.html(html);
          $('.archive__item-excerpt').each(function(idx, elem) {
            let fullHeight = elem.scrollHeight;
            let viewHeight = elem.offsetHeight;
            if(fullHeight > viewHeight) {
              elem.className += ' truncated';
            }
          });
        })
        .fail(drawAjaxError);
      },
      afterPaging: function() {
        if(isPaginatorInitialized) {
          scrollToHash('#recent-posts');
        }
      },
      afterInit: function() {
        isPaginatorInitialized = true;
      }
    });

    if(!isEventAttached) {
      $('.paginationjs-go-button > input').click(function() {
        $sitePaginator.pagination('go', $('.paginationjs-go-input > input').val());
      });

      $('.paginationjs-go-input > input').on('keypress', function(event){
        if(event.which == 13) {
          event.preventDefault();
          $('.paginationjs-go-button > input').click();
        }
      });

      $('.paginationjs-go-input > input').focus(function() { $(this).select(); });

      isEventAttached = true;
    }
  }

  function reloadPaginator(sortKey) {
    sortPaginationData(sortKey);
    $('#site-pagination-list').empty();
    $sitePaginator.pagination('destroy');
    loadPaginator();
  }

  $('input[name="sort-type"]').click(function() {
    let $this = $(this);
    reloadPaginator($this.val());
  });

  loadPaginator();
}

$(document).on("click", function(event){
  // reference from https://www.tutorialrepublic.com/faq/hide-dropdown-menu-on-click-outside-of-the-element-in-jquery.php#:~:text=Answer%3A%20Use%20the%20jQuery%20on,outside%20of%20the%20trigger%20element.
  var closingBtn = $(".recent-posts__opt.sort button")[0];
  var $sortDropdown = $('.recent-posts__opt.sort-dropdown');
  if($sortDropdown.hasClass('visible') && closingBtn !== event.target){
    $sortDropdown.removeClass('visible');
  }
});
