
const doc = document.documentElement;
const savedTheme = localStorage.getItem("tema");
if (savedTheme) doc.dataset.theme = savedTheme;

const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", () => {
  doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("tema", doc.dataset.theme);
});

function agregarCasosClinicos() {
  const nav = document.querySelector(".accordion-nav");
  if (!nav || nav.querySelector('a[href="casos-clinicos-corazon.html"]')) return;

  const info = [...nav.querySelectorAll("details")]
    .find(group => group.textContent.includes("Información"));

  const bloque = document.createElement("details");
  bloque.dataset.system = "casos clínicos del corazón infarto arritmias insuficiencia cardíaca";
  bloque.innerHTML = `
    <summary>🩺 Casos clínicos del corazón</summary>
    <div class="system-links">
      <a data-search="casos clínicos corazón patologías"
         href="casos-clinicos-corazon.html">Resumen</a>
      <a data-search="infarto agudo de miocardio ataque cardíaco arteria coronaria"
         href="infarto-agudo-miocardio.html">Infarto agudo de miocardio</a>
      <a data-search="arritmias ritmo cardíaco taquicardia bradicardia fibrilación"
         href="arritmias.html">Arritmias</a>
      <a data-search="insuficiencia cardíaca falla cardiaca corazón débil congestión"
         href="insuficiencia-cardiaca.html">Insuficiencia cardíaca</a>
    </div>`;

  if (info) nav.insertBefore(bloque, info);
  else nav.appendChild(bloque);
}
agregarCasosClinicos();

const input = document.getElementById("search");
input?.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();

  document.querySelectorAll(".accordion-nav details").forEach((group) => {
    const searchable = [...group.querySelectorAll("[data-search]")];
    const systemText = (group.dataset.system || "").toLowerCase();

    let visible = !q || systemText.includes(q);
    searchable.forEach((link) => {
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
