// Este codigo agrega la clase impar para dar el efecto invertido en las licencias de / home
document.addEventListener("DOMContentLoaded", function () {
  var divs = document.querySelectorAll(".coletion .coletion__cover");

  divs.forEach(function (div, index) {
    if (index % 2 === 1) {
      div.classList.add("par");
    }
  });
});

// Año en el footer
const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
