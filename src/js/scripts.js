/* requires:
jquery.min.js
bootstrap.js
jquery.mmenu.all.min.js
*/
$(document).ready(function() {
  $("#mobile-menu").mmenu({
     // options
  }, {
     // configuration
     offCanvas: {
        pageSelector: '#page'
     }
  });
});