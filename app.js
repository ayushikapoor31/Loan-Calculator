// listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,1000);
    e.preventDefault();
});
//calculate results
function calculateResults() {
    console.log('calculating...');
    //ui variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monPay = document.querySelector('#monthly-payment');
    const totalPay = document.querySelector('#total-payment');
    const totalInt = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monPay.value = monthly.toFixed(2);
        totalPay.value = (monthly * calculatedPayments).toFixed(2);
        totalInt.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';
    }
    else {
        document.getElementById('loading').style.display='none';
        showError('Please check your numbers')
    }

}
//show error
function showError(error) {
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //     add class
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    //clear error
    setTimeout(clearError, 3000);
}
function clearError() {
    document.querySelector('.alert').remove();
}