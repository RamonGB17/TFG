document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(elementId, filePath) {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al cargar ${filePath}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          const container = document.getElementById(elementId);
          container.innerHTML = data;
          
          if (elementId === "header-container") {
            const menuToggle = container.querySelector(".menu-toggle");
            const navLinks = container.querySelector(".nav-links");
            if (menuToggle && navLinks) {
              menuToggle.addEventListener("click", function () {
                navLinks.classList.toggle("show");
              });
            }
          }
        })
        .catch(error => console.error(error));
    }
  
    loadComponent("header-container", "header.html");
    loadComponent("footer-container", "footer.html");
  });
  