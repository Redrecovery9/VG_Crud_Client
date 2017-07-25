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
        <td><button type="button" class="btn btn-default">X</button></td>
        <td><button type="button" class="btn btn-default">👾</button></td></tr>`
      )
    }
  })
})
