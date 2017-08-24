const token = localStorage.getItem('token');
const baseURL = 'https://sleepy-forest-72827.herokuapp.com/'
const localURL = 'http://localhost:1995/'



$(function() {

    $('#login-form-link').click(function(e) {
    	$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
  $('#login-submit').click(logIn)
   $('#register-form').click(signUp)

});

function authorizeUser() {
  let status = false;
  const token = localStorage.getItem('token')
  if(token){
    status = true;
  }
  return status;
}

function logIn(event) {
  event.preventDefault();
  var email, password, data;
  if($(`input[name=login-email]`).val()){
    email = $(`input[name=login-email]`).val();
    password = $(`input[name=login-password]`).val();
  } else {
    email = $(`input[name=login-email]`).val();
    password = $(`input[name=login-password]`).val();
  }
  data = {email,password}

  $.post(baseURL + 'auth/login', data)
    .then(response => {
      if(response.error) {
        alert(response.error)
      } else {
        localStorage.setItem('token', response.data)
        location.href = '/user.html'
      }
    })
}

function signUp(event,){
  event.preventDefault();
  var username, email, password, data;
  if($(`input[name=signup-username]`).val()){
    username = $(`input[name=signup-username]`).val();
    email = $(`input[name=signup-email]`).val();
    password = $(`input[name=signup-password]`).val();
  } else {
    username = $(`input[name=signup-username]`).val();
    email = $(`input[name=login-email]`).val();
    password = $(`input[name=login-password]`).val();
  }
    data = {username, email, password}

  $.post(baseURL + 'auth/login', data)
    .then(response => {
      if (!response || response.error) {
        alert("Email Address Already in Use")
      } else {
        localStorage.setItem('token', response.data)
        location.href = '/user.html'
      }
    })
}

function setTokenHeader() {
  if (token) {
    $.ajaxSetup({
      headers: {Authorization: `Bearer ${token}`}
    });
  }
}

function parseJWT (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
