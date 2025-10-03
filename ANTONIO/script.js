async function carregarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/produtos" );
    const produtos = await response.json();

    const container = document.getElementById("produtos-container");

    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-content">
          <h3>${produto.titulo}</h3>
          <p>${produto.descrição}</p>
          <a href="#" class="btn">Comprar</a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

carregarProdutos();
