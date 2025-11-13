// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manejo del formulario de contacto con Formspark
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    try {
        // Enviar formulario a Formspark
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Limpiar el formulario
            form.reset();
            
            // Redirigir después de 3 segundos
            setTimeout(() => {
                successMessage.classList.remove('show');
                // Si quieres redirigir a otra página, descomenta la siguiente línea:
                // window.location.href = 'index.html';
            }, 3000);
        } else {
            alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensaje';
    }
});

// Animación para las tarjetas de servicio al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});