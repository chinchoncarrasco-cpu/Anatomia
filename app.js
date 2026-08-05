const doc = document.documentElement;
const savedTheme = localStorage.getItem("tema");
if (savedTheme) doc.dataset.theme = savedTheme;

const themeButtons = document.querySelectorAll("#themeBtn, [data-theme-toggle]");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("tema", doc.dataset.theme);
  });
});

function insertBeforeInformation(nav, group) {
  const info = [...nav.querySelectorAll("details")]
    .find(item => item.textContent.includes("Información"));
  if (info) nav.insertBefore(group, info);
  else nav.appendChild(group);
}

function agregarCasosCorazon() {
  const nav = document.querySelector(".accordion-nav");
  if (!nav || nav.querySelector('a[href="casos-clinicos-corazon.html"]')) return;
  const group = document.createElement("details");
  group.dataset.system = "casos clínicos del corazón infarto arritmias insuficiencia cardíaca";
  group.innerHTML = `
    <summary>🩺 Casos clínicos del corazón</summary>
    <div class="system-links">
      <a data-search="casos clínicos corazón patologías" href="casos-clinicos-corazon.html">Resumen</a>
      <a data-search="infarto agudo de miocardio ataque cardíaco arteria coronaria" href="infarto-agudo-miocardio.html">Infarto agudo de miocardio</a>
      <a data-search="arritmias ritmo cardíaco taquicardia bradicardia fibrilación" href="arritmias.html">Arritmias</a>
      <span class="coming-soon">Insuficiencia cardíaca · próximamente</span>
    </div>`;
  insertBeforeInformation(nav, group);
}

function agregarCasosArterias() {
  const nav = document.querySelector(".accordion-nav");
  if (!nav || nav.querySelector('a[href="casos-clinicos-arterias.html"]')) return;
  const group = document.createElement("details");
  group.dataset.system = "casos clínicos arterias aterosclerosis aneurisma enfermedad arterial periférica disección aórtica trombosis arterial";
  group.innerHTML = `
    <summary>🩸 Casos clínicos de las arterias</summary>
    <div class="system-links">
      <a data-search="casos clínicos arterias patologías" href="casos-clinicos-arterias.html">Resumen</a>
      <a data-search="aterosclerosis placa colesterol endotelio" href="aterosclerosis.html">Aterosclerosis</a>
      <a data-search="aneurisma dilatación arterial" href="aneurisma.html">Aneurisma</a>
      <a data-search="enfermedad arterial periférica piernas claudicación" href="enfermedad-arterial-periferica.html">Enfermedad arterial periférica</a>
      <a data-search="disección aórtica aorta emergencia" href="diseccion-aortica.html">Disección aórtica</a>
      <a data-search="trombosis arterial coágulo obstrucción" href="trombosis-arterial.html">Trombosis arterial</a>
    </div>`;
  insertBeforeInformation(nav, group);
}

agregarCasosCorazon();
agregarCasosArterias();

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
    card.hidden = Boolean(q) && !card.dataset.search.toLowerCase().includes(q);
  });
});
