//From signup.html
let cancel_button = document.getElementById("cancel")
if (cancel_button) {
  cancel_button.addEventListener("click", function() {
    window.location.href = "login.html";
  });
}

//From login.html
let signup_link = document.getElementById("signup-link")
if (signup_link) {
  signup_link.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "signup.html";
  });
}


