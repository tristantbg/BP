/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    $body,
    $site_content,
    $featuredgallery = null,
    MQL = 1000,
    isMobile,
    sections,
    posFromTop,
    scroll_timer;
$(function() {
    var app = {
        init: function() {}
    };
    app.init();
});

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayRand(myArray) {
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}
jQuery.fn.aPosition = function() {
    thisLeft = this.offset().left;
    thisTop = this.offset().top;
    thisParent = this.parent();
    parentLeft = thisParent.offset().left;
    parentTop = thisParent.offset().top;
    return {
        left: thisLeft - parentLeft,
        top: thisTop - parentTop
    };
};
jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

function offsetEl(elt) {
    var rect = elt.getBoundingClientRect(),
        bodyElt = document.getElementById("#site_content");
    return {
        top: rect.top + bodyElt.scrollTop,
        left: rect.left + bodyElt.scrollLeft
    };
}

function sizeSet() {
    h = $(window).height();
    w = $(window).width();
    $('article.page, .flickity-viewport').height(h);
    if (w < MQL) {
        isMobile = true;
    } else {
        isMobile = false;
    }
    if (Modernizr.touch || isMobile) {
        isMobile = true;
    } else {
        indexProjects = document.getElementsByClassName('ajax');
        if (indexProjects.length > 0) {
            var width = indexProjects[0].clientWidth;
            for (var i = 0; i < indexProjects.length; ++i) {
                var item = indexProjects[i];
                //item.style.height = width / 5 + "px";
            }
        }
        $('section.studio .top .left').height($('section.studio .top .right').height());
    }
    if ($featuredgallery !== null) {
        $featuredgallery.flickity('reposition');
    }
}

function closeAjax() {
    $('.ajax_display').removeClass('displayed').find('.inner').empty();
}

function loadContent(url, target) {
    $.ajax({
        url: url,
        success: function(data) {
            closeAjax();
            $(target).addClass('displayed').find('.inner').append(data);
            //console.log(data);
            var owl = $('.owl-carousel').owlCarousel({
                items: 1,
                merge: true,
                loop: true,
                margin: 0,
                lazyLoad: true,
                video: true,
                mouseDrag: false,
                smartSpeed: 500,
                center: true
            });
            if (!isMobile) {
                $('.owl-carousel .cell').click(function(e) {
                    if ($(e.target).hasClass('owl-video-play-icon')) {
                        return;
                    }
                    owl.trigger('next.owl.carousel');
                });
            }
            var elToHn = $('.ajax_display .hyphenate');
            for (var i = 0; i < elToHn.length; i += 1) {
                elToHn[i] = Hyphenator.hyphenate(elToHn[i], "en");
            }
            setTimeout(function() {
                var offsetElement = target.position().top + $('section.index').aPosition().top - 25;
                $site_content.animate({
                    scrollTop: offsetElement
                }, 500);
            }, 400);
        }
    });
}

