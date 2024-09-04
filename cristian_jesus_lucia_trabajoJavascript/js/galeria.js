document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  const filterContainer = document.getElementById('gallery-filter');
  
  const projects = [
    { id: 1, title: 'Diseño Responsivo', category: 'web', image: '/images/galeria1.jpg', link: '#' },
    { id: 2, title: 'App Móvil', category: 'app', image: '/images/galeria2.jpg', link: '#' },
    { id: 3, title: 'E-commerce', category: 'web', image: '/images/galeria3.jpg', link: '#' },
    { id: 4, title: 'Branding Corporativo', category: 'branding', image: '/images/galeria4.jpg', link: '#' },
    { id: 5, title: 'UI/UX Design', category: 'ui', image: '/images/galeria5.png', link: '#' },
    { id: 6, title: 'SEO Optimization', category: 'seo', image: '/images/galeria6.jpg', link: '#' },
    // Añade más proyectos según sea necesario
  ];

  function createProjectItem(project) {
    return `
      <div class="col-lg-4 col-md-6 gallery-item ${project.category}" data-aos="fade-up">
        <div class="gallery-wrap">
          <img src="${project.image}" alt="${project.title}">
          <div class="gallery-info">
            <h4>${project.title}</h4>
            <p>${project.category}</p>
            <div class="gallery-links">
              <a href="${project.image}" data-gallery="projectGallery" class="gallery-lightbox" title="${project.title}"><i class="bi bi-plus"></i></a>
              <a href="${project.link}" title="Más Detalles"><i class="bi bi-link"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderGallery() {
    galleryContainer.innerHTML = projects.map(createProjectItem).join('');
    initIsotope();
    initLightbox();
  }

  function createFilterButtons() {
    const categories = ['all', ...new Set(projects.map(p => p.category))];
    filterContainer.innerHTML = categories.map(cat => 
      `<button class="btn btn-outline-primary filter-btn" data-filter="${cat === 'all' ? '*' : '.' + cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>`
    ).join('');
  }

  function initIsotope() {
    const iso = new Isotope(galleryContainer, {
      itemSelector: '.gallery-item',
      layoutMode: 'fitRows'
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    });
  }

  function initLightbox() {
    GLightbox({
      selector: '.gallery-lightbox'
    });
  }

  createFilterButtons();
  renderGallery();

  // Animación al hacer scroll
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});