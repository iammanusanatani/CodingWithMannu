const btn1 = document.getElementById("showMoreBtn1");
const extra1 = document.getElementById("extraContent1");
const btn2 = document.getElementById("showMoreBtn2");
const extra2 = document.getElementById("extraContent2");
const btn3 = document.getElementById("showMoreBtn3");
const extra3 = document.getElementById("extraContent3");
const btn4 = document.getElementById("showMoreBtn4");
const extra4 = document.getElementById("extraContent4");
const btn5 = document.getElementById("showMoreBtn5");
const extra5 = document.getElementById("extraContent5");
const btn6 = document.getElementById("showMoreBtn6");
const extra6 = document.getElementById("extraContent6");



function copyCode(event) {
  event.stopPropagation();
  const code = event.target.closest('.code-section').querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    event.target.innerText = "Copied!";
    setTimeout(() => event.target.innerText = "Copy", 2000);
  });
}

function toggleCode(header) {
  const pre = header.nextElementSibling;
  pre.style.display = pre.style.display === "none" ? "block" : "none";
}


//   More data

btn1.addEventListener("click", () => {
    if (extra1.style.display === "none") {
        extra1.style.display = "block";
        btn1.textContent = "Show Less";
    } else {
        extra1.style.display = "none";
        btn1.textContent = "Show More";
    }
});
btn2.addEventListener("click", () => {
    if (extra2.style.display === "none") {
        extra2.style.display = "block";
        btn2.textContent = "Show Less";
    } else {
        extra2.style.display = "none";
        btn2.textContent = "Show More";
    }
});

btn3.addEventListener("click", () => {
    if (extra3.style.display === "none") {
        extra3.style.display = "block";
        btn3.textContent = "Show Less";
    } else {
        extra3.style.display = "none";
        btn3.textContent = "Show More";
    }
});

btn4.addEventListener("click", () => {
    if (extra4.style.display === "none") {
        extra4.style.display = "block";
        btn4.textContent = "Show Less";
    } else {
        extra4.style.display = "none";
        btn4.textContent = "Show More";
    }
});

btn5.addEventListener("click", () => {
    if (extra5.style.display === "none") {
        extra5.style.display = "block";
        btn5.textContent = "Show Less";
    } else {
        extra5.style.display = "none";
        btn5.textContent = "Show More";
    }
});

btn6.addEventListener("click", () => {
    if (extra6.style.display === "none") {
        extra6.style.display = "block";
        btn6.textContent = "Show Less";
    } else {
        extra6.style.display = "none";
        btn6.textContent = "Show More";
    }
});





// Show button when scrolling down
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// Smooth scroll to top
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// Dark mode

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const btn = document.querySelector(".toggle-btn");
    if (document.body.classList.contains("dark-mode")) {
        btn.textContent = "☀️";
    } else {
        btn.textContent = "🌙";
    }
}