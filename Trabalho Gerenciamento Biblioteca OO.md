# Trabalho: Sistema de Gerenciamento de Biblioteca Universitária

## CRUD com Herança, Polimorfismo, Repository, Singleton e Interfaces

**Integrantes (máximo 4):**

1. 
2. 
3. 
4. 

**Curso:** Engenharia de Software · **Disciplina:** Programação Orientada a Objetos  
**Tecnologias:** C#, ASP.NET Core Web API (.NET 10) e Swagger  
**Base teórica:** Aulas 06, 07, 08 e 09 · **Valor:** 2,0 pontos  
**Formato:** em equipe de **até 4 pessoas**  
**Entrega:** link do repositório com o projeto enviado no google ClassRoom· **Testes:** executados pelo Swagger

> **Atenção:** este documento apresenta os requisitos e orientações do sistema. O código deve ser desenvolvido pela equipe. 

---

## Como iniciar o projeto

Crie o projeto Web API com Controllers e sem o OpenAPI padrão:

```bash
dotnet new webapi -n MinhaBiblioteca --use-controllers --no-openapi
```

Entre na pasta do projeto:

```bash
cd MinhaBiblioteca
```

Adicione o pacote do Swagger:

```bash
dotnet package add swashbuckle.aspnetcore
```

---

## 1. Contexto do problema

A **Biblioteca Universitária** possui livros e revistas utilizados pelos estudantes e professores. Atualmente, parte do controle do acervo é realizada manualmente, o que dificulta saber quais materiais estão cadastrados, quais informações estão corretas e quais itens podem ser emprestados.

Entre os problemas encontrados estão:

- materiais cadastrados com informações incompletas;
- dificuldade para localizar um material pelo código;
- registros que precisam ser atualizados quando alguma informação muda;
- materiais que já não fazem parte do acervo continuam cadastrados;
- dificuldade para diferenciar os tipos de material e suas características;
- necessidade de tratar de maneira diferente materiais que possuem regras específicas de empréstimo.

A biblioteca precisa de um sistema simples que permita **cadastrar, consultar, atualizar e excluir materiais do acervo**.

Existem **dois tipos de material**:

| Tipo | O que é | Comportamento específico |
|---|---|---|
| **Livro** | Obra completa utilizada para estudo, pesquisa ou leitura | Possui autor, número de páginas e prazo padrão de empréstimo de 14 dias |
| **Revista** | Publicação periódica utilizada para consulta | Possui edição e mês de publicação e prazo padrão de empréstimo de 7 dias |

Cada tipo de material deve possuir seus próprios dados e comportamento, utilizando **herança e polimorfismo**.

Além disso, somente o material que possuir a capacidade de empréstimo deverá implementar a interface `IEmprestimo`.

**Sua missão:** desenvolver uma **Web API de gerenciamento de biblioteca** que permita realizar o CRUD dos materiais, utilizando os conceitos estudados nas Aulas 06, 07, 08 e 09.

> **Sobre a página web:** não será necessário desenvolver frontend neste trabalho. A API será testada pelo Swagger. A interface web será desenvolvida na disciplina de Desenvolvimento WEB.

---

## 2. Objetivos

### 2.1. Objetivo geral

Construir uma Web API de **gerenciamento de biblioteca**, permitindo cadastrar, listar, buscar, atualizar e excluir materiais do acervo, utilizando **herança, abstração, polimorfismo, interface, Repository Pattern, injeção de dependência e Singleton**.

### 2.2. Objetivos de aprendizagem

Ao concluir o trabalho, você deverá ser capaz de aplicar os conceitos estudados:

- **Herança** para que os tipos de material reaproveitem características comuns (Aula 07).
- **Encapsulamento** para proteger os dados e controlar alterações (Aula 07).
- **Classe abstrata** para representar o conceito geral de material da biblioteca (Aula 08).
- `abstract`, `virtual` e `override` para definir e especializar comportamentos (Aula 08).
- **Polimorfismo** para trabalhar com diferentes materiais por meio da classe-base (Aula 08).
- **Interface** para representar uma capacidade específica de um material (Aula 08).
- **Repository Pattern** para separar o acesso aos dados da Controller (Aula 09).
- **Injeção de dependência** para a Controller receber o repositório pelo construtor (Aula 09).
- **Singleton** para manter a mesma instância do repositório durante a execução da aplicação (Aula 09).
- **Dictionary** para armazenar os materiais em memória.
- **Controller, rotas e códigos HTTP** para disponibilizar a API.
- **Swagger** para testar os endpoints.
- **CORS** para deixar a API preparada para ser consumida por uma página web.


