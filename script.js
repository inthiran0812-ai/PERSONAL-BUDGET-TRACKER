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
            ${t.text} <span>${t.category}</span> 
            <span>${t.amount < 0 ? '-' : '+'}$${Math.abs(t.amount)}</span>
        `;
        list.appendChild(item);
    });
}

function generateReport() {
    const display = document.getElementById('report-display');
    const categories = [...new Set(transactions.map(t => t.category))];
    let html = '<h4>Report</h4>';
    categories.forEach(cat => {
        const total = transactions.filter(t => t.category === cat).reduce((acc, t) => acc + t.amount, 0);
        html += `<div class="positive"> ${cat}: $${total.toFixed(2)}</div>`;
    });
    display.innerHTML = html;
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    updateDOM();
    updateValues();
}

init();