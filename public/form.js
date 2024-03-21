
document.querySelector("#newProduct").addEventListener("click", async() => {

  try {
    const data = {
      title: document.querySelector("#title").value,
      photo: document.querySelector("#photo").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products/", opts);
    response = await response.json();
    response.statusCode === 201
      ?  alert("Creado exitosamente")
      : alert("ERROR: " + response.message);
  } catch (error) {
    alert(error.message);
  }
});