# MinhaBiblioteca - Sistema de Gerenciamento de Biblioteca Universitaria

## Integrantes
- Samuel Luiz de Souza - RGM: 114.057
- Nicolas Franchini Fernandes - RGM: 114.043
- Yuri Yochifumi de Lara Maeda - RGM: 114.054

---

## Descricao do Sistema
Web API desenvolvida em C# e ASP.NET Core (.NET 10) para gerenciar o acervo de uma biblioteca universitaria. O sistema permite cadastrar, consultar, atualizar e excluir livros e revistas, alem de realizar consultas polimorficas de prazos e operacoes de emprestimo baseadas em interfaces.

---

## Tecnologias Utilizadas
- C#
- .NET 10 (ASP.NET Core Web API)
- Swagger / OpenAPI (Swashbuckle.AspNetCore)
- Repository Pattern com armazenamento em memoria (Dictionary)
- Injecao de Dependencia e Singleton

---

## Como Executar

### Pre-requisitos
- .NET SDK 10 instalado na maquina.

### Passos
1. Acesse o diretorio do projeto:
   ```bash
   cd MinhaBiblioteca
   ```

2. Restaure as dependencias:
   ```bash
   dotnet restore
   ```

3. Execute a aplicacao:
   ```bash
   dotnet run
   ```

4. Acesse a documentacao interativa do Swagger pelo navegador no endereco informado pelo terminal (por exemplo: `https://localhost:7000/swagger` ou `http://localhost:5147/swagger`).

---

## Principais Endpoints

| Metodo | URL | Descricao | Resposta Esperada |
|---|---|---|---|
| GET | /api/Materiais | Lista todos os materiais do acervo | 200 OK |
| GET | /api/Materiais/{id} | Busca um material por ID | 200 OK ou 404 Not Found |
| GET | /api/Materiais/{id}/descricao | Retorna tipo, descricao e prazo polimorfico | 200 OK ou 404 Not Found |
| POST | /api/Materiais/livro | Cadastra um novo livro | 201 Created ou 400 Bad Request |
| POST | /api/Materiais/revista | Cadastra uma nova revista | 201 Created ou 400 Bad Request |
| PUT | /api/Materiais/livro/{id} | Atualiza dados de um livro existente | 200 OK ou 404 Not Found |
| PUT | /api/Materiais/revista/{id} | Atualiza dados de uma revista existente | 200 OK ou 404 Not Found |
| DELETE | /api/Materiais/{id} | Remove um material do acervo | 204 No Content ou 404 Not Found |
| POST | /api/Materiais/{id}/emprestar | Tenta realizar o emprestimo do material | 200 OK ou 400 Bad Request |

---

## Exemplos de Testes

### 1. Cadastrar Livro
- **Metodo:** `POST /api/Materiais/livro`
- **Corpo da Requisicao (JSON):**
  ```json
  {
    "titulo": "O Programador Pragmatico",
    "anoPublicacao": 1999,
    "autor": "Andrew Hunt",
    "paginas": 352
  }
  ```
- **Resposta Esperada (201 Created):**
  ```json
  {
    "id": 3,
    "titulo": "O Programador Pragmatico",
    "anoPublicacao": 1999,
    "autor": "Andrew Hunt",
    "paginas": 352
  }
  ```

### 2. Cadastrar Revista
- **Metodo:** `POST /api/Materiais/revista`
- **Corpo da Requisicao (JSON):**
  ```json
  {
    "titulo": "Mundo dos Livros",
    "anoPublicacao": 2026,
    "edicao": 5,
    "mesPublicacao": 8
  }
  ```
- **Resposta Esperada (201 Created):**
  ```json
  {
    "id": 4,
    "titulo": "Mundo dos Livros",
    "anoPublicacao": 2026,
    "edicao": 5,
    "mesPublicacao": 8
  }
  ```

### 3. Consultar Descricao e Prazo Polimorfico
- **Metodo:** `GET /api/Materiais/1/descricao`
- **Resposta Esperada (200 OK):**
  ```json
  {
    "id": 1,
    "tipo": "Livro",
    "descricao": "Livro: Clean Code - Autor: Robert C. Martin",
    "prazoEmprestimo": 14
  }
  ```

### 4. Teste de Emprestimo (Interface IEmprestimo)
- **Sucesso (Livro):** `POST /api/Materiais/1/emprestar`
  - **Resposta:** `200 OK`
  - **Mensagem:** `"Livro emprestado com sucesso. Prazo de 14 dias para a devolucao"`
- **Falha (Revista nao implementa IEmprestimo):** `POST /api/Materiais/2/emprestar`
  - **Resposta:** `400 Bad Request`
  - **Mensagem:** `"Este material nao permite emprestimo."`

### 5. Teste de Validacao
- **Metodo:** `POST /api/Materiais/livro` com `paginas: 0`
- **Resposta Esperada:** `400 Bad Request`
- **Mensagem:** `"O numero de paginas deve ser maior que 0."`
