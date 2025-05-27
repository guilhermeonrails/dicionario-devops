function carregarCards() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');
            container.innerHTML = ''; // Limpa antes de adicionar

            data.forEach(item => {
                container.innerHTML += `
            <a href="${item.link}" target="_blank" class="card-link">
              <article class="card">
                <h2>${item.titulo}</h2>
                <p>${item.descricao}</p>
              </article>
            </a>
          `;
            });
            inicializarBusca();
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

function inicializarBusca() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card-link');
        let found = false;

        cards.forEach(cardLink => {
            const title = cardLink.querySelector('h2').textContent.toLowerCase();
            const description = cardLink.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                cardLink.style.display = 'block';
                found = true;
            } else {
                cardLink.style.display = 'none';
            }
        });

        let noResultMsg = document.getElementById('no-results-message');
        if (!noResultMsg) {
            noResultMsg = document.createElement('div');
            noResultMsg.id = 'no-results-message';
            noResultMsg.style.marginTop = '20px';
            noResultMsg.style.textAlign = 'center';
            document.getElementById('cards-container').appendChild(noResultMsg);
        }

        if (!found) {
            noResultMsg.textContent = 'Nenhum item encontrado.';
            noResultMsg.style.display = 'block';
        } else {
            noResultMsg.style.display = 'none';
        }
    });
}

// Chame a função principal ao carregar a página
carregarCards();