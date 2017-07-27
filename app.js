const baseURL = 'https://sleepy-forest-72827.herokuapp.com/'

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

    $('.edit-button').click((event) => {
      event.preventDefault()
      let target = event.target.id;
      $.get(`https://sleepy-forest-72827.herokuapp.com/${target}`)
      .then((editForm) => {
        let name = editForm.name
        let platform = editForm.platform
        let beaten = editForm.beaten
        let rating = editForm.rating
        console.log(beaten);

        let $title = $('#edit-name').val(`${name}`)
        let $platform = $('#edit-platform').val(`${platform}`)
        if (beaten == true) {
          $('#true').attr('checked', true)
          unactiveFalse()
          activeTrue()
        }
        else if (beaten == false) {
          $('#false').attr('checked', true)
          unactiveTrue()
          activeFalse()
        }
        let $rating = $('#edit-rating').val(`${rating}`)
      })
    })
  }
  function activeTrue() {
    $('.true-radio').addClass('active')
  }
  function unactiveTrue() {
  $('.true-radio').removeClass('active')
  }
  function activeFalse() {
    $('.false-radio').addClass('active')
  }
  function unactiveFalse() {
  $('.false-radio').removeClass('active')
  }


})
