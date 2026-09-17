/* =============================================================
   ORTOLIGÁVEL — Comportamento
   Sem dependências. Tudo progressivo: se o JS falhar,
   o conteúdo continua legível e os links continuam funcionando.
   ============================================================= */
(function () {
  "use strict";

  var C = window.ORTO || {};
  var faltando = function (v) { return !v || /^\[.*\]$/.test(String(v).trim()); };

  /* ---------- Preenche os dados de contato ---------- */
  function texto(valor) {
    if (faltando(valor)) {
      return '<span class="falta" title="Preencha em assets/js/config.js">' +
        String(valor || "a preencher").replace(/[\[\]]/g, "") + "</span>";
    }
    return valor;
  }

  function linkZap(uni) {
    var num = uni && uni.whatsapp;
    var msg = encodeURIComponent(C.msgWhatsapp || "Olá! Gostaria de agendar uma avaliação.");
    if (faltando(num)) return "#unidades";
    return "https://wa.me/" + String(num).replace(/\D/g, "") + "?text=" + msg;
  }

  // Preenche qualquer elemento marcado com data-orto="chave"
  document.querySelectorAll("[data-orto]").forEach(function (el) {
    var chave = el.getAttribute("data-orto");
    var uniId = el.getAttribute("data-uni");
    var uni = uniId && (C.unidades || []).filter(function (u) { return u.id === uniId; })[0];

    if (chave === "zap-href") { el.setAttribute("href", linkZap(uni || (C.unidades || [])[0])); return; }
    if (chave === "maps-href") {
      var m = uni && uni.mapsUrl;
      if (faltando(m)) { el.setAttribute("href", "#unidades"); el.setAttribute("aria-disabled", "true"); }
      else { el.setAttribute("href", m); }
      return;
    }
    if (chave === "instagram-href") {
      var ig = (uni && uni.instagram) || C.instagram;
      if (faltando(ig)) { el.setAttribute("href", "#unidades"); el.setAttribute("aria-disabled", "true"); }
      else { el.setAttribute("href", ig); }
      return;
    }
    var valor = uni ? uni[chave] : C[chave];
    el.innerHTML = texto(valor);
  });

  /* ---------- Header: sombra ao rolar ---------- */
  var hdr = document.querySelector(".hdr");
  if (hdr) {
    var marcaScroll = function () { hdr.classList.toggle("is-stuck", window.scrollY > 8); };
    marcaScroll();
    window.addEventListener("scroll", marcaScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  var menu = document.getElementById("menu");
  var abrir = document.querySelector(".burger");
  var fechar = document.querySelector(".menu__close");

  function alternaMenu(estado) {
    if (!menu) return;
    menu.classList.toggle("is-open", estado);
    document.body.style.overflow = estado ? "hidden" : "";
    if (abrir) abrir.setAttribute("aria-expanded", String(estado));
    if (estado) { var l = menu.querySelector("a"); if (l) l.focus(); }
    else if (abrir) { abrir.focus(); }
  }
  if (abrir) abrir.addEventListener("click", function () { alternaMenu(true); });
  if (fechar) fechar.addEventListener("click", function () { alternaMenu(false); });
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) alternaMenu(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu && menu.classList.contains("is-open")) alternaMenu(false);
  });

  /* ---------- Carrosséis por trilho ---------- */
  document.querySelectorAll("[data-trilho]").forEach(function (grupo) {
    var trilho = grupo.querySelector(".trilho");
    var ant = grupo.querySelector("[data-nav='ant']");
    var prox = grupo.querySelector("[data-nav='prox']");
    if (!trilho || !ant || !prox) return;

    function passo() {
      var item = trilho.querySelector(":scope > *");
      return item ? item.getBoundingClientRect().width + 19 : 320;
    }
    function atualiza() {
      // O trilho tem padding lateral, então o scroll em repouso não é zero.
      // A tolerância acompanha esse padding em vez de um valor fixo.
      var folga = parseFloat(getComputedStyle(trilho).paddingLeft) || 0;
      var max = trilho.scrollWidth - trilho.clientWidth - folga - 2;
      ant.disabled = trilho.scrollLeft <= folga + 2;
      prox.disabled = trilho.scrollLeft >= max;
    }
    ant.addEventListener("click", function () { trilho.scrollBy({ left: -passo(), behavior: "smooth" }); });
    prox.addEventListener("click", function () { trilho.scrollBy({ left: passo(), behavior: "smooth" }); });
    trilho.addEventListener("scroll", atualiza, { passive: true });
    window.addEventListener("resize", atualiza);
    // Reavalia após o layout e as imagens assentarem, senão as larguras
    // ainda são zero e os botões começam no estado errado.
    atualiza();
    window.addEventListener("load", atualiza);
    setTimeout(atualiza, 350);
  });

  /* ---------- Revelação no scroll ---------- */
  var alvos = document.querySelectorAll(".rev");
  if (alvos.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    alvos.forEach(function (a) { obs.observe(a); });
  } else {
    alvos.forEach(function (a) { a.classList.add("is-in"); });
  }

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
