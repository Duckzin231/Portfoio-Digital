// Inicializar ícones Lucide
lucide.createIcons();

class InvestmentSimulator {
  constructor() {
    this.form = document.getElementById('simulatorForm');
    this.resultContainer = document.getElementById('simulationResult');
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateInvestment();
    });
  }

  calculateInvestment() {
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const period = parseInt(document.getElementById('period').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

    const monthlyRate = Math.pow(1 + interestRate, 1/12) - 1;
    const months = period * 12;

    let totalAmount = initialAmount;
    let totalInvested = initialAmount;
    let yearlyResults = [];

    for (let month = 1; month <= months; month++) {
      totalAmount = (totalAmount + monthlyContribution) * (1 + monthlyRate);
      totalInvested += monthlyContribution;

      if (month % 12 === 0) {
        yearlyResults.push({
          year: month / 12,
          totalAmount,
          totalInvested,
          earnings: totalAmount - totalInvested
        });
      }
    }

    this.renderResults(yearlyResults);
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  renderResults(results) {
    const lastResult = results[results.length - 1];
    
    this.resultContainer.innerHTML = `
      <div class="simulation-summary">
        <div class="summary-item">
          <h4>Valor Total</h4>
          <p class="amount">${this.formatCurrency(lastResult.totalAmount)}</p>
        </div>
        <div class="summary-item">
          <h4>Total Investido</h4>
          <p class="amount">${this.formatCurrency(lastResult.totalInvested)}</p>
        </div>
        <div class="summary-item">
          <h4>Rendimento</h4>
          <p class="amount">${this.formatCurrency(lastResult.earnings)}</p>
        </div>
      </div>

      <div class="yearly-results">
        <h4>Projeção Ano a Ano</h4>
        <table>
          <thead>
            <tr>
              <th>Ano</th>
              <th>Valor Total</th>
              <th>Total Investido</th>
              <th>Rendimento</th>
            </tr>
          </thead>
          <tbody>
            ${results.map(result => `
              <tr>
                <td>${result.year}º</td>
                <td>${this.formatCurrency(result.totalAmount)}</td>
                <td>${this.formatCurrency(result.totalInvested)}</td>
                <td>${this.formatCurrency(result.earnings)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

// Inicializar simulador
const simulator = new InvestmentSimulator();