---

## 3. Requisitos do sistema

### 3.1. Requisitos funcionais

| Código | Requisito | O que o sistema deve fazer |
|---|---|---|
| RF01 | Listar materiais | Retornar todos os materiais cadastrados |
| RF02 | Buscar material | Retornar um material pelo ID |
| RF03 | Cadastrar livro | Inserir um novo livro |
| RF04 | Cadastrar revista | Inserir uma nova revista |
| RF05 | Atualizar livro | Alterar os dados de um livro existente |
| RF06 | Atualizar revista | Alterar os dados de uma revista existente |
| RF07 | Excluir material | Remover um material pelo ID |
| RF08 | Informar o tipo | A resposta deve informar se é Livro ou Revista |
| RF09 | Informar descrição | Cada tipo deve fornecer sua própria descrição |
| RF10 | Informar prazo | O prazo deve ser calculado de acordo com o tipo do material |

### 3.2. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | O título do material é obrigatório e não pode ser vazio ou conter somente espaços. |
| RN02 | O ano de publicação não pode ser menor que 0. |
| RN03 | O ID é gerado pelo sistema e não deve ser informado manualmente pelo usuário no cadastro. |
| RN04 | Livro deve possuir autor informado. |
| RN05 | O número de páginas de um livro deve ser maior que 0. |
| RN06 | Revista deve possuir número de edição maior que 0. |
| RN07 | O mês de publicação da revista deve estar entre 1 e 12. |
| RN08 | O livro possui prazo padrão de empréstimo de 14 dias. |
| RN09 | A revista possui prazo padrão de empréstimo de 7 dias. |
| RN10 | O prazo específico de cada tipo deve ser calculado dentro da respectiva classe, e não na Controller. |

### 3.3. Requisitos não funcionais

- Os dados ficarão somente em memória.
- Não será utilizado banco de dados.
- Não será necessário sistema de login.
- Não será necessário autenticação.
- A Controller não deve acessar o `Dictionary` diretamente.
- A Controller deve utilizar a interface do Repository.
- O Repository será registrado como Singleton.
- O código deve estar organizado nas pastas indicadas.
- A API deverá ser testada pelo Swagger.
- O projeto deverá utilizar C# e ASP.NET Core Web API (.NET 10).


---

## 4. O que você vai reaproveitar das aulas

Este trabalho utiliza diretamente os conteúdos apresentados nas Aulas 06, 07, 08 e 09.

| O que você vai fazer | Onde foi estudado |
|---|---|
| Criar projeto Web API | Aula 06 |
| Criar Controller | Aula 06 |
| Criar modelos | Aula 06 |
| Usar GET, POST, PUT e DELETE | Aula 06 |
| Testar pelo Swagger | Aula 06 |
| Criar classe-base | Aula 07 |
| Criar classes filhas | Aula 07 |
| Trabalhar com herança | Aula 07 |
| Utilizar encapsulamento | Aula 07 |
| Criar classe abstrata | Aula 08 |
| Usar `abstract` | Aula 08 |
| Usar `virtual` e `override` | Aula 08 |
| Aplicar polimorfismo | Aula 08 |
| Criar interface | Aula 08 |
| Usar `is not` | Aula 08 |
| Criar Repository | Aula 09 |
| Criar interface do Repository | Aula 09 |
| Utilizar injeção de dependência | Aula 09 |
| Registrar Singleton | Aula 09 |
| Configurar CORS | Aula 09 |
A Aula 08 apresenta a ideia de uma classe abstrata reunindo características comuns e deixando cada classe filha implementar seu próprio comportamento. O mesmo princípio será aplicado aqui aos materiais da biblioteca.

