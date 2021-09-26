// const url = 'http://localhost:5001/api/v1/status//';
const url = 'http://0.0.0.0:5001/api/v1/status/';
// const urlPS = 'http://54.87.4.219:49916/api/v1/places_search/';
// const urlPS = 'http://0.0.0.0:5001/api/v1/places_search/';
const urlPS = 'http://localhost:5001/api/v1/places_search/';
// const checkedAmenities = {};
const selectAmenities = {};

$(document).ready(function () {
  $('input').change(function () {
    if ($(this).is(':checked')) {
      selectAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectAmenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(selectAmenities).join(', '));
  });

  $.ajax({
    url: urlPS,
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

  console.log(selectAmenities);

  // Buttom

  // $('.container .filters button').click(() => {
  //   $('section.places').html('');
  //   const filters = {};
  //   filters.amenities = Object.keys(checkedAmenities).filter((id) => typeof (checkedAmenities[id]) === 'string');
  //   // filters.states = Object.keys(checkedStates).filter((id) => typeof (checkedStates[id]) === 'string');
  //   // filters.cities= Object.keys(checkedCities).filter((id) => typeof (checkedCities[id]) === 'string');
  //   getPlaces(urlPS, filters);
  // });
});

console.log(selectAmenities);
