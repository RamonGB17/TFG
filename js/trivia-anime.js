document.addEventListener("DOMContentLoaded", function() {
    let timeLeft = 30;
    const timerDisplay = document.getElementById("time");
    const feedbackDisplay = document.getElementById("feedback");
  
    let countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if(timeLeft <= 0) {
        clearInterval(countdown);
        feedbackDisplay.textContent = "¡Se terminó el tiempo!";
        disableOptions();
      }
    }, 1000);
  
    function disableOptions() {
      document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    }
  
    document.querySelectorAll(".option-btn").forEach(button => {
      button.addEventListener("click", function() {
        clearInterval(countdown);
        const answer = this.getAttribute("data-answer");
        if(answer === "Goku") {
          feedbackDisplay.textContent = "¡Correcto!";
        } else {
          feedbackDisplay.textContent = "Incorrecto.";
        }
        disableOptions();
      });
    });
  });
  