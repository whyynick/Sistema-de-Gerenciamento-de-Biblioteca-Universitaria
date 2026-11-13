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

        const dados = await resposta.json

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

carregarMateriais();