// First load function
async function firstLoadFunction() {
  const allCars = await getAllCarsFromJson();
  displayResults(allCars);
  generateBrandCheckboxes(allCars);
  generateBodyTypeCheckboxes(allCars)
  generateYearCheckboxes(allCars);
  setupSearchInput(allCars);
  setupSortSelect(allCars);
}

// Fetch JSON data
async function getAllCarsFromJson() {
  try {
    const res = await fetch("/cars/assets/json/full-cars.json");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error loading car data:", err);
    return [];
  }
}

// Display car cards
function displayResults(cars) {
  const resultCounter = document.getElementById("results-count")
  if(resultCounter){
    resultCounter.innerHTML = cars.length;
  }
  const container = document.getElementById("cars-parent-container");
  container.innerHTML = "";

  if (cars.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }
  cars.forEach((car) => {
    const carName = `${car.brand} ${car.model} ${car.variant}`;
    const carHTML = `
      <div class="col-lg-4 col-md-6">
  <div class="perfect-fleet-item fleets-collection-item wow fadeInUp">
    <div class="image-box">
      <!-- New Badge -->
      <span class="badge-new">NEW</span>

      <a href="${car.image}" class="popup-link" title="${carName}">
        <img src="${car.image}" alt="${carName}">
      </a>
    </div>
    <div class="perfect-fleet-content">
      <div class="perfect-fleet-title">
        <h2 class="text-uppercase text-black">${carName}</h2>
      </div>
      <div class="perfect-fleet-body">
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
</div>

    `;
    container.insertAdjacentHTML("beforeend", carHTML);
    
  });
}

// Generate brand checkboxes
function generateBrandCheckboxes(allCars) {
  const container = document.getElementById("brandCheckboxContainer");
  container.innerHTML = "";

  const brandSet = new Set();
  allCars.forEach((car) => brandSet.add(car.brand.trim()));

  Array.from(brandSet)
    .sort()
    .forEach((brand) => {
      const id = brand.replace(/\s+/g, "-");

      const li = document.createElement("li");
      li.className = "form-check";
      li.innerHTML = `
        <input class="form-check-input brand-filter" type="checkbox" value="${brand}" id="${id}">
        <label class="form-check-label" for="${id}">${brand}</label>
      `;
      container.appendChild(li);
    });

  const checkboxes = container.querySelectorAll(".brand-filter");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      applyCombinedFilters(allCars);
    });
  });
}

// Generate brand checkboxes
function generateBodyTypeCheckboxes(allCars) {
  const container = document.getElementById("bodyCheckboxContainer");
  container.innerHTML = "";

  const bodyTypeSet = new Set();
  allCars.forEach((car) => bodyTypeSet.add(car.bodyType.trim()));

  Array.from(bodyTypeSet)
    .sort()
    .forEach((bodyType) => {
      const id = bodyType.replace(/\s+/g, "-");

      const li = document.createElement("li");
      li.className = "form-check";
      li.innerHTML = `
        <input class="form-check-input bodyType-filter" type="checkbox" value="${bodyType}" id="${id}">
        <label class="form-check-label" for="${id}">${bodyType}</label>
      `;
      container.appendChild(li);
    });

  const checkboxes = container.querySelectorAll(".bodyType-filter");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      applyCombinedFilters(allCars);
    });
  });
}

// Generate year checkboxes
function generateYearCheckboxes(allCars) {
  const container = document.getElementById("yearCheckboxContainer");
  container.innerHTML = "";

  const yearSet = new Set();
  allCars.forEach((car) => yearSet.add(car.year));

  Array.from(yearSet)
    .sort((a, b) => b - a)
    .forEach((year) => {
      const li = document.createElement("li");
      li.className = "form-check";
      li.innerHTML = `
        <input class="form-check-input year-filter" type="checkbox" value="${year}" id="year-${year}">
        <label class="form-check-label" for="year-${year}">${year}</label>
      `;
      container.appendChild(li);
    });

  const checkboxes = container.querySelectorAll(".year-filter");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      applyCombinedFilters(allCars);
    });
  });
}

// Setup search input
function setupSearchInput(allCars) {
  const input = document.getElementById("carSearchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    applyCombinedFilters(allCars);
  });
}

// Setup sort select dropdown
function setupSortSelect(allCars) {
  const select = document.getElementById("sortSelect");
  if (!select) return;

  select.addEventListener("change", () => {
    applyCombinedFilters(allCars);
  });
}

// Combined filters and sorting
function applyCombinedFilters(allCars) {
  const selectedBrands = Array.from(document.querySelectorAll(".brand-filter:checked")).map(cb => cb.value.trim());
  const selectedBodyType = Array.from(document.querySelectorAll(".bodyType-filter:checked")).map(cb => cb.value.trim());
  const selectedYears = Array.from(document.querySelectorAll(".year-filter:checked")).map(cb => cb.value.trim());
  const searchText = document.getElementById("carSearchInput")?.value.trim().toLowerCase() || "";
  const sortBy = document.getElementById("sortSelect")?.value;

  let filtered = allCars.filter((car) => {
    const name = `${car.brand} ${car.model} ${car.variant}`.toLowerCase();
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand.trim());
    const matchBodyType = selectedBodyType.length === 0 || selectedBodyType.includes(car.bodyType.trim());
    const matchYear = selectedYears.length === 0 || selectedYears.includes(String(car.year));
    const matchSearch = name.includes(searchText);
    return  matchBrand && matchBodyType&& matchYear && matchSearch;
  });

  // Apply sorting
  if (sortBy) {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year-desc": return b.year - a.year;
        case "year-asc": return a.year - b.year;
        case "price-desc": return b.priceRange - a.priceRange;
        case "price-asc": return a.priceRange - b.priceRange;
        case "km-desc": return parseInt(b.kmDriven) - parseInt(a.kmDriven);
        case "km-asc": return parseInt(a.kmDriven) - parseInt(b.kmDriven);
        // case "date-desc": return new Date(b.postedDate) - new Date(a.postedDate);
        // case "date-asc": return new Date(a.postedDate) - new Date(b.postedDate);
        default: return 0;
      }
    });
  }

  displayResults(filtered);
}

// Run on page load
document.addEventListener("DOMContentLoaded", firstLoadFunction);
