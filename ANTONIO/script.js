async function carregarInterface() {
  try {
    const response = await fetch("http://localhost:3000/interface");
    const interface = await response.json();

    const container = document.getElementById("interface-container");

    interface.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-content">
          <h3>${item.titulo}</h3>
          <p>${item.descrição}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar interface:", error);
  }
}

carregarInterface();