Na Aula 09, o Repository é utilizado para separar o acesso aos dados da Controller, e o Singleton mantém uma única instância do serviço durante a execução da aplicação.

---

## 5. Estrutura do projeto

Organize o projeto da seguinte maneira:

```text
BibliotecaApi/
│
├── Controllers/
│   └── MateriaisController.cs
│
├── Models/
│   ├── MaterialBiblioteca.cs
│   ├── Livro.cs
│   ├── Revista.cs
│   └── IEmprestimo.cs
│
├── Repositories/
│   ├── IMaterialRepository.cs
│   └── MaterialRepository.cs
│
└── Program.cs
```

Não é necessário criar outras pastas.

---

## 6. Modelo de classes

A estrutura principal deverá seguir este modelo:

```text
                         MaterialBiblioteca
                         (classe abstrata)
                    ┌──────────────────────┐
                    │ Id                   │
                    │ Titulo               │
                    │ AnoPublicacao        │
                    │ CalcularPrazo()      │
                    │ Descricao()          │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
              ┌─────▼─────┐          ┌────▼──────┐
              │   Livro    │          │  Revista  │
              ├───────────┤          ├───────────┤
              │ Autor     │          │ Edicao    │
              │ Paginas   │          │ Mes       │
              └─────┬─────┘          └───────────┘
                    │
                    │ implementa
                    ▼
              ┌──────────────┐
              │IEmprestimo  │
              ├──────────────┤
              │Emprestar()  │
              └──────────────┘
```

### Relação entre as classes

- `MaterialBiblioteca` é a classe abstrata.
- `Livro` herda de `MaterialBiblioteca`.
- `Revista` herda de `MaterialBiblioteca`.
- `Livro` também implementa `IEmprestimo`.
- O Repository trabalha com `MaterialBiblioteca`, permitindo armazenar livros e revistas no mesmo `Dictionary`.

---

## 7. Classe abstrata `MaterialBiblioteca`

Crie:

```text
Models/MaterialBiblioteca.cs
```

A classe deverá possuir:

- `Id`;
- `Titulo`;
- `AnoPublicacao`;
- um método abstrato `CalcularPrazo()`;
- um método virtual `Descricao()`.

Você deverá escrever a implementação completa da classe utilizando `abstract` e `virtual`, conforme estudado na Aula 08.

### O que deve ser observado

`MaterialBiblioteca` é `abstract`, portanto não deve ser criada diretamente com `new`.

O método:

```csharp
public abstract int CalcularPrazo();
```

obriga cada classe filha a definir seu próprio prazo.

O método:

```csharp
public virtual string Descricao()
```

possui uma implementação padrão, mas pode ser sobrescrito pelas classes filhas.

Essa estrutura segue o mesmo princípio apresentado na Aula 08: uma classe-base reúne o que é comum e as classes concretas implementam seus comportamentos específicos.

---

## 8. Interface `IEmprestimo`

Crie:

```text
Models/IEmprestimo.cs
```

Crie a interface `IEmprestimo` para representar a capacidade de um material ser emprestado.

A interface deverá possuir o método `Emprestar()`. Você deverá escrever a implementação completa.

A interface representa uma capacidade específica.

Neste trabalho, o `Livro` deverá implementar `IEmprestimo`.

A `Revista` não precisa implementar essa interface.

Isso permitirá demonstrar a verificação:

```csharp
material is not IEmprestimo
```

da mesma forma que foi apresentado na Aula 08 com a interface `IRecuperavel`.

---

## 9. Classe `Livro`

Crie:

```text
Models/Livro.cs
```

O livro deverá:

- herdar de `MaterialBiblioteca`;
- implementar `IEmprestimo`;
- possuir `Autor`;
- possuir `Paginas`;
- sobrescrever `CalcularPrazo()`;
- sobrescrever `Descricao()`;
- implementar `Emprestar()`.

Você deverá escrever a classe completa.

Requisitos:
- herdar de `MaterialBiblioteca`;
- implementar `IEmprestimo`;
- possuir `Autor` e `Paginas`;
- implementar `CalcularPrazo()` com 14 dias;
- sobrescrever `Descricao()`;
- implementar `Emprestar()`.

