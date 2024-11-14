if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../html/menu.html";
  }
  
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;
  
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./assets/html/signin.html";
  }
///abaixo o meu 
function addToCart() {
    const selectedBebidas = [];
    const checkboxes = document.querySelectorAll('.bebida-item input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const bebidaName = checkbox.getAttribute('data-name');
        const bebidaPrice = checkbox.getAttribute('data-price');
        selectedBebidas.push({ name: bebidasName, price: bebidaPricePrice });
    });

    if (selectedbebidas.length === 0) {
        alert('Por favor, selecione pelo menos uma bebida.');
        return;
    }

    // Convert the selected Bebidas to JSON and store in localStorage
    localStorage.setItem('selectedBebidass', JSON.stringify(selectedBebidas));

    // Redirect to the cart page
    window.location.href = 'cart.html';
}