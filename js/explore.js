document.addEventListener("DOMContentLoaded", function() {
  const categoriaSelect = document.getElementById("categoria");
  const tipoSelect = document.getElementById("tipo");
  const filterForm = document.getElementById("filter-form");
  const fichaCards = document.querySelectorAll(".ficha-card");

  const typeOptions = {
    anime: [
      { value: "todos", text: "Todos" },
      { value: "isekai", text: "Isekai" },
      { value: "shonen", text: "Shonen" },
      { value: "shojo", text: "Shojo" }
    ],
    videojuegos: [
      { value: "todos", text: "Todos" },
      { value: "deportes", text: "Deportes" },
      { value: "shooters", text: "Shooters" },
      { value: "rpg", text: "RPG" }
    ]
  };

  function updateTipoOptions() {
    const selectedCategory = categoriaSelect.value;
    tipoSelect.innerHTML = '';

    if (selectedCategory === "anime") {
      typeOptions.anime.forEach(opt => {
        const optionElem = document.createElement("option");
        optionElem.value = opt.value;
        optionElem.textContent = opt.text;
        tipoSelect.appendChild(optionElem);
      });
    } else if (selectedCategory === "videojuegos") {
      typeOptions.videojuegos.forEach(opt => {
        const optionElem = document.createElement("option");
        optionElem.value = opt.value;
        optionElem.textContent = opt.text;
        tipoSelect.appendChild(optionElem);
      });
    } else {
      const optionElem = document.createElement("option");
      optionElem.value = "todos";
      optionElem.textContent = "Todos";
      tipoSelect.appendChild(optionElem);
    }
  }

  categoriaSelect.addEventListener("change", updateTipoOptions);
  updateTipoOptions();

  filterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const selectedCategoria = categoriaSelect.value;
    const selectedTipo = tipoSelect.value;

    fichaCards.forEach(card => {
      const cardCategoria = card.getAttribute("data-categoria");
      const cardTipo = card.getAttribute("data-tipo");
      let show = true;

      if (selectedCategoria !== "todos" && cardCategoria !== selectedCategoria) {
        show = false;
      }
      if (selectedTipo !== "todos" && cardTipo !== selectedTipo) {
        show = false;
      }

      card.style.display = show ? "block" : "none";
    });
  });
});
