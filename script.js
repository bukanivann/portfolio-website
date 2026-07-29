// Navbar scroll effect
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
    observer.observe(element);
});

// Parallax/Glitch effect on image wrapper
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        imageWrapper.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Lightbox Modal for Gallery Images
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length > 0) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('lightbox-modal');
        
        const modalImg = document.createElement('img');
        modalImg.classList.add('lightbox-content');
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Open modal on image click
        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                modalImg.src = img.src;
            });
        });

        // Close modal logic
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // match transition duration
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }
});

// Accordion Logic for Experience Section
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');
        
        header.addEventListener('click', () => {
            // Check if this item is currently active
            const isActive = item.classList.contains('active');
            
            // Close all items (optional: if you only want one open at a time)
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                if(acc.querySelector('.accordion-body')) {
                    acc.querySelector('.accordion-body').style.maxHeight = null;
                }
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                // Calculate height including nested images if they load later, but scrollHeight works for text
                body.style.maxHeight = body.scrollHeight + "px";
                
                // Update maxHeight slightly after to account for any lazy loaded content
                setTimeout(() => {
                    body.style.maxHeight = body.scrollHeight + "px";
                }, 100);
            }
        });
    });
});

// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});
