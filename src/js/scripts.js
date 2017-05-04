/* requires:
jquery.min.js
bootstrap.js
jquery.mmenu.all.min.js
*/
$(document).ready(function() {
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
});