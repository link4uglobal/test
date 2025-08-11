// custom.js

// Document Ready
console.log("index js");
console.log("hi js");

$(document).ready(function () {
    
  // Exclusive script start 
  if ($("#slider-exclusive-container").length) {
    console.log("find exclusive");

    fetch("/exclusive/assets/json/exclusive.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item, index) => {
          const block = `<div class="swiper-slide">
                                <div class="our-vision-item tab-pane fade show active"  role="tabpanel">
                                    <div class="row align-items-center">
                                        <div class="col-lg-6">
                                            <div class="vision-mission-content">
                                                <div class="section-title">
                                                    <h5 class="text-anime-style-3 mb-1 wow fadeInUp text-white tsc" data-cursor="-opaque">${item.subHeading}</h5>
                                                    <h3 class="text-anime-style-3 tsc" wow fadeInRight data-cursor="-opaque">${item.heading}</h3>
                                                    <p class="wow fadeInUp text-black" style="
} font-size: 16px;" data-wow-delay="0.25s">${item.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="vision-image">
                                                <figure class="image-anime revel">
                                                    <img src="${item.image}"
                                                        alt="${item.alt}">
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                `;
          $("#slider-exclusive-container").append(block);
        });
        $(".popup-link").magnificPopup({
          type: "image",
          mainClass: "mfp-zoom-in",
          removalDelay: 300,
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Preloads the previous and next images
          },
          callbacks: {
            open: function () {
              console.log("Popup is opened");
            },
            close: function () {
              console.log("Popup is closed");
            },
          },
        });
      });
  }
  // Exclusive script eND 

  // index model car add start 
  if ($("#parent-cars-container").length){
   fetch("/cars/assets/json/full-cars.json")
    .then((response) => response.json())
    .then((data) => {
      const currentDate = new Date();
    const daysAgo30 = currentDate.setDate(currentDate.getDate() - 30);
      data.forEach((car) => {
        const isNew = new Date(car.postedDate) > daysAgo30;
      const newBadge = isNew ? `<span class="badge-new">NEW</span>` : "";

        const carName = `${car.brand} ${car.model} ${car.variant}`;
        const block = `
                    <div class="swiper-slide">
                        <div href="${car.URL}" class="perfect-fleet-item fleets-collection-item wow fadeInUp">
                            <div class="image-box">
                            ${newBadge}
                                <a href="${car.URL}">
                                    <img src="${car.image}" alt="${carName}">
                                </a>
                            </div>
                            <div class="perfect-fleet-content">
                                <div class="perfect-fleet-title">
                                    <h5 class="text-uppercase">${carName}</h5>
                                </div>
                                <div class="perfect-fleet-body mt-2">
                                    <ul>
                                        <li><i class="fa fa-calendar"></i> ${car.year}</li>
                                        <li><i class="fas fa-tachometer-alt"></i> ${car.kmDriven}</li>
                                        <li><i class="fa fa-gas-pump"></i> ${car.fuel}</li>
                                        <li><i class="fas fa-car-side"></i> ${car.bodyType}</li>
                                    </ul>
                                </div>
                                <div class="perfect-fleet-footer">
                                    <div class="perfect-fleet-pricing">
                                        <h2>₹ ${car.price}</h2>
                                    </div>
                                    <div class="perfect-fleet-btn">
                                        <a href="${car.URL}" class="section-icon-btn">
                                            <img src="../assets/img/icons/arrow-white.svg" alt="Go">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $("#parent-cars-container").append(block);
      });
    });
  }
  // index model car add End 



  // Car Data Dropdowns
  // let carData = [];
  // const brandSelect = document.getElementById("brandSelect");
  // const modelSelect = document.getElementById("modelSelect");
  // const yearSelect = document.getElementById("yearSelect");

  // function populateSelect(selectElement, values) {
  //   selectElement.innerHTML = '<option value="">Select</option>';
  //   values.forEach((value) => {
  //     const option = document.createElement("option");
  //     option.value = value;
  //     option.textContent = value;
  //     selectElement.appendChild(option);
  //   });
  // }

  // fetch("/cars/assets/json/full-cars.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     carData = data;
  //     const brands = [
  //       ...new Set(carData.map((car) => car.brand.trim())),
  //     ].sort();
  //     populateSelect(brandSelect, brands);
  //   });

  // brandSelect.addEventListener("change", function () {
  //   const selectedBrand = this.value;
  //   const filteredCars = carData.filter(
  //     (car) => car.brand.trim() === selectedBrand
  //   );
  //   const models = [
  //     ...new Set(filteredCars.map((car) => car.model.trim())),
  //   ].sort();
  //   const years = [...new Set(filteredCars.map((car) => car.year))].sort(
  //     (a, b) => b - a
  //   );
  //   populateSelect(modelSelect, models);
  //   populateSelect(yearSelect, years);
  // });

  // Car Cards in Swiper
  
});

// Car Filter Form Submit
// document
//   .getElementById("carFilterForm")
//   .addEventListener("submit", function (e) {
//     const brand = document.getElementById("brandSelect").value;
//     const model = document.getElementById("modelSelect").value;
//     const year = document.getElementById("yearSelect").value;

//     const query = new URLSearchParams({
//       brand: brand,
//       model: model,
//       year: year,
//     }).toString();

//     this.action = `/cars/index-old.html?${query}`;
//   });

// Select Expand/Collapse on Hover
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("mouseenter", function () {
    this.size = this.options.length > 6 ? 6 : this.options.length;
  });
  select.addEventListener("mouseleave", function () {
    this.size = 1;
  });
  select.addEventListener("change", function () {
    this.size = 1;
  });
});
