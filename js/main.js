'use strict';

$(window).on("load", function(){

    $("#preload_fixed").css('display','none');

    /*  Style fixes
    ============================*/

    if ( (bowser.firefox && bowser.version < 52) || (bowser.msie && bowser.version <= 11)) {
        $("<link/>", {
           rel: "stylesheet",
           type: "text/css",
           href: "css/browser-fix.css"
        }).appendTo("head");
    }

    /*  Navigation Scroll
    ============================*/

    var NvScr = {

        offset : -10,

        init : function() {

            NvScr.topMenu = $(".menu");
            NvScr.topMenuHeight = NvScr.topMenu.outerHeight() + NvScr.offset;
            NvScr.menuItems =  NvScr.topMenu.find('a[href*="#"]'),

            NvScr.scrollItems = NvScr.menuItems.map(function(){
                var href = $(this).attr("href"),
                id = href.substring(href.indexOf('#')),
                item = $(id);
                if (item.length) { return item; }
            });

             // so we can get a fancy scroll animation
            NvScr.menuItems.on('click', NvScr.onClick);

            NvScr.shrinkMenu();

            $(window).on("scroll", NvScr.onScroll)

        },

        onClick : function(e) {

            var screen_width = $(window).innerWidth()
            if(screen_width < 769)
                $('.navbar-toggle').trigger('click');

            var href = $(this).attr("href"),
            id = href.substring(href.indexOf('#'));
            var offsetTop = href === "#" ? 0 : $(id).offset().top - NvScr.topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000);
            return false;
        },

        onScroll: function() {
            // Get container scroll position
           var fromTop = $(this).scrollTop() + NvScr.topMenuHeight;

           // Get id of current scroll item
           var cur = NvScr.scrollItems.map(function(){
             if ($(this).offset().top < fromTop)
               return this;
           });

           // Get the id of the current element
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";

           NvScr.menuItems.parent().removeClass("menu-item--current");
           if(id){
                NvScr.menuItems.parent().end().filter("[href*='#"+id+"']").parent().addClass("menu-item--current");
           }

           NvScr.shrinkMenu();
        },

        shrinkMenu: function() {
            var scrollTop = $(window).scrollTop();
            if ( scrollTop > 150 ) {
                $("#menu-container").addClass("menu-scrolled");
            } else {
                $("#menu-container").removeClass("menu-scrolled");
            }
        }

    }

    NvScr.init();

    /*  Tabs
    ============================*/
    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });

    /*  Work - Animation on scroll
    ============================*/
    new AnimOnScroll( document.getElementById( 'grid' ), {
       minDuration : 0.7,
       maxDuration : 1,
       viewportFactor : 0.5
    } );


    /*  Banner Carousel
    ========================= */
    $('#banner-carousel').owlCarousel({
        items: 1,
        singleItem: true,
        loop: true,
        autoplay:true
    });

    /*  Team Carousel
    ============================*/
    $('#team-carousel').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            500: {
                items: 2
            },
            772:{
                items:3
            },
            1200:{
                items:4
            }
        },
        responsiveRefreshRate : 50

    });

    /*  Testimonials Carousel
    ============================*/
    $('#testimonial-carousel').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            510: {
                items: 2
            },
            992:{
                items:3
            }
        },
        responsiveRefreshRate : 50

    });

    /*  Partners Carousel
    ============================*/
    $('#partners-carousel').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            500: {
                items:3
            },
            722:{
                items:4
            },
            1000:{
                items:5
            }
        },
        responsiveRefreshRate : 50

    });

    /*  Fun Facts
    ============================*/
    $(".fun-facts").appear(function(){
       $(".fact-counter").countTo({
            speed: 4000,
            refreshInterval: 60,
       });
    });


    /*  Scroll Animation
    ============================*/
    window.sr = ScrollReveal();

    var block1 = {
        reset: true,
        delay: 100,
        viewOffset: { top: 100 },
        easing: 'ease-in',
        mobile: false,
    }

    var block2 = {
        reset: false,
        delay: 100,
        viewOffset: { top: 100 },
        easing: 'ease-in',
        mobile: false,
    }

    var block3 = {
        reset: false,
        delay: 50,
        viewOffset: { top: 30 },
        easing: 'ease-in-out',
        mobile: false,
    }

    sr.reveal('.sr', block1, 50 );
    sr.reveal('.pricing__item', block1, 200);
    sr.reveal('.testimonial', block1, 200);
    sr.reveal('.service-info', block2, 200);
    sr.reveal('.service-item', block2, 200);
    sr.reveal('.contact-input', block3, 100);

    /*  Contact Form
    ============================*/ 
    var contact_form = $("#contact-form");
    var contact_response = $(".mail-response");
    contact_form.submit(function() {
        contact_response.html("&nbsp;");
        // contact_loader.css("display","block");
        $.ajax({
            url: 'contact.php',
            type: 'POST',
            data: contact_form.serialize()
        })
        .success(function(res) {
            if(res.status === 401 || res.status === 400 )
                contact_response.addClass("error-msg");
            else if(res.status === "200") {
                contact_response.addClass("success-msg");
            }

            // contact_loader.css("display","none");
            contact_response.html(res.message);
        })

      return false;
    });


});