const playButtons = document.querySelectorAll(".play-btn");

const fullscreenPlayer = document.getElementById("fullscreenPlayer");

const fullscreenVideo = document.getElementById("fullscreenVideo");

const closeBtn = document.getElementById("closeBtn");


playButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const reelCard = btn.parentElement;

        const videoSource = reelCard.querySelector("source").src;

        fullscreenPlayer.style.display = "flex";

        fullscreenVideo.src = videoSource;

        fullscreenVideo.play();

    });

});

closeBtn.addEventListener("click", () => {

    fullscreenPlayer.style.display = "none";

    fullscreenVideo.pause();

});


