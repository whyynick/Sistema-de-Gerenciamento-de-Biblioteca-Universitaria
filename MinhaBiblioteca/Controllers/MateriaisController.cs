[ApiController]
[Route("api/[controller]")]
public class MaterialController : ControllerBase
{
    private readonly IMaterialRepository  _repository;

    public MateriaisController(IMaterialRepository repository)
    {
        _repository = repository;
    }

[HttpGet("{id}")]
public IActionResult BuscarMaterial(int id)
{
    var material = _repository.ObterPorId(id);

    if (material == null)
        return NotFound();
    
    return Ok(material);
}


[HttpPost("revista")]
public IActionResult CriarRevista([FromBody] Revista revista)
{
    var criado = _repository.Adicionar(revista);

    return CreatedAtAction(nameof(BuscarMaterial), new{ id = criado.Id}, criado);
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