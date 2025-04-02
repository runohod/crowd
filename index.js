const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
  });
  
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
 
fetch("https://api.thecatapi.com/v1/images/search?page=0&limit=30", requestOptions)

// схранять котов у локал сторедж . А при удаление котво из избаранных кота нужно подчищать в локал сторадж



function fetchImage() {
  const apiKey = "Your-apiKey";
  fetch("https://any-anime.p.rapidapi.com/anime/img", {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "any-anime.p.rapidapi.com",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      const container = document.getElementById("image-container");
      container.appendChild(imageElement);
    })
    .catch((error) => console.error(error));
}
const button = document.getElementById("fetch-image-button");
button.addEventListener("click", fetchImage);