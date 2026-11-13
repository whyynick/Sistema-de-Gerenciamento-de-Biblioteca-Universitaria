using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MateriaisController : ControllerBase
{
    private readonly IMaterialRepository  _repository;

    public MateriaisController(IMaterialRepository repository)
    {
        _repository = repository;
    }

[HttpGet]
public IActionResult ListarTodos()
{
    var materiais = _repository.ObterTodos();
    return Ok(materiais);
}

[HttpGet("{id}")]
public IActionResult BuscarMaterial(int id)
{
    var material = _repository.ObterPorId(id);

    if (material == null)
        return NotFound();
    
    return Ok(material);
}

[HttpGet("{id}/descricao")]
public IActionResult MostrarDescricao(int id)
{
    var material = _repository.ObterPorId(id);

    if (material == null)
        return NotFound();
    
    return Ok(new {
        id = material.Id,
        tipo = material.GetType().Name,
        descricao = material.Descricao(),
        PrazoEmprestimo = material.CalcularPrazo()
    });
}

[HttpPost("Livro")]
public IActionResult CriarLivro([FromBody] Livro livro)
{
    if (livro == null)
    {
        return BadRequest("Dados do livro não informados.");
    }

    if (string.IsNullOrWhiteSpace(livro.Titulo))
    {
        return BadRequest("O título do material é obrigatório e não pode conter somente espaços.");
    }

    if (livro.AnoPublicacao < 0)
    {
        return BadRequest("O ano de publicação não pode ser menor que 0.");
    }

    if (string.IsNullOrWhiteSpace(livro.Autor))
    {
        return BadRequest("O autor do livro é obrigatório.");
    }

    if (livro.Paginas <= 0)
    {
        return BadRequest("O número de páginas deve ser maior que 0.");
    }

    var livroCriado = _repository.Adicionar(livro);

    return Created($"/api/Materiais/{livroCriado.Id}", livroCriado);
  
}

[HttpPut("livro/{id}")]
public IActionResult AtualizarLivro(int id, [FromBody] Livro livro)
{
    if (livro == null)
    {
        return BadRequest("Dados do livro não informados.");
    }

    if (string.IsNullOrWhiteSpace(livro.Titulo))
    {
        return BadRequest("O título do material é obrigatório e não pode conter somente espaços.");
    }

    if (livro.AnoPublicacao < 0)
    {
        return BadRequest("O ano de publicação não pode ser menor que 0.");
    }

    if (string.IsNullOrWhiteSpace(livro.Autor))
    {
        return BadRequest("O autor do livro é obrigatório.");
    }

    if (livro.Paginas <= 0)
    {
        return BadRequest("O número de páginas deve ser maior que 0.");
    }

    livro.Id = id;

    var atualizado = _repository.Atualizar(id, livro);

    if (!atualizado)
    {
        return NotFound("Material não encontrado.");
    }

    return Ok(livro);
}

[HttpPost("revista")]
public IActionResult CriarRevista([FromBody] Revista revista)
{

    if (string.IsNullOrWhiteSpace(revista.Titulo))
    return BadRequest("O título da revista é obrigatório.");

    if (revista.AnoPublicacao < 0)
    return BadRequest("O ano de publicação não pode ser menor que 0.");

    if (revista.Edicao <= 0)
    return BadRequest("O número da edição deve ser maior que 0.");

    if (revista.MesPublicacao < 1 || revista.MesPublicacao > 12)
    return BadRequest("O mês de publicação deve estar entre 1 e 12.");

    var criado = _repository.Adicionar(revista);

    return CreatedAtAction(nameof(BuscarMaterial), new{ id = criado.Id}, criado);
}

[HttpPost("{id}/emprestar")]
public IActionResult Emprestar(int id)
{
    var material = _repository.ObterPorId(id);

    if (material == null)
        return NotFound();

    if (material is not IEmprestimo emprestimo)
        return BadRequest("Este material não permite empréstimo.");

    var resultado = emprestimo.Emprestar();

    return Ok(resultado);
}

[HttpPut("revista/{id}")]
public IActionResult AtualizarRevista(int id, [FromBody] Revista revista)
{

    if (string.IsNullOrWhiteSpace(revista.Titulo))
    return BadRequest("O título da revista é obrigatório.");

    if (revista.AnoPublicacao < 0)
    return BadRequest("O ano de publicação não pode ser menor que 0.");

    if (revista.Edicao <= 0)
    return BadRequest("O número da edição deve ser maior que 0.");

    if (revista.MesPublicacao < 1 || revista.MesPublicacao > 12)
    return BadRequest("O mês de publicação deve estar entre 1 e 12.");
    
    bool atualizado = _repository.Atualizar(id, revista);

    if(!atualizado)
        return  NotFound();
    
    return Ok(revista);
}

[HttpDelete("{id}")]
public IActionResult DeletarMaterial(int id)
{
    bool removido = _repository.Remover(id);

    if (!removido)
        return NotFound();
    
    return NoContent();
}

}
