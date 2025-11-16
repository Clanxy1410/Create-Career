document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

const roleSelect = document.getElementById("roleSelect");
const roadmapContainer = document.getElementById("roadmapSteps");
const progressBar = document.getElementById("progressBar");

const roadmaps = {
  frontend: [
    "Learn HTML, CSS, JavaScript",
    "Understand Responsive Design & Flexbox/Grid",
    "Learn a JS Framework (React preferred)",
    "Build 5+ Projects",
    "Learn Git/GitHub",
    "Master APIs & Async JS",
    "Learn Deployment (Netlify/Vercel)",
    "Build a Portfolio"
  ],
  backend: [
    "Learn Node.js or Python",
    "Understand Databases (SQL & NoSQL)",
    "Learn Authentication & APIs",
    "Build CRUD Projects",
    "Learn Deployment",
    "Understand Security Basics",
    "Learn Cloud Basics"
  ],
  uiux: [
    "Learn UI Principles",
    "Understand Color & Typography",
    "Master Figma",
    "Learn Prototyping",
    "Build UI Case Studies",
    "Learn UX Research"
  ]
};

let completedSteps = JSON.parse(localStorage.getItem("completedSteps")) || {};

roleSelect.addEventListener("change", () => {
  const role = roleSelect.value;
  roadmapContainer.innerHTML = "";

  if (!role) return;

  const steps = roadmaps[role];
  completedSteps[role] = completedSteps[role] || Array(steps.length).fill(false);

  steps.forEach((step, index) => {
    const div = document.createElement("div");
    div.className = "step-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completedSteps[role][index];

    checkbox.addEventListener("change", () => {
      completedSteps[role][index] = checkbox.checked;
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      updateProgress(role);
    });

    const label = document.createElement("span");
    label.textContent = step;

    div.appendChild(checkbox);
    div.appendChild(label);

    roadmapContainer.appendChild(div);
  });

  updateProgress(role);
});

function updateProgress(role) {
  const steps = roadmaps[role].length;
  const done = completedSteps[role].filter(x => x).length;
  progressBar.style.width = (done / steps) * 100 + "%";
}
