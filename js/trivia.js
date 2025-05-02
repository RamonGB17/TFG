document.addEventListener("DOMContentLoaded", function() {
    let timeLeft = 30;
    const timerDisplay = document.getElementById("time");
    const feedbackDisplay = document.getElementById("feedback");
  
    const countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        feedbackDisplay.textContent = "Se terminó el tiempo.";
        disableOptions();
      }
    }, 1000);
  
    function disableOptions() {
      const optionButtons = document.querySelectorAll(".option-btn");
      optionButtons.forEach(btn => btn.disabled = true);
    }
  
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(button => {
      button.addEventListener("click", function() {
        clearInterval(countdown);
        if (this.getAttribute("data-answer") === "Goku") {
          feedbackDisplay.textContent = "¡Correcto!";
        } else {
          feedbackDisplay.textContent = "Incorrecto.";
        }
        disableOptions();
      });
    });
  });
  