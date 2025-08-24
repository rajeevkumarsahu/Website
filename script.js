const header = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // after 50px scroll
    header.classList.add('scrolled');
    header.classList.remove('transparent');
  } else {
    header.classList.add('transparent');
    header.classList.remove('scrolled');
  }
});

// video autoplay section
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoURL = 'https://www.youtube.com/embed/qdLYbA9Mu_M?autoplay=1&mute=1';

// When modal opens → autoplay muted
videoModal.addEventListener('show.bs.modal', () => {
  videoFrame.src = videoURL;
});

// When modal closes → stop video
videoModal.addEventListener('hidden.bs.modal', () => {
  videoFrame.src = '';
});

// Timeline data
const timelineData = {
  1940: {
    text: 'In 1940, our foundation was laid with small beginnings that grew over time.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKyYsTv1eJ8csiluvewErsunLPJOuiXK7eXg&s',
  },
  1960: {
    text: 'By 1960, we expanded operations into new markets and industries.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYU0e2UQ6DofcsBtQkQjSyCppFh-fgvjvikg&s',
  },
  1970: {
    text: 'During the 1970s, innovation and growth defined our company vision.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEFXDm-rZqjOuBoEm-sx5ps1NW8vuV6Sr9A&se',
  },
  2010: {
    text: 'In 2010, we started a global vision and expanded to more cities worldwide.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEFXDm-rZqjOuBoEm-sx5ps1NW8vuV6Sr9A&s',
  },
  2020: {
    text: 'By 2020, we became a recognized leader in multiple industries worldwide.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYU0e2UQ6DofcsBtQkQjSyCppFh-fgvjvikg&s',
  },
};

// Elements
const timelineItems = document.querySelectorAll('#timeline li');
const textEl = document.getElementById('timeline-text');
const imageEl = document.getElementById('timeline-image');

timelineItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove active class
    timelineItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');

    const year = item.getAttribute('data-year');

    // Fade out content
    textEl.classList.remove('show');
    imageEl.classList.remove('show');

    setTimeout(() => {
      // Change content after fade out
      textEl.textContent = timelineData[year].text;
      imageEl.src = timelineData[year].image;

      // Fade in
      textEl.classList.add('show');
      imageEl.classList.add('show');
    }, 400); // wait 0.4s for fade-out
  });
});

// Counter animation function
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // 2 sec
  const stepTime = 20;
  const increment = target / (duration / stepTime);

  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.innerText = target + '+';
      clearInterval(timer);
    } else {
      counter.innerText = Math.floor(current);
    }
  }, stepTime);
}

// Intersection Observer for performance
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // run only once
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});
