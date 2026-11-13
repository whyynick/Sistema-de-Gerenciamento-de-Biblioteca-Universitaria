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


[HttpPost("revista")]
public IActionResult CriarRevista([FromBody] Revista revista)
{
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