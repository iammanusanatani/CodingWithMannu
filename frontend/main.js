let currentPage = 0;
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

const dayBtns = document.querySelectorAll('.day-btn');

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle('active', i === index);
  });

  // REMOVE active from all buttons
  dayBtns.forEach(btn => btn.classList.remove('active'));

  // ADD active to current button
  if (dayBtns[index]) {
    dayBtns[index].classList.add('active');
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function goToDay(index) {
  currentPage = index;
  showPage(index);
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

showPage(currentPage);


const cards = document.querySelectorAll('.card');

function revealCards() {
  const trigger = window.innerHeight * 0.85;

  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < trigger) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealCards);