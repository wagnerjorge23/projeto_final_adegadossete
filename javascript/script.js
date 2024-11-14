document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Função para adicionar item ao carrinho
    window.addToCart = (itemName, itemPrice) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: itemName, price: itemPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${itemName} adicionado ao carrinho!`);
    };

    // Função para mostrar itens do carrinho na página de checkout
    function displayCart() {
        if (cartItemsDiv) {
            cartItemsDiv.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `<h3>${item.name}</h3><p>Preço: R$ ${item.price.toFixed(2)}</p>`;
                cartItemsDiv.appendChild(itemDiv);
                total += item.price;
            });

            totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;

            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    alert('Compra finalizada com sucesso!');
                    localStorage.removeItem('cart');
                    window.location.href = 'index.html'; // Redireciona para a página inicial
                });
            }
        }
    }

    // Chama a função displayCart na página de checkout
    if (window.location.pathname.includes('checkout.html')) {
        displayCart();
    }
});