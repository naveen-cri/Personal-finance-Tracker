const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

const incomeTotal = document.getElementById('income-total');
const expenseTotal = document.getElementById('expense-total');
const balanceTotal = document.getElementById('balance-total');
const transactionList = document.getElementById('transaction-list');

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const transactions = [];

function render() {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expenses;

  incomeTotal.textContent = currency.format(income);
  expenseTotal.textContent = currency.format(expenses);
  balanceTotal.textContent = currency.format(balance);

  transactionList.innerHTML = '';

  if (!transactions.length) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No transactions added yet.';
    transactionList.append(empty);
    return;
  }

  transactions.forEach((item) => {
    const li = document.createElement('li');

    const desc = document.createElement('span');
    desc.textContent = item.description;

    const amount = document.createElement('span');
    amount.className = `amount ${item.type}`;
    amount.textContent = `${item.type === 'expense' ? '-' : '+'}${currency.format(item.amount)}`;

    li.append(desc, amount);
    transactionList.append(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const parsedAmount = Number.parseFloat(amountInput.value);

  if (!description || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return;
  }

  transactions.push({
    description,
    amount: parsedAmount,
    type: typeInput.value,
  });

  form.reset();
  typeInput.value = 'expense';
  render();
});

render();
