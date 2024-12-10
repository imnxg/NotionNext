console.log(
    "\n %c MemosGallery v1.0.2 %c https://i.yct.ee/ \n",
    "color: #fadfa3; background: #030307; padding:5px 0;",
    "background: #fadfa3; padding:5px 0;"
);

// 等待 jQuery 和配置加载完成
function initGallery() {
    if (typeof jQuery === 'undefined') {
        setTimeout(initGallery, 100);
        return;
    }

    if (!window.memosGalleryConfig) {
        setTimeout(initGallery, 100);
        return;
    }

    $(document).ready(function() {
        const memosGalleryObj = window.memosGalleryConfig;
        photos(memosGalleryObj);

        //memoss获取的是一个div盒子
if (typeof (memos_gallery) !== "undefined") {
    //配置对象通常需要保留所有值，包括 falsy 值
    //一次性合并所有属性,性能通常更好
    Object.assign(memosGalleryObj, memos_gallery);
}

        $(".arrow").click(function(){
          $(".bg").remove();
          $(".text").remove();
          $(window).scroll();
        })
        $(window).scroll(function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > 1000) {
            $("#back-to-top").fadeIn();
          } else {
            $("#back-to-top").fadeOut();
          }
        });
      
        $("#back-to-top").click(function () {
          $("html, body").animate({ scrollTop: 0 }, 800);
          return false;
        });
    });
}

initGallery();

function photos(memosGalleryObj) {
    const urlStr = `creator=='users/${memosGalleryObj.creatorId}'&&visibilities==['${memosGalleryObj.public}']&&tag_search==['${memosGalleryObj.tag}']`; 
    const url = memosGalleryObj.urlHost+"/api/v1/memos?filter="+encodeURIComponent(urlStr);  
    
    
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (!data || !data.memos) {
                throw new Error('Invalid data format: missing memos property');
            }

            let html = "";
            const imgs = data.memos.reduce((acc, item) => {
                const matches = item.content.match(/\!\[.*?\]\(.*?\)/g) || [];
                return acc.concat(matches);
            }, []);

            html = imgs.map(item => {
                const img = item.replace(/!\[.*?\]\((.*?)\)/g, "$1");
                const tat = item.replace(/!\[(.*?)\]\(.*?\)/g, "$1");
                const [time, title] = tat.includes(" ") ? tat.split(" ") : [null, tat];

                return `
                    <div class="gallery-photo">
                        <a href="${img}" data-fancybox="gallery" class="fancybox" data-thumb="${img}">
                            <img src="${img}"
                                loading="lazy"
                                decoding="async"
                                onload="this.classList.add('loaded')"
                                onerror="this.src='/svg/gallery.svg'"
                            >
                            ${title ? `<span class="photo-title">${title}</span>` : ''}
                            ${time ? `<span class="photo-time">${time}</span>` : ''}
                        </a>
                    </div>
                `;
            }).join('');

            const pageElement = document.querySelector(".gallery-photos .page");
            if (pageElement) {
                pageElement.innerHTML = html;
                
                // 确保 jQuery 和 FancyBox 都已加载
                if (typeof jQuery !== 'undefined' && typeof jQuery.fn.fancybox !== 'undefined') {
                    // 初始化 FancyBox
                    $('[data-fancybox="gallery"]').fancybox({
                        buttons: [
                            "zoom",
                            "slideShow",
                            "fullScreen",
                            "download",
                            "thumbs",
                            "close"
                        ],
                        loop: true,
                        protect: true,
                        wheel: true,
                        transitionEffect: "slide",
                        toolbar: true,
                        hash: false,
                        beforeShow: function(instance, current) {
                            $(document).on('wheel', function(e) {
                                if (e.originalEvent.deltaY > 0) {
                                    instance.next();
                                } else {
                                    instance.previous();
                                }
                            });
                        },
                        afterClose: function() {
                            $(document).off('wheel');
                        }
                    });
                } else {
                    console.error('FancyBox not loaded properly');
                }

                window.Lately && Lately.init({ target: ".photo-time" });
                memosGalleryObj.onLoadComplete && memosGalleryObj.onLoadComplete();
            }
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
            const errorMessage = error.message || 'Unknown error occurred';
            const pageElement = document.querySelector(".gallery-photos .page");
            if (pageElement) {
                pageElement.innerHTML = `
                    <div class="error-message">
                        <h3>Failed to load gallery:</h3>
                        <p>${errorMessage}</p>
                        <p>Please check your network connection and configuration.</p>
                    </div>`;
            }
            memosGalleryObj.onLoadError && memosGalleryObj.onLoadError(error);
        });
}

// 添加滚动时的图片懒加载处理
$(window).on('scroll', function() {
    $('.photo-img').each(function() {
        if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
            $(this).attr('src', $(this).attr('data-src'));
        }
    });
});