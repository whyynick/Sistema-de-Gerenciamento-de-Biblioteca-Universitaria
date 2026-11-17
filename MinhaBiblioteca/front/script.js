const API_URL = "http://localhost:5147/api/Materiais/"

async function carregarMateriais() {
    const container = document.querySelector("#lista-materiais");

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            container.innerHTML = "<p class= 'text-center text-muted'> Erro ao carregar o acervo. </p>";
            return;
        }

        const materiais = await resposta.json();

        if (materiais.length === 0) {
            container.innerHTML = "<p class= 'text-center text-muted'> Nenhum material cadastrado no acervo.</p>";
            return;
        }

        container.innerHTML = "";

        materiais.forEach(item => {

            const ehLivro = item.autor !== undefined;

            const cardHTML = `
            <article class="col-12 col-md-5">
                <div class="card h-100">
                    <div class="card-body">

                        <span class="badge ${ehLivro ? 'bg-primary' : 'bg-success'} mb-2">
                        ${ehLivro ? 'Livro' : 'Revista'}
                        </span>

                        <h4 class="card-title">${item.titulo}</h4>
                        <p class="card-text text-muted mb-2"> ${item.anoPublicacao ?? 'Não informado'}</p>

                        ${ehLivro ? `<p class="card-text mb-10"><strong>Autor: </strong>${item.autor}<strong>Páginas: </strong>${item.paginas}</p>` : `<p class= "card-text mb-0"><strong>Ediçao: </strong> ${item.edicao} <strong>Mês: </strong> ${item.mesPublicacao}</p>`
                }
                    </div>

                        <div class="card-footer bg-transparent border-top-0 d-flex flex-wrap gap-2">

                            <button class="btn btn-sm btn-outline-info" onclick="consultarDescricao(${item.id})">Detalhes</button>

                            <button class="btn btn-sm btn-outline-warning" onclick="prepararEdicao(${item.id})">Editar</button>

                            <button class="btn btn-sm btn-outline-danger" onclick="excluirMaterial(${item.id})">Excluir</button>

                            <button class="btn btn-sm btn-outline-primary" onclick="realizarEmprestimo(${item.id})">Emprestar</button>

                        </div>
                    </div>
                </article>
            `;
            container.innerHTML += cardHTML;

        });

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        container.innerHTML = "<p class='text-center text-danger'>Não foi possível conectar com o servidor da biblioteca.</p>";
    }

}