Não será fornecido o código pronto da classe.

### O que está sendo avaliado

Neste modelo aparecem:

- herança;
- implementação de interface;
- `override`;
- polimorfismo;
- método específico da classe;
- reutilização do método `CalcularPrazo()`.

---

## 10. Classe `Revista`

Crie:

```text
Models/Revista.cs
```

A revista deverá:

- herdar de `MaterialBiblioteca`;
- possuir `Edicao`;
- possuir `MesPublicacao`;
- sobrescrever `CalcularPrazo()`;
- sobrescrever `Descricao()`.

Você deverá escrever a classe completa.

Requisitos:
- herdar de `MaterialBiblioteca`;
- possuir `Edicao` e `MesPublicacao`;
- implementar `CalcularPrazo()` com 7 dias;
- sobrescrever `Descricao()`;
- não implementar `IEmprestimo`.

Não será fornecido o código pronto da classe.

A `Revista` não implementa `IEmprestimo`.

---

## 11. Onde está o polimorfismo?

O Repository deverá trabalhar com:

```csharp
Dictionary<int, MaterialBiblioteca>
```

Isso significa que o mesmo dicionário poderá armazenar:

```csharp
Livro
Revista
```

mesmo sendo objetos de classes diferentes.

Quando a Controller fizer:

```csharp
material.CalcularPrazo()
```

o C# executará a implementação correspondente ao objeto real.

Se for um:

```text
Livro → 14 dias
```

Se for uma:

```text
Revista → 7 dias
```

A Controller não deverá fazer:

```csharp
if (material is Livro)
{
    // 14
}
else if (material is Revista)
{
    // 7
}
```

O cálculo deverá permanecer dentro das classes.

Esse é o ponto principal do polimorfismo: uma mesma chamada pode produzir comportamentos diferentes conforme o objeto armazenado. A Aula 08 apresenta exatamente esse princípio ao trabalhar com objetos diferentes armazenados pelo tipo-base e chamar o mesmo método.

---

## 12. Repository

Crie a pasta:

```text
Repositories
```

Dentro dela, crie:

```text
IMaterialRepository.cs
MaterialRepository.cs
```

### 12.1. Interface `IMaterialRepository`

A interface deverá possuir as operações:

```csharp
IEnumerable<MaterialBiblioteca> ObterTodos();

MaterialBiblioteca? ObterPorId(int id);

MaterialBiblioteca Adicionar(MaterialBiblioteca material);

bool Atualizar(int id, MaterialBiblioteca material);

bool Remover(int id);
```

A interface define o que o Repository sabe fazer, sem informar à Controller como os dados são armazenados.

---

## 13. `MaterialRepository`

O Repository deverá possuir um:

```csharp
Dictionary<int, MaterialBiblioteca>
```

privado.

Crie um `Dictionary<int, MaterialBiblioteca>` privado e cadastre pelo menos um `Livro` e uma `Revista` para facilitar os testes.

Os materiais iniciais ficam a critério da equipe, desde que respeitem as regras do trabalho. O uso do tipo-base no Dictionary é obrigatório para demonstrar polimorfismo.

### Geração de ID

O Repository deverá gerar os IDs.

Crie uma estratégia de geração de IDs que não repita um ID após uma exclusão. O ID deve ser atribuído pelo Repository no momento do cadastro.

Não utilize:

```csharp
_materiais.Count + 1
```

como única estratégia para gerar ID, pois após excluir um material podem ocorrer IDs repetidos.

Para gerar o ID, crie dentro do `MaterialRepository` o seguinte método privado:

```csharp
private int GerarNovoId()
{
    if (_materiais.Count == 0)
        return 1;

    return _materiais.Keys.Max() + 1;
}
```

Como colocar:

1. Declare o método dentro da classe `MaterialRepository`, junto com o `Dictionary` privado.
2. Adicione `using System.Linq;` (necessário para o `Max()`), caso o projeto não tenha os *implicit usings* ativados.
3. No método `Adicionar()`, chame `GerarNovoId()` para obter o ID, atribua-o ao material e só depois coloque o objeto no dicionário.

