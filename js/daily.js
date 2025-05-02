const characters = [
    { name: "Naruto Uzumaki", gender: "Masculino", anime: "Naruto", species: "Humano", year: "2002" },
    { name: "Goku",          gender: "Masculino", anime: "Dragon Ball", species: "Saiyajin", year: "1984" },
    { name: "Miku Hatsune",   gender: "Femenino", anime: "Vocaloid",    species: "Avatar",   year: "2007" },
  ];
  
  function getTodayIndex() {
    const start = new Date(2024,0,1);
    const today = new Date();
    const diff = Math.floor((today - start)/(1000*60*60*24));
    return diff % characters.length;
  }
  
  const target = characters[getTodayIndex()];
  
  const storageKey = `dailyGuesses_${new Date().toISOString().slice(0,10)}`;
  let guesses = JSON.parse(localStorage.getItem(storageKey)) || [];
  
  document.addEventListener("DOMContentLoaded", () => {
    const datalist = document.getElementById("characters-list");
    const input     = document.getElementById("guess-input");
    const btn       = document.getElementById("guess-btn");
    const tbody     = document.getElementById("guesses-body");
    const modal     = document.getElementById("congrats-modal");
    const closeBtn  = document.getElementById("modal-close");
  
    characters.forEach(ch => {
      const opt = document.createElement("option");
      opt.value = ch.name;
      datalist.appendChild(opt);
    });
  
    guesses.forEach(addGuessRow);
  
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    btn.addEventListener("click", () => {
      const name = input.value.trim();
      if (!name) return;
  
      const guess = characters.find(ch => ch.name.toLowerCase() === name.toLowerCase());
      if (!guess) {
        alert("Personaje no encontrado.");
        return;
      }
  
      if (guesses.some(g => g.name === guess.name)) {
        alert("Ya has intentado con ese personaje.");
        return;
      }
  
      guesses.push(guess);
      localStorage.setItem(storageKey, JSON.stringify(guesses));
      addGuessRow(guess);
  
      if (guess.name === target.name) {
        input.disabled = true;
        btn.disabled   = true;
        modal.classList.remove("hidden");
      }
  
      input.value = "";
      input.focus();
    });
  
    function addGuessRow(guess) {
      const tr = document.createElement("tr");
  
      const tdName = document.createElement("td");
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");
  
      const img = document.createElement("img");
      const fileName = guess.name
        .toLowerCase()
        .replace(/\s+/g,'-')
        .replace(/[^a-z0-9\-]/g,'') + '.png';
      img.src = `img/${fileName}`;
      img.alt = guess.name;
  
      const overlay = document.createElement("div");
      overlay.classList.add("name-overlay");
      overlay.textContent = guess.name;
  
      imgContainer.append(img, overlay);
      tdName.appendChild(imgContainer);
      tr.appendChild(tdName);
  
      ["gender","anime","species","year"].forEach(attr => {
        const td = document.createElement("td");
        td.textContent = guess[attr];
        td.classList.add( guess[attr] === target[attr] ? "match" : "mismatch" );
        tr.appendChild(td);
      });
  
      tbody.appendChild(tr);
    }
  });
  