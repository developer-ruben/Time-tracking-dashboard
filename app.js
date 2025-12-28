const dashboard = document.getElementById("dashboard");
const settings = document.querySelectorAll(".card__type");
const cardList = document.querySelector(".card__list");

let cachedData = null;

document.addEventListener("DOMContentLoaded", () => {
  updateUI("weekly");
});

cardList.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__type")) {
    updateUI(e.target.id);
  }
});

async function fetchData() {
  if (cachedData) return cachedData;

  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error("Data could not be loaded.");
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    console.error("Error when fetching the data:", error);
  }
}

async function updateUI(setting) {
  document
    .querySelector(".card__type--active")
    ?.classList.remove("card__type--active");

  const activeButton = document.getElementById(setting);
  activeButton.classList.add("card__type--active");

  settings.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
  activeButton.setAttribute("aria-pressed", "true");

  dashboard.innerHTML = "";

  const data = await fetchData();
  if (!data) return;

  const fragment = document.createDocumentFragment();

  data.forEach(({ title, timeframes }) => {
    const card = document.createElement("div");
    card.className = `card card--${title.toLowerCase().replace(" ", "-")}`;

    card.innerHTML = `
      <div class="card__body">
        <header class="card__header">
          <span>${title}</span>
          <button class="card__button" aria-label="More options">
            <img src="./assets/images/icon-ellipsis.svg" alt="" />
          </button>
        </header>
        <div class="card__details">
          <span class="card__time">${timeframes[setting].current}hrs</span>
          <span>Last Week - ${timeframes[setting].previous}hrs</span>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  dashboard.appendChild(fragment); // Eén enkele DOM-update voor betere prestaties
}
