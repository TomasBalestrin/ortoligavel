/* =============================================================
   ORTOLIGÁVEL — Configuração central
   Troque os valores entre [colchetes] pelos dados reais.
   Nada mais no site precisa ser editado à mão.
   ============================================================= */

window.ORTO = {
  dominio: "https://www.ortoligavel.com.br",

  email: "[EMAIL DA CLINICA]",
  cro: "[CRO DA CLINICA]",
  responsavelTecnico: "[DR. CLAUDIO FIGUEIREDO, CRO/SP 00000]",
  instagram: "https://www.instagram.com/dr.claudiofigueiredo",
  horario: "[SEG A SEX, 9H AS 19H]",

  unidades: [
    {
      id: "santos",
      cidade: "Santos",
      uf: "SP",
      regiao: "Baixada Santista",
      endereco: "[ENDERECO COMPLETO SANTOS]",
      bairro: "[BAIRRO]",
      cep: "[CEP SANTOS]",
      telefone: "[+551300000000]",
      whatsapp: "[5513000000000]",
      mapsUrl: "[LINK GOOGLE MAPS SANTOS]",
      geo: { lat: "-23.9608", lng: "-46.3336" }
    },
    {
      id: "joao-pessoa",
      cidade: "João Pessoa",
      uf: "PB",
      regiao: "Paraíba",
      endereco: "[ENDERECO COMPLETO JOAO PESSOA]",
      bairro: "[BAIRRO]",
      cep: "[CEP JOAO PESSOA]",
      telefone: "[+558300000000]",
      whatsapp: "[5583000000000]",
      mapsUrl: "[LINK GOOGLE MAPS JOAO PESSOA]",
      geo: { lat: "-7.1195", lng: "-34.8450" }
    }
  ],

  // Mensagem que já vem escrita quando o paciente abre o WhatsApp
  msgWhatsapp: "Olá! Vim pelo site e gostaria de agendar uma avaliação."
};
