document.addEventListener('DOMContentLoaded', () => {
    const form     = document.getElementById('login-form');
    const email    = document.getElementById('email');
    const password = document.getElementById('password');
    const errEmail = document.getElementById('error-email');
    const errPass  = document.getElementById('error-password');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
  
      errEmail.textContent = '';
      errPass.textContent  = '';
  
      if (!email.value.trim()) {
        errEmail.textContent = 'El correo es obligatorio.';
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        errEmail.textContent = 'Formato de email no válido.';
        valid = false;
      }
  
      if (!password.value) {
        errPass.textContent = 'La contraseña es obligatoria.';
        valid = false;
      } else if (password.value.length < 6) {
        errPass.textContent = 'Debe tener al menos 6 caracteres.';
        valid = false;
      }
  
      if (!valid) return;
  
      alert('¡Ingreso exitoso!');
      window.location.href = 'home.html';
    });
  });
  