const CARS = JSON.parse(DATA);
const carList = document.getElementById("carList");
// CARS.length = 50
console.log(CARS);

renderCards(createCardsHTML(CARS), carList);

function createCardsHTML(carsArray) {
  let cardsHTML = "";
  carsArray.forEach((car) => {
    cardsHTML += createCard(car);
  });
  return cardsHTML;
}

function renderCards(cardsHtml, carListElement) {
  carListElement.insertAdjacentHTML("beforeend", cardsHtml);
}

function createCard(carData) {
  return ` <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img loading="lazy" width="1" height="1" class="card-img car-img" src="${carData.img}" alt="${carData.make} ${carData.model}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${carData.make} ${carData.model} ${carData.engine_volume} (${carData.year})</h5>
        <span class="rating">Rating ${carData.rating}</span>
        <h6>${carData.price}$</h6>
        <ul class="characteristic style-none g-0">
          <li><i class="bi bi-speedometer"></i>${carData.odo} km</li>
          <li><i class="fas fa-gas-pump"></i></i>${carData.fuel}</li>
          <li><i class="bi bi-geo-alt"></i>${carData.country}</li>
          <li><i class="fas fa-box"></i></i>${carData.transmission}</li>
        </ul>
        <p>Fuel consumption (l/km):</p>
        <ul class="consume style-none d-flex justify-content-around">
          <li><i class="fas fa-road"></i>${carData.consume.road}</li>
          <li><i class="fas fa-city"></i>${carData.consume.city}</li>
          <li><i class="fas fa-random"></i>${carData.consume.mixed}</li>
        </ul>
        <span class="vin-code ${carData.vin_check ? 'checked' : 'unchecked'}">
        ${carData.vin}</span>
        <p class="mt-2">Color: ${carData.color}</p>
        
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
