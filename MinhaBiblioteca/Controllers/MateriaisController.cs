[ApiController]
[Route("api/[controller]")]
public class MaterialController : ControllerBase
{
    private readonly IMaterialRepository : _repository;

    public MateriaisController(IMaterialRepository repository)
    {
        _repository = repository;
    }
}