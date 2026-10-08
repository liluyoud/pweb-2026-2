using MudBlazor;

namespace _06_Admin.Components;

public static class Ui
{
    // mud-{cor}-hover é uma classe utilitária do MudBlazor que aplica o fundo suave da cor da paleta
    public static string FundoSuave(Color cor) => $"mud-{cor.ToString().ToLowerInvariant()}-hover";

    public static string Iniciais(string nome)
    {
        var partes = nome.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return partes.Length switch
        {
            0 => "?",
            1 => partes[0][..1].ToUpperInvariant(),
            _ => $"{partes[0][0]}{partes[^1][0]}".ToUpperInvariant(),
        };
    }
}
