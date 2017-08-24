$(document).ready(function() {

  let status = authorizeUser()
  setTokenHeader()
  $('.signOut').click(logout)


  if(status){
    displayTable()
  }
  else {
    location.href = "/index.html"
  }


  $('.add-save').click((event) => {
    event.preventDefault()

    let data = {
      name: $('#add-name').val(),
      platform: $('#add-platform').val(),
      beaten: $('input[name=post-options]:checked').val(),
      rating: $('#add-rating').val()
    }

    $.post(baseURL, data)
      .then(newPost => {
        $.get(baseURL)
        .then((data)=> {
          $('.table_body').empty()
          data.forEach(game => appendTable(game))
      })
  })

  $('.put-save').click((event) => {
    event.preventDefault()
    let id = event.target.name

    let data = {
      name: $('#edit-name').val() === '' ? undefined : $('#edit-name').val(),
      platform: $('#edit-platform').val() === '' ? undefined : $('#edit-platform').val(),
      beaten: $('input[name=put-options]:checked').val(),
      rating: $('#edit-rating').val()
    }

    $.ajax({
      url: baseURL + `${parseInt(id)}`,
      method: 'PUT',
      data: data,
      success: function(data) {
        $.get(baseURL)
        .then((data)=> {
          $('.table_body').empty()
          data.forEach(game => appendTable(game))
        })
      }
    })
  })

  function appendTable(data) {
    const vg = data


      let id = vg.id;
      let name = vg.name
      let platform = vg.platform
      let beaten = vg.beaten
      let rating = vg.rating
      let user = vg.users_id
      $('.table_body').append(
        `<tr><td>${name}</td><td>${platform}</td><td>${beaten}</td><td>${rating}</td>
        <td><button type="button" class="btn btn-default">👾</button></td>
        <td><button id="${id}" type="button" class="btn btn-default edit-button" data-toggle="modal" data-target="#putModal">
          Edit
        <span class="glyphicon glyphicon-wrench"></span></button></td>
        <td><button type="button" id="${id}" class="btn btn-default ${user} delete-button">X</button></td></tr>`
      )

    $('.edit-button').click((event) => {
      event.preventDefault()
      let target = event.target.id;
      $.get(baseURL + `${target}`)
      .then((editForm) => {
        let name = editForm.name
        let platform = editForm.platform
        let beaten = editForm.beaten
        let rating = editForm.rating
        let id = editForm.id

        let $title = $('#edit-name').val(`${name}`)
        let $platform = $('#edit-platform').val(`${platform}`)
        if (beaten == true) {
          $('#true').attr('checked', true)
          $('#false').attr('checked', false)
          unactiveFalse()
          activeTrue()
        }
        else {
          $('#true').attr('checked', false)
          $('#false').attr('checked', true)
          unactiveTrue()
          activeFalse()
        }

        let $rating = $('#edit-rating').val(`${rating}`)
        $('#saveButton').attr('name', id)
      })
    })

    $('.delete-button').click((event) => {
      event.preventDefault()
      let target = event.target.id;

      $.ajax({
        url: baseURL + `${target}`,
        method: 'DELETE',
        success: function(data) {
          $.get(baseURL)
          .then((data)=> {
            $('.table_body').empty()
            data.forEach(game => appendTable(game))
        }
      });
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

  function logout() {
    localStorage.removeItem('token')
    location.href = "/index.html"
  }

  function parseJWT (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  function displayTable() {
    const parsedToken = parseJWT(token)
    console.log(parsedToken);
    $.get(baseURL + `auth/users/${parsedToken.id}/games`)
    .then(response => {
      if (response.data.length === 0) {
        appendTable('You don\'t have any games yet... or do you?')
      } else {
        $('.table_body').empty()
        response.data.forEach(game => appendTable(game))
      }
    })
  }

})
