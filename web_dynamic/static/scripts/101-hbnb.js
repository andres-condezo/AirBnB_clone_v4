// const url_api = 'http://0.0.0.0:5001/api/v1/';
const url_api = 'http://localhost:5001/api/v1/';

const selectAmenities = {};
const selectStates = {};
const selectCities = {};

$(document).ready(function () {
  $('.amenitie-check').change(function () {
    if ($(this).is(':checked')) {
      selectAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectAmenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(selectAmenities).join(', '));
    $('.amenities-tooltip').text(Object.values(selectAmenities).join(', '));
  });

  $('.state-check').change(function () {
    if ($(this).is(':checked')) {
      selectStates[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectStates[$(this).attr('data-id')];
    }
    $('.locations h4').text([...Object.values(selectStates), ...Object.values(selectCities)].join(', '));
    $('.states-tooltip').text([...Object.values(selectStates), ...Object.values(selectCities)].join(', '));
  });

  $('.city-check').change(function () {
    if ($(this).is(':checked')) {
      selectCities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectCities[$(this).attr('data-id')];
    }
    $('.locations h4').text([...Object.values(selectStates), ...Object.values(selectCities)].join(', '));
    $('.states-tooltip').text([...Object.values(selectStates), ...Object.values(selectCities)].join(', '));
  });

  $.get(url_api + 'status', function (data) {
    const cls = 'available';
    const apiStatus = $('div#api_status');
    if (data.status == 'OK') { apiStatus.addClass(cls); } else { apiStatus.removeClass(cls); }
  });

  const users_name = {};
  $.get(url_api + 'users', (data) => {
    let user;
    for (user of data) {
      users_name[user.id] = `${user.first_name} ${user.last_name}`;
    }
  });

  const places_review = {};
  $.get(url_api + 'reviews', (data) => {
    let review;
    for (review of data) {
      const reviews_same_place = {};
      places_review[review.place_id] = review.text;
    }
  });
  console.log(places_review);

  function createArticle (place) {
    console.log(place);
    return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                      $${place.price_by_night}
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
                  <div class="user">
                    <p><b>Owner: </b>${users_name[place.user_id]}</p>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                  <div class="reviews">
                  <h2> Reviews </h2> 
                  <span> 
                    show
                  </span>
                    ${users_name[places_review[place.id].user_id]}
                    ${places_review[place.id]}
                  </div>
                </article>`;
  }
  function getPlaces (url, body) {
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(body),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        data.forEach((place) => {
          $('section.places').append(createArticle(place));
        });
      }
    });
  }

  getPlaces(url_api + 'places_search', {});

  $('.container .filters button').click(() => {
    $('section.places').html('');
    const filters = {};
    filters.amenities = Object.keys(selectAmenities);
    filters.states = Object.keys(selectStates);
    filters.cities = Object.keys(selectCities);
    getPlaces(url_api + 'places_search', filters);//
  });
});