---

## 14. Métodos do Repository

### `ObterTodos()`

Deve retornar:

```csharp
_materiais.Values
```

### `ObterPorId(int id)`

Deve verificar se o ID existe.

Se não existir:

```csharp
return null;
```

### `Adicionar()`

Deve:

1. gerar o ID;
2. colocar o objeto no dicionário;
3. retornar o material cadastrado.

### `Atualizar()`

Deve:

1. verificar se o ID existe;
2. manter o ID recebido na URL;
3. substituir o objeto no dicionário;
4. retornar `true`.

Caso não exista:

```csharp
return false;
```

### `Remover()`

Deve utilizar:

```csharp
_materiais.Remove(id)
```

e retornar o resultado.

---

## 15. Controller

Crie:

```text
Controllers/MateriaisController.cs
```

A Controller deverá receber `IMaterialRepository` por injeção de dependência. Você deverá escrever o campo privado e o construtor.

Não faça:

```csharp
private static Dictionary<int, MaterialBiblioteca> _materiais;
```

na Controller.

Também não faça:

```csharp
new MaterialRepository()
```

dentro da Controller.

A Controller deverá conversar somente com:

```text
IMaterialRepository
```

Essa separação é justamente o objetivo do Repository Pattern estudado na Aula 09.

---

## 16. Endpoints obrigatórios

A API deverá possuir as seguintes rotas:

| Método | URL | Função | Resposta esperada |
|---|---|---|---|
| GET | `/api/Materiais` | Lista todos | `200 OK` |
| GET | `/api/Materiais/{id}` | Busca por ID | `200 OK` ou `404` |
| POST | `/api/Materiais/livro` | Cadastra livro | `201 Created` |
| POST | `/api/Materiais/revista` | Cadastra revista | `201 Created` |
| PUT | `/api/Materiais/livro/{id}` | Atualiza livro | `200 OK` ou `404` |
| PUT | `/api/Materiais/revista/{id}` | Atualiza revista | `200 OK` ou `404` |
| DELETE | `/api/Materiais/{id}` | Exclui material | `204 No Content` ou `404` |
| GET | `/api/Materiais/{id}/descricao` | Mostra descrição e prazo | `200 OK` |
| POST | `/api/Materiais/{id}/emprestar` | Tenta realizar empréstimo | `200 OK`, `400` ou `404` |

---

## 17. Cadastro de livro

O endpoint:

```text
POST /api/Materiais/livro
```

deverá receber diretamente um objeto `Livro`.

Exemplo:

```json
{
    "titulo": "O Programador Pragmático",
    "anoPublicacao": 1999,
    "autor": "Andrew Hunt",
    "paginas": 352
}
```

O `Id` não deverá ser informado.

O Repository deverá gerar o ID.

Resposta esperada:

```json
{
    "id": 3,
    "titulo": "O Programador Pragmático",
    "anoPublicacao": 1999,
    "autor": "Andrew Hunt",
    "paginas": 352
}
```

---

## 18. Cadastro de revista

O endpoint:

```text
POST /api/Materiais/revista
```

deverá receber diretamente um objeto `Revista`.

Exemplo:

```json
{
    "titulo": "Revista de Tecnologia",
    "anoPublicacao": 2026,
    "edicao": 20,
    "mesPublicacao": 11
}
```

O `Id` também deverá ser gerado pelo sistema.

---

## 19. Atualização

Para atualizar um livro:

```text
PUT /api/Materiais/livro/1
```

Para atualizar uma revista:

```text
PUT /api/Materiais/revista/2
```

O ID da URL deverá prevalecer sobre qualquer ID enviado no JSON.

O ID informado na URL deverá prevalecer sobre qualquer ID enviado no corpo da requisição.

Se o material não existir:

```text
404 Not Found
```

---

## 20. Exclusão

Para excluir:

```text
DELETE /api/Materiais/1
```

Se o material existir:

```text
204 No Content
```

Se não existir:

```text
404 Not Found
```

---

## 21. Endpoint de descrição e polimorfismo

