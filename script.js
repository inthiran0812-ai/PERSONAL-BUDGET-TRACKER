let transactions = [];

const list = document.getElementById('list');
const balance = document.getElementById('balance');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

function addTransaction() {
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a description and amount');
        return;
    }

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: text.value,
        category: category.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateDOM();
    updateValues();

    text.value = '';
    amount.value = '';
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    balance.innerText = `$${total}`;
}

function updateDOM() {
    list.innerHTML = '';
    transactions.forEach(t => {
        const sign = t.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add(t.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
            ${t.text} <span>${t.category}</span> <span>${sign}${Math.abs(t.amount)}</span>
        `;
        list.appendChild(item);
    });
}

function generateReport() {
    const reportDisplay = document.getElementById('report-display');
    const categories = [...new Set(transactions.map(t => t.category))];
    let reportHTML = '<h4>Spending by Category:</h4><ul>';

    categories.forEach(cat => {
        const catTotal = transactions
            .filter(t => t.category === cat)
            .reduce((acc, t) => acc + t.amount, 0);
        reportHTML += `<li>${cat}: $${catTotal.toFixed(2)}</li>`;
    });

    reportHTML += '</ul>';
    reportDisplay.innerHTML = reportHTML;
}