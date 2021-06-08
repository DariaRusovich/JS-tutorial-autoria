const carsDATA = JSON.parse(DATA)
let CARS = JSON.parse(DATA);
const carList = document.getElementById("carList");
const sortSelect = document.getElementById("sortSelect");
const masonryBtns = document.getElementById("masonryBtns");
const searchForm = document.getElementById("searchForm");
const showMoreBtn = document.getElementById("showMoreBtn");
const filterForm = document.getElementById("filterForm");
const filterFields = ['make', 'fuel', 'transmission']

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})


const USDFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
const USDtoUAH = 27.6589
const UAHFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0
})
const odoFormatter = new Intl.NumberFormat(undefined, {
  useGrouping: true,
})
// CARS.length = 50
console.log(CARS);


filterForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('filterform submit');
  const query = filterFields.map(field => {
    // return Array.from(this[field]).filter(input => input.checked).map(input => input.value)
    return Array.from(this[field]).reduce((values, input) => input.checked ? [...values, input.value] : values, [])
  })
  console.log(query);

  CARS = filterCars(query, filterFields, carsDATA)
  renderCards(CARS, carList, true);
})

// filterForm.addEventListener('reset', function (e) {
//   e.preventDefault()
//   console.log('filterform reset');
// })

renderFilterForm(filterFields, CARS, filterForm)

function renderFilterForm(filterFields, cars, filterForm) {
  filterForm.firstElementChild.innerHTML = createFilterForm(filterFields, cars)
}

function createFilterForm(filterFields, cars) {
  let fieldsetsHTML = ''
  filterFields.forEach(field => {
    const values = cars.map((car) => {
      return car[field]
    })
    const uniqueValues = Array.from(new Set(values)).sort()
    fieldsetsHTML += createFilterFieldset(field, uniqueValues)
  })
  return fieldsetsHTML
}

function createFilterFieldset(field, uniqueValues) {
  let fieldsHTML = ''
  uniqueValues.forEach(value => fieldsHTML += createFilterField(field, value))
  return `<fieldset class="mb-3">
            <legend>${field.toUpperCase()}</legend>
            <div class="fieldset-content d-flex flex-column">
            ${fieldsHTML}
            </div>
          </fieldset>`
}
function createFilterField(field, value) {
  return `<label>
            <input type="checkbox" name="${field}" value="${value}">
            ${value}
          </label>`
}


showMoreBtn.addEventListener('click', e => {
  console.log('Show more btn click!');

  renderCards(CARS, carList);
})


searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const query = this.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  const searchFields = ['make', 'model', 'year']
  CARS = filterCars(query, searchFields, carsDATA)
  renderCards(CARS, carList, true);
})


function filterCars(query, fields, cars) {

  const filteredCars = cars.filter(car => {
    return query.every(part => {
      return fields.some(field => {
        const carValue = String(car[field])
        if (typeof part === 'string') {
          return carValue?.trim()?.toLowerCase()?.includes(part)
        } else {
          return part.length > 0 ? part.includes(carValue) : true
        }
      })
    })
  })
  console.log(filteredCars);

  return filteredCars

}

masonryBtns.addEventListener('click', event => {
  const btn = event.target.closest('.masonry-btn')
  // console.log(event.target, btn);
  if (btn) {
    btn.classList.remove('btn-secondary')
    btn.classList.add('btn-success')
    const btnSiblings = findSiblings(btn)
    btnSiblings.forEach(btnSibling => {
      btnSibling.classList.remove('btn-success')
      btnSibling.classList.add('btn-secondary')
    })
    const type = btn.dataset.type
    if (type == 1) {
      carList.classList.remove('row-cols-2')
      carList.classList.add('row-cols-1')
    } else if (type == 2) {
      carList.classList.remove('row-cols-1')
      carList.classList.add('row-cols-2')
    }
  }
})

sortSelect.addEventListener('change', event => {
  const sortData = event.target.value.split('/')
  const sortKey = sortData[0]
  const sortType = sortData[1]
  CARS.sort((a, b) => {
    if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
      return a[sortKey].localeCompare(b[sortKey]) * sortType;
    } else {
      return (a[sortKey] - b[sortKey]) * sortType
    }
  })
  renderCards(CARS, carList, true);
})


renderCards(CARS, carList);


function renderCards(carsArray, carListElement, clear) {  //clear-undefined-true
  const limit = 10
  if (clear) {
    carListElement.innerHTML = ''
  }
  const existsElems = carListElement.children.length //children дочерние узлы-элементы(DOM навигация)
  if (limit + existsElems >= carsArray.length) {
    showMoreBtn.classList.add('btn-hide')
  } else {
    showMoreBtn.classList.remove('btn-hide')
  }
  carListElement.insertAdjacentHTML("beforeEnd", createCardsHTML(carsArray, limit, existsElems)) ///HERE!!!!!!!!
}

