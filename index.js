window.onload = () => {
  if (isAccessToken()) {
    alert("Already Signed Up");
    window.location.href = "/accio-f3-contest2/profile.html";
  }
};

const signUp = () => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const messageDiv = document.getElementById("message-div");
  messageDiv.innerHTML = "";

  if (!document.getElementById("email").validity.valid) {
    messageDiv.innerText = "Error : Please provide correct email address";
    messageDiv.style.color = "#FF4F4F";
    return;
  }

  if (!(name && email && password && confirmPassword)) {
    messageDiv.innerText = "Error : All the fields are mandatory";
    messageDiv.style.color = "#FF4F4F";
    return;
  }

  if (password !== confirmPassword) {
    messageDiv.innerText =
      "Error : Password and confirm password does not match";
    messageDiv.style.color = "#FF4F4F";
    return;
  }

  messageDiv.innerText = "Successfully Signed Up!";
  messageDiv.style.color = "#7ECD71";

  let accessToken = generateAccessToken();

  console.log(accessToken);
  const userState = { name, email, password, accessToken };

  localStorage.setItem("userState", JSON.stringify(userState));
  setTimeout(() => (window.location.href = "/accio-f3-contest2/profile.html"), 500);
};

// for generating access token
const generateAccessToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const isAccessToken = () => {
  if (!localStorage.getItem("userState")) return false;
  const user = localStorage.getItem("userState");
  const userObj = JSON.parse(user);
  if (!userObj.accessToken) return false;
  return true;
};
