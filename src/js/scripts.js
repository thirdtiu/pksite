/* requires:
jquery.min.js
bootstrap.js
jquery.mmenu.all.min.js
*/
var glocation, gpostalcode, gcoordinates, gipaddress;
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

var gatherLocationInfo = (function() {
    var onSuccess = function (geoipResponse) {
      glocation = geoipResponse['city']['names']['en'];
      gpostalcode = geoipResponse['postal']['code'];
      gcoordinates = geoipResponse['location']['latitude'] + ',' + geoipResponse['location']['longitude'];
      gipaddress = geoipResponse['traits']['ip_address'];
    }

    var onError = function (error) {
        return;
    };

    return function () {
      geoip2.city(onSuccess, onError);
    };
}());
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

  gatherLocationInfo();

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
  $('input[name="utm_source"]').value = GetURLParam("utm_source");
  $('input[name="utm_medium"]').value = GetURLParam("utm_medium");
  $('input[name="utm_campaign"]').value = GetURLParam("utm_campaign");
  $('input[name="utm_term"]').value = GetURLParam("utm_term");
  $('input[name="utm_content"]').value = GetURLParam("utm_content");
  $('input[name="location"]').value = glocation;
  $('input[name="postalcode"]').value = gpostalcode;
  $('input[name="coordinates"]').value = gcoordinates;
  $('input[name=ipaddress]').value = gipaddress;
  // $('input[name="countrycode"]').val(GetURLParam("countrycode"));
  // $('input[name="metrocode"]').val(GetURLParam("metrocode"));

  // setTimeout(function(){
  //   var form = $('form');
  //   var data = form.serializeFormJSON();
  //   console.log(data);
  // }, 5000);

   $('body').on('submit', '.home-banner-form, .footer-form, .event-banner-form, .event-bottom-form', function(e){
      // e.preventDefault();
      // var form = $(this);
      // var data = form.serializeFormJSON();
      // data.location = glocation;
      // data.postalcode = gpostalcode;
      // data.coordinates = gcoordinates;
      // data.ipaddress = gipaddress;
      // console.log(data);

      // alert($('input[name=ipaddress]').val());
      // $.ajax({
      //   type: 'POST',
      //   url: 'https://app.wavecell.com/api/v1/signups',
      //   dataType: 'html',
      //   data: {
      //     email : data.sign_email,
      //     gclid: gclid
      //   },
      //   error: function(jqXHR, textStatus,  errorThrown) {
      //     var response = JSON.parse(jqXHR.responseText);
      //     console.log(response.message);
      //   },
      //   success: function(data, textStatus, jqXHR) {
      //     var response = JSON.parse(jqXHR.responseText);
      //     console.log(response.message);
      //   }
      // });
   })


  //countdown timer in events page
  $("#countdown-timer")
  .countdown("2017/06/28 11:30:00", function(event) {
    $(this).html(
      event.strftime('<span><strong>%D</strong> days</span> <span><strong>%H</strong> hours</span> <span><strong>%M</strong> minutes</span> <span><strong>%S</strong> seconds</span>')
    );
  });

});