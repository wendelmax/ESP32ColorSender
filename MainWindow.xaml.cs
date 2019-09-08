using System.Windows;
using System.Net;

namespace ESP32ColorSender
{
    /// <summary>
    /// Interação lógica para MainWindow.xam
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void EnviarESP(object sender, RoutedEventArgs e)
        {
            try
            {
                WebClient webClient = new WebClient();
                webClient.QueryString.Add("R", picker.SelectedColor.Value.R.ToString());
                webClient.QueryString.Add("G", picker.SelectedColor.Value.G.ToString());
                webClient.QueryString.Add("B", picker.SelectedColor.Value.B.ToString());
                string resposta = webClient.DownloadString("http://192.168.4.1");
                MessageBox.Show(resposta,"Resposta ESPColorReceiver",MessageBoxButton.OK,MessageBoxImage.Information);
            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message+"\n\nVerifique se:\n1 - Sua placa ESP32 está conectada.\n2 - Sender e receiver devem estar na mesma rede","Resposta ESPColorReceiver", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void btnZerar(object sender, RoutedEventArgs e)
        {
            try
            {
                WebClient webClient = new WebClient();
                webClient.QueryString.Add("R", "0");
                webClient.QueryString.Add("G", "0");
                webClient.QueryString.Add("B", "0");
                string resposta = webClient.DownloadString("http://192.168.4.1");
                MessageBox.Show(resposta, "Resposta ESPColorReceiver", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message + "\n\nVerifique se:\n1 - Sua placa ESP32 está conectada.\n2 - Sender e receiver devem estar na mesma rede", "Resposta ESPColorReceiver", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
