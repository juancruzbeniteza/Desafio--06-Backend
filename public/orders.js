const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((each) =>
  each.addEventListener("click", async (event) => {
    
    try {
      const url = "/api/orders/" + event.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      if(response.statusCode===200) {
        alert(response.response);
        location.reload()
      }
    } catch (error) {
      alert(error.message);
    }
  })
);