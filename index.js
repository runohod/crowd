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