function createCardsHTML(carsArray, limit, existsElems) {
  let cardsHTML = "";
  for (let i = 0; i < limit; i++) {
    const car = carsArray[i + existsElems];
    if (car) {
      cardsHTML += createCard(car);
    }
    //console.log(createCard);
  }

  //console.log(carsArray.length) длина массива
  //console.log(existsElems) начиная с 0 + limit
  //console.log(cardsHTML);
  return cardsHTML;
}



function createCard(carData) {
  let stars = ''
  for (let i = 0; i < 5; i++) {
    if (carData.rating - 0.5 > i) {
      stars += '<i class="bi bi-star-fill"></i>'
    } else if (carData.rating > i) {
      stars += '<i class="bi bi-star-half"></i>'
    } else {
      stars += '<i class="bi bi-star"></i>'
    }

  }
  const dateObj = new Date(carData.timestamp)
  const dateTimeSting = `${dateObj.toLocaleTimeString()} ${dateObj.toLocaleDateString()}`
  return ` <div class="card mb-3 ">
  <div class="row g-0 card-half">
    <div class="col-md-4 card-img-wrap">
      <img loading="lazy" width="1" height="1" class="card-img car-img" src="${carData.img}" alt="${carData.make} ${carData.model}">
    </div>
    <div class="col-md-8 card-body-wrap">
      <div class="card-body">
        <h5 class="card-title">${carData.make} ${carData.model} ${carData.engine_volume} (${carData.year})</h5>
        <span class="rating">${stars} ${carData.rating}</span>
        <div class="d-flex car-price-wrapper align-items-center">
        <h6 class="car-price">${USDFormatter.format(carData.price)}</h6>
        <small class="ms-3">${UAHFormatter.format(carData.price * USDtoUAH)}</small>
        </div>
        <ul class="characteristic style-none g-0">
          <li><i class="bi bi-speedometer"></i>${odoFormatter.format(carData.odo)} km</li>
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
          <small class="me-3"><i class="bi bi-clock-fill me-1"></i>${dateFormatter.format(carData.timestamp)}</small>
          <small><i class="bi bi-person-check-fill me-1"></i>${carData.seller}</small>
        </div>
        <small><i class="bi bi-eye-fill me-1"></i>${carData.views}</small>
      </div>
    </div>
  </div>
  </div>`;
}

//utils

function findSiblings(node) {
  // const parent = node.parentElement
  // const children = parent.children
  // const childrenArray = Array.from(children)
  // const siblingsArray = childrenArray.filter(child => child !== node)
  // return siblingsArray

  return Array.from(node.parentElement.children).filter(child => child !== node)

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




// forEach([1,2,3], num => {
//   console.log(num);
// })

// function forEach(arr,cb) {
//   for (let i = 0; i < arr.length; i++) {
//     const el = arr[i];
//     cb(el, i, arr)
//   }
// }




// function User(name, sname, age) {
//     this.name = name,
//     this.sname = sname,
//     this.fullname = `${name} ${sname}`,
//     this.age = age, 
//     this.status = 'New',
//     this.likes = 0,
//     this.comments = 0
// }

// console.log(new User('a','b', 2));



//console.log(dateFormatter.format((new Date().getTimezoneOffset() * 60000) + 600000));




// [1,2,3].map((num) => {
//  return 'blabla' + num
// })


// const users = [
//   { name: 'Ivan', age: 18 },
//   { name: 'Vasya', age: 19 },
//   { name: 'Katya', age: 15 }
// ]

// const names = users.map((user) => {
//   return user.name
// })
// console.log(names);



// const nums = [5, 4, 7, 3, 4, 6, 8, 3, 5, 2]
// nums.push(4, 245, 34, 5)

// console.log(...nums);
// // let sum = nums.reduce((sum, num) => sum + num, 0)

// // console.log(sum);

// sum(1,20)
// sum(1,2,532,44,2,63,4,64,8,5,3,4,9,6)
// function sum(...arr) {
//   return arr.reduce((sum, num) => sum + num, 0)
// }


// // const user = {
// //   name: 'Ivan',
// //   age: 25,
// //   get action1() {
// //     return this.name
// //   },
// //   set action1(newName) {
// //       this.name = newName
// //   }
// // }
// console.log(user.action1());
// user.action1('Oleg')
// console.log(user);


// const user = {
//   name: "John",
//   surname: "Smith",

//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   },

//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   }
// };

// // set fullName запустится с данным значением
// user.fullName = "Alice Cooper";

// console.log(user.fullName()); // Alice
// console.log(user.surname); // Cooper