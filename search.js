document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.search-form__input');
    if (!input) return;

    // Prevent form from submitting
    document.querySelector('.search-form').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    fetch('/data/products.json')
        .then(response => response.json())
        .then(products => {
            input.addEventListener('input', function () {
                const query = this.value.toLowerCase();
                if (!query) return;

                const matched = products.filter(product =>
                    product.name.toLowerCase().includes(query)
                );

                const wrapper = document.querySelector('.predictive-search-wrapper');
                wrapper.innerHTML = '';

                if (matched.length > 0) {
                    const ul = document.createElement('ul');
                    ul.style.padding = '10px';
                    ul.style.background = '#fff';
                    ul.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                    ul.style.borderRadius = '8px';
                    matched.forEach(product => {
                        const li = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = product.url;
                        link.textContent = product.name;
                        link.style.display = 'block';
                        link.style.padding = '6px 10px';
                        link.style.textDecoration = 'none';
                        link.style.color = '#333';
                        link.addEventListener('mouseover', () => link.style.background = '#f1f1f1');
                        link.addEventListener('mouseout', () => link.style.background = 'transparent');
                        li.appendChild(link);
                        ul.appendChild(li);
                    });
                    wrapper.appendChild(ul);
                } else {
                    wrapper.innerHTML = '<p style="padding:10px;color:#888;">No results found</p>';
                }
            });
        });
});
