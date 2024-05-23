const menuBtn = document.querySelector('.menu__btn');
const menuMobile = document.querySelector('.header__menu-items');

menuBtn.addEventListener('click', () => {
    menuMobile.classList.toggle('menu--open');
})
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const comment = formData.get('comment');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, comment })
        };

        fetch('/faq', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .then(() => {
                alert('Ваши контактные данные сохранены, с вами свяжутся в ближайшее время!');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
