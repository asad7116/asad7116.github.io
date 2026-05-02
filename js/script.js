document.addEventListener('DOMContentLoaded', function(){
  // Initialize AOS (Animate On Scroll) library
  if(typeof AOS !== 'undefined'){
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true,
      offset: 120,
      delay: 0
    });
  }

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
