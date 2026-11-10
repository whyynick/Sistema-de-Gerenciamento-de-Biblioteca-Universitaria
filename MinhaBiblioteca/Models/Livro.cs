public class Livro : MaterialBiblioteca, IEmprestimo
{
    public string? Autor {get; set;}
    public int Paginas {get; set;}

    public override int CalcularPrazo()
    {
        return 14;
    }

    public override string Descricao()
    {
        return $" Titulo: {Titulo}, Id: {Id}, Ano de Publicação: {AnoPublicacao?.ToString() ?? "Não Informado"}, Autor: {Autor}, Páginas: {Paginas.ToString()}";
    }

    public string Emprestar()
    {
        return $"Livro emprestado com sucesso. Prazo de {CalcularPrazo()} dias para a devolução";
    }

}