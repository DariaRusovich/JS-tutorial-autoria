const CARS = JSON.parse(DATA);
const carList = document.getElementById("carList");
const sortSelect = document.getElementById("sortSelect");

// CARS.length = 50
console.log(CARS);



sortSelect.addEventListener('change', event => {
  const sortData = event.target.value.split('/')
  const sortKey = sortData[0]
  const sortType = sortData[1]
  if (sortSelect === 'string') {
    CARS.sort((a,b) => {
      //return (a[sortKey].localeCompare(b[sortKey]))
     //return sortData.localeCompare(compareString[a[sortKey], b[sortKey]])
     //return ('' + a[sortKey]).localeCompare(b[sortKey]);
    //CARS.localeCompare((a,b) => {
      //return ('' + a[sortKey]).localeCompare(b[sortKey]);
      //return (compareString[a[sortKey], b[sortKey]])
      //return ('' + a[sortKey]), (b[sortKey]);
      //return (a[sortKey].localeCompare(b[sortKey]))
    })
  } else{
    CARS.sort((a,b) => {
      return (a[sortKey] - b[sortKey]) * sortType
    })
  }
  
  
  renderCards(createCardsHTML(CARS), carList);
})
//let str1 = "ab";
//let str2 = "cd";
//let n = str1.localeCompare(str2);
//console.log(n)

renderCards(createCardsHTML(CARS), carList);

function createCardsHTML(carsArray) {
  let cardsHTML = "";
  carsArray.forEach((car) => {
    cardsHTML += createCard(car);
  });
  return cardsHTML;
}

function renderCards(cardsHtml, carListElement) {
  carListElement.innerHTML = cardsHtml
}

function createCard(carData) {
  let stars = ''
  for (let i = 0; i < 5; i++) {
    if (carData.rating - 0.5 > i) {
      stars += '<i class="bi bi-star-fill"></i>'
    } else if(carData.rating > i){
      stars += '<i class="bi bi-star-half"></i>'
    }
    else {
      stars += '<i class="bi bi-star-full"></i>'
    }
  }

  return ` <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img loading="lazy" width="1" height="1" class="card-img car-img" src="${carData.img}" alt="${carData.make} ${carData.model}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${carData.make} ${carData.model} ${carData.engine_volume} (${carData.year})</h5>
        <span class="rating">Rating ${stars} ${carData.rating}</span>
        <h6 class="car-price">${carData.price}$</h6>
        <ul class="characteristic style-none g-0">
          <li><i class="bi bi-speedometer"></i>${carData.odo} km</li>
          <li><i class="fas fa-gas-pump"></i></i>${carData.fuel}</li>
          <li><i class="bi bi-geo-alt"></i>${carData.country}</li>
          <li><i class="fas fa-box"></i></i>${carData.transmission}</li>
        </ul>
        <p>Fuel consumption (l/km):</p>
        <ul class="consume style-none d-flex justify-content-around">
          <li><i class="fas fa-road"></i>${carData.consume?.road ?? '--'}<span>Road</span></li>
          <li><i class="fas fa-city"></i>${carData.consume?.city ?? '--'}<span>City</span></li>
          <li><i class="fas fa-random"></i>${carData.consume?.mixed ?? '--'}<span>Mixed</span></li>
        </ul>
        ${carData.vin ? `<span class="vin-code ${carData.vin_check ? 'checked' : 'unchecked'}">
        ${carData.vin}</span>` : `<span class="vin-code unknown"> Unknown
        </span>`}
        ${carData.color ? `<p class="mt-2">Color: ${carData.color}</p>` : ''}
        <a href="tel:${carData.phone}" class="btn btn-success"><i class="bi bi-telephone-forward-fill me-2"></i>Call seller</a>
      </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card-footer text-muted d-flex justify-content-between align-items-center">
        <div>
          <small class="me-3"><i class="bi bi-clock-fill me-1"></i>${carData.timestamp}</small>
          <small><i class="bi bi-person-check-fill me-1"></i>${carData.seller}</small>
        </div>
        <small><i class="bi bi-eye-fill me-1"></i>${carData.views}</small>
      </div>
    </div>
  </div>
  </div>`;
}

// const arr = [0,1,2,3,4,5,6,7,5,8,9]

// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     console.log(element);
// }

// arr.forEach(element => console.log(element))



// const arr = [5,8,4,2,13,9,6,8,11,7,12,4,3,7,6,8]
// arr.sort((a,b) => {
//   return a-b
// })
// console.log(arr);