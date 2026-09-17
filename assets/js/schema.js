/* =============================================================
   ORTOLIGÁVEL — Dados estruturados (Schema.org)
   Gerados a partir do config.js para nunca divergirem do site.
   O Google usa isto para o painel de conhecimento e busca local;
   assistentes de IA (ChatGPT, Perplexity, Gemini) usam o mesmo
   grafo para responder perguntas sobre a clínica com precisão.
   ============================================================= */
(function () {
  "use strict";
  var C = window.ORTO || {};
  var vazio = function (v) { return !v || /^\[.*\]$/.test(String(v).trim()); };
  var ok = function (v) { return vazio(v) ? undefined : v; };

  var base = C.dominio || "";

  // Tenta ler "SEG A SEX, 9H AS 19H" e transformar em horário estruturado.
  // Se o texto não bater no padrão esperado, retorna undefined em vez de
  // adivinhar — dado estruturado errado é pior que ausente.
  var DIAS = {
    "seg": "Monday", "ter": "Tuesday", "qua": "Wednesday",
    "qui": "Thursday", "sex": "Friday", "sáb": "Saturday", "sab": "Saturday", "dom": "Sunday"
  };
  function horarioEstruturado(texto) {
    if (vazio(texto)) return undefined;
    var m = String(texto).toLowerCase()
      .match(/(seg|ter|qua|qui|sex|s[aá]b|dom)[a-zç]*\s*a\s*(seg|ter|qua|qui|sex|s[aá]b|dom)[a-zç]*,?\s*(\d{1,2})h(?:(\d{2}))?\s*(?:as|às)\s*(\d{1,2})h(?:(\d{2}))?/);
    if (!m) return undefined;
    var de = DIAS[m[1].slice(0, 3)], ate = DIAS[m[2].slice(0, 3)];
    if (!de || !ate) return undefined;
    var ordem = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var dias = [];
    var i = ordem.indexOf(de);
    var fim = ordem.indexOf(ate);
    if (i === -1 || fim === -1) return undefined;
    while (true) {
      dias.push(ordem[i]);
      if (ordem[i] === ate) break;
      i = (i + 1) % 7;
      if (dias.length > 7) return undefined; // guarda contra loop infinito
    }
    var abre = m[3].padStart(2, "0") + ":" + (m[4] || "00");
    var fecha = m[5].padStart(2, "0") + ":" + (m[6] || "00");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dias,
      opens: abre,
      closes: fecha
    };
  }

  function clinica(u) {
    var horario = horarioEstruturado(C.horario);
    var no = {
      "@type": "Dentist",
      "@id": base + "/#" + u.id,
      name: "Ortoligável " + u.cidade,
      description: "Clínica de ortodontia digital estética em " + u.cidade +
        "/" + u.uf + ". Alinhadores invisíveis, bráquetes autoligáveis estéticos e tratamento híbrido TOHi.",
      url: base + "/#unidades",
      image: base + "/assets/img/hero.jpg",
      logo: base + "/assets/img/logo.png",
      priceRange: "$$$",
      medicalSpecialty: "Dentistry",
      parentOrganization: { "@id": base + "/#organizacao" },
      areaServed: { "@type": "City", name: u.cidade },
      availableService: [
        { "@type": "MedicalProcedure", name: "Alinhadores invisíveis" },
        { "@type": "MedicalProcedure", name: "Bráquetes autoligáveis estéticos" },
        { "@type": "MedicalProcedure", name: "Tratamento Ortodôntico Híbrido (TOHi)" },
        { "@type": "MedicalProcedure", name: "Lentes de contato dental" },
        { "@type": "MedicalProcedure", name: "Implantes e protocolos" },
        { "@type": "MedicalProcedure", name: "Clareamento dental" }
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: ok(u.endereco),
        addressLocality: u.cidade,
        addressRegion: u.uf,
        postalCode: ok(u.cep),
        addressCountry: "BR"
      },
      geo: { "@type": "GeoCoordinates", latitude: u.geo.lat, longitude: u.geo.lng },
      hasMap: ok(u.mapsUrl),
      telephone: ok(u.telefone),
      email: ok(C.email),
      openingHoursSpecification: horario,
      sameAs: [ok(u.instagram) || ok(C.instagram)].filter(Boolean)
    };
    // Remove campos vazios do endereço
    Object.keys(no.address).forEach(function (k) {
      if (no.address[k] === undefined) delete no.address[k];
    });
    ["telephone", "email", "hasMap", "openingHoursSpecification"].forEach(function (k) {
      if (!no[k]) delete no[k];
    });
    return no;
  }

  var grafo = [
    {
      "@type": "Organization",
      "@id": base + "/#organizacao",
      name: "Ortoligável",
      alternateName: "Ortoligável Odontologia Estética Digital",
      url: base + "/",
      logo: base + "/assets/img/logo.png",
      sameAs: [C.instagram].filter(Boolean),
      founder: {
        "@type": "Person",
        "@id": base + "/#dr-claudio",
        name: "Dr. Claudio Figueiredo",
        jobTitle: "Ortodontista, Mestre em Ortodontia",
        description: "Especialista em Ortodontia e Ortopedia Funcional dos Maxilares, " +
          "autor de três livros sobre o sistema autoligável, designer dos bráquetes " +
          "New Evolution Pro e pioneiro do Tratamento Ortodôntico Híbrido (TOHi) no Brasil.",
        image: base + "/assets/img/dr-claudio-credenciais.jpg",
        alumniOf: { "@type": "CollegeOrUniversity", name: "Faculdade de Odontologia São Francisco" },
        knowsAbout: ["Ortodontia", "Alinhadores invisíveis", "Bráquetes autoligáveis",
          "Tratamento Ortodôntico Híbrido", "Ortodontia digital"],
        sameAs: [C.instagram].filter(Boolean)
      }
    },
    {
      "@type": "WebSite",
      "@id": base + "/#site",
      url: base + "/",
      name: "Ortoligável",
      inLanguage: "pt-BR",
      publisher: { "@id": base + "/#organizacao" }
    }
  ];

  // Breadcrumb da home: só faz sentido nas páginas internas (que já têm
  // o próprio), mas ajuda o Google a montar o site como uma árvore única.
  if (location.pathname === "/" || /\/index\.html$/.test(location.pathname)) {
    grafo.push({
      "@type": "BreadcrumbList",
      "@id": base + "/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: base + "/" }
      ]
    });
  }

  (C.unidades || []).forEach(function (u) { grafo.push(clinica(u)); });

  // FAQ: lê as perguntas direto do HTML, para não duplicar texto
  var perguntas = [];
  document.querySelectorAll(".faq details").forEach(function (d) {
    var q = d.querySelector("summary");
    var a = d.querySelector(".faq__corpo");
    if (q && a) {
      perguntas.push({
        "@type": "Question",
        name: q.textContent.trim(),
        acceptedAnswer: { "@type": "Answer", text: a.textContent.trim() }
      });
    }
  });
  if (perguntas.length) {
    grafo.push({ "@type": "FAQPage", "@id": base + "/#faq", mainEntity: perguntas });
  }

  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": grafo });
  document.head.appendChild(s);
})();
