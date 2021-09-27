//const url = 'http://localhost:5001/api/v1/status//';
const url = 'http://0.0.0.0:5001/api/v1/status/';
$(document).ready(function () {
  const selectAmenities = {};
  $('input').change(function () {
    if ($(this).is(':checked')) {
      selectAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectAmenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(selectAmenities).join(', '));
  });

  $.get(url, function (data) {
    const cls = 'available';
    const apiStatus = $('div#api_status');
    if (data.status == 'OK') { apiStatus.addClass(cls); } else { apiStatus.removeClass(cls); }
  });
});
