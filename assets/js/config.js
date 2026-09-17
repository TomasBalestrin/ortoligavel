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
  // Instagram do rodapé geral: aponta para a unidade matriz (Santos).
  instagram: "https://www.instagram.com/ortoligavel_santos/",
  horario: "[SEG A SEX, 9H AS 19H]",

  unidades: [
    {
      id: "santos",
      cidade: "Santos",
      uf: "SP",
      regiao: "Baixada Santista",
      endereco: "Al. Armênio Mendes, 66 - Sl 1801, Aparecida",
      bairro: "Aparecida",
      cep: "11030-000",
      telefone: null,
      whatsapp: "5513996545599",
      instagram: "https://www.instagram.com/ortoligavel_santos/",
      mapsUrl: "[LINK GOOGLE MAPS SANTOS]",
      geo: { lat: "-23.9608", lng: "-46.3336" }
    },
    {
      id: "joao-pessoa",
      cidade: "João Pessoa",
      uf: "PB",
      regiao: "Paraíba",
      endereco: "Av. Gen. Edson Ramalho, 190, Manaíra",
      bairro: "Manaíra",
      cep: "58038-100",
      telefone: null,
      whatsapp: "558398129665",
      instagram: "https://www.instagram.com/ortoligaveljoaopessoa/",
      mapsUrl: "[LINK GOOGLE MAPS JOAO PESSOA]",
      geo: { lat: "-7.1195", lng: "-34.8450" }
    }
  ],

  // Mensagem que já vem escrita quando o paciente abre o WhatsApp
  msgWhatsapp: "Olá! Vim pelo site e gostaria de agendar uma avaliação."
};
