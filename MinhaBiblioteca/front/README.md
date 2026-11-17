# UniBook - Front-end

## Integrantes
- Nicolas Franchini Fernandes - RGM: 114.043
---

## O que foi desenvolvido
Desenvolvi uma interface web para gerenciar o acervo da biblioteca universitária conectada à nossa API em C#. Pela página, o usuário consegue visualizar os livros e revistas cadastrados, cadastrar novos itens, editar informações existentes, excluir materiais do acervo, consultar detalhes de prazo e testar o empréstimo de materiais.

---

## Como executar

### 1. Iniciar a API (Back-end)
No terminal, dentro da pasta MinhaBiblioteca, execute:
```bash
dotnet run
```
A API vai iniciar na porta informada pelo terminal (no nosso caso: http://localhost:5147).

### 2. Abrir o Front-end
Abra o arquivo `front/index.html` utilizando a extensão Live Server do Visual Studio Code ou dando dois cliques no arquivo para abrir no navegador.

---

## Conexão com a API
No arquivo `script.js`, a comunicação é feita através da constante:
```javascript
const API_URL = "http://localhost:5147/api/Materiais/";
```

---

## Endpoints consumidos
- GET /api/Materiais: carrega todos os livros e revistas na tela.
- GET /api/Materiais/{id}: busca os dados de um item específico para preencher o formulário de edição.
- GET /api/Materiais/{id}/descricao: busca a descrição e o prazo de devolução do material.
- POST /api/Materiais/livro: cadastra um novo livro.
- POST /api/Materiais/revista: cadastra uma nova revista.
- PUT /api/Materiais/livro/{id}: atualiza os dados de um livro existente.
- PUT /api/Materiais/revista/{id}: atualiza os dados de uma revista existente.
- DELETE /api/Materiais/{id}: exclui um material do acervo após confirmação.
- POST /api/Materiais/{id}/emprestar: realiza a tentativa de empréstimo.

---

## Estrutura do Front-end
A pasta front possui três arquivos principais:
- index.html: estrutura da página contendo o cabeçalho, os botões, a área de listagem de materiais, o formulário e o rodapé.
- style.css: personalizações visuais como cores de fundo e bordas.
- script.js: lógica em JavaScript com funções para carregar dados via fetch, manipular o DOM e enviar requisições.

---

## Componentes do Bootstrap utilizados
- Grid System (container, row, col): para organizar o layout responsivo da página.
- Cards: para exibir cada livro e revista em formato de cartão com suas informações e botões de ação.
- Badges: etiquetas coloridas para diferenciar visualmente Livro (azul) de Revista (verde).
- Buttons: botões de ação com cores padronizadas (btn-warning, btn-outline-danger, etc.).
- Form Controls (form-control, form-label): para formatar os campos de texto e rótulos do formulário.
- Classes utilitárias (d-flex, gap, d-none, text-center): para alinhamento, espaçamento e controle de visibilidade do formulário.

---

## Validações implementadas no Front-end
Antes de enviar qualquer dado para a API, o JavaScript valida:
- Título preenchido e não contendo apenas espaços.
- Ano de publicação não pode ser negativo.
- Para livros: autor obrigatório e número de páginas maior que zero.
- Para revistas: número de edição maior que zero e mês de publicação entre 1 e 12.
- Confirmação com janela de alerta antes de deletar qualquer material.

---

## Dificuldades e Aprendizados
- Conectar o front-end com a API: a principal dificuldade inicial foi fazer o fetch receber corretamente os dados da API em C#, o que exigiu entender como configurar o CORS no back-end para permitir as requisições do navegador.
- Formulários dinâmicos: outra parte desafiadora foi criar um único formulário que se adapta para livro ou revista e que serve tanto para cadastrar quanto para editar, preenchendo os campos automaticamente via DOM.
- Aprendizado geral: aprendi na prática como funciona o ciclo completo de uma aplicação web, desde a chamada dos endpoints até a integração e manipulação dos dados na interface com JavaScript e Bootstrap.
