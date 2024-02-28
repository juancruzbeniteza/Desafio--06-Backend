// Make sure Socket.IO is loaded before using it
if (typeof io !== 'undefined') {
  const socket = io();

  socket.on("products", (data) => {
    try {
      const { docs } = data;

      if (docs && docs.length > 0) {
        const template = docs
          .map(
            (each) => `
              <div class="card m-2" style="width: 360px">
                <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
                <h5 class="p-2 text-center card-title">${each.title}</h5>
              </div>
            `
          )
          .join("");
        document.querySelector("#products").innerHTML = template;
      } else {
        console.log("No products available.");
      }
    } catch (error) {
      console.error("Error processing products:", error);
    }
  });
} else {
  console.error("Socket.IO is not defined. Make sure it is properly loaded.");
}
