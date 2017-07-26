const baseURL = 'https://sleepy-forest-72827.herokuapp.com/videogames'

$(document).ready(function() {
  $.get(baseURL)
  .then((data) => {
    const vg = data

    for(let i = 0; i < data.length; i++) {
      let name = vg[i].name
      let platform = vg[i].platform
      let beaten = vg[i].beaten
      let rating = vg[i].rating
      $('.table_body').append(
        `<tr><td>${name}</td><td>${platform}</td><td>${beaten}</td><td>${rating}</td>
        <td><button type="button" class="btn btn-default">👾</button></td>
        <td><button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal">
          Edit
        <span class="glyphicon glyphicon-wrench"></span></button></td>
        <td><button type="button" class="btn btn-default">X</button></td></tr>`
      )
    }
    $('.modal-body').append(
      `<form>
        <div class="btn-group" data-toggle="buttons">
          <h5>Have you beaten<br>the game?</h5>
          <label class="btn btn-default active">
            <input type="radio" name="options" id="option1" autocomplete="off" checked> False
          </label>
          <label class="btn btn-default">
            <input type="radio" name="options" id="option2" autocomplete="off"> True
          </label>
        </div>
      </form>`
    )
  })
})