Crie:

```text
GET /api/Materiais/{id}/descricao
```

A Controller deverá buscar o material no Repository e utilizar os métodos da classe-base:

```csharp
material.Descricao();
material.CalcularPrazo();
```

A resposta deverá ser semelhante a:

```json
{
    "id": 1,
    "tipo": "Livro",
    "descricao": "Livro: Clean Code - Autor: Robert C. Martin",
    "prazoEmprestimo": 14
}
```

Para uma revista:

```json
{
    "id": 2,
    "tipo": "Revista",
    "descricao": "Revista: Tecnologia e Inovação - Edição: 15",
    "prazoEmprestimo": 7
}
```

Observe que a Controller chama:

```csharp
material.CalcularPrazo()
```

nos dois casos.

Ela não precisa saber qual fórmula ou regra está dentro de cada classe.

---

## 22. Endpoint de empréstimo e interface

Crie:

```text
POST /api/Materiais/{id}/emprestar
```

O objetivo deste endpoint é demonstrar a utilização da interface `IEmprestimo`.

Fluxo:

1. buscar o material;
2. verificar se existe;
3. verificar se implementa `IEmprestimo`;
4. se implementar, chamar `Emprestar()`;
5. se não implementar, retornar `400 Bad Request`.

Você deverá implementar esse fluxo na Controller utilizando `is not`:

1. buscar o material;
2. verificar se existe;
3. verificar se implementa `IEmprestimo`;
4. chamar `Emprestar()` quando for possível;
5. retornar `400 Bad Request` quando não possuir a capacidade.

### Resultado

Para um livro:

```text
200 OK
```

com uma mensagem semelhante a:

```text
O livro 'Clean Code' pode ser emprestado por 14 dias.
```

Para uma revista:

```text
400 Bad Request
```

pois `Revista` não implementa `IEmprestimo`.

Esse teste demonstra que uma interface representa uma capacidade específica e que a Controller pode verificar em tempo de execução se o objeto possui essa capacidade. Esse é o mesmo princípio apresentado na Aula 08 com `is not`.

---

## 23. Validações

As validações devem ser realizadas na Controller antes de enviar os dados ao Repository.

### Material

Verifique na Controller se o título é obrigatório e não pode conter somente espaços.

Também valide:

```text
AnoPublicacao >= 0
```

### Livro

Verifique:

```text
Autor não vazio
Paginas > 0
```

### Revista

Verifique:

```text
Edicao > 0
MesPublicacao entre 1 e 12
```

Para cada regra inválida, retorne `400 Bad Request` com uma mensagem adequada. Você deverá escrever as condições de validação.

Não é necessário criar classes de validação, serviços extras ou DTOs.

A ideia é manter a atividade compatível com o nível dos conteúdos estudados.

---

## 24. Program.cs

No `Program.cs`, mantenha a configuração da Web API e do Swagger apresentada na Aula 06.

Registre `IMaterialRepository` e `MaterialRepository` como Singleton. A configuração deverá ser escrita pela equipe com base na Aula 09.

A Aula 09 utiliza exatamente esse mecanismo para registrar uma interface e sua implementação com `AddSingleton`.

---

## 25. CORS

Configure CORS para permitir que uma página web possa consumir a API futuramente.

Utilize uma política simples:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

Depois:

```csharp
app.UseCors("PermitirFrontend");
```

A configuração segue o modelo apresentado na Aula 09.

> Não é necessário criar o frontend neste trabalho. O CORS será configurado para deixar a API preparada para consumo externo.

---

## 26. Swagger

O projeto deverá disponibilizar o Swagger.

Utilize o Swagger para testar todos os endpoints.

A Aula 06 apresenta o Swagger como interface visual para chamar os endpoints e visualizar as respostas da API.

Execute o projeto e acesse:

```text
https://localhost:PORTA/swagger
```

Substitua `PORTA` pela porta apresentada pela aplicação.

---

## 27. Testes obrigatórios

Você deverá realizar pelo menos os seguintes testes no Swagger:

