// Navigation
$(document).ready(function() {
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
});

// Frontpage Slideshow
$(window).load(function() {
  $('.frontpage-slideshow').flexslider({
    controlNav: false,
    directionNav: false,
    animationSpeed: 2000
  });
});

// Add landscape class to landscape images
$( document ).ready(function() {
    $('section.image_gallery img').each(function() {
      if ($(this).width() > $(this).height()) {
        $(this).addClass('landscape');
      }
    });
});
