const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.textContent = opened ? '✕' : '☰';
});
document.querySelectorAll('.nav-inner a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.dot')];
let currentSlide = 0;
let sliderTimer;
function showSlide(index) {
  currentSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}
function startSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => showSlide((currentSlide + 1) % slides.length), 5000);
}
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startSlider(); }));
startSlider();

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent('Admission Enquiry - ' + (data.get('name') || 'Website Visitor'));
  const body = encodeURIComponent(
    'Name: ' + data.get('name') + '\\n' +
    'Email: ' + data.get('email') + '\\n' +
    'Phone: ' + (data.get('phone') || 'Not provided') + '\\n' +
    'Course: ' + (data.get('course') || 'Not selected') + '\\n\\n' +
    'Message: ' + (data.get('message') || 'No message')
  );
  window.location.href = 'mailto:skvp418@gmail.com?subject=' + subject + '&body=' + body;
});
