document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("guess-input");
  const btn = document.getElementById("guess-btn");
  const tbody = document.getElementById("guesses-body");
  const modal = document.getElementById("congrats-modal");
  const closeBtn = document.getElementById("modal-close");
  const autocompleteList = document.getElementById("autocomplete-list");

  let hiddenCharacterId = null;
  let characters = [];
  const storageKey = `dailyGuesses_${new Date().toISOString().slice(0, 10)}`;
  let guesses = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Obtener personaje del día
  fetch("http://localhost:8080/api/daily")
    .then(res => res.json())
    .then(data => {
      hiddenCharacterId = data.id;
    })
    .catch(err => console.error("Error obteniendo personaje del día", err));

  // Obtener personajes
  fetch("http://localhost:8080/api/characters")
    .then(res => res.json())
    .then(data => {
      characters = data;
    })
    .catch(err => console.error("Error cargando personajes", err));

  // Autocompletado con filtro por nombre e intentos anteriores
  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    autocompleteList.innerHTML = "";
    if (!val || characters.length === 0) return;

    const guessedNames = guesses.map(g => g.name.toLowerCase());

    characters
      .filter(c => c.name.toLowerCase().includes(val) && !guessedNames.includes(c.name.toLowerCase()))
      .forEach(c => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = `img/${c.imageFilename}`;
        img.alt = c.name;
        li.appendChild(img);
        li.appendChild(document.createTextNode(c.name));
        li.addEventListener("click", () => {
          input.value = c.name;
          autocompleteList.innerHTML = "";
        });
        autocompleteList.appendChild(li);
      });
  });

  // Renderizar intentos anteriores
  guesses.forEach(guess => addGuessRow(guess));

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Adivinar personaje
  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) return;

    if (guesses.some(g => g.name.toLowerCase() === name.toLowerCase())) {
      alert("Ya has intentado con ese personaje.");
      return;
    }

    fetch("http://localhost:8080/api/daily/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert(result.error);
          return;
        }

        guesses.push(result);
        localStorage.setItem(storageKey, JSON.stringify(guesses));
        addGuessRow(result);

        if (result.correct) {
          input.disabled = true;
          btn.disabled = true;
          modal.classList.remove("hidden");
        }

        input.value = "";
        input.focus();
        autocompleteList.innerHTML = "";
      })
      .catch(err => {
        console.error("Error al enviar el intento:", err);
        alert("Ocurrió un error al intentar adivinar.");
      });
  });

  function addGuessRow(guess) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = `img/${guess.imageFilename || "default.png"}`;
    img.alt = guess.name;

    const overlay = document.createElement("div");
    overlay.classList.add("name-overlay");
    overlay.textContent = guess.name;

    imgContainer.append(img, overlay);
    tdName.appendChild(imgContainer);
    tr.appendChild(tdName);

    const campos = ["gender", "species", "year", "franchise"];
    campos.forEach(attr => {
      const td = document.createElement("td");

      const matchKey = attr === "franchise" ? "franchiseMatch" : `${attr}Match`;
      const valueKey = attr === "franchise" ? "franchiseName" : attr;

      td.textContent = guess[valueKey];
      td.classList.add(guess[matchKey] ? "match" : "mismatch");

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
});
