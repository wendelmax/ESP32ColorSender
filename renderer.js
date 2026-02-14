const { ipcRenderer, shell } = require('electron');

// DOM Elements
const ipInput = document.getElementById("ip-address");
const colorPicker = document.getElementById("color-picker");
const colorPreview = document.getElementById("color-preview");
const labelR = document.getElementById("label-r");
const labelG = document.getElementById("label-g");
const labelB = document.getElementById("label-b");
const btnSend = document.getElementById("btn-send");
const btnReset = document.getElementById("btn-reset");
const statusMsg = document.getElementById("status-message");
const consoleLogs = document.getElementById("console-logs");
const btnClearLogs = document.getElementById("btn-clear-logs");
const aboutModal = document.getElementById("about-modal");
const btnInfo = document.getElementById("win-info");
const btnCloseModal = document.getElementById("close-modal");

// Window Controls
document.getElementById('win-minimize').addEventListener('click', () => {
    ipcRenderer.send('window-minimize');
});

document.getElementById('win-close').addEventListener('click', () => {
    ipcRenderer.send('window-close');
});

// About Modal Logic
btnInfo.addEventListener('click', () => {
    aboutModal.classList.add('show');
    addLog("Abrindo informações sobre o desenvolvedor.");
});

btnCloseModal.addEventListener('click', () => {
    aboutModal.classList.remove('show');
});

// Close modal if clicking outside the content
aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove('show');
    }
});

// Social Links (open in external browser)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        shell.openExternal(url);
        addLog(`Abrindo link externo: ${url}`);
    });
});

// Logging system
function addLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;

    const time = new Date().toLocaleTimeString([], { hour12: false });
    entry.innerHTML = `<span class="log-time">[${time}]</span> ${message}`;

    consoleLogs.appendChild(entry);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
    console.log(`[${type.toUpperCase()}] ${message}`);
}

btnClearLogs.addEventListener('click', () => {
    consoleLogs.innerHTML = '';
});

// Helper to update UI
function updateUI(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    colorPreview.style.backgroundColor = hex;
    labelR.textContent = `R: ${r}`;
    labelG.textContent = `G: ${g}`;
    labelB.textContent = `B: ${b}`;

    return { r, g, b };
}

// Show status
function showStatus(text, type = 'success') {
    statusMsg.textContent = text;
    statusMsg.className = `status-message show status-${type}`;
    addLog(text, type);
    setTimeout(() => {
        statusMsg.classList.remove('show');
    }, 4000);
}

// Color picker change event
colorPicker.addEventListener("input", (e) => {
    updateUI(e.target.value);
});

// Send color to ESP32
btnSend.addEventListener("click", async () => {
    const ip = ipInput.value.trim() || "192.168.4.1";
    const { r, g, b } = updateUI(colorPicker.value);
    const url = `http://${ip}/?R=${r}&G=${g}&B=${b}`;

    try {
        btnSend.disabled = true;
        btnSend.textContent = "Enviando...";
        addLog(`Iniciando GET: ${url}`);

        // In Electron, we can use the standard fetch API if CORS allows, 
        // or use Electron's 'net' module in main process. 
        // Since ESP32 usually doesn't have restrictive CORS:
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors' // Common for IoT devices
        });

        showStatus("Comando enviado com sucesso!");
        addLog(`Resposta recebida (no-cors mode)`, 'success');
    } catch (error) {
        console.error(error);
        showStatus("Erro de conexão.", 'error');
        addLog(`Falha ao conectar em ${ip}: ${error.message}`, 'error');
    } finally {
        btnSend.disabled = false;
        btnSend.textContent = "Enviar ESP32";
    }
});

// Reset (Clear)
btnReset.addEventListener("click", async () => {
    const ip = ipInput.value.trim() || "192.168.4.1";
    colorPicker.value = "#000000";
    updateUI("#000000");

    try {
        btnReset.disabled = true;
        addLog(`Resetando valores para 0,0,0...`);
        await fetch(`http://${ip}/?R=0&G=0&B=0`, {
            method: 'GET',
            mode: 'no-cors'
        });
        showStatus("Valores zerados!");
    } catch (error) {
        showStatus("Erro ao zerar.", 'error');
        addLog(`Erro no reset: ${error.message}`, 'error');
    } finally {
        btnReset.disabled = false;
    }
});

// Initialize
addLog("App iniciado. Pronto para enviar.");
updateUI(colorPicker.value);
