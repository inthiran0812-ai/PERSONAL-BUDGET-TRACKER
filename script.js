// 1. Initialize data from localStorage or start with empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const reportDisplay = document.getElementById('report-display');

// 2. Add a new transaction
function addTransaction() {
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a description and an amount');
        return;
    }

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: text.value,
        category: category.value,
        amount: parseFloat(amount.value)
    };

    transactions.push(transaction);
    
    updateLocalStorage();
    updateDOM();
    updateValues();

    // Clear inputs
    text.value = '';
    amount.value = '';
}

// 3. Update the Balance display
function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    balance.innerText = `$${total}`;
    
    // Change balance color based on value
    if (total >= 0) {
        balance.style.color = '#fff'; // White on the purple background
    } else {
        balance.style.color = '#ff7675'; // Soft red if in debt
    }
}

// 4. Update the History List (DOM)
function updateDOM() {
    list.innerHTML = '';

    transactions.forEach(t => {
        const sign = t.amount < 0 ? '-' : '+';
        const itemClass = t.amount < 0 ? 'minus' : 'plus';
        
        const item = document.createElement('li');
        item.classList.add(itemClass);
        
        item.innerHTML = `
            <div>
                <strong>${t.text}</strong><br>
                <small>${t.category}</small>
            </div>
            <span>${sign}$${Math.abs(t.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>
        `;
        list.appendChild(item);
    });
}

// 5. Remove a transaction
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

// 6. Generate the Monthly Report (Categorized)
function generateReport() {
    if (transactions.length === 0) {
        reportDisplay.innerHTML = '<p>No data available to generate report.</p>';
        return;
    }

    const categories = [...new Set(transactions.map(t => t.category))];
    let reportHTML = '<h3>Monthly Breakdown</h3>';

    categories.forEach(cat => {
        const catTotal = transactions
            .filter(t => t.category === cat)
            .reduce((acc, t) => acc + t.amount, 0);
        
        const colorClass = catTotal >= 0 ? 'positive' : 'negative';
        const displaySign = catTotal >= 0 ? '+' : '-';
        
        reportHTML += `
            <div class="report-item">
                <span>${cat}</span>
                <span class="${colorClass}">${displaySign}$${Math.abs(catTotal).toFixed(2)}</span>
            </div>`;
    });

    reportDisplay.innerHTML = reportHTML;
}

// 7. Sync with LocalStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 8. Run