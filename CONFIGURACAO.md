# Ortoligável — Configuração do site

Tudo que você precisa preencher está em **um único arquivo**: `assets/js/config.js`.
Abra, troque os valores entre aspas e salve. O site inteiro se atualiza sozinho.

---

## 1. Dados a preencher (obrigatório antes de publicar)

Abra `assets/js/config.js` e substitua todo texto que começa com `[ ` e termina com ` ]`:

| Campo | Onde aparece | Exemplo do que preencher |
|---|---|---|
| `dominio` | SEO, links canônicos, sitemap | `https://ortoligavel.com.br` |
| `santos.endereco` | Seção Unidades, rodapé, Google | `Av. Ana Costa, 000 — Sala 00, Gonzaga` |
| `santos.cep` | Seção Unidades, dados do Google | `11060-000` |
| `santos.telefone` | Botão "Ligar agora" | `+551332221111` (só números, com +55) |
| `santos.whatsapp` | Todos os botões de WhatsApp | `5513997857541` (só números) |
| `santos.mapsUrl` | Botão "Como chegar" | Link do Google Maps da unidade |
| `joaoPessoa.*` | Mesmos campos da unidade PB | — |
| `email` | Rodapé e dados do Google | `contato@ortoligavel.com.br` |
| `cro` | Rodapé (exigido pelo CFO) | `CRO/SP 00000` |
| `responsavelTecnico` | Rodapé (exigido pelo CFO) | `Dr. Claudio Figueiredo — CRO/SP 00000` |
| `instagram` | Rodapé e dados do Google | `https://instagram.com/dr.claudiofigueiredo` |
| `horario` | Seção Unidades e dados do Google | `Seg a Sex, 9h às 19h` |

> **Importante:** enquanto houver `[ ]` no arquivo, o site mostra o texto do placeholder
> na tela. Isso é proposital, para você não publicar sem perceber que faltou algo.

---

## 2. Como testar localmente

```
cd site
python3 -m http.server 8080
```
Abra http://localhost:8080

## 3. Como publicar

O site é estático (HTML/CSS/JS puro), sem build. Basta enviar a pasta `site/` inteira:

- **Netlify / Vercel:** arraste a pasta na interface. Pronto.
- **Hospedagem tradicional (cPanel, Hostinger):** envie o conteúdo de `site/` para `public_html/`.

Depois de publicar, faça estes 3 passos de SEO:
1. Troque `dominio` em `config.js` pelo domínio real.
2. Cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie `sitemap.xml`.
3. Vincule os dois perfis do Google Meu Negócio (Santos e João Pessoa) ao site.
