
const doc = document.documentElement;
const savedTheme = localStorage.getItem("tema");
if (savedTheme) doc.dataset.theme = savedTheme;

document.getElementById("themeBtn")?.addEventListener("click", () => {
  doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("tema", doc.dataset.theme);
});

const input = document.getElementById("search");
input?.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  document.querySelectorAll("[data-search]").forEach((el) => {
    el.style.display = el.dataset.search.toLowerCase().includes(q) ? "" : "none";
  });
});