function init() {
    //START
    jQuery(document).ready(function($) {
        $body = $('body');
        $site_content = $('#site_content');
        $dotTop = $('.logo .dot_top');
        $dotBot = $('.logo .dot_bottom');
        sizeSet();
        if (isMobile) {
            $('section.studio .inner .top .left').swapWith($('section.studio .inner .top .right'));
            $('section.studio .inner .bottom .left').swapWith($('section.studio .inner .bottom .right'));
            $('section.studio .inner .contact').swapWith($('section.studio .inner .recent_clients'));
        }
        $(document).scrollScope();
    });
    //MOBILE
    jQuery(document).ready(function($) {
        if (isMobile) {
            $('article.project').removeClass('start openInfo');
        }
    });
    // MENU + LOGO SCROLL
    function stretch(current, min, max, reverse) {
        var origin = current - min,
            scrollPercent = origin / max;
        if (reverse) {
            scrollPercent = 1 - scrollPercent;
        }
        if (scrollPercent >= 1) {
            scrollPercent = 1;
        }
        if (scrollPercent <= 0) {
            scrollPercent = 0;
        }
        dotTop = -scrollPercent * 47;
        dotBot = -scrollPercent * 23;
        var position = {
            top: dotTop,
            bottom: dotBot
        };
        return position;
    }
    function placeDots(currentTop) {
      if (!isMobile) {
                //LOGO STRECH
                var offsetStudio = $("section.studio").aPosition().top;
                if (currentTop <= offsetStudio - h / 2) {
                    var pos = stretch(currentTop, h / 2, h / 2);
                    $dotTop.css({
                        transform: 'translateX(' + pos.top + '%)',
                        MozTransform: 'translateX(' + pos.top + '%)',
                        WebkitTransform: 'translateX(' + pos.top + '%)',
                        msTransform: 'translateX(' + pos.top + '%)'
                    });
                    $dotBot.css({
                        transform: 'translateX(' + pos.bottom + '%)',
                        MozTransform: 'translateX(' + pos.bottom + '%)',
                        WebkitTransform: 'translateX(' + pos.bottom + '%)',
                        msTransform: 'translateX(' + pos.bottom + '%)'
                    });
                } else {
                    var pos = stretch(currentTop, offsetStudio - h / 2, h / 2, true);
                    $dotTop.css({
                        transform: 'translateX(' + pos.top + '%)',
                        MozTransform: 'translateX(' + pos.top + '%)',
                        WebkitTransform: 'translateX(' + pos.top + '%)',
                        msTransform: 'translateX(' + pos.top + '%)'
                    });
                    $dotBot.css({
                        transform: 'translateX(' + pos.bottom + '%)',
                        MozTransform: 'translateX(' + pos.bottom + '%)',
                        WebkitTransform: 'translateX(' + pos.bottom + '%)',
                        msTransform: 'translateX(' + pos.bottom + '%)'
                    });
                }
            } else {
                if (currentTop > h) {
                    $('.logo').addClass('reduced');
                } else {
                    $('.logo').removeClass('reduced');
                }
            }
    }
    jQuery(document).ready(function($) {
        //responsive navigation slide-in effect
        var menu = $('nav.main.menu');
        $site_content.on('scroll', {
            previousTop: 0
        }, function() {
            var currentTop = $site_content.scrollTop();
            //check if user is scrolling up
            if (currentTop < this.previousTop) {
                //if scrolling up...
                menu.addClass('is-visible');
            } else {
                //if scrolling down...
                if (currentTop < h / 2) {
                    menu.addClass('is-visible');
                } else {
                    menu.removeClass('is-visible');
                }
            }
            this.previousTop = currentTop;
            placeDots(currentTop);
        });
    });
    // GALLERIES
    $(document).ready(function($) {
        $(window).load(function() {
            $(".loader").fadeOut("fast");
            if (isMobile) {
                var $featuredgallery = $('.projects .gallery').flickity({
                    cellSelector: '.gallery_cell',
                    cellAlign: 'right',
                    contain: true,
                    imagesLoaded: true,
                    percentPosition: false,
                    prevNextButtons: true,
                    pageDots: false,
                    lazyLoad: 3,
                    wrapAround: true,
                    rightToLeft: true,
                    freeScroll: true,
                    freeScrollFriction: 0.03
                        //draggable: false
                });
            } else {
                var $featuredgallery = $('.projects .gallery').flickity({
                    cellSelector: '.gallery_cell',
                    cellAlign: 'right',
                    contain: true,
                    imagesLoaded: true,
                    percentPosition: false,
                    prevNextButtons: false,
                    pageDots: false,
                    lazyLoad: 3,
                    wrapAround: true,
                    rightToLeft: true,
                    //draggable: false
                });
            }
            var $studiogallery = $('.studio .gallery').flickity({
                cellSelector: '.gallery_cell',
                contain: true,
                imagesLoaded: true,
                percentPosition: false,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true
            });

            function onLoadeddata(event) {
                var cell = $featuredgallery.flickity('getParentCell', event.target);
                $featuredgallery.flickity('cellSizeChange', cell && cell.element);
                $featuredgallery.flickity('reposition');
            }

            $featuredgallery.find('video').each(function(i, video) {
                video.play();
                $(video).on('loadeddata', onLoadeddata);
            });
            
            if (!isMobile) {
                $featuredgallery.on('cellSelect', function() {
                    var flkty = $(this).data('flickity');
                    $(this).find(".active_slide").html(flkty.selectedIndex + 1);
                });
                $featuredgallery.on('staticClick', function(event, pointer, cellElement, cellIndex) {
                    if (!cellElement) {
                        return;
                    }
                    var project = $(this).parents('.project');
                    if (project.hasClass('openInfo')) {
                        project.removeClass('openInfo start').addClass('clicked');
                    } else {
                        $(this).flickity('next', true);
                    }
                });
            }
            $studiogallery.on('staticClick', function(event, pointer, cellElement, cellIndex) {
                if (!cellElement) {
                    return;
                }
                $(this).flickity('next', true);
            });
            $('.studio .right').click(function(event) {
                $studiogallery.flickity('next', true);
            });
        });
    });
    // OPENER
    $(document).ready(function($) {
        $('.opener').bind('click', function(event) {
            var project = $(this).parents('.project');
            project.addClass('clicked').removeClass('start').toggleClass('openInfo');
            $('.gallery').each(function(index, el) {
                $(this).flickity('reposition');
            });
        });
        $('.project_infos').hover(function() {
            var project = $(this).parents('.project');
            if (project.hasClass('clicked')) {
                project.addClass('openInfo');
            }
        }, function() {
            var project = $(this).parents('.project');
            if (project.hasClass('clicked')) {
                project.removeClass('openInfo');
            }
        });
    });
    //AJAX CALL
    $(document).ready(function() {
        $('.ajax_display .boxclose').click(function(event) {
            closeAjax();
        });
        $('section.index, section.index article').click(function(e) {
            if (e.target == this) {
                closeAjax();
            }
        });
        //INDEX
        $('.mode_selector .image_mode').click(function(event) {
            $('section.index').removeClass('text-mode').addClass('image-mode');
            closeAjax();
        });
        $('.mode_selector .text_mode').click(function(event) {
            $('section.index').removeClass('image-mode').addClass('text-mode');
            closeAjax();
        });
        if (isMobile) {
            $('section.index article').click(function(event) {
                $(this).find('.projects').slideDown();
            });
        }
    });
    //JOBS
    $(document).ready(function() {
        $('.job_container .boxclose').click(function(event) {
            $('.studio').removeClass('job_open');
            $('.jobs li').removeClass('selected');
            hasher.setHash('');
        });
    });
    //SCROLL EFFECT
    // $(document).ready(function() {
    //     var anchor = 3 / 4;
    //     if (!isMobile) {
    //         $site_content.scroll(function() {
    //             var current = $('section.slide:in-viewport(' + h * anchor + ', #site_content)');
    //             $('section.slide:not(:in-viewport(' + h * anchor + ', #site_content))').removeClass('in-viewport');
    //             current.addClass('in-viewport');
    //             var classList = current.attr('class');
    //             classList = classList.split(/\s+/);
    //             $.each(classList, function(index, item) {
    //                 if (item === 'projects') {
    //                     $body.removeClass('inIndex inStudio').addClass('inProject');
    //                 }
    //                 if (item === 'index') {
    //                     $body.removeClass('inProject inStudio').addClass('inIndex');
    //                 }
    //                 if (item === 'studio') {
    //                     $body.removeClass('inProject inIndex').addClass('inStudio');
    //                 }
    //                 if (item === 'landing') {
    //                     $body.removeClass('inProject inIndex inStudio');
    //                     hasher.setHash('');
    //                 }
    //             });
    //             clearTimeout(scroll_timer);
    //             if (!current.hasClass('index') && current.hasClass('slide')) {
    //                 if (!isMobile && !current.hasClass('studio')) {
    //                     var offset = current.aPosition().top;
    //                     scroll_timer = setTimeout(function() {
    //                         $site_content.stop(true, false).animate({
    //                             scrollTop: offset
    //                         }, 300);
    //                     }, 400);
    //                 }
    //             }
    //         });
    //     }
    // });
    // HASH
    jQuery(document).ready(function($) {
        var hash;

        function handleChanges(newHash, oldHash) {
            console.log(newHash);
            hash = hasher.getHashAsArray();
            if (hash[0] === 'page') {
                console.log('PAGE');
                if (hash[1] === 'studio') {
                    if (!isMobile) {
                        $body.toggleClass('studioShow');
                    } else {
                        var offsetElement = $("section.studio").aPosition().top;
                        $site_content.scrollTop(offsetElement);
                    }
                }
                if (hash[1] === 'project') {
                    $body.removeClass('studioShow');
                    var offsetElement = $("section.projects").first().aPosition().top;
                    $site_content.scrollTop(offsetElement);
                }
                if (hash[1] === 'archive') {
                    $body.removeClass('studioShow');
                    var offsetElement = $("section.index").first().aPosition().top;
                    $site_content.scrollTop(offsetElement);
                }
            }
            if (hash[0] === 'project') {
                var element = $('*[data-target="' + newHash + '"]');
                var target = element.parent().parent().find('.ajax_display');
                url = element.attr('href');
                loadContent(url, target);
            }
            if (hash[0] === 'job') {
                var element = $('*[data-target="' + newHash + '"]');
                var studio = $('#studio');
                var offsetElement = studio.aPosition().top;
                $site_content.scrollTop(offsetElement);
                studio.addClass('job_open');
                $('.jobs li').removeClass('selected');
                element.addClass('selected');
                $('.job').removeClass('selected');
                studio.find('#job-' + hash[1]).addClass('selected');
                $('.jobs li').removeClass('selected');
                element.addClass('selected');
            }
            placeDots($site_content.scrollTop());
        }
        hasher.changed.add(handleChanges);
        hasher.initialized.add(handleChanges);
        hasher.prependHash = '!/';
        hasher.init();
        $('[data-target]').bind('click', function(e) {
            e.preventDefault();
            hasher.setHash($(this).data('target'));
        });
    });
    $(window).on('resize', sizeSet);
}
init();