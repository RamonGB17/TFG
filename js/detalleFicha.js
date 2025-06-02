document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    document.querySelector(".detalle-central").innerHTML = "<p>ID no especificado</p>";
    return;
  }

  fetch(`http://localhost:8080/api/characters/${id}`)
    .then(res => res.json())
    .then(data => mostrarDetalle(data))
    .catch(err => {
      console.error("Error al obtener los datos del personaje:", err);
      document.querySelector(".detalle-central").innerHTML = "<p>Error al cargar los datos</p>";
    });

  function mostrarDetalle(personaje) {
    document.querySelector(".detalle-header img").src = `img/${personaje.imageFilename}`;
    document.querySelector(".detalle-header img").alt = personaje.name;
    document.querySelector(".detalle-header h1").textContent = personaje.name;

    const descripcion = `
      <strong>Género:</strong> ${personaje.gender || "-"}<br>
      <strong>Especie:</strong> ${personaje.species || "-"}<br>
      <strong>Año:</strong> ${personaje.year || "-"}<br>
      <strong>Franquicia:</strong> ${personaje.franchise?.name || "-"} (${personaje.franchise?.type || "-"})<br>
    `;
    document.querySelector(".detalle-content p").innerHTML = descripcion;
  }
});
