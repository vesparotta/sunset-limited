$(document).ready(function () {
    //Impostazione di fullpage.js
    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:[ 'firstPage', 'secondPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips:[ 'firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        
        //Scrolling
        css3: true,
        scrollingSpeed: 500,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        dragAndMove: false,
        offsetSections: false,
        normalScrollElements: '',
        scrollOverflow: true,
        scrollOverflowEndPrevent: {
            //non ufficiale/supportato, script modificato
            delay: 500,
            reversal: true
        },
        scrollOverflowReset: false,
        scrollOverflowOptions: {
            click: false,
            preventDefaultException: {
                tagName: /.*/
            }
        },
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,
        
        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        
        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor:[ ''],
        paddingTop: '3em',
        paddingBottom: '3em',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        parallax: false,
        parallaxOptions: {
            type: 'reveal', percentage: 62, property: 'translate'
        },
        
        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
        
        lazyLoading: true,
        
        //events
        onLeave: function (index, nextIndex, direction) {
            opzioni.scrollato = true;
        },
        afterLoad: function (anchorLink, index) {
        },
        afterRender: function () {
        },
        afterResize: function () {
        },
        afterResponsive: function (isResponsive) {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        }
    });
    
    //Comportamento del pulsante punto interrogativo
    $("#infoButton").click(function () {
        $("#infoBox").stop();
        if (! opzioni.infoBoxAperta) {
            $("#infoBox").css("z-index", "1000");
            $("#infoButton").text("✕")
            $("#infoBox").fadeIn();
            opzioni.infoBoxAperta = true;
        } else {
            $("#infoButton").text("?")
            $("#infoBox").fadeOut(function () {
                $("#infoBox").css("z-index", "-1000");
            });
            opzioni.infoBoxAperta = false;
        }
    });
    
    //Blocco del tab
    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 9) {
            objEvent.preventDefault();
        }
    });
    
    //Gestione messaggio di aiuto
    var refresh = setInterval(function () {
        if (! opzioni.scrollato) {
            var msg = alertify.message('Scorri verso il basso!');
            
            msg.callback = function (isClicked) {
                if (isClicked) {
                    opzioni.scrollato = true;
                    clearInterval(refresh);
                }
            };
        } else {
            opzioni.scrollato = true;
            clearInterval(refresh);
        }
    },
    15000);
    
    //Gestione evidenziatore
    $("#clearEvidenz").click(function () {
        resetSP();
        
        $("input[name=radioEvidenz]").attr("checked", false);
        opzioni.evidenz = true;
    });
    
    function resetSP() {
        $(".speaker").parent().animate({
            opacity: 1
        })
    };
    
    $("input[name=radioEvidenz]").click(function () {
        if ($(this).attr("value") === "nero") {
            attivaEvidenz("nero");
        } else if ($(this).attr("value") === "bianco") {
            attivaEvidenz("bianco");
        }
    });
    
    function attivaEvidenz(speaker) {
        var selectTipoNodo = $("#evidenziatore option:selected");
        resetSP();
        
        if (speaker === "nero") {
            $(".speaker").parent().each(function () {
                if ($(this).find(".speaker").text() === "BIANCO") {
                    $(this).animate({
                        opacity: 0.33
                    });
                }
            });
        } else if (speaker === "bianco") {
            $(".speaker").parent().each(function () {
                if ($(this).find(".speaker").text() === "NERO") {
                    $(this).animate({
                        opacity: 0.33
                    })
                }
            });
        }
        
        opzioni.evidenz = true;
    };
    
    //Variabili di supporto
    var opzioni = {
        "infoBoxAperta": false,
        "scrollato": false,
        "evidenz": false
    };
    
    //Apparizione del sito
    
    $("#loader").fadeOut("1000", function () {
        $("#fullpage").fadeIn("3000", function () {
            //Fix fullpage.js scrollOverflow non funzionante
            $(window).resize();
            $(window).trigger('resize');
            window.dispatchEvent(new Event('resize'));
        });
    });
    
    $("#loader").remove();
});