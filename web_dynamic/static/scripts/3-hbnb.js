const url = 'http://localhost:5001/api/v1/status//';
//const url = 'http://0.0.0.0:5001/api/v1/status/';
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
  
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                      ${place.price_by_night}
                    </div>
                  </div>
                  <div class="information">
                    <div class="max_guest">
                      </BR>
                      ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
                    </div>
                    <div class="number_rooms">
                      </BR>
                      ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
                    </div>
                    <div class="number_bathrooms">
                      </BR>
                      ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`;
      }));
    }
  });

  $.get(url, function (data) {
    const cls = 'available';
    const apiStatus = $('div#api_status');
    if (data.status == 'OK') { apiStatus.addClass(cls); } else { apiStatus.removeClass(cls); }
  });
});