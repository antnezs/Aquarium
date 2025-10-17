function selectTicket(element) {
    document.querySelectorAll('.ticket-option').forEach(ticket => {
        ticket.classList.remove('selected');
    });
    element.classList.add('selected');
}

function purchaseTickets() {
    const selectedTicket = document.querySelector('.ticket-option.selected');
    const visitDate = document.getElementById('visit-date').value;
    
    if (!selectedTicket) {
        alert('Selecione um tipo de ingresso.');
        return;
    }
    
    if (!visitDate) {
        alert('Selecione uma data para visita.');
        return;
    }
    
    const title = selectedTicket.querySelector('.ticket-title').textContent;
    const price = selectedTicket.querySelector('.ticket-price').textContent;
    
    alert(`Ingresso comprado!\n\n${title}\n${price}\nData: ${formatDate(visitDate)}`);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('visit-date').min = new Date().toISOString().split('T')[0];
    initLogoDrag();
});

function initLogoDrag() {
    const logo = document.getElementById('movable-logo');
    let dragging = false;
    let startX, startY, initialX = 20, initialY = 20;

    logo.style.left = initialX + 'px';
    logo.style.top = initialY + 'px';

    logo.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(e) {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        logo.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!dragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        logo.style.left = (initialX + deltaX) + 'px';
        logo.style.top = (initialY + deltaY) + 'px';
    }

    function stopDrag() {
        if (!dragging) return;
        
        dragging = false;
        initialX = parseInt(logo.style.left);
        initialY = parseInt(logo.style.top);
        logo.style.cursor = 'grab';
    }
}
// Variável global para armazenar o ingresso selecionado
let ingressoSelecionado = null;

function selectTicket(element) {
    // Remove a classe 'selected' de todos os tickets
    document.querySelectorAll('.ticket-option').forEach(ticket => {
        ticket.classList.remove('selected');
    });
    
    // Adiciona a classe 'selected' ao ticket clicado
    element.classList.add('selected');
    
    // Armazena os dados do ingresso selecionado
    ingressoSelecionado = {
        titulo: element.querySelector('.ticket-title').textContent,
        preco: element.querySelector('.ticket-price').textContent,
        descricao: element.querySelector('.ticket-desc').textContent
    };
    
    // Abre o modal
    abrirModal();
}

function abrirModal() {
    if (ingressoSelecionado) {
        // Preenche as informações no modal
        document.getElementById('modal-ticket-title').textContent = ingressoSelecionado.titulo;
        document.getElementById('modal-ticket-price').textContent = ingressoSelecionado.preco;
        document.getElementById('modal-ticket-desc').textContent = ingressoSelecionado.descricao;
        
        // Abre o modal usando Bootstrap
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }
}

function finalizarCompra() {
    const dataSelecionada = document.getElementById('visit-date').value;
    const quantidade = document.getElementById('ticket-quantity').value;
    
    if (!dataSelecionada) {
        alert('Por favor, selecione uma data para a visita.');
        return;
    }
    
    if (ingressoSelecionado) {
        // Formata a data para exibição
        const dataFormatada = new Date(dataSelecionada).toLocaleDateString('pt-BR');
        
        alert(`🎉 Compra realizada com sucesso!\n\n📄 Ingresso: ${ingressoSelecionado.titulo}\n📅 Data: ${dataFormatada}\n🎫 Quantidade: ${quantidade}\n💰 ${ingressoSelecionado.preco}\n\nObrigado pela preferência!`);
        
        // Fecha o modal
        const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
        myModal.hide();
        
        // Limpa a seleção
        ingressoSelecionado = null;
        document.querySelectorAll('.ticket-option').forEach(ticket => {
            ticket.classList.remove('selected');
        });
        
        // Limpa os campos
        document.getElementById('visit-date').value = '';
        document.getElementById('ticket-quantity').value = '1';
    }
}

// Event listener para quando o modal abrir
document.addEventListener('DOMContentLoaded', function() {
    const myModal = document.getElementById('myModal');
    if (myModal) {
        myModal.addEventListener('shown.bs.modal', function () {
            // Foca no campo de data quando o modal abrir
            document.getElementById('visit-date').focus();
        });
    }
});