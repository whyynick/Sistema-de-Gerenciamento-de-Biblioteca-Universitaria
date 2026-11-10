public class MaterialRepository : IMaterialRepository
{    
    private static Dictionary<int, MaterialBiblioteca>_materiais = new();  

    private int GerarNovoId()
    {
        return _materiais.Count + 1;
    }

    public IEnumerable<MaterialBiblioteca> ObterTodos()
    {
        return _materiais.Values;
    }
    
    public MaterialBiblioteca? ObterPorId(int id)
    {
        if (!_materiais.ContainsKey(id))
        {
            return null;
        }
        return _materiais[id];
    }

    public MaterialBiblioteca Adicionar(MaterialBiblioteca material)
    {
        material.Id = GerarNovoId();

        _materiais.Add(material.Id, material);

        return material;
    }

    public bool Atualizar(int id, MaterialBiblioteca material)
    {
        if (!_materiais.ContainsKey(id))
            return false;

        material.Id = id;

        _materiais[id] = material;

        return true;
    }

    public bool Remover(int id)
    {
        if (!_materiais.ContainsKey(id))
        {
            return false;
        }
        _materiais.Remove(id);
        return true;
    }

}