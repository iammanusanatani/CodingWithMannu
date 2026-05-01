// Dashboard profile

// async function loadDashboard() {
//   const email = localStorage.getItem("loggedInUser");
//   if (!email) { window.location.href = "login.html"; return; }

//   const res = await fetch(`/api/dashboard/${email}`);
//   const data = await res.json();
//   document.getElementById("userName").innerText = `${data.user.fullName}`;
//   document.getElementById("userEmail").innerText = `${data.user.email}`;
// }
// loadDashboard();

async function loadDashboard() {
  const email = localStorage.getItem("loggedInUser");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`https://codingwithmannu-1.onrender.com/api/dashboard/${email}`);
    const data = await res.json();

    // 👇 ye line important hai
    console.log(data);

    // 👇 safe way (dono cases handle karega)
    document.getElementById("userName").innerText =
      data.user?.fullName || data.fullName || "No Name";

    document.getElementById("userEmail").innerText =
      data.user?.email || data.email || "No Email";

  } catch (err) {
    console.log(err);
    alert("Error loading dashboard");
  }
}

// sirf dashboard page pe run
if (window.location.pathname.includes("dashboard.html")) {
  loadDashboard();
}

// async function loadDashboard() {
//   const email = localStorage.getItem("loggedInUser");
//   if (!email) { window.location.href = "login.html"; return; }

//   const res = await fetch(`/api/dashboard/${email}`);
//   const data = await res.json();
//   document.getElementById("userName").innerText = `${data.user.fullName}`;
//   document.getElementById("userEmail").innerText = `${data.user.email}`;
// }

// // ✅ Only run on dashboard page
// if (window.location.pathname.includes("dashboard.html")) {
//   loadDashboard();
// }


// login signup button
function renderNavbar() {
  const email = localStorage.getItem("loggedInUser");
  const name = localStorage.getItem("loggedInUserName");

  // Top navbar auth
  const navAuthTop = document.querySelector(".menuList span");

  // Sidebar sections
  const sidebarUser = document.getElementById("sidebar-user");
  const sidebarBottom = document.getElementById("sidebar-bottom");

  if (email) {
    // Show user name at top
    navAuthTop.innerHTML = `<a href="dashboard.html" class="navAuthTop">${name || "Profile"}</a>`;
    sidebarUser.innerHTML = `<p>👤<p><a href="dashboard.html" class="profile-btn">${name || "Profile"}</a>`;

    // Show logout at bottom
    sidebarBottom.innerHTML = `<a href="#" id="logoutBtn">Logout</a>`;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserName");
      renderNavbar();
    });

  } else {
    // Show login/signup when logged out
    navAuthTop.innerHTML = `<a  href="login.html" class="navAuthTop">Login</a> <a href="signup.html" class="navAuthTop">Signup</a>`;
    sidebarUser.style = "display:none;"; // no user name at top
    sidebarBottom.innerHTML = `<a href="login.html" class="logout-btn">Login</a> <a href="signup.html" class="logout-btn">Signup</a>`;
  }
}
renderNavbar();



// sidebar

// function openSidebar() {
//   document.getElementById("mySidebar").classList.add("open");
// }

// function closeSidebar() {
//   document.getElementById("mySidebar").classList.remove("open");
// }
function openSidebar() {
  document.getElementById("mySidebar").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeSidebar() {
  document.getElementById("mySidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}



async function getData() {
  const res = await fetch("https://codingwithmannu-1.onrender.com");
  const data = await res.json();
  console.log(data);
}

getData();






function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove('active');
  });

  setTimeout(() => {
    pages[index].classList.add('active');
  }, 100);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const container = document.querySelector('.scroll-container');

let scrollAmount = 0;
let isScrolling = true;

// Smooth animation
function smoothScroll() {
  if (isScrolling) {
    scrollAmount += 1; // speed control (0.5 = smooth, 1 = fast)
    container.scrollLeft = scrollAmount;

    // reset at end
    if (scrollAmount >= container.scrollWidth - container.clientWidth) {
      scrollAmount = 0;
    }
  }
  requestAnimationFrame(smoothScroll);
}

// Start animation
smoothScroll();

// Hover pe stop
container.addEventListener("mouseenter", () => {
  isScrolling = false;
});

// Mouse hatate hi start
container.addEventListener("mouseleave", () => {
  isScrolling = true;
});




/* ========== SOFT PARTICLES ========== */
const pCanvas = document.getElementById("particles");
const pCtx = pCanvas.getContext("2d");

pCanvas.width = window.innerWidth;
pCanvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * pCanvas.width;
    this.y = Math.random() * pCanvas.height;
    this.size = Math.random() * 1.5;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.speedY = Math.random() * 0.3 - 0.15;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > pCanvas.width) this.x = Math.random() * pCanvas.width;
    if (this.y < 0 || this.y > pCanvas.height) this.y = Math.random() * pCanvas.height;
  }

  draw() {
    pCtx.fillStyle = "#38bdf8"; // soft blue
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/* Resize */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
});

const texts = [
  "Learn Coding",
  "Build Projects",
  "Master DSA",
  "Become Developer"
];

let i = 0, j = 0, isDel = false;
const typing = document.querySelector(".typing");

function type() {
  let txt = texts[i];

  typing.textContent = txt.substring(0, j);

  if (!isDel) {
    j++;
    if (j > txt.length) { isDel = true; setTimeout(type, 2000); return; }
  } else {
    j--;
    if (j === 0) { isDel = false; i = (i + 1) % texts.length; }
  }

  setTimeout(type, isDel ? 40 : 80);
}
type();

/* ===== CODE TYPING ===== */
const codeText =
  `function startLearning() {
  console.log("Welcome Back");
}

startLearning();`;

let k = 0;
const codeBox = document.getElementById("code");

function typeCode() {
  if (k < codeText.length) {
    codeBox.textContent += codeText.charAt(k);
    k++;
    setTimeout(typeCode, 30);
  }
}
typeCode();


