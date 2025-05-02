document.addEventListener("DOMContentLoaded", () => {
    const avatarInput = document.getElementById("avatar-input");
    const avatarImg   = document.getElementById("avatar-img");
    const form        = document.getElementById("profile-form");
  
    const saved = JSON.parse(localStorage.getItem("userProfile")) || {
      username: "Usuario123",
      email: "usuario@ejemplo.com",
      theme: "light",
      avatar: "img/default-avatar.png"
    };
  
    avatarImg.src       = saved.avatar;
    form.username.value = saved.username;
    form.email.value    = saved.email;
    form.theme.value    = saved.theme;
  
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        avatarImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      const profileData = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        theme: form.theme.value,
        avatar: avatarImg.src
      };
      localStorage.setItem("userProfile", JSON.stringify(profileData));
      alert("Perfil guardado correctamente.");
    });
  });
  