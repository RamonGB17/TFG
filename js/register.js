// register.js

document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('register-form');
    const username  = document.getElementById('username');
    const email     = document.getElementById('email');
    const password  = document.getElementById('password');
    const confirm   = document.getElementById('confirm-password');
  
    const errUser   = document.getElementById('error-username');
    const errEmail  = document.getElementById('error-email');
    const errPass   = document.getElementById('error-password');
    const errConfirm= document.getElementById('error-confirm');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
  
      [errUser, errEmail, errPass, errConfirm].forEach(el => el.textContent = '');
  
      if (!username.value.trim()) {
        errUser.textContent = 'El nombre de usuario es obligatorio.';
        valid = false;
      }
  
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
  
      if (!confirm.value) {
        errConfirm.textContent = 'Confirma tu contraseña.';
        valid = false;
      } else if (confirm.value !== password.value) {
        errConfirm.textContent = 'Las contraseñas no coinciden.';
        valid = false;
      }
  
      if (!valid) return;
  
      alert('¡Registro exitoso!');
      window.location.href = 'login.html';
    });
  });
  