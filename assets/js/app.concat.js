/* globals $:false */
var w = $(window).width(),
    h = window.innerHeight ? window.innerHeight : $(window).height(),
    $body,
    $site_content,
    $featuredgallery = null,
    MQL = 1000,
    isMobile,
    sections,
    posFromTop,
    scroll_timer;

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
    h = window.innerHeight ? window.innerHeight : $(window).height();
    w = $(window).width();
    isMobile = (function(a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (Modernizr.touch || isMobile) {
        isMobile = true;
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
                $(window).scrollTo(target, 300, {
                    offset: -25,
                    axis: 'y'
                });
            }, 300);
        }
    });
}

function init() {
    //START
    jQuery(document).ready(function($) {
        $body = $('body');
        $site_content = $(window);
        $dotTop = $('.logo .dot_top');
        $dotBot = $('.logo .dot_bottom');
        sizeSet();
        window.viewportUnitsBuggyfill.init();
        if (isMobile) {
            $('section.studio .inner .top .left').swapWith($('section.studio .inner .top .right'));
            $('section.studio .inner .bottom .left').swapWith($('section.studio .inner .bottom .right'));
            $('section.studio .inner .contact').swapWith($('section.studio .inner .recent_clients'));
            $('section.projects, section.projects article').height(h);
        }
        $(document).scrollScope();
        $('section.landing button.arrow').on('click', function(event) {
            event.preventDefault();
            $site_content.scrollTo($site_content.scrollTop() + h, 300);
        });
        $dotTop.click(function(event) {
            $site_content.scrollTo(0, 1000);
        });
    });
    //MOBILE
    jQuery(document).ready(function($) {
        if (isMobile) {
            $('article.project').removeClass('start openInfo');
            $('section.projects').height(h);
            $('section.landing').removeClass('snap');
        } else {
            $('section.studio .top .left').height($('section.studio .top .right').height());
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
                    dragThreshold: 17,
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
            if (!isMobile) {
                $featuredgallery.on('cellSelect', function() {
                    var flkty = $(this).data('flickity');
                    $(this).find(".active_slide").html(flkty.selectedIndex + 1);
                    $(this).find('.is-selected video').each(function(i, video) {
                        video.play();
                    });
                });
                $featuredgallery.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
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
            $studiogallery.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
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
        $('section.index article').click(function(event) {
            if (isMobile) {
                $(this).find('.projects').slideDown();
            }
        });
    });
    //JOBS
    $(document).ready(function() {
        $('.job_container .boxclose').click(function(event) {
            event.preventDefault();
            $('.studio').removeClass('job_open');
            $('.jobs li').removeClass('selected');
            hasher.setHash('page/studio');
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
    jQuery(document).ready(function($) {
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });
        var hashcontroller = new ScrollMagic.Controller({
            globalSceneOptions: {
                duration: h,
                triggerHook: 0.5,
                reverse: true
            }
        });
        // get all slides
        if (!isMobile) {
            var slides = document.querySelectorAll("section.slide .wrap");
            var slidesProjects = document.querySelectorAll("section.projects");
            //var slidesAct = document.querySelectorAll("section.content");
            // create scene for every slide
            for (var i = 0; i < slides.length; i++) {
                new ScrollMagic.Scene({
                    triggerElement: slides[i]
                }).setPin(slides[i], {
                    pushFollowers: false
                }).addTo(controller);
            }
            // for (var i = 0; i < slidesAct.length; i++) {
            //     new ScrollMagic.Scene({
            //         triggerElement: slidesAct[i]
            //     }).setClassToggle(slidesAct[i], 'active')
            //     .on('enter', function() {
            //         //hasher.setHash('page/contact');
            //         scrollTo(slidesAct[i],300);
            //     }).addTo(hashcontroller);
            // }
            for (var i = 2; i < slides.length; i++) {
                new ScrollMagic.Scene({
                    triggerElement: slides[i],
                    duration: "100%"
                }).setTween(slides[i], {
                    opacity: 0.4,
                    y: -60,
                    autoAlpha: 0
                }).addTo(controller);
            }
            new ScrollMagic.Scene({
                triggerElement: "section.studio",
                triggerHook: 'onEnter'
            }).setTween("section.studio .logo_full", 0.3, {
                opacity: 1
            }).addTo(controller);
            //Hash trigger
            var landing = new ScrollMagic.Scene({
                triggerElement: "section.landing"
            }).on('enter', function() {
                //hasher.setHash('page/landing');
                $body.removeClass('inProject inIndex inStudio').addClass('inLanding');
            }).addTo(hashcontroller);
            for (var i = 0; i < slidesProjects.length; i++) {
                new ScrollMagic.Scene({
                    triggerElement: slidesProjects[i]
                }).on('enter', function() {
                    //hasher.setHash('page/project');
                    $body.removeClass('inLanding inIndex inStudio').addClass('inProject');
                }).addTo(hashcontroller);
            }
            var index = new ScrollMagic.Scene({
                triggerElement: "section.index"
            }).on('enter', function() {
                //hasher.setHash('page/archive');
                $body.removeClass('inLanding inProject inStudio').addClass('inIndex');
            }).addTo(hashcontroller);
            var studio = new ScrollMagic.Scene({
                triggerElement: "section.studio"
            }).on('enter', function() {
                //hasher.setHash('page/studio');
                $body.removeClass('inLanding inProject inIndex').addClass('inStudio');
            }).addTo(hashcontroller);
        }
        $(".landingVideo video").each(function(index, video) {
            video.play();
        });
    });
    // HASH
    jQuery(document).ready(function($) {
        var hash;

        function handleChanges(newHash, oldHash) {
            console.log(newHash);
            hash = hasher.getHashAsArray();
            if (hash[0] === 'page') {
                console.log('PAGE');
                if (hash[1] === 'studio' && oldHash == null) {
                    var offsetElement = $("section.studio").aPosition().top;
                    $site_content.scrollTop(offsetElement + 10);
                }
                if (hash[1] === 'project' && oldHash == null) {
                    var offsetElement = $("section.projects").first().aPosition().top;
                    $site_content.scrollTop(offsetElement);
                }
                if (hash[1] === 'archive' && oldHash == null) {
                    var offsetElement = $("section.index").aPosition().top;
                    $site_content.scrollTop(offsetElement);
                }
            }
            if (hash[0] === 'project') {
                if (oldHash == null) {
                    var offsetElement = $("section.index").aPosition().top;
                    $site_content.scrollTop(offsetElement);
                }
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
            var el = $(this);
            e.preventDefault();
            hasher.setHash($(this).data('target'));
            if (el.is('li.project')) {
                var offsetElement = $("section.projects:eq(0)").aPosition().top;
                $site_content.scrollTop(offsetElement);
            }
            if (el.is('li.index')) {
                var offsetElement = $("section.index").aPosition().top;
                $site_content.scrollTop(offsetElement);
            }
            if (el.is('li.studio')) {
                var offsetElement = $("section.studio").aPosition().top;
                $site_content.scrollTo(offsetElement);
            }
        });
    });
    $(window).on('resize', sizeSet);
    jQuery(document).ready(function($) {
        //if (!isMobile) {
        var isScrolling = false;
        $('.site_wrap').snapscroll({
            axis: 'y',
            scrollSpeed: 300,
            topPadding: 100
        });
        $('.site_wrap').on('mousewheel', function(event) {
            var dir = event.deltaY > 0 ? 'up' : 'down',
                vel = Math.abs(event.deltaY);
            var active_slide = $('.ss-active');
            if (!$('.ss-active').hasClass('index')) {
                if (dir == 'up' && !isScrolling && vel > 5) {
                    var currentS = $body.scrollTop();
                    if (!isScrolling) {
                        $(window).scrollTo(active_slide.prev(), 400);
                        isScrolling = true;
                        setTimeout(function() {
                            isScrolling = false;
                        }, 500);
                    }
                }
                if (dir == 'down' && !isScrolling && vel > 5) {
                    var currentS = $body.scrollTop();
                    if (!isScrolling) {
                        $(window).scrollTo(active_slide.next(), 400);
                        isScrolling = true;
                        setTimeout(function() {
                            isScrolling = false;
                        }, 500);
                    }
                }
                return false;
            }
        });
        //}
    });
}
init();