// Roda bloqueante no <head>, antes da primeira pintura: marca o tema escolhido no elemento
// raiz, para nunca haver troca visível depois que a página apareceu. Sem escolha, ou se não
// rodar, vale o claro do CSS, qualquer que seja o sistema (contrato tema/, decisão 234).
(function () {
  var raiz = document.documentElement;
  raiz.className = raiz.className.replace('sem-js', 'com-js');
  try {
    var tema = localStorage.getItem('tema');
    if (tema === 'claro' || tema === 'escuro') raiz.setAttribute('data-tema', tema);
    // A barra do navegador no celular acompanha o fundo do tema (decisão 235).
    var cor = document.querySelector('meta[name="theme-color"]');
    if (cor && tema === 'escuro') cor.setAttribute('content', cor.getAttribute('data-escuro'));
  } catch (e) {}
})();
