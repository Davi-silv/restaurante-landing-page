// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Anima o ícone do menu
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Menu Categories Toggle
const categoryButtons = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Remove active de todos os botões e categorias
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Adiciona active ao botão clicado e categoria correspondente
        button.classList.add('active');
        document.querySelector(`.menu-category[data-category="${category}"]`).classList.add('active');
    });
});

// Formulário de Reserva
const reservaForm = document.getElementById('reserva-form');

reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar lógica para enviar os dados
    // Por enquanto, apenas mostra um alerta
    alert('Obrigado pela sua reserva! Entraremos em contato em breve para confirmar.');
    
    // Limpa o formulário
    reservaForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(`Obrigado por se inscrever, ${email}! Você receberá nossas novidades em breve.`);
    
    newsletterForm.reset();
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação ao scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa elementos para animação
document.querySelectorAll('.feature, .menu-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Data mínima para o campo de data (hoje)
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Botão Voltar ao Topo
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contador Animado para Estatísticas
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    };
    
    updateCounter();
};

// Observar seção de estatísticas para animar contadores
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.estatistica-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

const estatisticasSection = document.querySelector('.estatisticas');
if (estatisticasSection) {
    statsObserver.observe(estatisticasSection);
}

// Adicionar animações aos novos elementos
document.querySelectorAll('.promo-card, .galeria-item, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Adicionar efeito de hover nas promoções
document.querySelectorAll('.promo-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'scale(1.05)';
        }
    });
});

// Galeria Lightbox
const galleryData = {
    pratos: [
        { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', title: 'Risotto de Camarão' },
        { url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800', title: 'Filé Mignon' },
        { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', title: 'Salmão Grelhado' },
        { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', title: 'Lasanha à Bolonhesa' }
    ],
    bebidas: [
        { url: 'https://images.unsplash.com/photo-1506377247727-2b5f1b0a0e51?w=800', title: 'Vinho Tinto Reserva' },
        { url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800', title: 'Coquetel Artesanal' },
        { url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800', title: 'Smoothie de Frutas' },
        { url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800', title: 'Cappuccino' }
    ],
    sobremesas: [
        { url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', title: 'Tiramisu Tradicional' },
        { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800', title: 'Brownie com Sorvete' },
        { url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800', title: 'Cheesecake de Frutas Vermelhas' },
        { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800', title: 'Petit Gateau' }
    ],
    ambiente: [
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', title: 'Ambiente Interno' },
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', title: 'Área Externa' },
        { url: 'https://images.unsplash.com/photo-1552569973-610e3c762c1f?w=800', title: 'Mesa para Casais' },
        { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', title: 'Ambiente Familiar' }
    ]
};

let currentGallery = '';
let currentImageIndex = 0;
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const currentImageSpan = document.getElementById('currentImage');
const totalImagesSpan = document.getElementById('totalImages');
const lightboxThumbnails = document.getElementById('lightboxThumbnails');

// Abrir lightbox ao clicar em um item da galeria
document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => {
        currentGallery = item.getAttribute('data-gallery');
        currentImageIndex = 0;
        openLightbox();
    });
});

function openLightbox() {
    const images = galleryData[currentGallery];
    if (!images) return;
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    totalImagesSpan.textContent = images.length;
    updateLightboxImage();
    createThumbnails();
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const images = galleryData[currentGallery];
    if (!images) return;
    
    const currentImage = images[currentImageIndex];
    lightboxImage.src = currentImage.url;
    lightboxImage.alt = currentImage.title;
    currentImageSpan.textContent = currentImageIndex + 1;
    
    // Atualizar thumbnail ativo
    document.querySelectorAll('.lightbox-thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function createThumbnails() {
    const images = galleryData[currentGallery];
    if (!images) return;
    
    lightboxThumbnails.innerHTML = '';
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.url;
        thumbnail.alt = image.title;
        thumbnail.className = 'lightbox-thumbnail';
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
        });
        lightboxThumbnails.appendChild(thumbnail);
    });
}

function nextImage() {
    const images = galleryData[currentGallery];
    if (!images) return;
    
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function prevImage() {
    const images = galleryData[currentGallery];
    if (!images) return;
    
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Fechar ao clicar fora da imagem
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Navegação com teclado
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

