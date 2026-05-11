document.getElementById("contactForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            // Inputs
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            let loader = document.getElementById("loader");
            let status = document.getElementById("status");
            let button = document.querySelector("button");

            // Validation
            if (!name || !email || !message) {
                status.style.color = "red";
                status.innerText = "❌ Please fill all fields";
                return;
            }

            // UI start loading
            loader.style.display = "block";
            status.innerText = "";
            button.disabled = true;

            try {
                let res = await fetch("https://codingwithmannu-1.onrender.com/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (!res.ok) {
                    throw new Error("Server error");
                }

                let data = await res.json();

                // stop loader
                loader.style.display = "none";
                button.disabled = false;

                if (data.success) {
                    status.style.color = "green";
                    status.innerText = "Message sent successfully!";

                    // reset form
                    this.reset();

                    // auto hide message after 3 sec
                    setTimeout(() => {
                        status.innerText = "";
                    }, 3000);

                } else {
                    status.style.color = "red";
                    status.innerText = "Failed to send message";
                }

            } catch (error) {
                loader.style.display = "none";
                button.disabled = false;

                status.style.color = "red";
                status.innerText = "Network error!";
                console.log(error);
            }
        });