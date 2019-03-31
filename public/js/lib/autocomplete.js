/* global google:true */
/* eslint no-param-reassign: "error" */
function autocomplete(input, latInput, lngInput) {
  if (!input) return; // Skip this function if there is no input
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
  // Prevent submit on enter in address feild
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
