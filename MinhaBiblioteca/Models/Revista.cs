public class Revista : MaterialBiblioteca, IEmprestimo
{
    public int Edicao {get; set;}
    public int MesPublicacao {get; set;} 
    public override int CalcularPrazo()
    {
        return 7;
    }
    public override string Descricao()
    {
        return $" Titulo: {Titulo}, Id: {Id}, Ano de Publicação: {AnoPublicacao?.ToString() ?? "Não Informado"}, Edicão: {Edicao.ToString()}";
    }

}