# 📚 MinhaBiblioteca - API (Backend)
# Sistema de Gerenciamento de Biblioteca Universitária
## Alunos:
Nome: Samuel Luiz de Souza - RGM:114.057
Nome: Nicolas Franchini Fernandes - RGM:114.043
Nome: Yuri Yochifumi de Lara Maeda - RGM:114.054

API RESTful desenvolvida em **.NET (C#)** para o gerenciamento de acervo e empréstimos de uma Biblioteca Universitária, aplicando conceitos fundamentais de Programação Orientada a Objetos (POO) e arquitetura em camadas.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** C#
* **Framework:** .NET 10.0 (ASP.NET Core Web API)
* **Documentação da API:** Swagger / OpenAPI (`Swashbuckle.AspNetCore`)
* **Arquitetura:** MVC / Repository Pattern

---

## 🏗️ Estrutura do Projeto (Backend)

A estrutura principal da aplicação backend está organizada dentro da pasta `MinhaBiblioteca/`:

```text
MinhaBiblioteca/
├── Controllers/
│   └── MateriaisController.cs       # Endpoints da API para gerenciamento dos materiais
├── Models/
│   ├── IEmprestimo.cs               # Interface que define o contrato de empréstimo/devolução
│   ├── MaterialBiblioteca.cs        # Classe base abstrata para os itens do acervo
│   ├── Livro.cs                     # Modelo específico de Livro (herda de MaterialBiblioteca)
│   └── Revista.cs                   # Modelo específico de Revista (herda de MaterialBiblioteca)
├── Repositories/
│   ├── IMaterialRepository.cs       # Interface do repositório de dados
│   └── MaterialRepository.cs        # Implementação do repositório em memória
├── Properties/
│   └── launchSettings.json          # Configurações de execução e portas
├── Program.cs                       # Ponto de entrada, injeção de dependência e middlewares
├── MinhaBiblioteca.csproj           # Arquivo de configuração e dependências do projeto
└── MinhaBiblioteca.http             # Arquivo para testes rápidos de requisições HTTP
```

---

## 🧠 Conceitos de Orientação a Objetos Aplicados

* **Abstração e Herança:** A classe `MaterialBiblioteca` centraliza os atributos e comportamentos comuns de qualquer item do acervo (como ID, título, disponibilidade, etc.), sendo estendida pelas classes especializadas `Livro` e `Revista`.
* **Interfaces e Polimorfismo:** A interface `IEmprestimo` estabelece o contrato padrão para operações de empréstimo e devolução, permitindo que diferentes tipos de materiais sejam manipulados de forma polimórfica.
* **Injeção de Dependência (DI) e Repository Pattern:** O desacoplamento entre a camada de controle (`MateriaisController`) e o armazenamento de dados é garantido através da interface `IMaterialRepository` e sua implementação `MaterialRepository`, registradas no container de serviços em `Program.cs`.

---

## 🚀 Como Executar o Backend

### Pré-requisitos
* [.NET SDK 10.0](https://dotnet.microsoft.com/download) instalado na máquina.

### Passo a passo

1. Acesse o diretório do projeto backend:
   ```bash
   cd Sistema-de-Gerenciamento-de-Biblioteca-Universitaria/MinhaBiblioteca
   ```

2. Restaure as dependências do projeto:
   ```bash
   dotnet restore
   ```

3. Execute a aplicação:
   ```bash
   dotnet run
   ```

4. **Acesse a documentação interativa (Swagger):**
   Após iniciar o servidor, abra o navegador no endereço indicado no terminal (geralmente `http://localhost:5000/swagger` ou `https://localhost:7000/swagger`) para visualizar e testar todos os endpoints disponíveis.

---

## 📌 Endpoints Principais (`MateriaisController`)

A API expõe rotas RESTful através do `MateriaisController` para gerenciar o ciclo de vida dos itens da biblioteca:

* `GET /api/materiais` — Lista todos os materiais cadastrados no acervo.
* `GET /api/materiais/{id}` — Busca os detalhes de um material específico pelo seu ID.
* `POST /api/materiais/livro` — Cadastra um novo livro no acervo.
* `POST /api/materiais/revista` — Cadastra uma nova revista no acervo.
* `POST /api/materiais/{id}/emprestar` — Realiza o empréstimo de um material disponível.
* `POST /api/materiais/{id}/devolver` — Registra a devolução de um material emprestado.
* `DELETE /api/materiais/{id}` — Remove um material do acervo.

*(Nota: Você também pode utilizar o arquivo `MinhaBiblioteca.http` diretamente no Visual Studio ou VS Code para disparar requisições de teste).*
