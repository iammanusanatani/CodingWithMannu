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
    navAuthTop.innerHTML = `<a href="dashboard.html">${name || "Profile"}</a>`;
    sidebarUser.innerHTML = `<a href="dashboard.html" class="profile-btn">${name || "Profile"}</a>`;

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
    sidebarUser.innerHTML = ""; // no user name at top
    sidebarBottom.innerHTML = `<a href="login.html" class="logout-btn">Login</a> <a href="signup.html" class="logout-btn">Signup</a>`;
  }
}
renderNavbar();



// sidebar

function openSidebar() {
  document.getElementById("mySidebar").classList.add("open");
}

function closeSidebar() {
  document.getElementById("mySidebar").classList.remove("open");
}

async function getData() {
  const res = await fetch("https://codingwithmannu-1.onrender.com");
  const data = await res.json();
  console.log(data);
}

getData();






// dashboard logoutbtn

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  // User details show karna
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  if (userName) document.getElementById("userName").textContent = userName;
  if (userEmail) document.getElementById("userEmail").textContent = userEmail;

  // Logout button ka kaam
  logoutBtn.addEventListener("click", () => {
    // Sab data clear karo
    localStorage.clear();

    // Index.html pe redirect karo
    window.location.href = "index.html";
  });
});


