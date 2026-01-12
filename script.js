// script.js
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction() {
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');
    const category = document.getElementById('category');

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please fill in both fields');
        return;
    }

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: text.value,
        amount: +amount.value,
        category: category.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
}

function updateValues() {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);
    document.getElementById('balance').innerText = `$${total}`;
}

function updateDOM() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    transactions.forEach(t => {
        const item = document.createElement('li');
        item.classList.add(t.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
            <span class="transaction-desc">${t.text}</span>
            <span class="transaction-category">${t.category}</span>
            <span class="transaction-amount">${t.amount < 0 ? '-' : '+'}$${Math.abs(t.amount)}</span>
        `;
        list.appendChild(item);
    });
}

function generateReport() {
    const display = document.getElementById('report-display');
    const categories = [...new Set(transactions.map(t => t.category))];
    
    if (transactions.length === 0) {
        display.innerHTML = '<h4>Monthly Report</h4><p>No transactions to report.</p>';
        display.style.display = 'block';
        return;
    }
    
    let html = '<h4>Monthly Report</h4>';
    let totalIncome = 0;
    let totalExpenses = 0;
    
    categories.forEach(cat => {
        const categoryTotal = transactions
            .filter(t => t.category === cat)
            .reduce((acc, t) => acc + t.amount, 0);
        
        if (categoryTotal >= 0) {
            totalIncome += categoryTotal;
        } else {
            totalExpenses += Math.abs(categoryTotal);
        }
        
        html += `<div class="${categoryTotal >= 0 ? 'positive' : 'negative'}">
                    ${cat}: ${categoryTotal >= 0 ? '+' : '-'}$${Math.abs(categoryTotal).toFixed(2)}
                </div>`;
    });
    
    html += `<hr style="margin: 10px 0; border: 1px solid #eee;">`;
    html += `<div class="positive">Total Income: $${totalIncome.toFixed(2)}</div>`;
    html += `<div class="negative">Total Expenses: $${totalExpenses.toFixed(2)}</div>`;
    html += `<div class="${(totalIncome - totalExpenses) >= 0 ? 'positive' : 'negative'}" style="font-weight: bold; margin-top: 10px;">
                Net Balance: ${(totalIncome - totalExpenses) >= 0 ? '+' : '-'}$${Math.abs(totalIncome - totalExpenses).toFixed(2)}
            </div>`;
    
    display.innerHTML = html;
    display.style.display = 'block';
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function resetAll() {
    document.getElementById('resetModal').style.display = 'flex';
}

function confirmReset() {
    transactions = [];
    localStorage.removeItem('transactions');
    init();
    document.getElementById('report-display').innerHTML = '';
    document.getElementById('report-display').style.display = 'none';
    document.getElementById('resetModal').style.display = 'none';
    alert('All transactions have been reset successfully!');
}

function cancelReset() {
    document.getElementById('resetModal').style.display = 'none';
}

function init() {
    updateDOM();
    updateValues();
}

init();