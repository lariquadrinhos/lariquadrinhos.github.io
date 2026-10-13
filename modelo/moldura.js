// O que o script acrescenta ao HTML (princípio I). Sem ele o site perde só conveniência:
// a troca manual de tema, a trilha que acompanha a rolagem e o voltar ao topo.
// As sobreposições abrem e fecham sozinhas pelo atributo `popover`; aqui elas só ganham
// posição junto de quem as abriu e o estado declarado na marcação.

(function () {
  'use strict';

  var raiz = document.documentElement;
  // A largura do modo Desktop vem da página: 1024, ou 1280 no case (decisão 225).
  var largo = window.matchMedia('(min-width: ' + (document.documentElement.getAttribute('data-quebra') || '1024') + 'px)');
  // A barra e as sobreposições têm a quebra delas, a mesma em toda página (decisão 230).
  var barraLarga = window.matchMedia('(min-width: ' + (document.documentElement.getAttribute('data-quebra-barra') || '1280') + 'px)');
  var escuroNoSistema = window.matchMedia('(prefers-color-scheme: dark)');
  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ── Tema ────────────────────────────────────────────────────────────────────
  // Duas posições, claro e escuro. Sem escolha, vale o sistema; a escolha é lembrada e
  // vale até ser trocada de novo. Escolher não fecha a caixa (decisão 063).

  function temaEscolhido() {
    try { return localStorage.getItem('tema'); } catch (e) { return null; }
  }

  function temaEmVigor() {
    return temaEscolhido() || (escuroNoSistema.matches ? 'escuro' : 'claro');
  }

  function marcarOpcoes() {
    var vigor = temaEmVigor();
    document.querySelectorAll('[data-tema-opcao]').forEach(function (botao) {
      var ativa = botao.getAttribute('data-tema-opcao') === vigor;
      botao.setAttribute('aria-pressed', String(ativa));
      botao.querySelector('.caixa__sinal').textContent = ativa ? '✓' : '';
    });
  }

  document.addEventListener('click', function (e) {
    var botao = e.target.closest('[data-tema-opcao]');
    if (!botao) return;
    var tema = botao.getAttribute('data-tema-opcao');
    try { localStorage.setItem('tema', tema); } catch (erro) {}
    raiz.setAttribute('data-tema', tema);
    marcarOpcoes();
  });

  escuroNoSistema.addEventListener('change', function () {
    if (!temaEscolhido()) marcarOpcoes();
  });
  marcarOpcoes();

  // ── Sobreposições ───────────────────────────────────────────────────────────
  // No desktop a caixa fica a 12 do que a abriu; quando o gatilho é item da barra, pende da
  // borda de baixo da barra, alinhada pela direita da palavra. Na tela estreita o CSS a põe
  // na largura da coluna, com véu.

  var VAO = 12;
  var quemAbriu = {};

  document.addEventListener('click', function (e) {
    var gatilho = e.target.closest('[popovertarget]');
    if (gatilho) quemAbriu[gatilho.getAttribute('popovertarget')] = gatilho;
  });

  function posicionar(caixa) {
    var gatilho = quemAbriu[caixa.id];
    caixa.style.top = caixa.style.left = caixa.style.right = '';
    if (!barraLarga.matches || !gatilho || caixa.id === 'etapas' || caixa.id === 'menu') return;
    var r = gatilho.getBoundingClientRect();
    var barra = gatilho.closest('.barra');
    if (barra) {
      caixa.style.top = (barra.getBoundingClientRect().bottom + VAO) + 'px';
      caixa.style.right = (document.documentElement.clientWidth - r.right) + 'px';
    } else {
      caixa.style.top = (r.bottom + VAO) + 'px';
      caixa.style.left = r.left + 'px';
    }
  }

  document.querySelectorAll('[popover]').forEach(function (caixa) {
    caixa.addEventListener('toggle', function (e) {
      var aberta = e.newState === 'open';
      document.querySelectorAll('[popovertarget="' + caixa.id + '"]').forEach(function (g) {
        g.setAttribute('aria-expanded', String(aberta));
      });
      if (aberta) posicionar(caixa);
    });
  });

  function reposicionarAbertas() {
    document.querySelectorAll('[popover]').forEach(function (caixa) {
      if (caixa.matches(':popover-open')) posicionar(caixa);
    });
  }
  window.addEventListener('resize', reposicionarAbertas);
  window.addEventListener('scroll', reposicionarAbertas, { passive: true });

  // Um item da lista de etapas leva à seção; a lista se recolhe junto.
  var etapas = document.getElementById('etapas');
  if (etapas) {
    etapas.addEventListener('click', function (e) {
      if (e.target.closest('a')) etapas.hidePopover();
    });
  }

  // ── Trilha e faixa de progresso ─────────────────────────────────────────────
  // A etapa atual é a última cujo início já passou da linha a um terço do topo da tela.
  // O estado é derivado da posição, nunca acumulado, e nunca anima (decisão 138).

  var capitulos = Array.prototype.slice.call(document.querySelectorAll('.capitulo'));
  var itens = document.querySelectorAll('.trilha__item');
  var faixaBotao = document.querySelector('.faixa__botao');
  var linhasDeEtapa = etapas ? etapas.querySelectorAll('[data-etapa]') : [];

  function etapaAtual() {
    var linha = window.innerHeight / 3;
    var atual = -1;
    capitulos.forEach(function (cap, i) {
      if (cap.getBoundingClientRect().top <= linha) atual = i;
    });
    return atual;
  }

  function atualizarTrilha() {
    var atual = etapaAtual();
    itens.forEach(function (item, i) {
      var estado = atual < 0 ? 'por-vir' : i < atual ? 'percorrido' : i === atual ? 'atual' : 'por-vir';
      item.setAttribute('data-estado', estado);
      var link = item.querySelector('a');
      if (estado === 'atual') link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    if (faixaBotao) {
      var mostrada = Math.max(atual, 0);
      var total = Number(faixaBotao.getAttribute('data-total'));
      faixaBotao.querySelector('.faixa__etapa').textContent =
        itens[mostrada].querySelector('.trilha__rotulo').textContent;
      faixaBotao.querySelector('.faixa__posicao').textContent = (mostrada + 1) + ' de ' + total;
      // A barra mede quanto da leitura já passou, não a proporção de etapas (decisão 080).
      var rolavel = document.documentElement.scrollHeight - window.innerHeight;
      var fracao = rolavel > 0 ? Math.min(Math.max(window.scrollY / rolavel, 0), 1) : 0;
      faixaBotao.querySelector('.faixa__progresso').style.width = (fracao * 100) + '%';
      linhasDeEtapa.forEach(function (linhaEtapa, i) {
        var ehAtual = i === mostrada;
        linhaEtapa.querySelector('.caixa__sinal').textContent = ehAtual ? '✓' : '';
        if (ehAtual) linhaEtapa.setAttribute('aria-current', 'location');
        else linhaEtapa.removeAttribute('aria-current');
      });
    }
  }

  // ── Voltar ao topo ──────────────────────────────────────────────────────────
  // Só no desktop, só depois de uma tela rolada, e some quando o convite ao contato entra
  // na tela: as duas formas sólidas nunca dividem a tela. Aparece sem transição.

  var voltar = document.querySelector('.voltar-ao-topo');
  var convite = document.querySelector('.convite');

  function conviteNaTela() {
    if (!convite) return false;
    var r = convite.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function atualizarVoltar() {
    if (!voltar) return;
    voltar.hidden = !(largo.matches && window.scrollY > window.innerHeight && !conviteNaTela());
  }

  if (voltar) {
    voltar.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: semMovimento.matches ? 'auto' : 'smooth' });
      document.getElementById('topo').focus({ preventScroll: true });
    });
  }

  var pedido = false;
  function aoRolar() {
    if (pedido) return;
    pedido = true;
    window.requestAnimationFrame(function () {
      pedido = false;
      if (itens.length || faixaBotao) atualizarTrilha();
      atualizarVoltar();
    });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);
  largo.addEventListener('change', aoRolar);
  aoRolar();
})();
