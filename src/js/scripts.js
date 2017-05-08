/* requires:
jquery.min.js
bootstrap.js
jquery.mmenu.all.min.js
*/
$(document).ready(function() {
  // mobile nav
  $("#mobile-menu").mmenu({
     // configuration
     searchfield: {
     	add: true,
     	search: false,
     },
     offCanvas: {
        position: 'bottom',
        zposition: 'front'
     },
     title: ''
  });

  //countdown timer in events page
  $("#countdown-timer")
  .countdown("2017/06/28 11:30:00", function(event) {
    $(this).html(
      event.strftime('<span><strong>%D</strong> days</span> <span><strong>%H</strong> hours</span> <span><strong>%M</strong> minutes</span> <span><strong>%S</strong> seconds</span>')
    );
  });

});