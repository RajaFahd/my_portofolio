document.addEventListener('DOMContentLoaded', function() {
    // Jalankan saat load pertama dan saat scroll
    window.addEventListener('load', handleScrollAnimation);
    window.addEventListener('scroll', handleScrollAnimation);
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const contentDiv = entry.target.querySelector('.hidden-div');
            if (contentDiv) {
              contentDiv.classList.add('animate-fade-in-up', 'opacity-0');
              contentDiv.classList.remove('hidden-div');
              
              contentDiv.addEventListener('animationend', () => {
                contentDiv.classList.remove('animate-fade-in-up', 'opacity-0');
              }, { once: true });
            }
          }
        });
      }, { threshold: 0.8 });
      
      document.querySelectorAll('.section-container').forEach(section => {
        observer.observe(section);
      });
    // Sembunyikan semua section kecuali hero saat pertama load
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section (index 0)
            section.classList.add('hidden-section');
        }
    });
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the position to scroll to, accounting for the fixed header
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Highlight active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        // Hero section langsung muncul
        document.querySelector('#home').classList.add('visible-section');
        
        // Cek scroll position untuk section lain
        handleScrollAnimation();
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const headerHeight = document.querySelector('nav').offsetHeight;
            
            if (scrollPosition >= sectionTop - headerHeight - 50 && 
                scrollPosition < sectionTop + sectionHeight - headerHeight - 50) {
                const id = '#' + section.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    });

    // Update active navigation link
    function updateActiveNavLink(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    const texts = [
        "Hi, I'm Raja Fahd Saefudin"
    ];
    const typedTextElement = document.getElementById('typed-text');
    let i = 0, j = 0;
    let isDeleting = false;
    let currentText = '';
    const speed = 100;
    const pauseBetween = 2000;

    function typeWriter() {
        const currentString = texts[j];
        
        if (isDeleting) {
            currentText = currentString.substring(0, i-1);
            i--;
        } else {
            currentText = currentString.substring(0, i+1);
            i++;
        }

        typedTextElement.textContent = currentText;

        if (!isDeleting && i === currentString.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseBetween);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            j = (j + 1) % texts.length;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(typeWriter, speed);
        }
    }

    // Mulai animasi
    setTimeout(typeWriter, 1000);

    function handleScrollAnimation() {
        const sections = document.querySelectorAll('.section-container');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        sections.forEach((section, index) => {
          const sectionTop = section.getBoundingClientRect().top;
          
          if (sectionTop < triggerPoint) {
            const contentDiv = section.querySelector('.hidden-div');
            
            if (contentDiv) {
              // Tambahkan class animasi
              contentDiv.classList.add(
                'animate-fade-in-up',
                'opacity-0'
              );
              
              // Hapus class hidden setelah delay
              setTimeout(() => {
                contentDiv.classList.remove('hidden-div');
              }, index * 100);
              
              // Bersihkan setelah animasi selesai
              contentDiv.addEventListener('animationend', () => {
                contentDiv.classList.remove(
                  'animate-fade-in-up',
                  'opacity-0'
                );
                contentDiv.style.opacity = '1';
              }, { once: true });
            }
          }
        });
    }
    // Fungsi untuk menangani scroll animasi
    
});