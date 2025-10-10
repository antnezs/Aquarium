// SEU CÓDIGO ORIGINAL - não mude nada
async function carregarInterface() {
  try {
    const response = await fetch("http://localhost:3000/interface");
    const interface = await response.json();

    const container = document.getElementById("interface-container");

    interface.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = `card-${item.id}`; // Só adicione esta linha

      card.innerHTML = `
        <div class="card-content">
          <h3>${item.titulo}</h3>
          <p>${item.descrição}</p>
        </div>
      `;

      container.appendChild(card);
    });

    // CHAMA A NAVEGAÇÃO DEPOIS que tudo estiver carregado
    setTimeout(adicionarClickNavbar, 100);
    
  } catch (error) {
    console.error("Erro ao carregar interface:", error);
  }
}

// FUNÇÃO SEPARADA - não mexe no seu código
function adicionarClickNavbar() {
  console.log("Adicionando clicks na navbar...");
  
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      
      if (this.textContent.includes('Sobre Nós')) {
        const card = document.getElementById('card-1');
        if (card) card.scrollIntoView({ behavior: 'smooth' });
      }
      
      if (this.textContent.includes('Sobre o Site')) {
        const card = document.getElementById('card-2');
        if (card) card.scrollIntoView({ behavior: 'smooth' });
      }
    };
  });
}

// Mantém sua chamada original
carregarInterface();