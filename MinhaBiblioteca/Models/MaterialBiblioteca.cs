using System.Text.Json.Serialization;

[JsonDerivedType(typeof(Livro), typeDiscriminator: "livro")]
[JsonDerivedType(typeof(Revista), typeDiscriminator: "revista")]
public abstract class MaterialBiblioteca
{
public int Id { get ; set;}
public string Titulo {get; set;}= string.Empty;
public int? AnoPublicacao {get; set;}
public abstract int CalcularPrazo();
public virtual string Descricao()
    {
        return $" Titulo: {Titulo}, Id: {Id}, Ano de Publicação: {AnoPublicacao?.ToString() ?? "Não Informado"}";
    }
}
