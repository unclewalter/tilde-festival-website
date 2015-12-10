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

// Slideshow
$(window).load(function() {
  $('.frontpage-slideshow').flexslider({
    controlNav: false,
    directionNav: false,
    animationSpeed: 2000
  });
});



// $(function() {
//   $('#slides').slidesjs({
//     width: 1200,
//     height: 460,
//     play: {
//       active: false,
//       auto: true,
//       interval: 10000,
//       swap: true,
//       effect: "fade",
//       pauseOnHover: false
//     },
//     navigation: {
//       // effect: "fade",
//       active: false
//     },
//     pagination: {
//       active: false
//     },
//     effect: {
//       fade: {
//         speed: 2000
//       }
//     }
//   });
// });