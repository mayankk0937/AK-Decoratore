/* ==========================================================================
   AK DECORATORE
    - PREMIUM WEBSITE INTERACTIVE ENGINE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. PAGE INITIALIZATION & CURTAIN REVEAL ANIMATION
  // ==========================================================================
  // Triggers the curtains to slide open after a micro-delay for smooth rendering
  setTimeout(() => {
    document.body.classList.add('loaded');

    // Completely remove curtains from layout tree after opening to prevent any layout overflow on Safari/Chrome
    setTimeout(() => {
      const curtainWrapper = document.querySelector('.curtain-wrapper');
      if (curtainWrapper) {
        curtainWrapper.style.display = 'none';
      }
    }, 3000); // 2.8s CSS transition + small buffer
  }, 400);

  // ==========================================================================
  // 2. SCROLLED NAVIGATION BAR EFFECT
  // ==========================================================================
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case of page refresh

  // ==========================================================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');

      // Animate hamburger to 'X'
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
      spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(4px, -4px)' : 'none';
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Add responsive styling directly for active class
  const mobileMenuStyles = document.createElement('style');
  mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        height: calc(100vh - 70px);
        background-color: var(--color-bg-light);
        flex-direction: column;
        justify-content: center;
        gap: 3rem;
        transform: translateX(-100%);
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      }
      .nav-menu.active {
        transform: translateX(0);
      }
      .menu-toggle {
        display: block !important;
      }
      .header-btn {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(mobileMenuStyles);

  // ==========================================================================
  // 4. INTERACTIVE PORTFOLIO/GALLERY FILTER
  // ==========================================================================
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryTabs.length > 0 && galleryItems.length > 0) {
    const filterGallery = (category) => {
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // First, fade out and scale down
        item.style.opacity = '0';
        item.style.transform = 'scale(0.92) translateY(10px)';

        setTimeout(() => {
          if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            // Force layout reflow
            item.offsetHeight;
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    };

    galleryTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');
        filterGallery(filterValue);
      });
    });

    // Initialize Gallery View
    filterGallery('all');
  }

  // ==========================================================================
  // 4b. INTERACTIVE LIBRARY FILTER
  // ==========================================================================
  const libraryTabs = document.querySelectorAll('.library-tab');
  const libraryItems = document.querySelectorAll('.library-item');

  if (libraryTabs.length > 0 && libraryItems.length > 0) {
    const filterLibrary = (category) => {
      libraryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // First, fade out and scale down
        item.style.opacity = '0';
        item.style.transform = 'scale(0.92) translateY(10px)';

        setTimeout(() => {
          if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            // Force layout reflow
            item.offsetHeight;
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    };

    libraryTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Remove active class from all tabs
        libraryTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');
        filterLibrary(filterValue);
      });
    });

    // Initialize Library View
    filterLibrary('all');
  }

  // ==========================================================================
  // 5. IMAGE LIGHTBOX MODAL WITH ZOOM
  // ==========================================================================
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    const registerLightbox = (items) => {
      items.forEach(item => {
        item.addEventListener('click', () => {
          const img = item.querySelector('img');
          const title = item.querySelector('.gallery-info-title') || item.querySelector('.library-info-title');

          if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (title) {
              lightboxTitle.textContent = title.textContent;
            } else {
              lightboxTitle.textContent = 'Premium AK Decoratore Installation';
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
          }
        });
      });
    };

    registerLightbox(galleryItems);
    registerLightbox(libraryItems);
    
    const closeLightboxModal = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto'; // Unlock background scrolling
    };

    lightboxClose.addEventListener('click', closeLightboxModal);

    // Close on clicking the dark background overlay
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxModal();
      }
    });

    // Close on pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightboxModal();
      }
    });
  }

  // ==========================================================================
  // 6. INQUIRY LEAD CAPTURE & FORM PROCESSING
  // ==========================================================================
  const leadForm = document.getElementById('measurementForm');
  const successModal = document.querySelector('.success-modal');
  const closeSuccessBtn = document.querySelector('.close-success');
  let lastWhatsappUrl = '';

  if (leadForm && successModal) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      // Get values
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail').value.trim();

      const serviceElement = document.getElementById('clientService');
      const serviceText = serviceElement.options[serviceElement.selectedIndex].text;

      const location = document.getElementById('clientLocation').value.trim();
      const requirements = document.getElementById('clientRequirements').value.trim();

      // Basic validation
      if (!name || !phone || !location) {
        alert('Please fill in your Name, Phone Number, and Project Location.');
        return;
      }

      // Phone Regex (Indian phone numbers: 10 digits, optional country code)
      const phoneRegex = /^[6-9]\d{9}$/;
      // Strip out spaces or hyphens for clean matching if present
      const cleanPhone = phone.replace(/[\s-]/g, '').slice(-10);

      if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // Compile Lead Object
      const leadData = {
        name,
        phone,
        email,
        service: serviceText,
        location,
        requirements,
        timestamp: new Date().toISOString(),
        id: 'AKL-' + Math.floor(100000 + Math.random() * 900000)
      };

      // Store in local storage for demonstration / resilience
      const existingLeads = JSON.parse(localStorage.getItem('ak_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('ak_leads', JSON.stringify(existingLeads));

      console.log('New Lead Captured Successfully:', leadData);

      // Generate WhatsApp text
      const waMessage = `Hello AK Decorators, I have submitted an inquiry on your website:\n\n*Name*: ${name}\n*Phone*: ${phone}\n*Service*: ${serviceText}\n*Location*: ${location}\n*Requirements*: ${requirements || 'None'}`;
      const encodedMessage = encodeURIComponent(waMessage);
      lastWhatsappUrl = `https://wa.me/918700476782?text=${encodedMessage}`;

      // Trigger conversion success presentation
      successModal.classList.add('active');
      leadForm.reset();
    });

    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        if (lastWhatsappUrl) {
          window.open(lastWhatsappUrl, '_blank');
        }
      });
    }

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 7. SMOOTH VIEWPORT SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.service-card, .timeline-item, .reviews-carousel-container, .trust-item, .section-title-wrapper, .about-owner-grid, .team-card');

  const revealOnScrollOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // Set initial hidden styling for reveal items
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, revealOnScrollOptions);

  revealElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // ==========================================================================
  // 8. 3D CIRCULAR TESTIMONIAL CAROUSEL ENGINE
  // ==========================================================================
  const reviewsCarouselTrack = document.querySelector('.reviews-carousel-3d');
  const reviewCards = document.querySelectorAll('.review-card-3d');
  const reviewPrevBtn = document.getElementById('reviewPrevBtn');
  const reviewNextBtn = document.getElementById('reviewNextBtn');

  if (reviewsCarouselTrack && reviewCards.length > 0) {
    let activeIndex = 0;
    const cardCount = reviewCards.length;
    const angleStep = 360 / cardCount;
    let autoplayTimer = null;
    const autoplayInterval = 5000; // 5 seconds

    // Calculate dynamic 3D radius based on screen size
    const getCarouselRadius = () => {
      const width = window.innerWidth;
      if (width <= 480) return 180;
      if (width <= 768) return 260;
      return 360; // Desktop
    };

    const updateCarousel = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;

      if (isMobile) {
        // Flat stack layout for mobile to prevent text blur and overlapping corners
        reviewsCarouselTrack.style.transform = 'none';

        const normalizedActiveIndex = ((activeIndex % cardCount) + cardCount) % cardCount;

        reviewCards.forEach((card, index) => {
          let diff = (index - normalizedActiveIndex) % cardCount;
          if (diff < -cardCount / 2) diff += cardCount;
          if (diff > cardCount / 2) diff -= cardCount;

          const absDiff = Math.abs(diff);

          if (absDiff === 0) {
            card.style.transform = 'translateX(0) scale(1)';
            card.style.opacity = '1';
            card.style.zIndex = '10';
            card.style.pointerEvents = 'auto';
            card.classList.add('active');
          } else if (diff === 1) {
            // Next card shifted right
            const shiftX = width <= 480 ? 55 : 75;
            card.style.transform = `translateX(${shiftX}px) scale(0.85)`;
            card.style.opacity = '0.45';
            card.style.zIndex = '5';
            card.style.pointerEvents = 'none';
            card.classList.remove('active');
          } else if (diff === -1) {
            // Prev card shifted left
            const shiftX = width <= 480 ? -55 : -75;
            card.style.transform = `translateX(${shiftX}px) scale(0.85)`;
            card.style.opacity = '0.45';
            card.style.zIndex = '5';
            card.style.pointerEvents = 'none';
            card.classList.remove('active');
          } else {
            // Hidden cards
            card.style.transform = 'translateX(0) scale(0.7)';
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
            card.classList.remove('active');
          }
        });
      } else {
        // True 3D circular cylinder carousel for desktop
        const radius = getCarouselRadius();
        document.documentElement.style.setProperty('--carousel-radius', `${radius}px`);

        reviewsCarouselTrack.style.transform = `translateZ(-${radius}px) rotateY(${-activeIndex * angleStep}deg)`;

        const normalizedActiveIndex = ((activeIndex % cardCount) + cardCount) % cardCount;

        reviewCards.forEach((card, index) => {
          let diff = (index - normalizedActiveIndex) % cardCount;
          if (diff < -cardCount / 2) diff += cardCount;
          if (diff > cardCount / 2) diff -= cardCount;

          const absDiff = Math.abs(diff);

          // Reset inline transform to let CSS variables handle the 3D positioning
          card.style.transform = '';
          card.style.setProperty('--card-angle', `${index * angleStep}`);

          if (absDiff === 0) {
            card.style.setProperty('--card-scale', '1');
            card.style.setProperty('--card-opacity', '1');
            card.style.setProperty('--card-pointer-events', 'auto');
            card.style.zIndex = '10';
            card.classList.add('active');
          } else if (absDiff === 1) {
            card.style.setProperty('--card-scale', '0.85');
            card.style.setProperty('--card-opacity', '0.6');
            card.style.setProperty('--card-pointer-events', 'none');
            card.style.zIndex = '5';
            card.classList.remove('active');
          } else {
            card.style.setProperty('--card-scale', '0.7');
            card.style.setProperty('--card-opacity', '0.15');
            card.style.setProperty('--card-pointer-events', 'none');
            card.style.zIndex = '1';
            card.classList.remove('active');
          }
        });
      }
    };

    // Navigation triggers
    const handleNext = () => {
      activeIndex++;
      updateCarousel();
      resetAutoplay();
    };

    const handlePrev = () => {
      activeIndex--;
      updateCarousel();
      resetAutoplay();
    };

    if (reviewNextBtn) {
      reviewNextBtn.addEventListener('click', handleNext);
    }
    if (reviewPrevBtn) {
      reviewPrevBtn.addEventListener('click', handlePrev);
    }

    // Autoplay logic
    const startAutoplay = () => {
      if (!autoplayTimer) {
        autoplayTimer = setInterval(() => {
          activeIndex++;
          updateCarousel();
        }, autoplayInterval);
      }
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Hover listeners to pause autoplay
    const carouselContainer = document.querySelector('.reviews-carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoplay);
      carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Touch & Mouse Drag Gestures
    let startX = 0;
    let isDragging = false;
    const swipeThreshold = 50; // min pixels dragged to trigger swipe

    const handleDragStart = (e) => {
      isDragging = true;
      startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      stopAutoplay();
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      // Prevent scrolling page while swiping the reviews carousel on mobile
      if (e.type.startsWith('touch') && Math.abs(startX - e.touches[0].clientX) > 10) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleDragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.type.startsWith('touch') ? e.changedTouches[0].clientX : e.clientX;
      const dragDistance = endX - startX;

      if (Math.abs(dragDistance) >= swipeThreshold) {
        if (dragDistance < 0) {
          // Dragged left -> Next
          activeIndex++;
        } else {
          // Dragged right -> Prev
          activeIndex--;
        }
        updateCarousel();
      }
      startAutoplay();
    };

    // Attach gestures to container
    if (carouselContainer) {
      // Touch events
      carouselContainer.addEventListener('touchstart', handleDragStart, { passive: true });
      carouselContainer.addEventListener('touchmove', handleDragMove, { passive: false });
      carouselContainer.addEventListener('touchend', handleDragEnd, { passive: true });

      // Mouse events
      carouselContainer.addEventListener('mousedown', handleDragStart);
      // We listen to drag end/move on window to handle release outside container
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }

    // Handle screen resize to recalculate radius and update transforms
    window.addEventListener('resize', updateCarousel);

    // Initial calculation & kick off autoplay
    updateCarousel();
    startAutoplay();
  }
});
