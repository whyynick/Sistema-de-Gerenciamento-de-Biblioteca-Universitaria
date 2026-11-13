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
            return $"Livro: {Titulo} - Autor: {Autor}";
    }

    public string Emprestar()
    {
        return $"Livro emprestado com sucesso. Prazo de {CalcularPrazo()} dias para a devolução";
    }

}