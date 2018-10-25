'use strict';

function getRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#results').addClass('hidden');
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('#js-error-message').empty();
    $('#results-list').append(
      `<li><h3><a target="_blank" href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-user-handle').val();
    getRepos(username);
  });
}

$(watchForm);