| Nº | Teste | Resultado esperado |
|---|---|---|
| 1 | `GET /api/Materiais` | Lista os materiais |
| 2 | `GET /api/Materiais/1` | Retorna o material 1 |
| 3 | `GET /api/Materiais/999` | `404 Not Found` |
| 4 | POST livro válido | `201 Created` |
| 5 | POST revista válida | `201 Created` |
| 6 | POST livro sem título | `400 Bad Request` |
| 7 | POST livro com páginas 0 | `400 Bad Request` |
| 8 | POST revista com edição 0 | `400 Bad Request` |
| 9 | POST revista com mês 13 | `400 Bad Request` |
| 10 | PUT livro existente | `200 OK` |
| 11 | PUT revista existente | `200 OK` |
| 12 | PUT material inexistente | `404 Not Found` |
| 13 | DELETE material existente | `204 No Content` |
| 14 | DELETE material inexistente | `404 Not Found` |
| 15 | GET descrição de livro | Mostra descrição e 14 dias |
| 16 | GET descrição de revista | Mostra descrição e 7 dias |
| 17 | POST empréstimo de livro | `200 OK` |
| 18 | POST empréstimo de revista | `400 Bad Request` |
| 19 | Cadastrar vários materiais | IDs diferentes |
| 20 | Excluir e cadastrar outro material | ID novo não deve ser repetido |

---

## 28. Teste do polimorfismo

Este teste é obrigatório.

Cadastre pelo menos:

```text
1 Livro
1 Revista
```

Depois execute:

```text
GET /api/Materiais
```

A resposta deverá apresentar materiais de tipos diferentes.

Depois execute:

```text
GET /api/Materiais/1/descricao
```

e:

```text
GET /api/Materiais/2/descricao
```

Verifique que:

```text
Livro → prazo 14 dias
Revista → prazo 7 dias
```

A Controller deverá fazer a mesma chamada:

```csharp
material.CalcularPrazo()
```

sem criar um `if` para cada tipo.

---

## 29. Teste da interface

Execute:

```text
POST /api/Materiais/1/emprestar
```

se o ID 1 for um livro.

Resultado esperado:

```text
200 OK
```

Depois execute:

```text
POST /api/Materiais/2/emprestar
```

se o ID 2 for uma revista.

Resultado esperado:

```text
400 Bad Request
```

Isso demonstra que o código consegue verificar se o objeto implementa:

```csharp
IEmprestimo
```

---

## 30. Teste do Singleton

Faça o seguinte:

1. Cadastre um novo livro.
2. Execute `GET /api/Materiais`.
3. Verifique que o livro aparece.
4. Execute outro endpoint.
5. Execute novamente `GET /api/Materiais`.
6. Verifique que o livro continua cadastrado.

Isso acontece porque o Repository está registrado como Singleton e mantém o mesmo dicionário durante a execução da aplicação.

> Ao fechar e iniciar novamente a aplicação, os dados podem voltar aos dados iniciais, pois não existe banco de dados neste trabalho.

A Aula 09 reforça que Singleton não é banco de dados e que dados mantidos apenas em memória são perdidos quando a aplicação é encerrada.

---

## 31. O que não precisa fazer

Para manter o trabalho simples e dentro do conteúdo estudado, **não será necessário**:

- Login;
- autenticação;
- JWT;
- usuários;
- senha;
- DTO;
- Entity Framework;
- banco de dados;
- migrations;
- frontend;
- Angular;
- React;
- React Native;
- arquitetura em várias camadas;
- serviços complexos;
- sistema de multas;
- sistema completo de empréstimos;
- cadastro de leitores.

O foco é:

```text
C#
   ↓
Herança
   ↓
Abstração
   ↓
Polimorfismo
   ↓
Interface
   ↓
Repository
   ↓
Singleton
   ↓
Web API
   ↓
Swagger
```

---

## 32. O que será avaliado

Valor total: **2,0 pontos**

| Critério | Valor |
|---|---:|
| Herança e organização das classes | 0,4 |
| Classe abstrata, `abstract`, `virtual`, `override` e polimorfismo | 0,5 |
| Interface e utilização de `is not` | 0,3 |
| Repository Pattern e `Dictionary` | 0,3 |
| Injeção de dependência e Singleton | 0,2 |
| CRUD e códigos HTTP | 0,2 |
| Validações e organização do código | 0,1 |
| **Total** | **2,0** |

