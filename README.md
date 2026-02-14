# ESP32 Color Sender (Cross-Platform)

Uma aplicação desktop moderna e leve para enviar comandos de cor (RGB) para dispositivos ESP32 via rede Wi-Fi.

## 🚀 Funcionalidades

- **Interface Glassmorphism:** Design premium com transparências e efeitos de desfoque.
- **Janela Frameless:** Visual moderno sem as bordas tradicionais do sistema.
- **IP Dinâmico:** Configure o IP do seu ESP32 diretamente na interface.
- **Console de Debug:** Acompanhe as requisições HTTP e o status da conexão em tempo real.
- **Cross-Platform:** Funciona em Windows, Linux e macOS (construído com Electron).

## 🛠️ Como Instalar e Rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.

### Passo a Passo
1. Clone este repositório:
   ```bash
   git clone https://github.com/wendelmax/ESP32ColorSender.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```

## 🔌 Firmware Compatível (Hardware)

Este aplicativo foi desenvolvido para ser utilizado em conjunto com o firmware:
- **[ESP32ColorReceiver](https://github.com/wendelmax/ESP32ColorReceiver)**: O código que roda no ESP32 para receber os comandos e controlar as fitas LED/Leds RGB.

## 🛰️ Protocolo de Comunicação

O dispositivo ESP32 deve estar rodando um servidor web que aceite parâmetros via GET no seguinte formato:
`http://[IP_DO_ESP]/?R=[RED]&G=[GREEN]&B=[BLUE]`

## 👨‍💻 Desenvolvedor

**Jackson Wendel**
- [LinkedIn](https://www.linkedin.com/in/jacksonwendelsantossa)
- [GitHub](https://github.com/wendelmax)

---
Criado para ser uma solução simples, bonita e eficiente para controle de iluminação IoT.
