// Selecionar tipo de ingresso
function selectTicket(element) {
    // Remove selected class from all tickets
    const allTickets = document.querySelectorAll('.ticket-option');
    allTickets.forEach(ticket => {
        ticket.classList.remove('selected');
    });
    
    // Add selected class to clicked ticket
    element.classList.add('selected');
}

// Comprar ingressos
function purchaseTickets() {
    const selectedTicket = document.querySelector('.ticket-option.selected');
    const visitDate = document.getElementById('visit-date').value;
    
    if (!selectedTicket) {
        alert('Por favor, selecione um tipo de ingresso.');
        return;
    }
    
    if (!visitDate) {
        alert('Por favor, selecione uma data para visita.');
        return;
    }
    
    const ticketTitle = selectedTicket.querySelector('.ticket-title').textContent;
    const ticketPrice = selectedTicket.querySelector('.ticket-price').textContent;
    
    alert(`Ingresso comprado com sucesso!\n\n${ticketTitle}\n${ticketPrice}\nData: ${formatDate(visitDate)}`);
}

// Formatar data para exibição
function formatDate(dateString) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}

// Configurar data mínima como hoje
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('visit-date').min = new Date().toISOString().split('T')[0];
});