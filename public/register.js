document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.querySelector("#register");
  
  registerButton.addEventListener("click", async () => {
    try {
      const data = {
        name: document.querySelector("#name").value,
        photo: document.querySelector("#photo").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };

      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      let response = await fetch("/api/sessions/register", opts);
      response = await response.json();

      if (response.statusCode === 201) {
        location.replace("/sessions/login");
      } else {
        alert("ERROR: " + response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  });
});