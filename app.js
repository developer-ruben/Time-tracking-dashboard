class App {
  constructor() {
    this.units = ["daily", "weekly", "monthly"];
    this.selectedUnit = this.units[1];
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => this.loadItems);

    this.units.forEach((unit) => {
      document
        .getElementById(unit)
        .addEventListener("click", (e) => this.unitClick(e));
    });
  }

  loadItems() {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const title = item.title.toLowerCase().replace(" ", "-");

          document.getElementById(title + "-current").textContent =
            item.timeframes[this.selectedUnit].current + "hrs";
          document.getElementById(title + "-previous").textContent =
            item.timeframes[this.selectedUnit].previous + "hrs";
        });
      });
  }

  unitClick(e) {
    this.selectedUnit = e.target.id;
    document
      .querySelector(".card__item--active")
      .classList.remove("card__item--active");
    document
      .getElementById(this.selectedUnit)
      .classList.add("card__item--active");
    this.loadItems();
  }
}

const app = new App();
app.init();
