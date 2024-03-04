import bcrypt from 'bcrypt';

document.querySelector("#newUser").addEventListener("click", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const photo = document.querySelector("#photo").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value; // Add this line

  const data = {};
  name && (data.name = name);
  photo && (data.photo = photo);
  email && (data.email = email);
  password && (data.password = await bcrypt.hash(password, 10)); // Hash the password

  socket.emit("Nuevo Usuario", data);

  alert("Usuario Creado");
  name.value = "";
  photo.value = "";
  email.value = "";
  password.value = ""; // Clear the password field
});
