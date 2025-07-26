// Filter Panel Toggle
const filterBtn = document.getElementById('filterBtn');
const overlay = document.getElementById('filterOverlay');
const filterPanel = document.getElementById('filterPanel');
const filterSubmitBtn = document.getElementById('apply-btn-filter');
const resultCounter = document.getElementById("results-count")
const resultsContainer = document.getElementById("cars-parent-container");

filterBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

overlay.addEventListener('click', (e) => {
    if (!filterPanel.contains(e.target)) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
filterSubmitBtn.addEventListener('click', (e) => {
    overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
});

// Toggle active class for options
document.querySelectorAll('.options').forEach(group => {
    group.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

// Reset button
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.options button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.dropdown').selectedIndex = 0;
    document.getElementById('sortSelect').selectedIndex = 0;
});

// Fetch car data
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

// Sorting logic
function sortCars(cars, sortBy) {
    switch (sortBy) {
        case "price-desc":
            return cars.sort((a, b) => b.priceRange - a.priceRange);
        case "price-asc":
            return cars.sort((a, b) => a.priceRange - b.priceRange);
        case "km-asc":
            return cars.sort((a, b) => a.kmDriven - b.kmDriven);
        case "km-desc":
            return cars.sort((a, b) => b.kmDriven - a.kmDriven);
        case "year-desc":
            return cars.sort((a, b) => b.year - a.year);
        case "year-asc":
            return cars.sort((a, b) => a.year - b.year);
        default:
            return cars;
    }
}

async function init() {
    const carData = await getAllCarsFromJson();
    

    const brandDropdown = document.getElementById("brandDropdown");
    const bodyTypeContainer = document.getElementById("bodyTypeOptions");
    const yearButtons = document.querySelectorAll("#yearOptions button");
    const kmsButtons = document.querySelectorAll("#KMSOptions button");
    const budgetButtons = document.querySelectorAll("#budgetOptions button");
    const sortDropdown = document.getElementById("sortSelect");

    const getUniqueValues = (data, key) => [...new Set(data.map(item => item[key].trim().toLowerCase()))];

    // Populate brand dropdown
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "All Brands";
    brandDropdown.appendChild(defaultOption);

    getUniqueValues(carData, "brand").forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand.replace(/\b\w/g, l => l.toUpperCase());
        brandDropdown.appendChild(option);
    });

    // Populate body type buttons
    const bodyTypeIcons = {
        suv: "https://img.icons8.com/ios/50/suv.png",
        sedan: "https://img.icons8.com/ios/50/sedan.png",
        coupe: "https://img.icons8.com/ios/50/sedan.png",
        sports: "https://img.icons8.com/ios/50/sports-car.png",
        hatchback: "https://img.icons8.com/ios/50/hatchback.png"
    };

    getUniqueValues(carData, "bodyType").forEach(type => {
        const btn = document.createElement("button");
        btn.innerHTML = bodyTypeIcons[type]
            ? `<img src="${bodyTypeIcons[type]}" alt="">${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `${type.charAt(0).toUpperCase() + type.slice(1)}`;
        bodyTypeContainer.appendChild(btn);
    });

    let selectedYear = null, selectedKMS = null, selectedBudget = null;

    function updateFilters() {
        const [minYear, maxYear] = selectedYear || [0, 9999];
        const [minKMS, maxKMS] = selectedKMS || [0, Infinity];
        const [minBudget, maxBudget] = selectedBudget || [0, Infinity];

        const selectedBrand = brandDropdown.value.toLowerCase();
        const selectedBodyTypeBtn = document.querySelector("#bodyTypeOptions button.active");
        const selectedBodyType = selectedBodyTypeBtn ? selectedBodyTypeBtn.textContent.trim().toLowerCase() : null;

        let filteredCars = carData.filter(car => {
            const year = Number(car.year);
            const kms = Number(car.kmDriven);
            const price = Number(car.priceRange);
            const brand = car.brand.trim().toLowerCase();
            const body = car.bodyType.trim().toLowerCase();

            return (
                year >= minYear && year <= maxYear &&
                kms >= minKMS && kms <= maxKMS &&
                price >= minBudget && price <= maxBudget &&
                (!selectedBrand || brand === selectedBrand) &&
                (!selectedBodyType || body === selectedBodyType)
            );
        });

        const sortValue = sortDropdown.value;
        filteredCars = sortCars(filteredCars, sortValue);

        if(filteredCars.length === 0){
            resultsContainer.innerHTML = `<h3 class="text-center text-black py-5"> Sorry No results found From your filiter you can choose belove.</h3>`
            console.log(carData);
            displayResults(carData)
            
            
        }
        else{
            resultsContainer.innerHTML = ""
        }

        resultCounter.innerHTML = filteredCars.length
        displayResults(filteredCars)

        
    }

    function setupButtonGroup(buttons, setter) {
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const range = btn.dataset.range;
                setter(range ? range.split("-").map(Number) : null);
                updateFilters();
            });
        });
    }

    setupButtonGroup(yearButtons, range => selectedYear = range);
    setupButtonGroup(kmsButtons, range => selectedKMS = range);
    setupButtonGroup(budgetButtons, range => selectedBudget = range);

    bodyTypeContainer.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
            const btn = e.target.closest("button");
            bodyTypeContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            updateFilters();
        }
    });

    brandDropdown.addEventListener("change", updateFilters);
    sortDropdown.addEventListener("change", updateFilters);

    document.querySelector(".reset-btn").addEventListener("click", () => {
        selectedYear = selectedKMS = selectedBudget = null;
        document.querySelectorAll(".options button").forEach(btn => btn.classList.remove("active"));
        brandDropdown.selectedIndex = 0;
        sortDropdown.selectedIndex = 0;
        updateFilters();
    });

    updateFilters();
}

function displayResults(filteredCars){
    filteredCars.forEach((car) => {
            const carName = `${car.brand} ${car.model} ${car.variant}`;
            const carHTML = `
            <div class="col-lg-4 col-md-6">
              <div class="perfect-fleet-item fleets-collection-item wow fadeInUp">
                <div class="image-box">
                  <a href="${car.URL}">
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
            resultsContainer.insertAdjacentHTML("beforeend", carHTML);
        });
}

init();