---

## 33. Entrega

A equipe deverá entregar:

1. Link do repositório Git.
2. Projeto completo funcionando.
3. Código-fonte da Web API.
4. README explicando como executar o projeto.
5. Lista dos integrantes.
6. Evidências dos testes realizados no Swagger.

### README

O `README.md` deverá conter, no mínimo:

```text
Nome do projeto

Integrantes

Descrição do sistema

Tecnologias utilizadas

Como executar

Principais endpoints

Exemplos de testes
```

---

## 34. Organização do código

A estrutura final deverá ser semelhante a:

```text
BibliotecaApi/
│
├── Controllers/
│   └── MateriaisController.cs
│
├── Models/
│   ├── MaterialBiblioteca.cs
│   ├── Livro.cs
│   ├── Revista.cs
│   └── IEmprestimo.cs
│
├── Repositories/
│   ├── IMaterialRepository.cs
│   └── MaterialRepository.cs
│
├── Program.cs
│
└── README.md
```

Não é necessário criar arquivos adicionais sem necessidade.

---

## 35. Checklist antes da entrega

### Modelos

- [ ] Existe uma classe abstrata `MaterialBiblioteca`.
- [ ] `Livro` herda de `MaterialBiblioteca`.
- [ ] `Revista` herda de `MaterialBiblioteca`.
- [ ] `Livro` implementa `IEmprestimo`.
- [ ] `Revista` não implementa `IEmprestimo`.
- [ ] Existe pelo menos um método `abstract`.
- [ ] Existe pelo menos um método `virtual`.
- [ ] As classes filhas utilizam `override`.
- [ ] Existe comportamento diferente para Livro e Revista.

### Repository

- [ ] Existe `IMaterialRepository`.
- [ ] Existe `MaterialRepository`.
- [ ] Existe `Dictionary<int, MaterialBiblioteca>`.
- [ ] O dicionário é privado.
- [ ] O Repository possui CRUD.
- [ ] O ID é gerado pelo sistema.

### Controller

- [ ] A Controller recebe `IMaterialRepository` no construtor.
- [ ] A Controller não cria `new MaterialRepository()`.
- [ ] A Controller não acessa o Dictionary diretamente.
- [ ] Existem GET, POST, PUT e DELETE.
- [ ] Existem códigos HTTP adequados.
- [ ] O polimorfismo é utilizado.
- [ ] A interface `IEmprestimo` é verificada com `is not`.

### Program.cs

- [ ] Controllers configurados.
- [ ] Swagger funcionando.
- [ ] Repository registrado como Singleton.
- [ ] CORS configurado.

### Testes

- [ ] Livro cadastrado.
- [ ] Revista cadastrada.
- [ ] Livro atualizado.
- [ ] Revista atualizada.
- [ ] Material consultado.
- [ ] Material excluído.
- [ ] Validações testadas.
- [ ] Polimorfismo testado.
- [ ] Interface testada.
- [ ] Singleton testado.

---

## 36. Resumo do trabalho

Neste trabalho, você deverá construir uma Web API de gerenciamento de biblioteca utilizando os conceitos estudados em aula.

A estrutura principal será:

```text
MaterialBiblioteca
        │
        ├───────────────┐
        │               │
      Livro           Revista
        │
        │
IEmprestimo
```

O Repository armazenará os objetos em:

```csharp
Dictionary<int, MaterialBiblioteca>
```

A Controller receberá:

```csharp
IMaterialRepository
```

por injeção de dependência.

O `Program.cs` registrará:

```csharp
AddSingleton
```

e a API será testada pelo:

```text
Swagger
```

O objetivo principal é demonstrar que você consegue utilizar **herança, abstração, polimorfismo, interface, Repository, Singleton e Web API** em uma solução simples e organizada.

---

## 37. Importante

O foco é compreender como os conceitos de Orientação a Objetos e os padrões estudados podem ser utilizados juntos em uma Web API simples e organizada.
