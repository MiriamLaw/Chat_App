const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", function () {
  const username = document.getElementById("username").value;
  sessionStorage.setItem("username", username);
});


