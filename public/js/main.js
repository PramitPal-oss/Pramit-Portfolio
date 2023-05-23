/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal(
  '.home__img, .about__subtitle, .about__text, .about__img, .skills__img',
  {
    delay: 200,
  }
);
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal(
  '.skills__data, .work__container--card, .contact-left, .contact-right',
  {
    interval: 400,
  }
);

/* ===== DarkMode ===== */

const toggle = document.querySelector('.black-white');
const sun = document.querySelector('.bxs-sun');
const moon = document.querySelector('.bxs-moon');
toggle.addEventListener('click', function (e) {
  e.preventDefault();
  document.body.classList.toggle('light--mode');
  if (document.body.classList.contains('light--mode')) {
    sun.classList.add('active-mode');
    sun.classList.remove('deactive-mode');
    moon.classList.add('deactive-mode');
    moon.classList.remove('active-mode');
  } else {
    sun.classList.remove('active-mode');
    sun.classList.add('deactive-mode');
    moon.classList.remove('deactive-mode');
    moon.classList.add('active-mode');
  }
});

/*===== SUBMIT FORM DATA TO DATABASE =====*/

const submit = document.querySelector('.submit');
const userName = document.getElementById('name');
const message = document.getElementById('message');
const email = document.getElementById('email');
const err = document.querySelector('.err');
const contact = document.querySelector('.contact-right');
const valid = document.querySelector('.valid');

function validateEmail() {
  if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    err.innerHTML = 'Please enter a valid email';
    email.style.borderBottomColor = 'red';
    err.style.top = '120%';
    return false;
  }
  err.innerHTML = '';
  email.style.borderBottomColor = 'green';
  err.style.top = '100%';
  return true;
}

submit.addEventListener('click', async function (e) {
  e.preventDefault();
  console.log(userName.value, message.value, email.value);
  if (userName.value.length === 0) return alert('Please enter Your name');
  if (message.value.length === 0) return alert('Please enter Your message');

  if (!validateEmail()) return alert('Please enter a valid email');

  const res = await fetch(
    `https://pramit-portfolio-default-rtdb.firebaseio.com/${userName.value}.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        message: message.value,
        email: email.value,
      }),
    }
  );
  valid.innerHTML = `✅ Hey ${userName.value} thanks for connecting with me 😀. I will get back to you shortly.`;
  contact.style.display = 'none';
  valid.style.display = 'block';
  userName.value = '';
  email.value = '';
  message.value = '';
});
