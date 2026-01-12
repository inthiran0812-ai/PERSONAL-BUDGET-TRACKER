:root {
    --primary: #6c5ce7;
    --success: #2ecc71;
    --danger: #e74c3c;
    --dark: #2d3436;
    --light-bg: #f4f7f6;
}

body {
    background-color: var(--light-bg);
    font-family: 'Segoe UI', Arial, sans-serif;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.container {
    background: white;
    width: 100%;
    max-width: 400px;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Fixes the overlap from your screenshot */
.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px; /* Adds space between every input */
    margin-bottom: 15px;
}

input, select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    width: 100%; /* Ensures they take full width */
    box-sizing: border-box;
}

.balance-card {
    background: var(--primary);
    color: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 25px;
}

.btn {
    cursor: pointer;
    border: none;
    padding: 14px;
    width: 100%;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    transition: 0.3s;
}

.add-btn { background: var(--success); margin-bottom: 10px; }
.report-btn { background: var(--primary); }

/* History & Report Colors */
.positive { color: var(--success); font-weight: bold; }
.negative { color: var(--danger); font-weight: bold; }

.report-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
}