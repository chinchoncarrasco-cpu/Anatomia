(() => {
  const root=document.documentElement;
  const saved=localStorage.getItem('tema-anatomia');
  if(saved) root.dataset.theme=saved;
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    root.dataset.theme=next; localStorage.setItem('tema-anatomia',next);
  }));
  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('aside a').forEach(a=>{
    if((a.getAttribute('href')||'').split('#')[0]===current) a.classList.add('active');
  });
})();
