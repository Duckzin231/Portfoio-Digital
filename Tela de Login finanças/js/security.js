// Inicializar ícones Lucide
lucide.createIcons();

class SecurityManager {
  constructor() {
    this.twoFactorToggle = document.getElementById('twoFactorToggle');
    this.twoFactorSetup = document.getElementById('twoFactorSetup');
    this.passwordForm = document.getElementById('passwordForm');
    this.devicesList = document.getElementById('devicesList');

    this.initializeEventListeners();
    this.loadDevices();
    this.checkTwoFactorStatus();
  }

  initializeEventListeners() {
    this.twoFactorToggle.addEventListener('change', () => {
      this.toggleTwoFactor();
    });

    this.passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.changePassword();
    });
  }

  toggleTwoFactor() {
    const isEnabled = this.twoFactorToggle.checked;
    
    if (isEnabled) {
      this.twoFactorSetup.innerHTML = `
        <div class="setup-steps">
          <div class="qr-code">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/FinancasPRO:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=FinancasPRO" alt="QR Code">
          </div>
          <div class="setup-instructions">
            <h4>Configure a Autenticação de Dois Fatores</h4>
            <ol>
              <li>Instale um aplicativo autenticador (Google Authenticator, Authy, etc.)</li>
              <li>Escaneie o código QR com o aplicativo</li>
              <li>Digite o código de 6 dígitos gerado pelo aplicativo</li>
            </ol>
            <div class="verification-form">
              <input type="text" 
                     placeholder="Digite o código" 
                     maxlength="6" 
                     pattern="[0-9]*"
                     id="verificationCode">
              <button onclick="securityManager.verifyTwoFactorCode()">Verificar</button>
            </div>
          </div>
        </div>
      `;
      this.twoFactorSetup.classList.remove('hidden');
    } else {
      this.twoFactorSetup.innerHTML = '';
      this.twoFactorSetup.classList.add('hidden');
    }
  }

  verifyTwoFactorCode() {
    const code = document.getElementById('verificationCode').value;
    if (code.length === 6 && /^\d+$/.test(code)) {
      // Simular verificação bem-sucedida
      alert('Autenticação de dois fatores ativada com sucesso!');
      this.twoFactorSetup.classList.add('hidden');
    } else {
      alert('Código inválido. Tente novamente.');
    }
  }

  changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (newPassword.length < 8) {
      alert('A nova senha deve ter pelo menos 8 caracteres!');
      return;
    }

    // Simular mudança de senha bem-sucedida
    alert('Senha alterada com sucesso!');
    this.passwordForm.reset();
  }

  loadDevices() {
    // Simular lista de dispositivos conectados
    const devices = [
      {
        name: 'iPhone 12',
        lastAccess: '2024-03-15 14:30',
        location: 'São Paulo, Brasil',
        type: 'mobile'
      },
      {
        name: 'Chrome - Windows',
        lastAccess: '2024-03-15 10:15',
        location: 'São Paulo, Brasil',
        type: 'desktop'
      },
      {
        name: 'Safari - MacBook',
        lastAccess: '2024-03-14 18:45',
        location: 'Rio de Janeiro, Brasil',
        type: 'desktop'
      }
    ];

    this.devicesList.innerHTML = devices.map(device => `
      <div class="device-item">
        <div class="device-icon">
          <i data-lucide="${device.type === 'mobile' ? 'smartphone' : 'monitor'}"></i>
        </div>
        <div class="device-info">
          <h4>${device.name}</h4>
          <p>Último acesso: ${device.lastAccess}</p>
          <p>Localização: ${device.location}</p>
        </div>
        <button class="remove-device" onclick="securityManager.removeDevice('${device.name}')">
          <i data-lucide="x"></i>
        </button>
      </div>
    `).join('');

    lucide.createIcons();
  }

  removeDevice(deviceName) {
    if (confirm(`Deseja realmente remover o dispositivo "${deviceName}"?`)) {
      // Simular remoção do dispositivo
      alert(`Dispositivo "${deviceName}" removido com sucesso!`);
      this.loadDevices(); // Recarregar lista
    }
  }

  checkTwoFactorStatus() {
    // Simular verificação do status atual
    this.twoFactorToggle.checked = false;
  }
}

// Inicializar gerenciador de segurança
const securityManager = new SecurityManager();
