/* =============================================================
   ORTOLIGÁVEL — Dados estruturados (Schema.org)
   Gerados a partir do config.js para nunca divergirem do site.
   O Google usa isto para o painel de conhecimento e busca local.
   ============================================================= */
(function () {
  "use strict";
  var C = window.ORTO || {};
  var vazio = function (v) { return !v || /^\[.*\]$/.test(String(v).trim()); };
  var ok = function (v) { return vazio(v) ? undefined : v; };

  var base = C.dominio || "";

  function clinica(u) {
    var no = {
      "@type": "Dentist",
      "@id": base + "/#" + u.id,
      name: "Ortoligável " + u.cidade,
      description: "Clínica de ortodontia digital estética em " + u.cidade +
        "/" + u.uf + ". Alinhadores invisíveis, bráquetes autoligáveis estéticos e tratamento híbrido TOHi.",
      url: base + "/",
      image: base + "/assets/img/hero.jpg",
      logo: base + "/assets/img/logo.png",
      priceRange: "$$$",
      medicalSpecialty: "Dentistry",
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
      telephone: ok(u.telefone),
      email: ok(C.email),
      sameAs: [ok(u.instagram) || ok(C.instagram)].filter(Boolean)
    };
    // Remove campos vazios do endereço
    Object.keys(no.address).forEach(function (k) {
      if (no.address[k] === undefined) delete no.address[k];
    });
    if (!no.telephone) delete no.telephone;
    if (!no.email) delete no.email;
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
