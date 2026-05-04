const form = document.getElementById("questionForm");
const list = document.getElementById("questionsList");

// Load questions
async function loadQuestions() {
  const res = await fetch("https://codingwithmannu-1.onrender.com/questions");
  const data = await res.json();

  list.innerHTML = "";

  data.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
      <h3>${q.topic}</h3>
      <p>${q.question}</p>
      <small>By ${q.name}</small>
    `;

    list.appendChild(div);
  });
}

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newQuestion = {
    name: document.getElementById("name").value,
    topic: document.getElementById("topic").value,
    question: document.getElementById("question").value
  };

  await fetch("https://codingwithmannu-1.onrender.com/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newQuestion)
  });

  form.reset();
  loadQuestions();
});

loadQuestions();

async function loadQuestions() {
  const res = await fetch("https://codingwithmannu-1.onrender.com/questions");
  const data = await res.json();

  list.innerHTML = "";

  data.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
      <h3>${q.topic}</h3>
      <small>By ${q.name}</small>
      <p>${q.question}</p>

      <div class="replies">
        ${q.replies.map(r => `
          <p>Reply By <b>${r.name}:</b> ${r.message}</p>
        `).join("")}
      </div>
      <small>Do you want to reply?<small>
      <details id="reply-details">
      <summary>Yes</summary>
      <input placeholder="Your name" id="name-${q._id}" />
      <input placeholder="Write reply..." id="reply-${q._id}" />
      <button onclick="addReply('${q._id}')">Reply</button>
      </details>
    `;

    list.appendChild(div);
  });
}

async function addReply(id) {
  const name = document.getElementById(`name-${id}`).value;
  const message = document.getElementById(`reply-${id}`).value;

  await fetch(`https://codingwithmannu-1.onrender.com/questions/${id}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message })
  });

  loadQuestions();
}