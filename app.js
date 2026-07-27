
const doc = document.documentElement;
const savedTheme = localStorage.getItem("tema");
if (savedTheme) doc.dataset.theme = savedTheme;

document.getElementById("themeBtn")?.addEventListener("click", () => {
  doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("tema", doc.dataset.theme);
});

const nav = document.querySelector("aside nav");
if (nav && !nav.querySelector('a[href="sistema-inmunitario.html"]')) {
  const info = [...nav.querySelectorAll("strong")]
    .find(el => el.textContent.trim() === "Información");

  const bloque = `<strong>🛡️ Sistema inmunitario</strong>
  <a data-search="sistema inmunitario defensas" href="sistema-inmunitario.html">Resumen</a>
  <a data-search="leucocitos glóbulos blancos" href="leucocitos.html">Leucocitos</a>
  <a data-search="linfocitos t b nk" href="linfocitos.html">Linfocitos</a>
  <a data-search="neutrófilos" href="neutrofilos.html">Neutrófilos</a>
  <a data-search="macrófagos" href="macrofagos.html">Macrófagos</a>
  <a data-search="células dendríticas" href="celulas-dendriticas.html">Células dendríticas</a>
  <a data-search="anticuerpos inmunoglobulinas" href="anticuerpos.html">Anticuerpos</a>
  <a data-search="médula ósea inmunidad" href="medula-osea-inmunitaria.html">Médula ósea e inmunidad</a>`;

  if (info) info.insertAdjacentHTML("beforebegin", bloque);
  else nav.insertAdjacentHTML("beforeend", bloque);
}

const input = document.getElementById("search");
input?.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  document.querySelectorAll("[data-search]").forEach((el) => {
    el.style.display = el.dataset.search.toLowerCase().includes(q) ? "" : "none";
  });
});
