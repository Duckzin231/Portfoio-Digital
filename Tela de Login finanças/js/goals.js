// Inicializar ícones Lucide
lucide.createIcons();

// Função para formatar moeda
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Função para calcular progresso
function calculateProgress(current, target) {
  return (current / target) * 100;
}

// Gerenciar objetivos
class GoalsManager {
  constructor() {
    this.goals = JSON.parse(localStorage.getItem('financialGoals')) || [];
    this.form = document.getElementById('goalForm');
    this.listContainer = document.getElementById('goalsList');
    
    this.initializeEventListeners();
    this.renderGoals();
  }

  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addGoal();
    });
  }

  addGoal() {
    const goal = {
      id: Date.now(),
      name: document.getElementById('goalName').value,
      amount: parseFloat(document.getElementById('goalAmount').value),
      date: document.getElementById('goalDate').value,
      initial: parseFloat(document.getElementById('goalInitial').value),
      current: parseFloat(document.getElementById('goalInitial').value)
    };

    this.goals.push(goal);
    this.saveGoals();
    this.renderGoals();
    this.form.reset();
  }

  updateGoal(id, newAmount) {
    const goal = this.goals.find(g => g.id === id);
    if (goal) {
      goal.current = parseFloat(newAmount);
      this.saveGoals();
      this.renderGoals();
    }
  }

  deleteGoal(id) {
    this.goals = this.goals.filter(g => g.id !== id);
    this.saveGoals();
    this.renderGoals();
  }

  saveGoals() {
    localStorage.setItem('financialGoals', JSON.stringify(this.goals));
  }

  renderGoals() {
    this.listContainer.innerHTML = '';
    
    this.goals.forEach(goal => {
      const progress = calculateProgress(goal.current, goal.amount);
      const remaining = goal.amount - goal.current;
      const daysRemaining = Math.ceil((new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24));
      
      const goalElement = document.createElement('div');
      goalElement.className = 'goal-item';
      goalElement.innerHTML = `
        <div class="goal-header">
          <h4>${goal.name}</h4>
          <button class="delete-button" onclick="goalsManager.deleteGoal(${goal.id})">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="goal-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <span class="progress-text">${progress.toFixed(1)}%</span>
        </div>
        <div class="goal-details">
          <p>Meta: ${formatCurrency(goal.amount)}</p>
          <p>Atual: ${formatCurrency(goal.current)}</p>
          <p>Faltam: ${formatCurrency(remaining)}</p>
          <p>Prazo: ${daysRemaining} dias</p>
        </div>
        <div class="goal-update">
          <input type="number" 
                 placeholder="Atualizar valor" 
                 step="0.01" 
                 min="${goal.current}"
                 max="${goal.amount}"
                 onchange="goalsManager.updateGoal(${goal.id}, this.value)">
        </div>
      `;
      
      this.listContainer.appendChild(goalElement);
    });
    
    lucide.createIcons();
  }
}

// Inicializar gerenciador de objetivos
const goalsManager = new GoalsManager();