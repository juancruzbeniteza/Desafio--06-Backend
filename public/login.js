const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch("/api/sessions/login", opts);
    res = await res.json();
    alert(res.response);
    res.statusCode==200 && location.replace("/");
    
  } catch (error) {
    alert(error.message);
  }
});

const google = document.querySelector("#google");
google.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    alert(response.message);
    response.session && location.replace("/");
  } catch (error) {
    alert(error.message);
  }
});