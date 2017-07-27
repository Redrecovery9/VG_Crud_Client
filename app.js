const baseURL = 'https://sleepy-forest-72827.herokuapp.com/'
const idURL = 'https://sleepy-forest-72827.herokuapp.com/:id'

$(document).ready(function() {
  $.get(baseURL)
  .then(updateTable)

  $('.add-save').click((event) => {
    event.preventDefault()
    let $title = $('#add-name').val()
    let $platform = $('#add-platform').val()
    let $beaten = $('input[name=post-options]:checked').val()
    let $rating = $('#add-rating').val()

    let post = {
      name: $title,
      platform: $platform,
      beaten: $beaten,
      rating: $rating
    }

    $.post(baseURL, post)
      .then(newPost => {
        $.get(baseURL)
        .then(updateTable)
      })
  })
  function updateTable(data) {
    const vg = data

    $('.table_body').empty()
    for(let i = 0; i < data.length; i++) {
      let id = vg[i].id;
      let name = vg[i].name
      let platform = vg[i].platform
      let beaten = vg[i].beaten
      let rating = vg[i].rating
      $('.table_body').append(
        `<tr><td>${name}</td><td>${platform}</td><td>${beaten}</td><td>${rating}</td>
        <td><button type="button" class="btn btn-default">👾</button></td>
        <td><button id="${id}" type="button" class="btn btn-default edit-button" data-toggle="modal" data-target="#putModal">
          Edit
        <span class="glyphicon glyphicon-wrench"></span></button></td>
        <td><button type="button" class="btn btn-default">X</button></td></tr>`
      )
    }
  }
})
