// Inicializar ícones Lucide
lucide.createIcons();

// Função para formatar valores monetários
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Função para atualizar tendências
function updateTrend(inputElement, trendElement) {
  const value = parseFloat(inputElement.value) || 0;
  const trendIcon = trendElement.querySelector('i');
  const trendText = trendElement.querySelector('span');

  if (value > 0) {
    trendElement.classList.add('positive');
    trendElement.classList.remove('negative');
    trendIcon.setAttribute('data-lucide', 'arrow-up-right');
    trendText.textContent = 'Atualizado agora';
  } else {
    trendElement.classList.remove('positive', 'negative');
    trendIcon.setAttribute('data-lucide', 'arrow-right');
    trendText.textContent = 'Insira um valor';
  }
  lucide.createIcons();
}

// Configurar inputs financeiros
const inputs = ['totalBalance', 'investments', 'expenses'];
inputs.forEach(id => {
  const input = document.getElementById(id);
  const trend = input.parentElement.nextElementSibling;

  input.addEventListener('input', (e) => {
    let value = e.target.value;
    
    // Remover caracteres não numéricos
    value = value.replace(/[^\d.]/g, '');
    
    // Garantir que há no máximo 2 casas decimais
    if (value.includes('.')) {
      const parts = value.split('.');
      if (parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
      }
    }
    
    e.target.value = value;
    updateTrend(input, trend);
  });

  // Formatar valor ao perder foco
  input.addEventListener('blur', (e) => {
    const value = parseFloat(e.target.value) || 0;
    e.target.value = value.toFixed(2);
  });
});

// Gerenciar perfil de investidor
document.querySelectorAll('.profile-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.profile-buttons button').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

// Adicionar navegação aos botões de ação
document.querySelectorAll('.action-button').forEach(button => {
  button.addEventListener('click ', (e) => {
    const action = e.currentTarget.textContent.trim().toLowerCase();
    let targetPage = '';

    switch (action) {
      case 'definir meta':
        targetPage = 'goals.html';
        break;
      case 'simular agora':
        targetPage = 'simulator.html';
        break;
      case 'ver conteúdo':
        targetPage = 'education.html';
        break;
      case 'configurar':
        targetPage = 'security.html';
        break;
    }

    if (targetPage) {
      window.location.href = targetPage;
    }
  });
});

// Adicionar interatividade ao ícone de notificações
document.querySelector('[data-lucide="bell"]').addEventListener('click', () => {
  console.log('Notificações clicadas');
});


document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("main").classList.add("loaded");
});


document.getElementById('logoutButton').addEventListener('click', () => {
  // Remover credenciais armazenadas (se houver)
  localStorage.removeItem('userToken'); // Se estiver usando token no LocalStorage
  sessionStorage.clear(); // Limpa dados da sessão

  // Redirecionar para a tela inicial
  window.location.href = "index.html"; // Ajuste conforme necessário
});
