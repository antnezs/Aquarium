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