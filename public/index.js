document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const selector = document.querySelector("#text");
  selector.value = params.get("title");
  
  // Correct the ID of the search button to match the HTML
  const searchButton = document.querySelector("#searchButton");
  
  // Add an event listener only if the search button exists
  if (searchButton) {
    searchButton.addEventListener("click", async (event) => {
      try {
        const text = selector.value;
        location.search = "title=" + text;
      } catch (error) {
        alert(error.message);
      }
    });
  }
});
