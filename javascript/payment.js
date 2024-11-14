function submitPayment() {
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!selectedPaymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    const paymentMethod = selectedPaymentMethod.value;
    const finalTotal = localStorage.getItem('totalPrice'); // Recupera o total do localStorage
    
    if (paymentMethod === 'cash') {
        const cashPaymentMethod = document.querySelector('input[name="cash-payment"]:checked');
        if (cashPaymentMethod && cashPaymentMethod.value === 'money') {
            const change = document.getElementById('change').value;
            if (!change) {
                alert('Por favor, informe o valor do troco.');
                return;
            }
        }
    }

    alert(`Pagamento realizado com sucesso!\nMétodo de Pagamento: ${paymentMethod}\nTotal: R$ ${finalTotal}`);
    // Aqui você pode adicionar a lógica para enviar os dados do pagamento ao servidor
}

function showPaymentDetails(displayStyle) {
    document.getElementById('credit-card-details').style.display = displayStyle;
    document.getElementById('cash-details').style.display = displayStyle;
}

function submitPayment() {
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!selectedPaymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    const paymentMethod = selectedPaymentMethod.value;
    const finalTotal = document.getElementById('final-total').innerText;
    
    if (paymentMethod === 'cash') {
        const cashPaymentMethod = document.querySelector('input[name="cash-payment"]:checked');
        if (cashPaymentMethod && cashPaymentMethod.value === 'money') {
            const change = document.getElementById('change').value;
            if (!change) {
                alert('Por favor, informe o valor do troco.');
                return;
            }
        }
    }

    alert(`Pagamento realizado com sucesso!\nMétodo de Pagamento: ${paymentMethod}\nTotal: R$ ${finalTotal}`);
    // Aqui você pode adicionar a lógica para enviar os dados do pagamento ao servidor
}

function updateTotal() {
    // Recupera o subtotal e total armazenados no localStorage
    const subtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
    const discount = parseFloat(document.getElementById('discount').innerText.replace('Desconto: R$ ', '')) || 0;
    const total = subtotal + 9.90 - discount;
    
    // Atualiza o valor total na página
    document.getElementById('final-total').innerText = total.toFixed(2);

    // Atualiza o valor do total na interface de pagamento
    document.getElementById('total-price').innerText = total.toFixed(2);

    // Armazena o valor total no localStorage novamente (caso o desconto seja aplicado)
    localStorage.setItem('totalPrice', total.toFixed(2));
}

window.onload = updateTotal;