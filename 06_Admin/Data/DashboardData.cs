using MudBlazor;

namespace _06_Admin.Data;

public record Kpi(string Titulo, string Valor, string Variacao, bool Positivo, string Icone, Color Cor, string CorHex, double[] Tendencia);

public record SegmentoCliente(string Nome, int Percentual, Color Cor, string CorHex);

public record ProjetoPerformance(string Nome, string Icone, Color Cor, int Percentual, int TarefasConcluidas, int TarefasTotal);

public record Atividade(string Nome, string Acao, string Tempo, string Icone, Color Cor);

public record ProjetoRecente(string Nome, string Icone, Color Cor, string Cliente, string Responsavel,
                             string Status, Color StatusCor, int Progresso, string Prazo);

public static class DashboardData
{
    public static readonly string[] Periodos = { "Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias", "Personalizado" };

    public static readonly List<Kpi> Kpis = new()
    {
        new("Receita", "R$ 248.500", "+12,5%", true, Icons.Material.Filled.AttachMoney, Color.Success, "#10B981",
            new double[] { 10, 14, 12, 18, 16, 21, 19, 24, 23, 29 }),
        new("Usuários Ativos", "12.842", "+8,2%", true, Icons.Material.Filled.Groups, Color.Secondary, "#7C3AED",
            new double[] { 8, 11, 9, 14, 12, 17, 15, 21, 18, 16 }),
        new("Novos Clientes", "384", "+16,6%", true, Icons.Material.Filled.PeopleAlt, Color.Info, "#3B82F6",
            new double[] { 6, 9, 8, 12, 14, 13, 17, 16, 19, 18 }),
        new("Projetos Ativos", "27", "-2,4%", false, Icons.Material.Filled.Folder, Color.Warning, "#F97316",
            new double[] { 12, 15, 19, 16, 18, 15, 17, 14, 15, 12 }),
    };

    public static readonly string[] Meses = { "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set" };
    public static readonly double[] ReceitaMensal = { 70000, 117000, 112000, 135000, 165000, 168000, 182000, 212000, 248500 };
    public static readonly double[] MetaMensal = { 25000, 45000, 52000, 68000, 95000, 97000, 118000, 152000, 185000 };

    public const int TotalClientes = 1842;

    public static readonly List<SegmentoCliente> SegmentosClientes = new()
    {
        new("Empresas", 42, Color.Primary, "#2563EB"),
        new("Business", 31, Color.Secondary, "#7C3AED"),
        new("Startup", 18, Color.Success, "#10B981"),
        new("Outros", 9, Color.Warning, "#F97316"),
    };

    public static readonly List<ProjetoPerformance> Performance = new()
    {
        new("Website Corporativo", Icons.Material.Outlined.DesktopWindows, Color.Primary, 83, 34, 41),
        new("App Mobile", Icons.Material.Outlined.PhoneIphone, Color.Secondary, 68, 27, 41),
        new("Migração Cloud", Icons.Material.Outlined.Cloud, Color.Success, 92, 46, 50),
        new("Sistema ERP", Icons.Material.Outlined.Storage, Color.Warning, 54, 27, 50),
    };

    public static readonly List<Atividade> Atividades = new()
    {
        new("Mariana Souza", "adicionou um novo cliente", "há 5 minutos", Icons.Material.Filled.ArrowUpward, Color.Primary),
        new("Carlos Lima", "finalizou a revisão Website Corporativo", "há 18 minutos", Icons.Material.Filled.Check, Color.Success),
        new("Ana Martins", "publicou um novo relatório", "há 45 minutos", Icons.Material.Filled.Description, Color.Secondary),
        new("João Silva", "atualizou as permissões do sistema", "há 1 hora", Icons.Material.Filled.Settings, Color.Warning),
    };

    public static readonly List<ProjetoRecente> ProjetosRecentes = new()
    {
        new("Portal Institucional", Icons.Material.Outlined.DesktopWindows, Color.Primary, "TechCorp", "Mariana Souza", "Em andamento", Color.Info, 72, "25 Set"),
        new("Aplicativo Mobile", Icons.Material.Outlined.PhoneIphone, Color.Secondary, "Nova Digital", "Carlos Lima", "Em revisão", Color.Warning, 90, "28 Set"),
        new("Migração Cloud", Icons.Material.Outlined.Cloud, Color.Success, "CloudSystems", "Ana Martins", "Concluído", Color.Success, 100, "20 Set"),
        new("Sistema ERP", Icons.Material.Outlined.Storage, Color.Warning, "Alpha Group", "João Silva", "Em andamento", Color.Info, 48, "15 Out"),
    };
}
