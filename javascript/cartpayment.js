// Função que exibe o carrinho na página de carrinho
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('selectedAdega')) || [];
    const cartContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalPriceElement = document.getElementById('total-price');

    if (cartItems.length === 0 && cartContainer) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    let subtotal = 0;
    if (cartContainer) {
        cartContainer.innerHTML = cartItems.map(adega => {
            subtotal += parseFloat(adega.price.replace(',', '.')); // Corrige caso o valor tenha vírgula
            return `
                <div class="adega-item">
                    <span>${adega.name}</span>
                    <span class="price">R$ ${pizza.price}</span>
                </div>
            `;
        }).join('');
    }

    if (subtotalElement) subtotalElement.innerText = subtotal.toFixed(2);
    const total = subtotal + 9.90; // Adiciona taxa de entrega
    if (totalPriceElement) totalPriceElement.innerText = total.toFixed(2);

    // Armazena o total e subtotal no localStorage para uso posterior
    localStorage.setItem('subtotal', subtotal.toFixed(2));
    localStorage.setItem('totalPrice', total.toFixed(2));
}

// Função para aplicar o cupom
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    const subtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
    let discount = 0;

    if (couponCode === 'fristpedido') {
        discount = 10; // Exemplo de desconto fixo de R$10
    }

    const discountElement = document.getElementById('discount');
    if (discountElement) {
        discountElement.innerText = `Desconto: R$ ${discount.toFixed(2)}`;
    }

    const total = subtotal + 9.90 - discount;
    document.getElementById('total-price').innerText = total.toFixed(2);

    // Atualiza o total no localStorage
    localStorage.setItem('totalPrice', total.toFixed(2));
}

// Função que redireciona para a página de pagamento
function proceedToPayment() {
    window.location.href = 'payment.html'; // Redireciona para a página de pagamento
}

// Função para exibir os detalhes de pagamento
function showPaymentDetails(displayStyle, method) {
    // Esconde todas as seções de pagamento
    document.getElementById('credit-card-details').style.display = 'none';
    document.getElementById('cash-details').style.display = 'none';

    // Mostra a seção correspondente ao método selecionado
    if (method === 'credit-card') {
        document.getElementById('credit-card-details').style.display = displayStyle;
    } else if (method === 'cash') {
        document.getElementById('cash-details').style.display = displayStyle;
    }
}

function toggleChangeInput(show) {
    const changeContainer = document.getElementById('change-container');
    changeContainer.style.display = show ? 'block' : 'none';
}


// Função que atualiza o total na página de pagamento
function updateTotal() {
    const subtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
    const discountText = document.getElementById('discount') ? document.getElementById('discount').innerText.replace('Desconto: R$ ', '') : '0';
    const discount = parseFloat(discountText) || 0;
    const total = subtotal + 9.90 - discount;

    // Atualiza o valor total na página de pagamento
    const finalTotalElement = document.getElementById('final-total');
    if (finalTotalElement) {
        finalTotalElement.innerText = total.toFixed(2);
    }

    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = total.toFixed(2);
    }

    // Armazena o valor total no localStorage novamente (caso o desconto seja aplicado)
    localStorage.setItem('totalPrice', total.toFixed(2));
}

// Função para submeter o pagamento
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

// Função principal para carregar as funcionalidades corretas com base na página
window.onload = function() {
    const path = window.location.pathname;

    if (path.includes('cart.html')) {
        displayCart();
    } else if (path.includes('payment.html')) {
        updateTotal();
    }
};
