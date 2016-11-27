$(document).ready(function() {
  // Navigation
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });

  // PNG fallback for SVG assets.
  if (!Modernizr.svg) {
    var imgs = document.getElementsByTagName('img');
    var svgExtension = /.*\.svg$/
    var l = imgs.length;
    for(var i = 0; i < l; i++) {
        if(imgs[i].src.match(svgExtension)) {
            imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
            console.log(imgs[i].src);
        }
    }
  }
});

$(window).load(function() {
  // Frontpage Slideshow
  $('.frontpage-slideshow').flexslider({
    controlNav: false,
    directionNav: false,
    animationSpeed: 2000
  });
  // Add landscape class to landscape images
  $('section.image_gallery img').each(function() {
    if ($(this).width() > $(this).height()) {
      $(this).addClass('landscape');
    }
    // Fade in image once its aspect ratio is fixed
    $(this).fadeTo('slow', 1);
  });

  // $('.page-content').fadeTo('slow', 1);
});

$(window).load(function() {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");;
});
