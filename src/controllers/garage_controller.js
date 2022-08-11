import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    this.garageName = 'demolivecode'
    this.url = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    this.getCars()
  }
  getCars() {
    fetch(this.url)
      .then(response => response.json())
      .then((data) => {
        this.carsListTarget.innerHTML = ""
        data.forEach((car) => {
          this.insertCarCard(car)
        })
      })
  }

  insertCarCard(car) {
    const carCard = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}%20${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong>${car.owner}</p>
            <p><strong>Plate:</strong>${car.plate}</p>
          </div>
        </div>`
    this.carsListTarget.insertAdjacentHTML("afterbegin", carCard)
  }

  createCar(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newCar = Object.fromEntries(formData)

    fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar)
    })
      .then(() => this.getCars())
    event.currentTarget.reset()
  }

}

