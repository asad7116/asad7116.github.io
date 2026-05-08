document.addEventListener('DOMContentLoaded', function(){
  // Force scroll to top on page load
  window.scrollTo(0, 0);
  
  // Initialize AOS (Animate On Scroll) library
  if(typeof AOS !== 'undefined'){
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      mirror: false,
      offset: 120,
      delay: 0
    });
  }

  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if(href !== '#'){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Add active nav highlight on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        document.querySelectorAll('.main-nav a').forEach(link => {
          link.style.color = '';
        });
        const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);
        if(activeLink){
          activeLink.style.color = '#10b981';
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Skill tags interactive effect
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) translateY(-2px)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
    });
  });

  // Project card parallax effect on hover
  document.querySelectorAll('.portfolio-project').forEach(project => {
    project.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) * 0.05;
      const rotateY = (centerX - x) * 0.05;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Counter animation for metrics
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 30;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if(current >= target){
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 30);
  });

  const demoBtn = document.getElementById('demoBtn');
  if(demoBtn){
    demoBtn.addEventListener('click', ()=>{
      alert('Thanks — demo request noted. You can replace this handler with a form or scheduling link.');
    });
  }

  // Project modal data and handlers
  const projects = {
    1: {
      title: 'AI-Enhanced Freelancing Platform (FYP)',
      img: 'img/project1.jpg',
      desc: 'Building a full-stack freelancing platform using React, Node.js, Express, and MongoDB, integrating AI-based features to improve matching and user experience. Implements auth, dashboards, project posting and real-time updates.',
      tech: 'React, Node.js, Express, MongoDB',
      link: '#'
    },
    2: {
      title: 'Shopify Coffee Store',
      img: 'img/project2.jpg',
      desc: 'Created an online store using Shopify to sell coffee beans and machines. Handled product listings, integrated payment options, and customized the UI.',
      tech: 'Shopify, HTML, CSS',
      link: '#'
    },
    3: {
      title: 'Airbnb Clone',
      img: 'img/project3.jpg',
      desc: 'Full-stack platform with user authentication, property listings, and booking functionality built with React and Node.js.',
      tech: 'React, Node.js, MongoDB',
      link: '#'
    }
  };

  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.getElementById('modalClose');

  function openModal(id){
    const p = projects[id];
    if(!p) return;
    modalTitle.textContent = p.title;
    modalImg.src = p.img;
    modalImg.alt = p.title;
    modalDesc.textContent = p.desc;
    modalTech.textContent = p.tech;
    modalLink.href = p.link;
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }

  cards.forEach(c=>{
    c.addEventListener('click', ()=>{
      const id = c.getAttribute('data-id');
      openModal(id);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

});
