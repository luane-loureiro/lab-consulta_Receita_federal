const toggleTheme = document.getElementById('toggleTheme');
const htmlElement = document.documentElement;
const logo = document.getElementById('logo');

toggleTheme.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');

  if (currentTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'dark');
    toggleTheme.classList.replace('bi-moon-stars', 'bi-sun');
    logo.src = '/image/logo_dark.png'; // Logo para o tema dark
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    toggleTheme.classList.replace('bi-sun', 'bi-moon-stars');
    logo.src = '/image/logo_light.png'; // Logo para o tema light
  }
});