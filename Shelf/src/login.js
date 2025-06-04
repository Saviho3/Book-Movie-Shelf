import supabase from "./config/supabaseClient.js"

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

async function insertUser(insert_username, insert_password) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        username: insert_username,
        password: insert_password,
      }
    ])

  if (error) {
    console.error('Insert error:', error)
  } else {
    console.log('Inserted:', data)
  }
}

async function doesUserExist(username, pass) {
  let query;
  if (pass == "sign up") {
  query = supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .maybeSingle()
   } else {
    query = supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .eq('password', pass)
    .maybeSingle()
  }

  const {data, error} = await query;

  if (error) {
    console.error("Supabase query error:", error);
    return false;
  }

  return data !== null;


}

document.getElementById("submit-button").addEventListener("click", async function(event) {
  event.preventDefault();
  let heading = document.getElementById("page-title");
  if (heading && heading.textContent.trim() ==="Login") {

    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    const exists = await doesUserExist(username, password);
    if (exists) {
      alert("Wrong username or password!");
    } else {
      localStorage.setItem("username", username);
      console.log(username);
      window.location.href = "index.html";
    }

  } else if (heading.textContent.trim() == "Sign up") {

    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let confirmPassword = document.getElementById("confirm-password-input").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const exists = await doesUserExist(username, "sign up");

    if (exists) {
      alert("Username already taken.");
      return;
    }

    await insertUser(username, password);
    localStorage.setItem("username", username);
    window.location.href = "index.html";
    //document.getElementById("page-title").textContent = "Account created for " + username;
  }

  
});


