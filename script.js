
(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;

  function isMobile() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function closeAll() {
    nav.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
  }

  nav.addEventListener("click", (e) => {
    if (!isMobile()) return;

    // klik w trigger (button) ALBO w stare <a> będące bezpośrednim dzieckiem .dropdown
    const btn = e.target.closest(".dropdown-toggle");
    const aTrigger = e.target.closest("li.dropdown > a");
    const trigger = btn || aTrigger;

    // jeśli klik w link wewnątrz submenu -> normalnie przechodzimy, nie blokujemy
    if (e.target.closest(".dropdown-menu a")) return;

    if (!trigger) return;

    const dropdown = trigger.closest("li.dropdown");
    if (!dropdown) return;

    e.preventDefault();
    e.stopPropagation();

    const wasOpen = dropdown.classList.contains("open");
    closeAll();
    if (!wasOpen) dropdown.classList.add("open");
  });

  // klik poza nav zamyka
  document.addEventListener("click", () => {
    if (!isMobile()) return;
    closeAll();
  });

  // zmiana rozmiaru -> zamknij
  window.addEventListener("resize", () => {
    if (!isMobile()) closeAll();
  });
})();
