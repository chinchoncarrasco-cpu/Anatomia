
const doc = document.documentElement;
const savedTheme = localStorage.getItem("tema");
if (savedTheme) doc.dataset.theme = savedTheme;

const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", () => {
  doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("tema", doc.dataset.theme);
});

const input = document.getElementById("search");
input?.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  document.querySelectorAll(".accordion-nav details").forEach((group) => {
    const links = [...group.querySelectorAll("[data-search]")];
    let visible = false;
    links.forEach((link) => {
      const matches = !q || link.dataset.search.toLowerCase().includes(q);
      link.hidden = !matches;
      if (matches) visible = true;
    });
    group.hidden = q ? !visible : false;
    if (q && visible) group.open = true;
  });

  document.querySelectorAll(".grid [data-search]").forEach((card) => {
    card.hidden = q && !card.dataset.search.toLowerCase().includes(q);
  });
});
