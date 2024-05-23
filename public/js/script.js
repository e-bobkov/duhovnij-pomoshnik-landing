document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu__btn');
    const menuMobile = document.querySelector('.header__menu-items');

    menuBtn.addEventListener('click', () => {
        menuMobile.classList.toggle('menu--open');
    });

    const form = document.querySelector('form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const comment = formData.get('comment');

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, comment })
            };

            const response = await fetch('/faq', options);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Ваши контактные данные сохранены, с вами свяжутся в ближайшее время!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
