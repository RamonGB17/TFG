document.addEventListener("DOMContentLoaded", () => {
  const categoriaSelect = document.getElementById("categoria");
  const tipoSelect = document.getElementById("tipo");
  const fichasContainer = document.getElementById("fichas-container");
  let personajes = [];

  // Cargar personajes desde backend
  fetch("http://localhost:8080/api/characters")
    .then(res => res.json())
    .then(data => {
      personajes = data;
      mostrarPersonajes(personajes);
      cargarTiposUnicos(personajes);
    });

  // Mostrar personajes
  function mostrarPersonajes(lista) {
    fichasContainer.innerHTML = "";
    lista.forEach(p => {
      const ficha = document.createElement("div");
      ficha.className = "ficha-card";
      ficha.setAttribute("data-categoria", p.franchise.type);
      ficha.setAttribute("data-tipo", p.franchise.name);

      ficha.innerHTML = `
        <img src="img/${p.imageFilename || 'default.png'}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.franchise.name}</p>
        <a href="detalle-ficha.html?id=${p.id}" class="btn">Ver Detalles</a>
      `;
      fichasContainer.appendChild(ficha);
    });
  }

  // Rellenar <select> de tipos
  function cargarTiposUnicos(lista) {
    const tipos = [...new Set(lista.map(p => p.franchise.name))];
    tipoSelect.innerHTML = '<option value="todos">Todos</option>';
    tipos.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo;
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
  }

  // Eventos de filtro
  categoriaSelect.addEventListener("change", aplicarFiltros);
  tipoSelect.addEventListener("change", aplicarFiltros);

  function aplicarFiltros() {
    const categoria = categoriaSelect.value;
    const tipo = tipoSelect.value;

    const filtrados = personajes.filter(p => {
      const catOk = categoria === "todos" || p.franchise.type === categoria;
      const tipoOk = tipo === "todos" || p.franchise.name === tipo;
      return catOk && tipoOk;
    });

    mostrarPersonajes(filtrados);
  }
});
