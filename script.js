// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
    link.classList.add('active');
    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Highlight nav on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const options = {root:null,rootMargin:'-40% 0px -40% 0px',threshold:0};
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(n=>n.classList.toggle('active', n.getAttribute('href') === '#'+id));
    }
  });
},options);
sections.forEach(s=>observer.observe(s));

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projects-grid');
const projects = projectsGrid ? Array.from(projectsGrid.querySelectorAll('.project-card')) : [];
filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projects.forEach(p=>{
      const lang = p.dataset.lang;
      if(filter==='all' || filter===lang){
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    });
  });
});

// Formspree submission handling (progress feedback)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);
    fetch(form.action, {method:'POST',body:data,headers:{'Accept':'application/json'}})
      .then(response=>{
        if(response.ok){
          status.textContent = 'Thanks — I received your message!';
          form.reset();
        } else {
          response.json().then(data=>{
            status.textContent = (data && data.error) ? data.error : 'Oops — there was a problem.';
          });
        }
      })
      .catch(()=>{
        status.textContent = 'Network error — please try again later.';
      });
  });
}

// current year
document.getElementById('cur-year').textContent = new Date().getFullYear();

// helper: let user change profile pic by setting background-image on #profile-pic
// Example: document.getElementById('profile-pic').style.backgroundImage = "url('me.jpg')";
