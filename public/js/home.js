// Aplicar clase "par" a elementos impares en la colección
function applyParClassToOddItems() {
  const divs = document.querySelectorAll(".coletion .coletion__cover");

  divs.forEach(function (div, index) {
    if (index % 2 === 1) {
      div.classList.add("par");
    }
  });
}

// Mostrar el año actual en el footer
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
  applyParClassToOddItems();
  setCurrentYear();
});
