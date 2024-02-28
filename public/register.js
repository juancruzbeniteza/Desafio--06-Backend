const socket= io();

document.querySelector("#newUser").addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const photo = document.querySelector("#photo").value;
    const email = document.querySelector("#email").value;
    const data = {};
    name && (data.name = name);
    photo && (data.photo = photo);
    email && (data.email = email);

    
    socket.emit("Nuevo Usuario", data);

    alert("Usuario Creado");
    name.value = "";
    photo.value = "";
    email.value = "";
    
  });