async function excluirMaterial(id) {
    const confirmacao = confirm(`Deseja realmente excluir o material #${id}?`)

    if (!confirmacao) return;

    try {
        const resposta = await fetch(`${API_URL}${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Material excluído com sucesso!");
            carregarMateriais();
        } else {
            alert("erro ao excluir o material.");
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro de conexão com o servidor.");
    }
}

async function consultarDescricao(id) {
    try {
        const resposta = await fetch(`${API_URL}${id}/descricao`);

        if (!resposta.ok) {
            alert("Material não encontrado.");
            return;
        }

        const dados = await resposta.json()

        alert(`
            Detalhes do Material:
            Tipo: ${dados.tipo}
            Descrição: ${dados.descricao}
            Prazo de Empréstimo: ${dados.prazoEmprestimo} dias
            `);
    } catch (erro) {
        console.error("Erro ao buscar descrição:", erro);
        alert("Erro ao consultar detalhes.");
    }
}

async function realizarEmprestimo(id) {
    try {
        const resposta = await fetch(`${API_URL}${id}/emprestar`, {
            method: "POST"
        });

        if (resposta.ok) {
            const mensagem = await resposta.text();
            alert(mensagem);
        } else {
            const erroMensagem = await resposta.text();
            alert(erroMensagem)
        }
    } catch (erro) {
        console.error("Erro ao emprestar:", erro);
        alert("Erro de conexão ao tentar emprestar.");
    }
}

function fecharFormulario() {
    const secao = document.querySelector("#secao-formulario");
    secao.classList.add("d-none");
    document.querySelector("#form-material").reset();
    document.querySelector("#form-id").value = "";
}

function abrirFormularioNovo(tipo) {
    document.querySelector("#form-material").reset();
    document.querySelector("#form-id").value = "";
    document.querySelector("#form-tipo").value = tipo;

    const camposLivro = document.querySelector("#campos-livro");
    const camposRevista = document.querySelector("#campos-revista");
    const tituloForm = document.querySelector("#form-titulo");

    if (tipo === "livro") {
        tituloForm.textContent = "Cadastrar Livro";
        camposLivro.classList.remove("d-none");
        camposRevista.classList.add("d-none");
    } else {
        tituloForm.textContent = "Cadastrar Revista";
        camposLivro.classList.add("d-none");
        camposRevista.classList.remove("d-none");
    }

    document.querySelector("#secao-formulario").classList.remove("d-none");
    document.querySelector("#secao-formulario").scrollIntoView({ behavior: "smooth" });
}

async function prepararEdicao(id) {
    try {
        const resposta = await fetch(`${API_URL}${id}`);
        if (!resposta.ok) {
            alert("Erro ao buscar dados do material para edição.");
            return;
        }

        const material = await resposta.json();
        const ehLivro = material.autor !== undefined;
        const tipo = ehLivro ? "livro" : "revista";

        document.querySelector("#form-id").value = material.id;
        document.querySelector("#form-tipo").value = tipo;
        document.querySelector("#campo-titulo").value = material.titulo;
        document.querySelector("#campo-ano").value = material.anoPublicacao;

        const camposLivro = document.querySelector("#campos-livro");
        const camposRevista = document.querySelector("#campos-revista");
        const tituloForm = document.querySelector("#form-titulo");

        if (ehLivro) {
            tituloForm.textContent = `Editar Livro #${material.id}`;
            document.querySelector("#campo-autor").value = material.autor;
            document.querySelector("#campo-paginas").value = material.paginas;
            camposLivro.classList.remove("d-none");
            camposRevista.classList.add("d-none");
        } else {
            tituloForm.textContent = `Editar Revista #${material.id}`;
            document.querySelector("#campo-edicao").value = material.edicao;
            document.querySelector("#campo-mes").value = material.mesPublicacao;
            camposLivro.classList.add("d-none");
            camposRevista.classList.remove("d-none");
        }

        document.querySelector("#secao-formulario").classList.remove("d-none");
        document.querySelector("#secao-formulario").scrollIntoView({ behavior: "smooth" });

    } catch (erro) {
        console.error("Erro ao carregar edição:", erro);
        alert("Erro de conexão ao buscar dados.");
    }
}

async function salvarMaterial(event) {
    event.preventDefault();

    const id = document.querySelector("#form-id").value;
    const tipo = document.querySelector("#form-tipo").value;
    const titulo = document.querySelector("#campo-titulo").value.trim();
    const ano = parseInt(document.querySelector("#campo-ano").value);

    if (!titulo) {
        alert("O título é obrigatório.");
        return;
    }
    if (ano < 0) {
        alert("Ano de publicação inválido.");
        return;
    }

    let dados = {
        titulo: titulo,
        anoPublicacao: ano
    };

    let url = "";
    let metodo = id ? "PUT" : "POST";

    if (tipo === "livro") {
        const autor = document.querySelector("#campo-autor").value.trim();
        const paginas = parseInt(document.querySelector("#campo-paginas").value);

        if (!autor) {
            alert("O autor do livro é obrigatório.");
            return;
        }
        if (paginas <= 0 || isNaN(paginas)) {
            alert("Número de páginas deve ser maior que 0.");
            return;
        }

        dados.autor = autor;
        dados.paginas = paginas;
        url = id ? `${API_URL}livro/${id}` : `${API_URL}livro`;

    } else {
        const edicao = parseInt(document.querySelector("#campo-edicao").value);
        const mes = parseInt(document.querySelector("#campo-mes").value);

        if (edicao <= 0 || isNaN(edicao)) {
            alert("Número da edição deve ser maior que 0.");
            return;
        }
        if (mes < 1 || mes > 12 || isNaN(mes)) {
            alert("O mês deve ser entre 1 e 12.");
            return;
        }

        dados.edicao = edicao;
        dados.mesPublicacao = mes;
        url = id ? `${API_URL}revista/${id}` : `${API_URL}revista`;
    }

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert(id ? "Material atualizado com sucesso!" : "Material cadastrado com sucesso!");
            fecharFormulario();
            carregarMateriais();
        } else {
            const erroMsg = await resposta.text();
            alert("Erro da API: " + erroMsg);
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro de conexão ao tentar salvar o material.");
    }
}

carregarMateriais();