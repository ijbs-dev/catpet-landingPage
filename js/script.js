const bannerSwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 10000,  
        disableOnInteraction: false,  
    }
});


const servicesSwiper = new Swiper('#services-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next-services',
        prevEl: '.swiper-button-prev-services',
    },
    autoplay: {
        delay: 10000,
        disableOnInteraction: true,
    },
    breakpoints: {
        768: {  
            slidesPerView: 3,
            disableOnInteraction: true,
        }
    }
});


window.addEventListener('load', () => {
    setTimeout(() => {
        testimonialsSwiper.update();
    }, 500);  
});

const testimonialsSwiper = new Swiper('#testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next-services',
        prevEl: '.swiper-button-prev-services',
    },
    autoplay: {
        delay: 10000,  
        disableOnInteraction: true,
    },
    breakpoints: {
        768: {  
            slidesPerView: 3,
            disableOnInteraction: true,
        }
    }
});


window.addEventListener('load', () => {
    servicesSwiper.update();
    testimonialsSwiper.update();
});


fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        const servicesContainer = document.getElementById('services-container');
        const breedsWithImages = data.filter(breed => breed.reference_image_id);

        
        breedsWithImages.forEach(breed => {
            const imageUrl = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`;
            servicesContainer.innerHTML += `
                <div class="swiper-slide bg-white p-6 rounded-lg shadow-md">
                    <img src="${imageUrl}" alt="${breed.name}" class="w-full h-40 object-cover rounded-md">
                    <h3 class="text-lg font-semibold mt-4">${breed.name}</h3>
                    <p class="text-gray-600 mt-2">${breed.temperament}</p>
                </div>
            `;
        });

        servicesSwiper.update();  
    })
    .catch(error => {
        console.error('Erro ao carregar os serviços:', error);
        document.getElementById('services-container').innerHTML = `<p class="text-red-500">Erro ao carregar os serviços. Tente novamente mais tarde.</p>`;
    });


fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const testimonialsContainer = document.getElementById('testimonials-container');

        data.forEach((user, index) => {
            const imageUrl = `https://picsum.photos/200?random=${index + 1}`;
            testimonialsContainer.innerHTML += `
                <div class="swiper-slide bg-white p-6 rounded-lg shadow-md">
                    <img src="${imageUrl}" alt="Imagem de ${user.name}" class="w-16 h-16 rounded-full object-cover">
                    <h3 class="text-lg font-semibold mt-4">${user.name}</h3>
                    <p class="text-gray-600 mt-2">${user.company.catchPhrase}</p>
                </div>
            `;
        });

        testimonialsSwiper.update();
    })
    .catch(error => {
        console.error('Erro ao carregar os depoimentos:', error);
        document.getElementById('testimonials-container').innerHTML = `<p class="text-red-500">Erro ao carregar os depoimentos. Tente novamente mais tarde.</p>`;
    });


emailjs.init('EMAILJS_PUBLIC_KEY');

const btn = document.getElementById('button');
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    const serviceID = 'EMAILJS_SERVICE_ID';
    const templateID = 'EMAILJS_TEMPLATE_ID';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar';
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.value = 'Enviar';
            alert(JSON.stringify(err));
        });
});

document.getElementById('menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});