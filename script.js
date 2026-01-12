// Add these functions to your existing script.js

function resetAll() {
    // Show the confirmation modal
    document.getElementById('resetModal').style.display = 'flex';
}

function confirmReset() {
    // Clear all transactions
    transactions = [];
    
    // Clear localStorage
    localStorage.removeItem('transactions');
    
    // Update the UI
    init();
    
    // Clear report display
    document.getElementById('report-display').innerHTML = '';
    document.getElementById('report-display').style.display = 'none';
    
    // Close the modal
    document.getElementById('resetModal').style.display = 'none';
    
    // Show success message
    alert('All transactions have been reset successfully!');
}

function cancelReset() {
    // Close the modal without resetting
    document.getElementById('resetModal').style.display = 'none';
}

// Also, update your generateReport function to show/hide the report display
function generateReport() {
    const display = document.getElementById('report-display');
    const categories = [...new Set(transactions.map(t => t.category))];
    
    if (transactions.length === 0) {
        display.innerHTML = '<h4>Report</h4><p>No transactions to report.</p>';
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