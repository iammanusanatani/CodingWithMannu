// Dashboard profile

async function loadDashboard() {
  const email = localStorage.getItem("loggedInUser");
  if (!email) { window.location.href = "login.html"; return; }

  const res = await fetch(`/api/dashboard/${email}`);
  const data = await res.json();
  document.getElementById("userName").innerText = `${data.user.fullName}`;
  document.getElementById("userEmail").innerText = `${data.user.email}`;
}
loadDashboard();


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
  const res = await fetch("https://your-backend.onrender.com/api/tutorials");
  const data = await res.json();
  console.log(data);
}

getData();