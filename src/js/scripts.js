/* requires:
jquery.min.js
bootstrap.js
jquery.mmenu.all.min.js
*/
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
$(document).ready(function() {

  function GetURLParam(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam){
        return sParameterName[1];
      }
    }
  }

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

  //event form populate hidden fields
  $('.event-form input[name="utm_source"]').val(GetURLParam("utm_source"));
  $('.event-form input[name="utm_medium"]').val(GetURLParam("utm_medium"));
  $('.event-form input[name="utm_campaign"]').val(GetURLParam("utm_campaign"));
  $('.event-form input[name="utm_term"]').val(GetURLParam("utm_term"));
  $('.event-form input[name="utm_content"]').val(GetURLParam("utm_content"));
  $('.event-form input[name="countrycode"]').val(GetURLParam("countrycode"));
  $('.event-form input[name="location"]').val(GetURLParam("location"));
  $('.event-form input[name="postalcode"]').val(GetURLParam("postalcode"));
  $('.event-form input[name="coordinates"]').val(GetURLParam("coordinates"));
  $('.event-form input[name="ipaddress"]').val(GetURLParam("ipaddress"));
  $('.event-form input[name="metrocode"]').val(GetURLParam("metrocode"));

  setTimeout(function(){
    var form = $('form.event-form');
    var data = form.serializeFormJSON();
    console.log(data);
  }, 5000);


  //countdown timer in events page
  $("#countdown-timer")
  .countdown("2017/06/28 11:30:00", function(event) {
    $(this).html(
      event.strftime('<span><strong>%D</strong> days</span> <span><strong>%H</strong> hours</span> <span><strong>%M</strong> minutes</span> <span><strong>%S</strong> seconds</span>')
    );
  });

});